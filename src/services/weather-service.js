const getWeather = async (latitud, longitud) => {
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,precipitation,rain,is_day,cloud_cover,weather_code,relative_humidity_2m,wind_speed_10m&timezone=auto`);
  const data = await response.json();
  return { current: data.current, current_units: data.current_units };
}

export { getWeather };