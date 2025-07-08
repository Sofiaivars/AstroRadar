import React from "react";
import { motion } from "framer-motion";
import "./StepsComponent.css";

const items = [
  { label: "Seleccionar ubicación" },
  { label: "Recorrido" },
  { label: "Capturar evento" },
];
const mensajes = [
  "🗺️ Buscando ubicación ideal...",
  "🚶‍♀️ En camino a Base Estelar...",
  "🌟 Evento capturado con éxito!",
];
function StepsComponent({ activeIndex = 0 }) {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="relative flex justify-between w-full max-w-xl items-center px-4">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const isCompleted = index < activeIndex;
          const isFinalStep = index === items.length - 1;

          return (
            <div
              key={index}
              className="relative flex-1 flex flex-col items-center z-10"
            >
              {/* aca el problemiki de la animacion de la linea q empieza */}
              <div
                className="relative w-full flex items-center"
                style={{ height: 44 }}
              >
                <div
                  className={`z-10 w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm border-[2.5px] transition-all duration-300
                    ${
                      isActive
                        ? "bg-purple-700 text-white border-purple-400 scale-110 shadow-xl"
                        : ""
                    }
                    ${
                      isCompleted && !isFinalStep
                        ? "bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white border-fuchsia-300"
                        : ""
                    }
                    ${
                      isCompleted && isFinalStep
                        ? "bg-gradient-to-br from-green-600 to-emerald-400 text-white border-green-300"
                        : ""
                    }
                    ${
                      !isActive && !isCompleted
                        ? "bg-gray-600 text-gray-300 border-gray-400"
                        : ""
                    }`}
                >
                  {isCompleted ? "✓" : index + 1}
                </div>
                {/* aca manejo el progeso*/}
                {!isFinalStep && isCompleted && (
                  <motion.div
                    className="absolute top-1/2 h-[4px] bg-gradient-to-r from-cyan-600 to-violet-600 rounded-md z-10"
                    style={{
                      left: "44px",
                      width: "calc(100% - 44px)",
                      transform: "translateY(-50%)",
                      transformOrigin: "left",
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                  />
                )}

                {isActive && (
                  <motion.div
                    className="absolute w-24 h-24 rounded-full bg-purple-500 blur-[45px] z-0"
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </div>
              <span
                className={`text-sm font-medium mt-4 transition-transform duration-300 ease-in-out text-center
    ${isActive || isCompleted ? "text-white" : "text-gray-200"}`}
                style={{
                  transform: `${
                    isActive ? "scale(1.15)" : "scale(1)"
                  } translateX(-65px)`,
                  minWidth: "100px",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* MENSAJE ACTUAL */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mr-[90px] text-purple-300 text-lg font-semibold"
      >
        {mensajes[activeIndex]}
      </motion.div>
    </div>
  );
}

export default StepsComponent;
