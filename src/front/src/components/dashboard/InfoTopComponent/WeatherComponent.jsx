function WeatherComponent({weatherInfo}){

  return(
    <>
      <p>{weatherInfo.current.is_day === 1 ? "🏙️" : "🌃"}</p>
      <p>{weatherInfo.current.temperature_2m > 20 ? "🔥" : "🥶"} {`${weatherInfo.current.temperature_2m}ºC`}</p>
      <p>{weatherInfo.current.relative_humidity_2m > 30 ? "💧" : "🏜️"} {`${weatherInfo.current.relative_humidity_2m}%`}</p>
      <p>{`☁️ ${weatherInfo.current.cloud_cover}%`}</p>
      <p>{`🪁 ${weatherInfo.current.wind_speed_10m}km/h`}</p>
    </>
  )
}

export default WeatherComponent