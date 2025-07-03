import { useEffect, useState } from 'react'
import './InfoTopComponent.css'
import { getWeather } from '../../../servicios/weather-service.js'
import WeatherComponent from './WeatherComponent.jsx'
import LoaderMini from '../../loaders/loaderMini.jsx'

function InfoTopComponent(){
  const [weatherInfo, setWeatherInfo] = useState(null)

  useEffect(() => {
    const getWeatherDataFromAPI = async () => {
      const weatherData = await getWeather("40.463971", "-3.715840")
      setWeatherInfo(weatherData)
    }
    getWeatherDataFromAPI()
  }, [])

  useEffect(() => {
    console.log(weatherInfo)
  }, [weatherInfo])

  return(
    <div className='flex items-center justify-between rounded-xl p-2 mb-1 w-7/9 info-component-container'>
      <div className='flex ms-5 gap-10'>
        <p>📍 Alberic, Valencia</p>
        {weatherInfo
        ? <WeatherComponent weatherInfo={weatherInfo}/>
        : <LoaderMini />}
      </div>
      <p>Astrofrikis activos: 50</p>
    </div>
  )
}

export default InfoTopComponent