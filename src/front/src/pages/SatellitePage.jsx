import { useEffect, useState } from "react"
import ISSCard from "../components/renderISSPasses/ISSCard"
import { getISSPasses } from "../servicios/events-missions-service"

function SatellitePage(){
  const [issPasses, setIssPasses] = useState(null)
  const [isLoaded, setIsLoaded] = useState(true)
  
  useEffect(() => {
    if(!isLoaded){
      const getISSPassesFromAPI = async () => {
        const issData = await getISSPasses()
        setIssPasses(issData)
      }
      getISSPassesFromAPI()
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    console.log(issPasses)
  }, [issPasses])
  return(
    <div className="flex flex-col items-center justify-center w-full h-full rounded-2xl p-3 overflow-hidden borde-con-degradado">
      <div className="flex flex-col gap-3 w-6/7 h-6/7 border-1 overflow-y-auto render-iss-passes">
        <ISSCard 
          issImg={"https://static.euronews.com/articles/stories/08/58/46/10/1536x864_cmsv2_f37c6ed4-36d6-5c98-9591-8770770ec419-8584610.jpg"}
        />
      </div>
    </div>
  )
}

export default SatellitePage