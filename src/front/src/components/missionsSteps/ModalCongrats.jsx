import React from "react";
import { useNavigate } from "react-router";
import "./ModalCongrats.css";
import cosmoDab from "../../pages/assest/cosmo-dab.png";

const ModalCongrats = () => {
  const navigate = useNavigate();

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
          <div className="congrats-btn-inner">Misiones completadas</div>
        </button>
      </div>
    </div>
  );
};

export default ModalCongrats;
