import React, { useEffect, useState } from 'react';
import MapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import LoaderMini from '../../loaders/LoaderMini.jsx';
import useGlobalReducer from '../../../hooks/useGlobalReducer.jsx';

const MapboxMap = ({ locations, userPosition, onSelectBase }) => {
  const { dispatch } = useGlobalReducer();

  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 10,
  });

  const [selectedSpot, setSelectedSpot] = useState(null);
  const [userLocations, setUserLocations] = useState([]);
  const [newSpot, setNewSpot] = useState(null);
  const [newSpotName, setNewSpotName] = useState('');
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  useEffect(() => {
    if (Array.isArray(locations) && locations.length > 0) {
      setViewState((prev) => ({
        ...prev,
        latitude: locations[0].coordinates.latitude,
        longitude: locations[0].coordinates.longitude,
      }));
    }
  }, [locations]);

  const isLoading = !Array.isArray(locations) || locations.length === 0;

  const handleMapClick = (event) => {
    if (userLocations.length > 0 || newSpot) return;

    const features = event?.originalEvent?.target?.classList;
    if (features && [...features].some(cls => cls.includes('mapboxgl-marker'))) return;

    const { lngLat } = event;
    setNewSpot({ longitude: lngLat.lng, latitude: lngLat.lat });
    setNewSpotName('');
    setSelectedSpot(null);
  };

  const handleAddNewSpot = () => {
    if (newSpotName.trim() === '') return;
    const newLocation = {
      name: newSpotName.trim(),
      coordinates: newSpot,
    };
    setUserLocations([newLocation]);
    setNewSpot(null);
    setNewSpotName('');
  };

  const handleDeleteUserSpot = () => {
    setUserLocations([]);
    setNewSpot(null);
    setNewSpotName('');
    setSelectedSpot(null);
  };

  const handleSelectBase = async (spot) => {
    const token = localStorage.getItem("jwt-token");
    if (!token) return alert("No hay token");

    const payload = {
      name: spot.name,
      latitude: spot.coordinates.latitude,
      longitude: spot.coordinates.longitude,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVICES_URL}/base`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          base: payload.name,
          latitude: payload.latitude,
          longitude: payload.longitude,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_SELECTED_BASE", payload });
        if (onSelectBase) onSelectBase(payload);
        setShowSavedMessage(true);
        setTimeout(() => setShowSavedMessage(false), 2000);
        setSelectedSpot(null);
      } else {
        console.error("Error al guardar la base:", data);
        alert(data.msg || "Error al guardar la base");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="w-full h-[320px] rounded-2xl overflow-hidden relative shadow-lg borde-con-degradado bg-[#0e0e0e]">
      {isLoading ? (
        <div className="flex items-center justify-center h-full text-white text-sm opacity-60">
          <LoaderMini />
        </div>
      ) : (
        <>
          <MapGL
            {...viewState}
            mapboxAccessToken="pk.eyJ1IjoidG9uaW1pcjEwIiwiYSI6ImNtY201eDFrZTBmcW4ya3M1OWRmOGp0d24ifQ.ywjMvmDuJ2TsnrtQnrXVgw"
            onMove={(evt) => setViewState(evt.viewState)}
            onClick={handleMapClick}
            mapStyle="mapbox://styles/mapbox/dark-v11"
            style={{ width: '100%', height: '100%' }}
          >
            {locations.map((loc, idx) => (
              <Marker
                key={`ia-${idx}`}
                longitude={loc.coordinates.longitude}
                latitude={loc.coordinates.latitude}
                color="#22d3ee"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setSelectedSpot(loc);
                  setNewSpot(null);
                }}
              />
            ))}

            {userLocations.map((loc, idx) => (
              <Marker
                key={`user-${idx}`}
                longitude={loc.coordinates.longitude}
                latitude={loc.coordinates.latitude}
                color="#34d399"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setSelectedSpot({ ...loc, isUser: true, index: idx });
                  setNewSpot(null);
                }}
              />
            ))}

            {userPosition && (
              <Marker
                longitude={userPosition.longitude}
                latitude={userPosition.latitude}
                color="#8E4990"
              />
            )}

            {newSpot && (
              <Popup
                longitude={newSpot.longitude}
                latitude={newSpot.latitude}
                anchor="top"
                onClose={() => setNewSpot(null)}
                closeOnClick={false}
              >
                <div className="relative text-sm text-gray-800 space-y-1">
                  <button
                    onClick={() => setNewSpot(null)}
                    className="absolute top-0 right-0 text-xs text-gray-500 hover:text-black"
                  >
                    ✕
                  </button>
                  <label>Nombre del lugar:</label>
                  <input
                    type="text"
                    value={newSpotName}
                    onChange={(e) => setNewSpotName(e.target.value)}
                    className="px-2 py-1 border rounded text-black"
                    placeholder="Ej. Restaurante, Parque..."
                    autoFocus
                  />
                  <button
                    onClick={handleAddNewSpot}
                    className="mt-1 px-2 py-1 bg-emerald-500 text-white rounded text-sm hover:bg-emerald-600"
                  >
                    Añadir ubicación
                  </button>
                </div>
              </Popup>
            )}

            {selectedSpot && (
              <Popup
                longitude={selectedSpot.coordinates.longitude}
                latitude={selectedSpot.coordinates.latitude}
                anchor="top"
                onClose={() => setSelectedSpot(null)}
                closeOnClick={false}
              >
                <div className="text-sm text-gray-800 relative space-y-2">
                  <button
                    onClick={() => setSelectedSpot(null)}
                    className="absolute top-0 right-0 text-xs text-gray-500 hover:text-black"
                  >
                    ✕
                  </button>
                  <strong>{selectedSpot.name}</strong>
                  <button
                    onClick={() => handleSelectBase(selectedSpot)}
                    className="mt-1 px-3 py-1 bg-sky-500 text-white rounded text-sm hover:bg-sky-600 block"
                  >
                    Seleccionar esta base
                  </button>
                  {selectedSpot.isUser && (
                    <button
                      onClick={handleDeleteUserSpot}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 block"
                    >
                      Borrar punto
                    </button>
                  )}
                </div>
              </Popup>
            )}
          </MapGL>

          {showSavedMessage && (
            <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-3 py-1 rounded shadow">
              Base estelar guardada ✅
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MapboxMap;
