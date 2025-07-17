import React, { act, useEffect, useState } from "react";
import fondoPerseidas from "./Assets/perseidas.jpg";
import useGlobalReducer from "../../../hooks/useGlobalReducer";
import { TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router";

const MisionActual = () => {
  const [activeMission, setActiveMission] = useState()
  const missionName = activeMission ? activeMission.event.name : "Activa una misión";
  const missionStatus = activeMission ? activeMission.state : <TriangleAlert/>;
  const location = activeMission ? activeMission.base.base_name : "";

  const { store } = useGlobalReducer()
  const navigate = useNavigate()

  const handleClick = () => {
    if(activeMission){
      if(activeMission.base.id){
        navigate('/dashboard/missions/step2')
      }else{
        navigate('/dashboard/missions/')
      }
    }else{
      navigate('/dashboard')
    }
  };

  useEffect(() => {
    if(store.userActiveMission){
      setActiveMission(store.userActiveMission)
    }
  }, [])

  useEffect(() => {
    console.log(activeMission)
  }, [activeMission])

  return (
    <div className="rounded-[16px] w-1/2 h-70 borde-con-degradado">
      <div
        className="relative w-full h-full rounded-[16px] overflow-hidden shadow-lg text-white font-poppins"
        style={{
          backgroundImage: `url(${activeMission && activeMission.image ? activeMission.image : "https://media.istockphoto.com/id/157639696/photo/purple-space-stars.jpg?s=612x612&w=0&k=20&c=fkLtGZxUS9UPlLJUTeGjvvURT0u-vtxvj5sAYbDNrH4="})`,
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
