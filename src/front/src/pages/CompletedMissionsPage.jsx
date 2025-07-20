import React, { useEffect, useState } from "react";
import Card from "../components/completedMissions/CardMission.jsx";
import { getUserMissions } from "../servicios/events-missions-service.js";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const CompletedMissionsPage = () => {
  const { store } = useGlobalReducer();
  const [missions, setMissions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMissions = async () => {
      if (store.userData?.id) {
        const allMissions = await getUserMissions(store.userData.id);

        const completed = allMissions
          .filter((m) => m.state === "done")
          .sort((a, b) => new Date(b.done_date) - new Date(a.done_date)); // 👈 ORDENAR POR FECHA CON HORA

        setMissions(completed);
        setCurrentIndex(0);
      }
    };

    fetchMissions();
  }, [store.userData]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? missions.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === missions.length - 1 ? 0 : prev + 1
    );
  };

  const currentMission = missions[currentIndex];

  return (
    <div className="flex flex-col items-center w-full h-full py-8 px-4 space-y-6 borde-con-degradado rounded-2xl">
      <h2 className="text-xl font-bold text-purple-300">
        Misiones completadas
      </h2>

      {missions.length === 0 ? (
        <p className="text-white text-sm">No tienes misiones completadas aún.</p>
      ) : (
        <div className="relative w-full max-w-4xl flex justify-center items-center">
          <button
            onClick={handlePrev}
            className="absolute left-0 z-10 bg-purple-700 hover:bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
          >
            ‹
          </button>

          <Card
            title={currentMission?.event?.name || "Sin título"}
            image={currentMission?.image || "https://via.placeholder.com/400x200"}
            base={currentMission?.base?.base_name || "Base desconocida"}
            rewards={[
              "+50 XP",
              currentMission?.event?.category
                ? `🎖️ ${currentMission.event.category}`
                : "🎖️ Misión especial",
            ]}
            isCenter={true}
          />

          <button
            onClick={handleNext}
            className="absolute right-0 z-10 bg-purple-700 hover:bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default CompletedMissionsPage;