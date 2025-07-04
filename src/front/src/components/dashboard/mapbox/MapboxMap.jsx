import React, { useEffect, useState } from 'react';
import MapGL, { Marker } from 'react-map-gl'; 
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxMap = ({userLocation}) => {
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 14
  });
  
  useEffect(() => {
    if(userLocation){
      setViewState((prev) => ({
        ...prev, 
        latitude: userLocation.latitude,
        longitude: userLocation.longitude
      }))
      return
    }
  }, [userLocation])

  return (
    <div className="w-full h-[300px] rounded-2xl overflow-hidden relative shadow-lg borde-con-degradado">
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