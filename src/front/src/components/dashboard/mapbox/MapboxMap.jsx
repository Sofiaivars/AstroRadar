import React, { useState, useEffect } from 'react';
import MapGL, { Marker } from 'react-map-gl'; 
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxMap = () => {
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 14
  });

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setViewState((prev) => ({
            ...prev,
            latitude,
            longitude
          }));
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error obteniendo la ubicación:', error);
        }
      );
    } else {
      console.error('La geolocalización no está disponible en este navegador.');
    }
  }, []);

  return (
    <div className="w-full h-[395px] rounded-2xl overflow-hidden relative shadow-lg border border-white/10">
      <MapGL
        {...viewState}
        mapboxAccessToken="pk.eyJ1IjoidG9uaW1pcjEwIiwiYSI6ImNtY201eDFrZTBmcW4ya3M1OWRmOGp0d24ifQ.ywjMvmDuJ2TsnrtQnrXVgw"
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        style={{ width: '100%', height: '100%' }}
      >
        {userLocation && (
          <Marker
            longitude={userLocation.longitude}
            latitude={userLocation.latitude}
            color="blue"
          />
        )}
      </MapGL>
    </div>
  );
};

export default MapboxMap;