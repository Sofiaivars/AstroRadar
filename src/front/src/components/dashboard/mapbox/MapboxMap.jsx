import React, { useEffect, useState } from 'react';
import MapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxMap = ({ locations, userPosition }) => {
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 10,
  });

  const [selectedSpot, setSelectedSpot] = useState(null);

  useEffect(() => {
    if (Array.isArray(locations) && locations.length > 0) {
      setViewState((prev) => ({
        ...prev,
        latitude: locations[0].coordinates.latitude,
        longitude: locations[0].coordinates.longitude,
      }));
    }
  }, [locations]);

  if (!Array.isArray(locations) || locations.length === 0) {
    return <p className="text-white text-center mt-4">No hay ubicaciones disponibles.</p>;
  }

  return (
    <div className="w-full h-[300px] rounded-2xl overflow-hidden relative shadow-lg borde-con-degradado">
      <MapGL
        {...viewState}
        mapboxAccessToken="pk.eyJ1IjoidG9uaW1pcjEwIiwiYSI6ImNtY201eDFrZTBmcW4ya3M1OWRmOGp0d24ifQ.ywjMvmDuJ2TsnrtQnrXVgw"
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        style={{ width: '100%', height: '100%' }}
      >
        {/* 🟢 Puntos generados por IA */}
        {locations.map((loc, idx) => (
          <Marker
            key={idx}
            longitude={loc.coordinates.longitude}
            latitude={loc.coordinates.latitude}
            color="#22d3ee"
            onClick={() => setSelectedSpot(loc)}
          />
        ))}

        {/* 🔴 Tu ubicación */}
        {userPosition && (
          <Marker
            longitude={userPosition.longitude}
            latitude={userPosition.latitude}
            color="#8E4990"
          />
        )}

        {/* 🗨️ Popup de lugar */}
        {selectedSpot && (
          <Popup
            longitude={selectedSpot.coordinates.longitude}
            latitude={selectedSpot.coordinates.latitude}
            anchor="top"
            onClose={() => setSelectedSpot(null)}
            closeOnClick={false}
          >
            <div className="text-sm text-gray-800">
              <strong>{selectedSpot.name}</strong><br />
              Lat: {selectedSpot.coordinates.latitude.toFixed(4)}<br />
              Lon: {selectedSpot.coordinates.longitude.toFixed(4)}
            </div>
          </Popup>
        )}
      </MapGL>
    </div>
  );
};

export default MapboxMap;