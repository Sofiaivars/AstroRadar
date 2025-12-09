const getUserLocation = (onSuccess) => {
  if (!navigator.geolocation) {
    console.error("Geolocalización incompatible con el navegador");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const ubicacion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      onSuccess(ubicacion);
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error("Permiso denegado para obtener la ubicación.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.error("Ubicación no disponible.");
          break;
        case error.TIMEOUT:
          console.error("Tiempo de espera excedido.");
          break;
        default:
          console.error("Error desconocido.");
      }
    }
  );
};

const reverseGeocodingAPICall = async ({ latitude, longitude }) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
  const data = await response.json();
  return data;
}

export { getUserLocation, reverseGeocodingAPICall }