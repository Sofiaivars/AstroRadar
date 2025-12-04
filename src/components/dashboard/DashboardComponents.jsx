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
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";
import MapboxDashboard from "./mapbox/MapboxDashboard.jsx";
import { getEventsFromAPI, getISSPasses, getUserMissions } from "../../servicios/events-missions-service.js";

function DashboardComponents(){
  const [userData, setUserData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [spots, setSpots] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const { store, dispatch } = useGlobalReducer()

  useEffect(() => {
    if(!store.userData){
      console.log('Obteniendo datos de usuario...')
      const getUserDataFromDatabase = async () => {
        const data = await getUserInfo();
        dispatch({ type: 'ADD_USER_DATA', payload: data })
        return
      };
      getUserDataFromDatabase();
    }

    if(!store.userLocation){
      console.log('Obteniendo ubicación...')
      getUserLocation(
        (coords) => {
          dispatch({ type: 'ADD_USER_LOCATION', payload: coords });
          setErrorMsg(null);
        },
        (mensajeError) => {
          setErrorMsg(mensajeError);
        }
      )
    }

    if(!Array.isArray(store.eventList) || store.eventList.length === 0){
      try{
        const getEvents = async () => {
          const eventsFromAPI = await getEventsFromAPI()
          dispatch({ type: "SET_EVENT_LIST", payload: eventsFromAPI })
        }
        getEvents()
      }catch(error){
        console.error(error)
      }
    }
    setTimeout(() => {
      setIsLoaded(true)
    }, 1000)
  }, [])

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
      <div className="flex flex-row gap-3 w-full h-full">
        <div className="flex flex-col w-1/2 gap-1">
          <EventoDestacado />
          <MapDashboard locations={spots} userPosition={userLocation}/>
          <div className="flex flex-row w-full gap-1">
            <Calendar />
            <EventoSugerido />
          </div>
        </div>

        <div className="flex flex-col w-1/2 gap-1">
          <div className="flex flex-row w-full gap-1">
            <MisionActual />
            <MisionRealizada />
          </div>
          <EventoProgramado />
          <div className="flex flex-row items-center w-full h-full gap-1 relative rounded-2xl borde-con-degradado">
            <RankingMain />
            <CosmoDashboard scene={"dashboard"}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardComponents