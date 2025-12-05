import { useEffect, useState } from "react";
import EventoDestacado from "@components/dashboard/EventoDestacado.jsx";
import MapDashboard from "@components/dashboard/MapDashboard.jsx";
import RankingMain from "@components/ranking-component/RankingMain";
import CosmoDashboard from "@components/cosmo-dashboard/CosmoDashboard";
import MisionActual from "@components/MisionActual/MisionActual";
import MisionRealizada from "@components/MisionRealizada/MisionRealizada";
import Calendar from "@components/calendar/Calendar";
import EventoSugerido from "@components/dashboard/EventoSugerido.jsx";
import EventoProgramado from "@components/dashboard/EventoProgramado.jsx";
import InfoTopComponent from "@components/InfoTopComponent/InfoTopComponent.jsx";
import PageLoader from "@components/loaders/PageLoader.jsx";
import MapboxDashboard from "@components/mapbox/MapboxDashboard.jsx";
import { getJSONCoords } from "@services/cosmo-service.js";
import { getUserLocation } from "@services/geolocation-service";
import { getUserInfo } from "@services/authService.js";
import { getEventsFromAPI, getISSPasses, getUserMissions } from "@services/events-missions-service.js";

function DashboardComponents(){
  const [userData, setUserData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [spots, setSpots] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  if (!isLoaded) {
    return (
      <div className="flex flex-col justify-center items-center">
        <PageLoader />
      </div>
    );
  }

  return(
    <>
      <InfoTopComponent errorMsg={errorMsg} userLocation={userLocation} />
      <div className="flex flex-col md:flex-row gap-3 overflow-y-auto md:overflow-hidden w-full h-full">
        <div className="flex flex-col w-full md:w-1/2 gap-1">
          <EventoDestacado />
          <MapDashboard locations={spots} userPosition={userLocation}/>
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