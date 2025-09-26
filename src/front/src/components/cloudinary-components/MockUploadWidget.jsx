import { useState, useEffect } from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";

const MockUploadWidget = ({ setShowCongrats }) => {
  const { store, dispatch } = useGlobalReducer();
  const [missionId, setMissionId] = useState(null);

  const mainURL = import.meta.env.VITE_SERVICES_URL;

  useEffect(() => {
    if (store.userActiveMission) setMissionId(store.userActiveMission.id);
  }, [store.userActiveMission]);

  const handleClick = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwt-token");

    if (!token) {
      console.warn("No se encontró token. La misión no se completará.");
      setShowCongrats(true);
      return;
    }

    // Mock: completamos la misión
    try {
      const eventId = missionId || store.selectedBase?.id; // puedes usar un fallback
      const res = await fetch(`${mainURL}/umissions/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ event_id: eventId }),
      });

      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ msg: "Error desconocido" }));
        console.error("Error completando misión:", res.status, text);
        setShowCongrats(true);
        return;
      }

      const newMission = await res.json();

      // ✅ Guardar misión completada en store
      dispatch({ type: "ADD_COMPLETED_MISSION", payload: newMission });

      setShowCongrats(true);
    } catch (err) {
      console.error(err);
      setShowCongrats(true);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-2xl p-3 hover:bg-purple-300 transition-colors delay-150 borde-con-degradado"
    >
      Subir imagen del evento
    </button>
  );
};

export default MockUploadWidget;
