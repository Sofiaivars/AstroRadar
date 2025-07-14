import { useEffect, useState } from "react"
import ISSCard from "../components/renderISSPasses/ISSCard"
import { getISSPasses } from "../servicios/events-missions-service"
import useGlobalReducer from '../hooks/useGlobalReducer.jsx'
import PageLoader from '../components/loaders/PageLoader.jsx'

function SatellitePage(){
  const [issPasses, setIssPasses] = useState(null)
  const [location, setLocation] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const { store } = useGlobalReducer()
  
  useEffect(() => {
    setLocation(store.userLocation)
  }, [store.userLocation])

  useEffect(() => {
    const getISSPassesFromAPI = async () => {
      if (location && !isLoaded) {
        try {
          const issData = await getISSPasses(location.latitude, location.longitude)
          setIssPasses(issData)
          setIsLoaded(true)
          console.log('Cargados pasos ISS...')
        } catch (error) {
          console.error("Error obteniendo datos de ISS:", error)
        }
      }
    }
    getISSPassesFromAPI()
  }, [location, isLoaded])

  useEffect(() => {
    console.log(issPasses)
  }, [issPasses])
  return(
    <div className="flex flex-col items-center justify-center w-full h-full rounded-2xl p-3 overflow-hidden borde-con-degradado">
      <div className="flex flex-col items-center justify-center gap-3 w-6/7 h-6/7 overflow-y-auto render-iss-passes">
        {issPasses
          ? issPasses.passes.map((iss) => {
              return (
                <ISSCard 
                  issImg={"https://static.euronews.com/articles/stories/08/58/46/10/1536x864_cmsv2_f37c6ed4-36d6-5c98-9591-8770770ec419-8584610.jpg"}
                  issDuration={iss.duration}
                  issStart={iss.startVisibility}
                />
              )
            })
          : <PageLoader />
        }
        
      </div>
    </div>
  )
}

export default SatellitePage