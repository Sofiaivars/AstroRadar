import React, { useState } from "react";
import Card from "../components/completedMissions/CardMission.jsx";

const CompletedMissionsPage = () => {
  const completedMissions = [
    {
      id: 1,
      title: "Lluvia de Perseidas",
      image: "https://images.unsplash.com/photo-1534590140231-3aff793be63a",
      base: "Base Estelar Alberic",
      rewards: ["+50 XP", "🌠 Cazador de meteoros"],
    },
    {
      id: 2,
      title: "Luna llena",
      image:
        "https://images.unsplash.com/photo-1599972451680-0fcddaaaf308?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      base: "Base Estelar San Cristóbal",
      rewards: ["+70 XP", "🌕 Guardian de la Luna"],
    },
    {
      id: 3,
      title: "Cometa Halley",
      image: "https://images.unsplash.com/photo-1534425240762-0890ffd1d24a",
      base: "Base Estelar Tous",
      rewards: ["+80 XP", "☄️ Capitan de los cielos"],
    },
    {
      id: 4,
      title: "ISS sobrevolando la Tierra",
      image:
        "https://images.unsplash.com/photo-1731231670088-b7efcd7aba85?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      base: "Base Estelar Mi casa",
      rewards: ["+80 XP", "🛰️ Vigilante Orbital"],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? completedMissions.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === completedMissions.length - 1 ? 0 : prev + 1
    );
  };

  const currentMission = completedMissions[currentIndex];

  return (
    <div className="flex flex-col items-center w-full h-full py-8 px-4 space-y-6 borde-con-degradado rounded-2xl">
      <h2 className="text-xl font-bold text-purple-300">
        Misiones completadas
      </h2>

      <div className="relative w-full max-w-4xl flex justify-center items-center">
        <button
          onClick={handlePrev}
          className="absolute left-0 z-10 bg-purple-700 hover:bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
        >
          ‹
        </button>

        <Card
          title={currentMission.title}
          image={currentMission.image}
          base={currentMission.base}
          rewards={currentMission.rewards}
          isCenter={true}
        />

        <button
          onClick={handleNext}
          className="absolute right-0 z-10 bg-purple-700 hover:bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default CompletedMissionsPage;
