import { Droplet, MoonStar, Sunrise, ThermometerSnowflake, ThermometerSun, DropletOff, Cloudy, Wind, Umbrella, UmbrellaOff } from "lucide-react";

function WeatherComponent({weatherInfo}){

  return(
    <>
      <div className="flex gap-1">
        {weatherInfo.current.is_day === 1 ? <Sunrise/> : <MoonStar/>}
      </div>
      <div className="flex gap-1">
        {weatherInfo.current.temperature_2m > 17 ? <ThermometerSun/> : <ThermometerSnowflake/>}
        <p>{`${weatherInfo.current.temperature_2m}ºC`}</p>
      </div>
      <div className="flex gap-1">
        {weatherInfo.current.relative_humidity_2m > 30 ? <Droplet/> : <DropletOff/>}
        <p>{`${weatherInfo.current.relative_humidity_2m}%`}</p>
      </div>
      <div className="flex gap-1">
        <Cloudy/>
        <p>{`${weatherInfo.current.cloud_cover}%`}</p>
      </div>
      <div className="flex gap-1">
        <Wind/>
        <p>{`${weatherInfo.current.wind_speed_10m}km/h`}</p>
      </div>
      <div className="flex gap-1">
        {weatherInfo.current.rain > 0 ? <Umbrella /> : <UmbrellaOff />}
        <p>{`${weatherInfo.current.rain}mm`}</p>
      </div>
    </>
  )
}

export default WeatherComponent