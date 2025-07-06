import React from "react";
import fondoMisionRealizada from "./Assets/ultima-mision.jpg";

const MisionRealizada = () => {
  const missionName = "Luna llena";
  const missionStatus = "Ultima mision realizada";
  //   const location = "46269 Tous, Valencia";
  const awards = [
    { name: "🎖️Nueva base estelar", description: "46269 Tous, Valencia" },
    { name: "🎖️Cazador de perseidas", description: "9 misiones completadas" },
  ];
  const handleClick = () => {
    console.log("Botón clickeado");
  };

  return (
    <div className="rounded-[16px] w-1/2 h-70 borde-con-degradado">
      <div
        className="relative w-full h-full rounded-[16px] overflow-hidden shadow-lg text-white font-poppins"
        style={{
          backgroundImage: `url(${fondoMisionRealizada})`,
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
            <div className="self-end text-right mt-1">
              <h2 className="text-xl font-semibold">{missionName}</h2>
              <div className="text-base">
                {awards.map((award, index) => (
                  <div key={index}>
                    <strong>{award.name}</strong>:{" "}
                    <span className="text-sm">{award.description}</span>
                  </div>
                ))}
              </div>
              {/* <p className="text-base">{location}</p> */}
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
    w-50
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
                Ver misiones realizadas
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisionRealizada;
