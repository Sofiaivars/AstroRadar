import React from "react";
import { Home, Globe, MapPin, Rocket, Settings } from "lucide-react";

const iconList = [
  { icon: <Home size={20} />, name: "Home" },
  { icon: <MapPin size={20} />, name: "Location" },
  { icon: <Rocket size={20} />, name: "Rocket" },
  { icon: <Globe size={20} />, name: "Globe" },
];

function SideBar() {
  return (
    <div
      className="flex flex-col justify-between items-center h-180 p-2 rounded-2xl"
      style={{
        backgroundImage:
          "linear-gradient(var(--components-background), var(--components-background)), " +
          "linear-gradient(to right, #a855f7, #d946ef, #22d3ee)",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        border: "2px solid transparent",
        backgroundColor: "var(--components-background)",
      }}
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
      <div className="flex justify-center">
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
