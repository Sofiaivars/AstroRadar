import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import cosmoTip1 from "../pages/assest/cosmo-tip1.png";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Step2Page = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const [missionStarted, setMissionStarted] = useState(false);

  useEffect(() => {
    // Intentamos obtener la ubicación del usuario al montar el componente
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch({
            type: "ADD_USER_LOCATION",
            payload: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          });
        },
        (error) => {
          console.error("Error obteniendo la ubicación del usuario:", error);
        }
      );
    } else {
      console.error("La geolocalización no está soportada por este navegador.");
    }
  }, [dispatch]);

  const _startMission = () => {
    if (!store.selectedBase) {
      alert("No hay base seleccionada.");
      return;
    }

    const { latitude, longitude } = store.selectedBase.coordinates;

    // URL para navegar con indicaciones desde la ubicación del usuario
    const { userLocation } = store;
    const googleMapsUrl = userLocation
      ? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${latitude},${longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    window.open(googleMapsUrl, "_blank");
    setMissionStarted(true);
  };

  const _arrivedAtBase = () => {
    navigate("/dashboard/missions/step3");
  };

  return (
    <div className="text-white mt-4">
      <h3 className="text-lg font-bold">🚀 Iniciar recorrido</h3>

      <div className="mt-4 bg-gray-800 p-4 rounded-xl">
        <p className="mb-2">
          🔭 <strong>Tips para observar el evento:</strong>
        </p>
        <ul className="list-disc list-inside text-sm text-gray-300">
          <li>Verifica el clima antes de iniciar recorrido.</li>
          <li>Evita luces directas que afecten tu visión nocturna.</li>
        </ul>
      </div>

      <div className="mt-6 text-center space-y-3">
        {!missionStarted ? (
          <button
            onClick={_startMission}
            className="btn-sug group rounded-[12px] p-[1.5px] text-white text-sm h-10 w-auto font-medium transition duration-300 flex items-center justify-center hover:shadow-2xl hover:shadow-purple-600/30"
            style={{
              backgroundImage:
                "linear-gradient(var(--components-background), var(--components-background)), " +
                "linear-gradient(to right, #a855f7, #d946ef, #22d3ee)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              border: "2px solid transparent",
            }}
          >
            <div
              className="rounded-[12px] w-full h-full flex items-center justify-center transition duration-300 ease-in-out group-hover:bg-gradient-to-br group-hover:from-gray-700 group-hover:to-gray-900 px-6 py-3"
              style={{ backgroundColor: "var(--components-background)" }}
            >
              Iniciar recorrido
            </div>
          </button>
        ) : (
          <button
            onClick={_arrivedAtBase}
            className="btn-sug group rounded-[12px] p-[1.5px] text-white text-sm h-10 w-auto font-medium transition duration-300 flex items-center justify-center hover:shadow-2xl hover:shadow-purple-600/30"
            style={{
              backgroundImage:
                "linear-gradient(var(--components-background), var(--components-background)), " +
                "linear-gradient(to right, #22d3ee, #d946ef, #a855f7)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              border: "2px solid transparent",
            }}
          >
            <div
              className="rounded-[12px] w-full h-full flex items-center justify-center transition duration-300 ease-in-out group-hover:bg-gradient-to-br group-hover:from-gray-700 group-hover:to-gray-900 px-6 py-3"
              style={{ backgroundColor: "var(--components-background)" }}
            >
              He llegado a mi base
            </div>
          </button>
        )}
      </div>

      <div className="bg-gray-900 rounded-xl p-4 mt-2 w-[30%] ml-auto relative mr-10 -top-30 z-40">
        <h4 className="text-purple-300 font-bold mb-2">✨ Cosmotip</h4>
        <p>Recuerda mirar el clima antes de iniciar tu recorrido</p>
      </div>
      <img
        src={cosmoTip1}
        alt="Cosmotip"
        className="w-[20%] ml-auto -mt-40 z-50 relative -mr-4"
      />
    </div>
  );
};

export default Step2Page;
