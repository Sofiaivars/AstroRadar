import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GifComponent = () => {
  const [hovered, setHovered] = useState(false);

  const tooltipVariants = {
    hidden: { opacity: 0, scale: 0.5, x: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 30,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };
  return (
    <div
      className="fixed top-1/2 left-1/2 flex items-center z-50"
      style={{ transform: "translate(-50%, -50%)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.img
        src="/gif-hans.gif"
        alt="Gif de Hans"
        className="w-96 h-auto pointer-events-auto rounded-xl"
        style={{ filter: "drop-shadow(0 0 15px rgba(139, 92, 246, 0.9))" }}
        initial={{ scale: 1 }}
        animate={{ scale: hovered ? 1.5 : 0.8 }} //aca el controlador par agrandarlo
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        drag={false}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0}
      />
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="tooltip"
            className="ml-6 max-w-xs p-4 rounded-lg bg-purple-950/40 backdrop-blur-sm border border-purple-950/80 shadow-lg text-white font-light text-md select-none"
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <span className="text-amber-50 font-light">
              Confirma el porcentaje de nubosidad antes de iniciar tu recorrido
              hacia la base lunar.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default GifComponent;
