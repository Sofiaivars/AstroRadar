import { useEffect, useState } from 'react'
import '@components/dashboard/InfoTopComponent/InfoTopComponent.css'
import WeatherComponent from '@components/dashboard/InfoTopComponent/WeatherComponent.jsx'
import LoaderMini from '@components/loaders/LoaderMini.jsx'
import { getWeather } from '@services/weather-service.js'
import { reverseGeocodingAPICall } from '@services/geolocation-service.js'
import { getAboveSatellites } from '@services/events-missions-service.js'
import { LocateFixed } from 'lucide-react'
import NumberFlow from "@number-flow/react"
import { useSelector } from 'react-redux'

function InfoTopComponent({errorMsg}){
  const { userLocation } = useSelector((state) => state)
  const [weatherInfo, setWeatherInfo] = useState(null)
  const [locateString, setLocateString] = useState(null)
  const [satCounter, setSatCounter] = useState(null)

  useEffect(() => {
    const hasCoords = Object.values(userLocation).some(value => value !== null)

    if(hasCoords){
      const getLocateInfo = async () => {
        const reverseGeocodingData = await reverseGeocodingAPICall(userLocation)
        setLocateString(`${reverseGeocodingData.address.quarter}, ${reverseGeocodingData.address.city}, ${reverseGeocodingData.address.country}`)
      }
      getLocateInfo()

      const getWeatherDataFromAPI = async () => {
        const weatherData = await getWeather(userLocation)
        setWeatherInfo(weatherData)
      }
      getWeatherDataFromAPI()

      if(!satCounter){
        const getSatsAbove = async () => {
          const response = await getAboveSatellites(userLocation)
          setSatCounter(response)
        }
        getSatsAbove()
      }
    }
  }, [userLocation, satCounter])

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
        {satCounter ? <NumberFlow value={satCounter} format={{ minimumIntegerDigits: 4 }}/> : <LoaderMini/>}
      </div>
    </div>
  )
}

export default InfoTopComponent