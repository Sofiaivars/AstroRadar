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
    "🔭 Requisitos de la misión...",
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
    return (
      <div className="flex items-center space-x-3">
        <motion.span
          className={`rounded-full w-9 h-9 flex justify-center items-center font-bold z-10 ${
            options.active
              ? "bg-purple-700 text-white scale-125"
              : "bg-gray-300"
          }`}
          whileHover={options.active ? { scale: 1.2 } : {}}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {options.index + 1}
        </motion.span>

        <span
          className={`font-medium transition duration-200 ${
            options.active
              ? "text-white hover:text-purple-300"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          {item.label}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      {/* Título a la izquierda */}
      <div className="w-full flex justify-between items-center">
        <h2 className="text-xl font-bold text-purple-300">
          Misión en curso:{" "}
          <span className="text-white">"Lluvia de Perseidas"</span>
        </h2>
      </div>

      {/* Steps + Mensaje + Botón centrados */}
      <div className="w-full flex flex-col items-center gap-4">
        {/* Steps */}
        <Steps
          model={items}
          activeIndex={activeIndex}
          readOnly
          className="custom-steps-galaxy"
          itemTemplate={itemTemplate}
        />

        {/* Mensaje */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-purple-300 text-lg font-semibold"
        >
          {mensajes[activeIndex]}
        </motion.div>

        {/* Botón */}
        <button
          onClick={handleNextStep}
          className="px-6 py-2 bg-purple-700 text-white rounded-full transition"
          style={{
            boxShadow: "none",
            transition: "box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 20px 10px #371A45";
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
