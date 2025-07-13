import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { updateMissionData } from "../servicios/mission-service.js";
import cosmoTip1 from "../pages/assest/cosmo-tip1.png";
import { cosmoTipCall, getJSONCoords } from "../servicios/cosmo-service.js";
import { getUserLocation } from "../servicios/geolocation-service";
import Map from "../components/dashboard/Map.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

function Step1Page() {
  const [spots, setSpots] = useState(null); // puntos IA
  const [userPosition, setUserPosition] = useState(null); // coordenadas del dispositivo
  const [location, setLocation] = useState(null); // base seleccionada
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer(); // acceso al store global

  const [cosmoTip, setCosmoTip] = useState(null);
  const [cosmoError, setCosmoError] = useState(null);
  const promptStep1 = userPosition
    ? `Dame un tip de no mas de 12 palabras recomendando una buena ubicación cerca de latitud ${userPosition.latitude} y longitud ${userPosition.longitude} para observar el evento astronomico de la mision.`
    : null;

  useEffect(() => {
    if (!promptStep1) return;

    const fetchCosmoTip = async () => {
      setCosmoTip(null);
      setCosmoError(null);

      try {
        const response = await cosmoTipCall(promptStep1);
        setCosmoTip(response.output);
      } catch (error) {
        setCosmoError("No se pudo obtener el tip de IA");
        console.error(error);
      }
    };

    fetchCosmoTip();
  }, [promptStep1]);
  // Cargar puntos IA al iniciar
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        fetchAI(coords.latitude, coords.longitude);
      },
      (err) => {
        alert("Ubicación no permitida.");
        console.error(err);
      }
    );
  }, []);

  const fetchAI = async (lat, lon) => {
    try {
      const data = await getJSONCoords(lat, lon);
      setSpots(data.spots);
    } catch (error) {
      console.error("Error al obtener puntos IA:", error);
    }
  };

  // Obtener ubicación del dispositivo para el marcador morado
  useEffect(() => {
    getUserLocation(
      (coords) => setUserPosition(coords),
      (mensajeError) => setErrorMsg(mensajeError)
    );
  }, []);

  // Botón “Confirmar base estelar”
  const _confirmLocation = () => {
    if (!location) return;

    updateMissionData({ location });
    navigate("/dashboard/missions/step2");
  };

  // Al seleccionar base desde el mapa
  const handleSelectBase = (base) => {
    dispatch({ type: "SET_SELECTED_BASE", payload: base });

    setLocation({
      name: base.name,
      lat: base.coordinates.latitude,
      lng: base.coordinates.longitude,
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <>
      <div className="flex flex-col gap-4 text-white pr-4 relative">
        <h3 className="text-lg font-bold">
          🌍 Seleccioná la ubicación del evento
        </h3>

        {/* Mapa con puntos */}
        <div className="flex flex-col bg-gray-800 rounded-xl p-4 w-full h-[500px] relative gap-3">
          <Map
            locations={spots}
            userPosition={userPosition}
            onSelectBase={handleSelectBase}
          />

          {/* Mensaje de éxito tras seleccionar ubicación */}
          {showSuccess && (
            <div className="mt-3 text-sm text-emerald-400 font-medium">
              ✅ ¡Ubicación guardada correctamente!
            </div>
          )}

          <div className="flex flex-col gap-2">
            {location && (
              <div className="bg-gray-900 rounded-xl text-center p-4 text-sm text-gray-300">
                ✅ Ubicación seleccionada:{" "}
                <span className="text-white font-semibold">
                  {location.name}
                </span>
              </div>
            )}

            {/* Botón de confirmación */}
            {location && (
              <button
                onClick={_confirmLocation}
                className="rounded-[12px] text-white text-sm h-10 w-auto font-medium transition duration-300 flex items-center justify-center hover:shadow-2xl hover:shadow-purple-600/30"
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
                  className="rounded-[12px] p-3 w-full h-full flex items-center justify-center transition duration-300 ease-in-out group-hover:bg-gradient-to-br group-hover:from-gray-700 group-hover:to-gray-900"
                  style={{ backgroundColor: "var(--components-background)" }}
                >
                  Confirmar base estelar
                </div>
              </button>
            )}
          </div>
        </div>

        {/* COSMOTIP--falta implementar ia */}
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
    </>
  );
}

export default Step1Page;
