import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import cosmoTip1 from "../pages/assest/cosmo-tip1.png";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { cosmoTipCall, getJSONCoords } from "../servicios/cosmo-service.js";
import { getUserLocation } from "../servicios/geolocation-service.js";

const Step2Page = () => {
  const navigate = useNavigate();
  const { store } = useGlobalReducer(); // accedemos al store global
  const [missionStarted, setMissionStarted] = useState(false);
  const [cosmoTip, setCosmoTip] = useState(null);
  const [cosmoError, setCosmoError] = useState(null);
  const promptStep2 = getUserLocation
    ? `Dame un tip de no mas de 12 palabras con una recomendacion antes de inciar mi recorrido a la base estelerar seleccionada ${location}.`
    : null;

  useEffect(() => {
    if (!promptStep2) return;

    const fetchCosmoTip = async () => {
      setCosmoTip(null);
      setCosmoError(null);

      try {
        const response = await cosmoTipCall(promptStep2);
        setCosmoTip(response.output);
      } catch (error) {
        setCosmoError("No se pudo obtener el tip de IA");
        console.error(error);
      }
    };

    fetchCosmoTip();
  }, [promptStep2]);
  const _startMission = () => {
    if (!store.selectedBase) {
      alert("No hay base seleccionada.");
      return;
    }

    const { latitude, longitude } = store.selectedBase.coordinates;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    window.open(googleMapsUrl, "_blank"); // abre en nueva pestaña

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

      <div className="fixed bottom-60 right-20 z-50 bg-gray-900 rounded-xl p-4 shadow-lg max-w-[400px]">
        <h4 className="text-purple-300 font-bold mb-4">✨ Cosmotip</h4>
        {cosmoError && <p className="text-red-700 text-sm">{cosmoError}</p>}
        {!cosmoTip && !cosmoError && <p>Cargando tip de IA...</p>}
        {cosmoTip && <p>{cosmoTip}</p>}
      </div>
      <img
        src={cosmoTip1}
        alt="Cosmotip"
        className="fixed bottom-10 right-10 w-[12%] rounded-md z-50"
      />
    </div>
  );
};

export default Step2Page;
