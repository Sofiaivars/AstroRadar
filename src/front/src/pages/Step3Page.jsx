import React from "react";

const Step3Page = () => {
  return (
    <div className="text-white mt-4">
      <h3 className="text-lg font-bold">📸 Enviar captura del evento</h3>

      <div className="mt-4 bg-gray-800 p-6 rounded-xl text-sm text-gray-300">
        <p>
          Drop files here or click to upload. Asegúrate de que la imagen sea
          clara y muestre el evento de manera efectiva.
        </p>
        <p className="mt-2">
          Tu aporte ayudará a la comunidad a compartir experiencias y
          observaciones.
        </p>
      </div>

      <div className="mt-6">
        <input
          type="file"
          className="bg-gray-900 text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-purple-600 file:text-white
                     hover:file:bg-purple-500"
        />
      </div>
    </div>
  );
};

export default Step3Page;
