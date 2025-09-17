import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import "./ModalCongrats.css";
import cosmoDab from "../../pages/assest/cosmo-dab.png";
import confetti from "canvas-confetti";

const ModalCongrats = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const colors = ["#a855f7", "#06b6d4", "#34d399", "#9333ea"];
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      confetti({
        particleCount: 60,
        angle: Math.random() * 360,
        spread: 160,
        startVelocity: 15,
        gravity: 0.8,
        ticks: 300,
        origin: { x: Math.random(), y: Math.random() * 0.4 },
        colors,
        scalar: 1.1,
      });

      if (Date.now() > end) clearInterval(interval);
    }, 250);
  }, []);

  return (
    <div className="modal-congrats-wrapper">
      <div className="modal-congrats animate-glow">
        <img src={cosmoDab} alt="Cosmo DAB" className="cosmo-img" />
        <h2 className="title">¡Misión completada!</h2>
        <p className="description">¡Buen trabajo, cazador espacial! 🚀</p>
        <button
          onClick={() => navigate("/dashboard/completed-missions")}
          className="congrats-btn"
        >
          <div className="congrats-btn-inner">Ver misiones realizadas</div>
        </button>
      </div>
    </div>
  );
};

export default ModalCongrats;
