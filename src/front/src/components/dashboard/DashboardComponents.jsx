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
import { useNavigate } from "react-router";
import { getJSONCoords } from "../../servicios/cosmo-service.js";
import { getUserLocation } from "../../servicios/geolocation-service";
import { getUserInfo } from "../../servicios/login-service.js";

function DashboardComponents(){
  const [userData, getUserData] = useState({});
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [spots, setSpots] = useState(null)

  const navigate = useNavigate();

  const fetchAI = async (lat, lon) => {
    try {
      const data = await getJSONCoords(lat, lon)
      setSpots(data.spots)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        fetchAI(latitude, longitude)
      },
      (err) => {
        alert("Ubicación no permitida.")
        console.error(err)
      }
    )
  }, [])

  useEffect(() => {
    const getUserDataFromDatabase = async () => {
      const data = await getUserInfo();
      return getUserData(data);
    };

    getUserDataFromDatabase();

    getUserLocation(
      (coords) => {
        setUserLocation(coords);
        setErrorMsg(null);
      },
      (mensajeError) => {
        setErrorMsg(mensajeError);
      }
    );
  }, []);

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
      <div className="flex flex-row gap-3 w-full">
        <div className="flex flex-col w-1/2 gap-1">
          <EventoDestacado />
          <Map locations={spots} userPosition={userLocation}/>
          <div className="flex flex-row w-full gap-1">
            <Calendar />
            <EventoSugerido />
          </div>
        </div>

        <div className="flex flex-col w-full gap-1">
          <div className="flex flex-row w-9/10 gap-1">
            <MisionActual />
            <MisionRealizada />
          </div>
          <EventoProgramado />
          <div className="flex flex-row w-9/10 gap-1 relative rounded-2xl borde-con-degradado">
            <RankingMain />
            <CosmoDashboard />
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardComponents