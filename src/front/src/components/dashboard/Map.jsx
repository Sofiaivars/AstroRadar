import React from 'react';
import MapboxMap from './mapbox/MapboxMap';
import useGlobalReducer from '../../hooks/useGlobalReducer.jsx'; // ajusta la ruta si es necesario

const Map = ({ locations, userPosition, onSelectBase }) => {
  const { store, dispatch } = useGlobalReducer();

  // Función que se llama cuando el usuario selecciona una base
  const handleSelectBase = (base) => {
    dispatch({ type: 'SET_SELECTED_BASE', payload: base });

    // Notifica al componente padre si se le pasó onSelectBase como prop
    if (onSelectBase) {
      onSelectBase(base);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden">
      <MapboxMap
        locations={locations}
        userPosition={userPosition}
        onSelectBase={handleSelectBase} // pasamos la función que hace el dispatch
        selectedBase={store.selectedBase}
      />

      {/* Botón de explorar */}

      {/* Mensaje inferior con la base seleccionada */}
      <div className="absolute bottom-8 left-6 p-[2px] rounded-md border-2 border-gray-500 max-w-[280px]">
        <div className="bg-white/1 backdrop-blur-xs rounded-md p-4 min-h-[100px] text-[var(--astroradar-white)] text-center">
          <h3 className="text-base font-semibold mb-1">Bases Estelares</h3>
          <p className="text-sm mt-5">
            {store.selectedBase
              ? `Base seleccionada: ${store.selectedBase.name}`
              : 'Tus Bases Estelares'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Map;
