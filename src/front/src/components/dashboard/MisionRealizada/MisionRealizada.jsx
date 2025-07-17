import React, { useEffect, useState } from "react";
import fondoMisionRealizada from "./Assets/ultima-mision.jpg";
import { useNavigate } from "react-router";
import { getUserMissions } from "../../../servicios/events-missions-service"; 
import useGlobalReducer from "../../../hooks/useGlobalReducer";

const MisionRealizada = () => {
  const [userId, setUserId] = useState(null)
  const navigate = useNavigate();
  const { store } = useGlobalReducer(); 
  

  const [ultimaMision, setUltimaMision] = useState(null);

  useEffect(() => {
    if(userId){
      const fetchMissions = async () => {
        const misiones = await getUserMissions(userId);
        const completadas = misiones.filter((m) => m.state === "done");

        if (completadas.length > 0) {
          // Ordenamos por ID descendente para tomar la más reciente
          const ultima = completadas.sort((a, b) => b.id - a.id)[0];
          setUltimaMision(ultima);
        }
      };
      fetchMissions();
    } else {
      console.log("No existe id de usuario en la misión completada")
    }

  }, [userId]);


  useEffect(() =>{
    if(store.userData){
      setUserId(store.userData.id)
    }
  }, [])

  const handleClick = () => {
    navigate("/dashboard/completed-missions");
  };

  return (
    <div className="rounded-[16px] w-1/2 h-70 borde-con-degradado">
      <div
        className="relative w-full h-full rounded-[16px] overflow-hidden shadow-lg text-white font-poppins"
        style={{
          backgroundImage: `url(${ultimaMision ? ultimaMision.image : fondoMisionRealizada})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
      >
        <div className="relative z-10 flex flex-col justify-between h-full p-6">
          <div className="flex flex-col gap-4">
            <div className="self-start">
              <span className="text-xl font-bold">Última misión realizada</span>
            </div>
            <div className="mt-1 flex flex-col gap-1">
              <h2 className="text-lg font-semibold">
                {ultimaMision?.event?.name || "Sin misión aún"}
              </h2>
              <div className="text-base ">
                {ultimaMision ? (
                  <>
                    <div>
                      <strong>🎖️ Base estelar</strong>:{" "}
                      <span className="text-sm">
                        {ultimaMision.base?.base_name || "No asignada"}
                      </span>
                    </div>
                    
                  </>
                ) : (
                  <p className="text-sm text-gray-300">No tienes misiones completadas aún.</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleClick}
              className="group rounded-[12px] p-[1.5px] text-white text-sm h-10 w-50 font-medium transition duration-300 flex items-center justify-center hover:shadow-2xl hover:shadow-purple-600/30"
              style={{
                backgroundImage:
                  "linear-gradient(var(--components-background), var(--components-background)), " +
                  "linear-gradient(to right, #a855f7, #d946ef, #22d3ee)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                border: "2px solid transparent",
              }}
            >
              <div
                className="rounded-[12px] w-full h-full flex items-center justify-center transition duration-300 ease-in-out group-hover:bg-gradient-to-br group-hover:from-gray-700 group-hover:to-gray-900"
                style={{ backgroundColor: "var(--components-background)" }}
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
