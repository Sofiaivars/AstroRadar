import { useEffect, useState } from 'react'
import './InfoTopComponent.css'
import { getWeather } from '../../../servicios/weather-service.js'
import WeatherComponent from './WeatherComponent.jsx'
import LoaderMini from '../../loaders/loaderMini.jsx'
import { reverseGeocodingAPICall } from '../../../servicios/geolocation-service.js'

function InfoTopComponent({errorMsg, userLocation}){
  const [weatherInfo, setWeatherInfo] = useState(null)
  const [locateString, setLocateString] = useState(null)

  useEffect(() => {
    const getWeatherDataFromAPI = async () => {
      const weatherData = await getWeather("40.463971", "-3.715840")
      setWeatherInfo(weatherData)
    }
    getWeatherDataFromAPI()
  }, [])

  useEffect(() => {
    const getLocateInfo = async () => {
      const reverseGeocodingData = await reverseGeocodingAPICall(userLocation.latitude, userLocation.longitude)
      setLocateString(`${reverseGeocodingData.address.suburb}, ${reverseGeocodingData.address.city}, ${reverseGeocodingData.address.country}`)
    }
    getLocateInfo()
    console.log(userLocation)
  }, [userLocation])

  return(
    <div className='flex items-center justify-between rounded-xl p-2 mb-1 w-7/9 info-component-container'>
      <div className='flex ms-5 gap-10'>
        {errorMsg ? "Sin permisos de ubicación" : locateString ? <p>📍 {locateString}</p>: <LoaderMini />}
        {weatherInfo
        ? <WeatherComponent weatherInfo={weatherInfo}/>
        : <LoaderMini />}
      </div>
      <p>Astrofrikis activos: 50</p>
    </div>
  )
}

export default InfoTopComponent