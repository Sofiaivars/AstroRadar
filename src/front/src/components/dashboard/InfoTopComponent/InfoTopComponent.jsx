import { useEffect, useState } from 'react'
import './InfoTopComponent.css'
import { getWeather } from '../../../servicios/weather-service.js'
import WeatherComponent from './WeatherComponent.jsx'
import LoaderMini from '../../loaders/LoaderMini.jsx'
import { reverseGeocodingAPICall } from '../../../servicios/geolocation-service.js'
import { LocateFixed, TriangleAlert } from 'lucide-react'
import { getAboveSatellites } from '../../../servicios/events-missions-service.js'

function InfoTopComponent({errorMsg, userLocation}){
  const [weatherInfo, setWeatherInfo] = useState(null)
  const [locateString, setLocateString] = useState(null)
  const [satCounter, setSatCounter] = useState(null)

  useEffect(() => {
    const getLocateInfo = async () => {
      const reverseGeocodingData = await reverseGeocodingAPICall(userLocation.latitude, userLocation.longitude)
      setLocateString(`${reverseGeocodingData.address.quarter}, ${reverseGeocodingData.address.city}, ${reverseGeocodingData.address.country}`)
    }
    getLocateInfo()

    if(userLocation){   // PENDIENTE AÑADIR PROBABILIDAD DE LLUVIA
      const getWeatherDataFromAPI = async () => {
      const weatherData = await getWeather(userLocation.latitude, userLocation.longitude)
      setWeatherInfo(weatherData)

      if(!satCounter){
        const getSatsAbove = async () => {
          const response = await getAboveSatellites(userLocation.latitude, userLocation.longitude)
          setSatCounter(response)
        }
        getSatsAbove()
      }
    }
    getWeatherDataFromAPI()
    }
  }, [userLocation])

  return(
    <div className='flex items-center justify-between rounded-xl p-2 mb-1 w-full self-start borde-con-degradado'>
      <div className='flex ms-5 gap-10'>
        {errorMsg ? "Sin permisos de ubicación" : locateString ? <div className='flex gap-1'><LocateFixed /><p>{locateString}</p></div> : <LoaderMini />}
        {weatherInfo
        ? <WeatherComponent weatherInfo={weatherInfo}/>
        : <LoaderMini />}
      </div>
      <div className='flex gap-1 items-center'>
        <p>Satélites encima de mí:</p>
        <p>{satCounter ? satCounter : <LoaderMini/>}</p>
      </div>
    </div>
  )
}

export default InfoTopComponent