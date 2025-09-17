import React from "react";
import MapboxDashboard from "./mapbox/MapboxDashboard";
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx"; // ajusta la ruta si es necesario

const MapDashboard = ({ locations, userPosition, onSelectBase }) => {
  const { store, dispatch } = useGlobalReducer();

  // Función que se llama cuando el usuario selecciona una base
  const handleSelectBase = (base) => {
    dispatch({ type: "SET_SELECTED_BASE", payload: base });

    // Notifica al componente padre si se le pasó onSelectBase como prop
    if (onSelectBase) {
      onSelectBase(base);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden">
      <MapboxDashboard
        locations={locations}
        userPosition={userPosition}
        onSelectBase={handleSelectBase}
      />

      {/* Mensaje inferior con la base seleccionada */}
      <div className="absolute bottom-8 left-6 p-[2px] rounded-md border-2 border-gray-500 max-w-[280px]">
        <div className="bg-white/1 backdrop-blur-xs rounded-md p-4 min-h-[100px] text-[var(--astroradar-white)] text-center">
          <h3 className="text-base font-semibold mb-1">Bases Estelares</h3>
          <p className="text-sm mt-3">
            {store.selectedBase
              ? `Base añadida: ${store.selectedBase.name}`
              : "Añade tus bases estelares, podrás elegirlas al comenzar una misión"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapDashboard;
