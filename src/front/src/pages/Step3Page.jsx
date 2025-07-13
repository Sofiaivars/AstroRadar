import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import ModalCongrats from "../components/missionsSteps/ModalCongrats";

const Step3Page = () => {
  const [showCongrats, setShowCongrats] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const _handleUpload = (file) => {
    console.log("Archivo subido:", file.name);
    setTimeout(() => {
      setShowCongrats(true);
    }, 1000);
  };
  const _handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) _handleUpload(file);
  };

  const _handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const _handleDragLeave = () => {
    setIsDragging(false);
  };

  const _handleClick = () => {
    fileInputRef.current.click();
  };

  const _handleChange = (e) => {
    const file = e.target.files[0];
    if (file) _handleUpload(file);
  };

  return (
    <div className="text-white mt-4">
      <h3 className="text-lg font-bold">📸 Enviar captura del evento</h3>

      <div className="mt-4 bg-gray-800 p-6 rounded-xl text-sm text-gray-300">
        <p>
          Asegúrate de que la imagen sea clara y muestre el evento de manera
          efectiva.
        </p>
      </div>
      <div
        onClick={_handleClick}
        onDrop={_handleDrop}
        onDragOver={_handleDragOver}
        onDragLeave={_handleDragLeave}
        className={`mt-6 border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-300 cursor-pointer flex items-center justify-center min-h-[400px]
          ${
            isDragging
              ? "border-purple-400 bg-purple-800/10"
              : "border-gray-500 bg-gray-900/20"
          }
        `}
      >
        <p className="text-gray-300 text-sm">
          {isDragging
            ? "¡Suelta el archivo aquí!"
            : "Haz clic o arrastra una imagen para subir"}
        </p>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={_handleChange}
        className="hidden"
      />
      {showCongrats && <ModalCongrats />}
    </div>
  );
};

export default Step3Page;
