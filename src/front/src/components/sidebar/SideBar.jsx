import { useNavigate } from "react-router";
import { Home, Globe, MapPin, Rocket, Settings, PowerOff  } from "lucide-react";

function SideBar() {
  const navigate = useNavigate()

  const handleClick = () => {
    localStorage.removeItem("jwt-token");
    navigate("/");
  };
  
  return (
    <div
      className="flex flex-col justify-between items-center h-180 p-2 rounded-2xl borde-con-degradado"
    >
      <div className="flex flex-col h-full gap-4 items-start">
        <button className="text-white h-10 w-10 flex items-center justify-center rounded-[12px] hover:bg-gray-800 transition duration-300" title="Home" onClick={() => navigate('/dashboard')}>
            <Home size={20} />
        </button>
        <button className="text-white h-10 w-10 flex items-center justify-center rounded-[12px] hover:bg-gray-800 transition duration-300" title="Mapa">
            <MapPin size={20} />
        </button>
        <button className="text-white h-10 w-10 flex items-center justify-center rounded-[12px] hover:bg-gray-800 transition duration-300" title="Misiones" onClick={() => navigate('/dashboard/missions')}>
            <Rocket size={20} />
        </button>
        <button className="text-white h-10 w-10 flex items-center justify-center rounded-[12px] hover:bg-gray-800 transition duration-300" title="Globe">
            <Globe size={20} />
        </button>
      </div>
      <div className="flex flex-col justify-center">
        <button
          className="text-white h-10 w-10 flex items-center justify-center rounded-[12px] hover:bg-gray-800 transition duration-300"
          title="Settings"
          onClick={handleClick}
        >
          <PowerOff size={20} />
        </button>
        <button
          className="text-white h-10 w-10 flex items-center justify-center rounded-[12px] hover:bg-gray-800 transition duration-300"
          title="Settings"
        >
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
}

export default SideBar;
