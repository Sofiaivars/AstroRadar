import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ModalCongrats from "../components/missionsSteps/ModalCongrats";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const Step3Page = () => {
  const [showCongrats, setShowCongrats] = useState(false);
  const navigate = useNavigate();

  const { store, dispatch } = useGlobalReducer();
  const mainURL = import.meta.env.VITE_SERVICES_URL;

  const handleCompleteMission = async () => {
    const token = localStorage.getItem("jwt-token");
    console.log("Token usado:", token);
    if (!token) {
      console.warn("No se encontró token de autenticación");
      setShowCongrats(true);
      return;
    }

    const eventId = store.userActiveMission?.id;
    if (!eventId) {
      console.warn("No hay misión activa en el store");
      setShowCongrats(true);
      return;
    }

    try {
      // Llamamos al backend para crear la misión
      const res = await fetch(`${mainURL}/umissions/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ event_id: eventId }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Error creando misión:", res.status, text);
        setShowCongrats(true);
        return;
      }

      const newMissionFromBackend = await res.json();

      // Creamos newMission listo para el store
      const newMission = {
        ...newMissionFromBackend,
        image:
          newMissionFromBackend.event?.image ||
          "https://via.placeholder.com/400x200",
      };

      // Guardamos la misión en el store
      dispatch({ type: "ADD_USER_ACTIVE_MISSION", payload: newMission });

      // Abrimos el modal
      setShowCongrats(true);
    } catch (err) {
      console.error("Error al llamar al backend:", err);
      setShowCongrats(true);
    }
  };

  return (
    <div className="text-white mt-4">
      <h3 className="text-lg font-bold">📸 Enviar captura del evento</h3>

      <div className="flex flex-row gap-3 items-center mt-4 bg-gray-800 p-6 rounded-xl text-sm text-gray-300">
        <p>
          Asegúrate de que la imagen sea clara y muestre el evento de manera
          efectiva.
        </p>

        <button
          onClick={handleCompleteMission}
          className="rounded-2xl p-3 hover:bg-purple-300 transition-colors delay-150 borde-con-degradado"
        >
          Subir imagen del evento
        </button>
      </div>

      {showCongrats && <ModalCongrats />}
    </div>
  );
};

export default Step3Page;
