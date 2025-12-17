import React, { useEffect, useState } from "react";
import fondoMisionRealizada from "@components/dashboard/MisionRealizada/assets/ultima-mision.jpg";
import { useNavigate } from "react-router";
import { getUserMissions } from "@services/events-missions-service";
import AstroButton from "@components/shared/AstroButton";

const MisionRealizada = () => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const [ultimaMision, setUltimaMision] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchMissions = async () => {
        const misiones = await getUserMissions(userId);
        const completadas = [...misiones]
          .filter((m) => m.state === "done")
          .sort((a, b) => new Date(b.done_date) - new Date(a.done_date)); // Ordenar por fecha descendente

        if (completadas.length > 0) {
          setUltimaMision(completadas[0]);
        }
      };
      fetchMissions();
    } else {
      console.log("No existe id de usuario en la misión completada");
    }
  }, [userId]);

  const handleClick = () => {
    navigate("/dashboard/completed-missions");
  };

  return (
    <div className="rounded-[16px] w-full sm:w-1/2 h-70 borde-con-degradado">
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
                  <div>
                    <strong>🎖️ Base estelar</strong>:{" "}
                    <span className="text-sm">
                      {ultimaMision.base?.base_name || "No asignada"}
                    </span>
                  </div>
                ) : (
                  <p className="text-sm text-gray-300">No tienes misiones completadas aún.</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <AstroButton text="Ver misiones realizadas" handleClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisionRealizada;