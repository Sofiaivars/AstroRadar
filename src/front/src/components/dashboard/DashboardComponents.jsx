import EventoDestacado from "./EventoDestacado.jsx";
import Map from "./Map.jsx";
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

function DashboardComponents(){
  const [userData, getUserData] = useState({});
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [spots, setSpots] = useState(null)

  const { store, dispatch } = useGlobalReducer()

  const fetchAI = async (lat, lon) => {
    try {
      const data = await getJSONCoords(lat, lon)
      setSpots(data.spots)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  useEffect(() => {
    const getUserDataFromDatabase = async () => {
      const data = await getUserInfo();
      return getUserData(data);
    };

    getUserDataFromDatabase();

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
  }, [])

  useEffect(() => {
    if(store.userLocation){
      setUserLocation(store.userLocation)
    }
  }, [store.userLocation])

  useEffect(() => {
    if(userLocation){
      fetchAI(userLocation.latitude, userLocation.longitude)
    }
  }, [userLocation])

  useEffect(() => {
    console.log(`user-data: ${JSON.stringify(userData)}`);
  }, [userData]);

  if (Object.keys(userData).length === 0) {
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
          <Map locations={spots} userPosition={userLocation}/>
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
            <CosmoDashboard />
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardComponents