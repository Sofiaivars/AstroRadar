import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import "./CardMission.css";

const Card = ({ title, image, base, rewards }) => {
  const cardRef = useRef(null);

  // Valores sin el suavizado
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  // Valores suavizados
  const x = useSpring(rawX, { stiffness: 100, damping: 20 });
  const y = useSpring(rawY, { stiffness: 100, damping: 20 });

  // Aca se hace la ROTACION!
  const rotateX = useTransform(y, [0, 1], [45, -45]);
  const rotateY = useTransform(x, [0, 1], [-45, 45]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rawX.set(px);
    rawY.set(py);
  };

  const handleMouseLeave = () => {
    rawX.set(0.5);
    rawY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="relative w-[90vw] max-w-xl h-[620px] group cursor-pointer select-none transition-transform duration-300"
    >
      {/* ACA LA CARD */}
      <div className="relative h-full bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 border rounded-2xl borde-con-degradado shadow-xl overflow-hidden brightness-95 group-hover:brightness-110">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* TITULO DE LA MISION!!! */}
        <h3 className="relative mt-6 text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-purple-300 to-cyan-500 text-glow-gradient">
          {title}
        </h3>

        {/* TEXTOS ABAJO */}
        <div className="absolute bottom-0 w-full px-6 py-6 flex flex-col justify-center items-center gap-2 text-sm z-20">
          <div className="absolute inset-0 from-purple-900/20 via-white/10 to-cyan-800/20 backdrop-blur-sm rounded-xl z-10" />

          <div className="relative z-20 text-center space-y-2">
            <span className="text-white font-semibold">{base}</span>

            <div>
              <span className="block text-green-400 font-semibold">
                Logros obtenidos
              </span>
              <ul className="text-green-300 text-sm">
                {rewards.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* GLOW DE FONDO Y PARTICULAS */}
        <div className="glowing-elements">
          <div className="glow-1" />
          <div className="glow-2" />
          <div className="glow-3" />
        </div>

        <div className="card-particles">
          {[...Array(24)].map((_, i) => (
            <span
              key={i}
              className={i % 2 === 0 ? "cyan-particle" : "purple-particle"}
              style={{ "--i": i }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
