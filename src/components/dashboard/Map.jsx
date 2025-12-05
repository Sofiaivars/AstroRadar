import React from 'react';
import MapboxMap from '@components/mapbox/MapboxMap';

const Map = ({ locations, userPosition, onSelectBase }) => {

  // Función que se llama cuando el usuario selecciona una base
  const handleSelectBase = (base) => {

    // Notifica al componente padre si se le pasó onSelectBase como prop
    if (onSelectBase) {
      onSelectBase(base);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden h-[500px]">
      <MapboxMap
        locations={locations}
        userPosition={userPosition}
        onSelectBase={handleSelectBase} // pasamos la función que hace el dispatch
        selectedBase={""}
      />

      {/* Botón de explorar */}

      {/* Mensaje inferior con la base seleccionada */}
      <div className="absolute bottom-8 left-6 p-[2px] rounded-md border-2 border-gray-500 max-w-[280px] ">
        <div className="bg-white/1 backdrop-blur-xs rounded-md p-4 min-h-[100px] text-[var(--astroradar-white)] text-center">
          <h3 className="text-base font-semibold mb-1">Bases Estelares</h3>
          <p className="text-sm mt-5">
            {/* INDICAR SI LA BASE ESTÁ O NO SELECCIONADA */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Map;
