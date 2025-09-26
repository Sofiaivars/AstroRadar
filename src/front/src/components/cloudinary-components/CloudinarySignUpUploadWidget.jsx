import { useEffect, useRef, useState, useCallback } from "react";

const CloudinarySignUpUploadWidget = ({
  uwConfig,
  setPublicId,
  setUserImage,
}) => {
  const uploadWidgetRef = useRef(null);
  const buttonRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const handleUpload = useCallback(() => {
    if (uploadWidgetRef.current) {
      uploadWidgetRef.current.open();
    }
  }, []);

  useEffect(() => {
    if (!window.cloudinary || !buttonRef.current) return;

    // Crear widget solo una vez y asegurando que el botón existe
    if (!uploadWidgetRef.current) {
      uploadWidgetRef.current = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            setPublicId(result.info.public_id);
            setUserImage(result.info.secure_url);
          }
        }
      );
      setIsReady(true);
    }
  }, [uwConfig, setPublicId, setUserImage]);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleUpload}
      disabled={!isReady}
      className={`rounded-2xl p-2 transition-colors borde-con-degradado ${
        isReady
          ? "hover:bg-purple-300 cursor-pointer"
          : "opacity-50 cursor-not-allowed"
      }`}
    >
      {isReady ? "Seleccionar imagen de perfil..." : "Cargando Cloudinary..."}
    </button>
  );
};

export default CloudinarySignUpUploadWidget;
