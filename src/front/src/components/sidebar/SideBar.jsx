import { useNavigate } from "react-router";
import { Home, Globe, MapPin, Rocket, Settings, PowerOff  } from "lucide-react";

const iconList = [
  { icon: <Home size={20} />, name: "Home" },
  { icon: <MapPin size={20} />, name: "Location" },
  { icon: <Rocket size={20} />, name: "Rocket" },
  { icon: <Globe size={20} />, name: "Globe" },
];

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
        {iconList.map((item, index) => (
          <button
            key={index}
            className="text-white h-10 w-10 flex items-center justify-center rounded-[12px] hover:bg-gray-800 transition duration-300"
            title={item.name}
          >
            {item.icon}
          </button>
        ))}
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
