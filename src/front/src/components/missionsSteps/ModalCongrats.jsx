import React from "react";
import { useNavigate } from "react-router";
import "./ModalCongrats.css";

const ModalCongrats = () => {
  const navigate = useNavigate();

  return (
    <div className="modal-congrats-wrapper">
      <div className="modal-congrats animate-glow">
        <img
          src="/assest/cosmo-volador-gif.gif"
          alt="Cosmo feliz"
          className="cosmo-img"
        />
        <h2 className="title">¡Misión completada!</h2>
        <p className="description">¡Buen trabajo, cazador espacial! 🚀</p>
        <button
          onClick={() => navigate("/dashboard/completed-missions")}
          className="congrats-btn"
        >
          <div className="congrats-btn-inner">Misiones completadas</div>
        </button>
      </div>
    </div>
  );
};

export default ModalCongrats;
