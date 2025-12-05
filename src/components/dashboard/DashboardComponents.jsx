import EventoDestacado from "./EventoDestacado.jsx";
import MapDashboard from "./MapDashboard.jsx";
import RankingMain from "./ranking-component/RankingMain";
import CosmoDashboard from "./cosmo-dashboard/CosmoDashboard";
import MisionActual from "./MisionActual/MisionActual";
import MisionRealizada from "./MisionRealizada/MisionRealizada";
import Calendar from "./calendar/Calendar";
import EventoSugerido from "./EventoSugerido.jsx";
import EventoProgramado from "./EventoProgramado.jsx";
import InfoTopComponent from "./InfoTopComponent/InfoTopComponent.jsx";
import PageLoader from "../loaders/PageLoader.jsx";
import { useEffect, useState } from "react";
import { getJSONCoords } from "../../servicios/cosmo-service.js";
import { getUserLocation } from "../../servicios/geolocation-service";
import { getUserInfo } from "../../servicios/login-service.js";
import MapboxDashboard from "./mapbox/MapboxDashboard.jsx";
import { getEventsFromAPI, getISSPasses, getUserMissions } from "../../servicios/events-missions-service.js";

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