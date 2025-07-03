import React, { useState } from "react";
import { Steps } from "primereact/steps";
import "./StepsComponent.css";
import { motion } from "framer-motion";

function StepsComponent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    { label: "Preparación" },
    { label: "Seleccionar ubicación" },
    { label: "Recorrido" },
    { label: "Capturar evento" },
  ];
  const mensajes = [
    "🔭 Requisitos de la mision...",
    "🗺️ Buscando ubicación ideal...",
    "🚶‍♀️ En camino a Base Estelar...",
    "🌟 Evento capturado con éxito!",
  ];
  const handleNextStep = () => {
    if (activeIndex < items.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };
  const itemTemplate = (item, options) => {
    const isLast = options.index === items.length - 1;
    const isActiveLast = isLast && options.active;

    return (
      <div className="flex items-center space-x-3">
        {isActiveLast ? (
          <motion.span
            className="rounded-full w-9 h-9 flex justify-center items-center font-bold bg-green-500 text-white z-10"
            animate={{
              scale: [1, 1.5, 1],
              boxShadow: [
                "0 0 0px #22c55e",
                "0 0 18px 8px #22c55e",
                "0 0 0px #22c55e",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              ease: "easeInOut",
            }}
          >
            {options.index + 1}
          </motion.span>
        ) : (
          <span
            className={`rounded-full w-9 h-9 flex justify-center items-center font-bold z-10 ${
              options.active
                ? "bg-purple-700 text-white shadow-[0_0_10px_5px_#a855f7]"
                : "bg-gray-300 text-black"
            }`}
          >
            {options.index + 1}
          </span>
        )}
        <span className="text-white font-medium">{item.label}</span>
      </div>
    );
  };
  return (
    <div className="relative w-full max-w-4xl mx-auto p-6 rounded-2xl bg-black/50 shadow-xl backdrop-blur-sm flex flex-col gap-6">
      <div className="w-full overflow-visible px-6">
        <Steps
          model={items}
          activeIndex={activeIndex}
          readOnly
          className={`custom-steps-galaxy ${
            activeIndex === items.length - 1 ? "final-step" : ""
          }`}
          itemTemplate={itemTemplate}
        />
      </div>
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-purple-300 text-lg font-semibold"
      >
        {mensajes[activeIndex]}
      </motion.div>
      <div className="text-center">
        <button
          onClick={handleNextStep}
          className="mt-4 px-6 py-2 bg-purple-700 text-white rounded-full transition"
          style={{
            boxShadow: "none",
            transition: "box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 20px 10px #371A45"; //aca le pongo el hover tipo glow
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Siguiente paso
        </button>
      </div>
    </div>
  );
}
export default StepsComponent;
