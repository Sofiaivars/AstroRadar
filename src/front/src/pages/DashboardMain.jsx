import { useEffect, useState } from "react";
import { getUserInfo } from "../servicios/login-service";
import { useNavigate } from "react-router";
import { Helix } from "ldrs/react";
import "ldrs/react/Helix.css";
import EventoDestacado from "../components/dashboard/EventoDestacado";
import Map from "../components/dashboard/Map";
import RankingMain from "../components/dashboard/ranking-component/RankingMain";
import CosmoDashboard from "../components/dashboard/cosmo-dashboard/CosmoDashboard";
import MisionActual from "../components/dashboard/MisionActual/MisionActual";
import MisionRealizada from "../components/dashboard/MisionRealizada/MisionRealizada";
import Calendar from "../components/dashboard/calendar/Calendar";
import Logotipo from "../components/dashboard/logotipo/Logotipo.jsx";
import EventoSugerido from "../components/dashboard/EventoSugerido.jsx";
import EventoProgramado from "../components/dashboard/EventoProgramado.jsx";
import InfoTopComponent from "../components/dashboard/InfoTopComponent/InfoTopComponent.jsx";
import { getUserLocation } from "../servicios/geolocation-service.js";
import SideBar from "../components/sidebar/SideBar.jsx";
import { askAi } from "../servicios/ai_service.js";

function DashboardMain() {
  const [userData, getUserData] = useState({});
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [spots, setSpots] = useState(null)

  const navigate = useNavigate();




  const handleClick = () => {
    localStorage.removeItem("jwt-token");
    navigate("/");
  };

const fetchAI = async (lat, lon) => {
    try {
      const data = await askAi(lat, lon)
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
      <div className="flex flex-col gap-3 bg-gray-900 text-white rounded-3xl p-3">
        <Helix size="60" speed="1.3" color="#ffffff" />
        <button onClick={() => navigate("/")}>🏠</button>
      </div>
    );
  }

  return (
    <>
      <Logotipo />
      <div className="pt-20 px-4">
        <button
          className="bg-purple-900 hover:bg-purple-300 text-white rounded-3xl p-2 mb-4"
          onClick={handleClick}
        >
          Cerrar Sesión
        </button>
        <SideBar />
        <InfoTopComponent errorMsg={errorMsg} userLocation={userLocation} />
        <div className="flex gap-4 dashboard--main-container">
          <div className="flex flex-col gap-3">
            <EventoDestacado />
            <Map locations={spots} userPosition={userLocation}/>
            <div className="flex gap-3">
              <Calendar />
              <EventoSugerido />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <MisionActual />
              <MisionRealizada />
            </div>
            <EventoProgramado />
            <div className="flex w-auto gap-3">
              <RankingMain />
              <CosmoDashboard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardMain;
