import { useEffect, useState } from "react";
import EventoDestacado from "@components/dashboard/EventoDestacado.jsx";
import MapDashboard from "@components/dashboard/MapDashboard.jsx";
import RankingMain from "@components/dashboard/ranking-component/RankingMain";
import CosmoDashboard from "@components/dashboard/cosmo-dashboard/CosmoDashboard";
import MisionActual from "@components/dashboard/MisionActual/MisionActual";
import MisionRealizada from "@components/dashboard/MisionRealizada/MisionRealizada";
import Calendar from "@components/dashboard/calendar/Calendar";
import EventoSugerido from "@components/dashboard/EventoSugerido.jsx";
import EventoProgramado from "@components/dashboard/EventoProgramado.jsx";
import InfoTopComponent from "@components/dashboard/InfoTopComponent/InfoTopComponent.jsx";
import PageLoader from "@components/loaders/PageLoader.jsx";
import MapboxDashboard from "@components/dashboard/mapbox/MapboxDashboard.jsx";
import { getJSONCoords } from "@services/cosmo-service.js";
import { getUserLocation } from "@services/geolocation-service";
import { getUserInfo } from "@services/authService.js";
import { getEventsFromAPI, getISSPasses, getUserMissions } from "@services/events-missions-service.js";
import { useSelector } from "react-redux";

function DashboardComponents(){
  const userData = useSelector((state) => state.userData)
  const [isLoaded, setIsLoaded] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    const userDataHasData = Object.values(userData).some(value => value !== null)
    if(userDataHasData){
      setIsLoaded(true)
    }
  }, [userData])

  if (!isLoaded) {
    return (
      <div className="flex flex-col justify-center items-center">
        <PageLoader />
      </div>
    );
  }

  return(
    <>
      <InfoTopComponent errorMsg={errorMsg} userLocation={""} />
      <div className="flex flex-col md:flex-row gap-3 overflow-y-auto md:overflow-hidden w-full h-full">
        <div className="flex flex-col w-full md:w-1/2 gap-1">
          <EventoDestacado />
          <MapDashboard locations={""} userPosition={""}/>
          <div className="flex flex-col sm:flex-row w-full gap-1">
            <Calendar />
            <EventoSugerido />
          </div>
        </div>

        <div className="flex flex-col w-full md:w-1/2 gap-1">
          <div className="flex flex-col sm:flex-row w-full gap-1">
            <MisionActual />
            <MisionRealizada />
          </div>
          <EventoProgramado />
          <div className="flex flex-col sm:flex-row items-center w-full h-full gap-1 relative rounded-2xl borde-con-degradado">
            <RankingMain />
            <CosmoDashboard scene={"dashboard"}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardComponents