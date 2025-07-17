import { useNavigate, useLocation } from "react-router";
import {
  Home,
  CalendarSearch,
  MapPin,
  Rocket,
  Settings,
  PowerOff,
} from "lucide-react";
import useGlobalReducer from "../../hooks/useGlobalReducer";

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { store } = useGlobalReducer();

  const handleClick = () => {
    localStorage.removeItem("jwt-token");
    navigate("/");
  };

  const handleMissionNavigate = () => {
    if (store.userActiveMission) {
      if (!store.userActiveMission.base.id) {
        console.log(store.userActiveMission);
        console.log(store.userActiveMission.base.id);
        return navigate("/dashboard/missions");
      } else {
        console.log(store.userActiveMission);
        console.log(store.userActiveMission.base.id);
        return navigate("/dashboard/missions/step2");
      }
    } else {
      alert("No tienes activada una misión");
    }
  };
  const isActive = (path) => location.pathname === path;

  const activeStyle = "bg-gray-200/5 shadow-purple-600 shadow-lg";
  const baseStyle =
    "text-white h-10 w-10 flex items-center justify-center rounded-[16px] transition duration-300 cursor-pointer";

  return (
    <div className="flex flex-col justify-between items-center h-full p-2 rounded-2xl borde-con-degradado">
      <div className="flex flex-col h-full gap-4 items-start">
        <button
          className={`${baseStyle} ${
            isActive("/dashboard") ? activeStyle : "hover:bg-gray-800"
          }`}
          title="Home"
          onClick={() => navigate("/dashboard")}
        >
          <Home size={20} />
        </button>
        <button
          className="text-white h-10 w-10 flex items-center justify-center rounded-[12px] hover:bg-gray-800 transition duration-300 cursor-pointer"
          title="Mapa"
        >
          <MapPin size={20} />
        </button>
        <button
          className={`${baseStyle} ${
            isActive("/dashboard/missions") ||
            isActive("/dashboard/missions/step2")
              ? activeStyle
              : "hover:bg-gray-800"
          }`}
          title="Misiones"
          onClick={handleMissionNavigate}
        >
          <Rocket size={20} />
        </button>
        <button
          className={`${baseStyle} ${
            isActive("/dashboard/events") ? activeStyle : "hover:bg-gray-800"
          }`}
          title="Eventos"
          onClick={() => navigate("/dashboard/events")}
        >
          <CalendarSearch size={20} />
        </button>
      </div>
      <div className="flex flex-col justify-center">
        <button
          className="text-white h-10 w-10 flex items-center justify-center rounded-[12px] hover:bg-gray-800 transition duration-300 cursor-pointer"
          title="Settings"
          onClick={handleClick}
        >
          <PowerOff size={20} />
        </button>
        <button
          className="text-white h-10 w-10 flex items-center justify-center rounded-[12px] hover:bg-gray-800 transition duration-300 cursor-pointer"
          title="Settings"
        >
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
}

export default SideBar;
