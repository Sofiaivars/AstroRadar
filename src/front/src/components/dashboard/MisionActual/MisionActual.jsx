import React from "react";
import fondoPerseidas from "./Assets/perseidas.jpg";

const MisionActual = () => {
  const missionName = "Lluvia de Meteoros - Perseidas";
  const missionStatus = "Mision en curso";
  const location = "Observatorio Astronomico UPV";
  const handleClick = () => {
    console.log("Botón clickeado");
  };

  return (
    <div className="rounded-[16px] p-[2px] bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500">
      <div
        className="relative w-[400px] h-[330px] rounded-[16px] overflow-hidden shadow-lg text-white font-poppins"
        style={{
          backgroundImage: `url(${fondoPerseidas})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
      >
        <div className="relative z-10 flex flex-col justify-between h-full p-6">
          <div className="flex flex-col">
            <div className="self-start">
              <span className="text-md font-normal">{missionStatus}</span>
            </div>
            <div className="self-end text-right mt-2">
              <h2 className="text-xl font-semibold">{missionName}</h2>
              <p className="text-base">{location}</p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleClick}
              className="
    group
    rounded-[12px]       
    p-[1.5px]         
    text-white
    text-sm
    h-10
    w-40
    font-medium
    transition
    duration-300
    flex
    items-center
    justify-center
    hover:shadow-2xl
    hover:shadow-purple-600/30
  "
              style={{
                backgroundImage:
                  "linear-gradient(var(--components-background), var(--components-background)), " +
                  "linear-gradient(to right, #a855f7, #d946ef, #22d3ee)", //bordeeeeeeeee
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                border: "2px solid transparent",
              }}
            >
              <div
                className="
      rounded-[12px]    
      w-full
      h-full
      flex
      items-center
      justify-center
      transition
      duration-300
      ease-in-out
      group-hover:bg-gradient-to-br
      group-hover:from-gray-700
      group-hover:to-gray-900
    "
                style={{
                  backgroundColor: "var(--components-background)",
                }}
              >
                Continuar misión
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisionActual;
