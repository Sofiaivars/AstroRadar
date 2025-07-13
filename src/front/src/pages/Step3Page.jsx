import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import ModalCongrats from "../components/missionsSteps/ModalCongrats";
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import CloudinaryUploadWidget from '../components/cloudinary-components/CloudinaryUploadWidget.jsx';

const Step3Page = () => {
  const [showCongrats, setShowCongrats] = useState(false);
  const navigate = useNavigate();

  // Configuration
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  // State
  const [publicId, setPublicId] = useState('');

  // Upload Widget Configuration
  const uwConfig = {
    cloudName,
    uploadPreset,
    sources: ['local', 'camera'],
    styles:{
      palette: {
          window: "#8e4990",
          windowBorder: "#b8b8b8",
          tabIcon: "#1e2939",
          menuIcons: "#5A616A",
          textDark: "#f7f7f7",
          textLight: "#FFFFFF",
          link: "#66798f",
          action: "#FF620C",
          inactiveTabIcon: "#2c486d",
          error: "#F44235",
          inProgress: "#d970ff",
          complete: "#3cceec",
          sourceBg: "#1e2939"
      },
      fonts: {
        default: {
          active: true
        }
      }
    },
    multiple: false,
    clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif', 'bmp', 'tiff'],
  };

  const _handleUpload = (file) => {
    console.log("Archivo subido:", file.name);
    setTimeout(() => {
      setShowCongrats(true);
    }, 1000);
  };
  
  return (
    <div className="text-white mt-4">
      <h3 className="text-lg font-bold">📸 Enviar captura del evento</h3>

      <div className="flex flex-row gap-3 items-center mt-4 bg-gray-800 p-6 rounded-xl text-sm text-gray-300">
        <p>
          Asegúrate de que la imagen sea clara y muestre el evento de manera
          efectiva.
        </p>

        <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} setShowCongrats={setShowCongrats}/>
      </div>
      
      {showCongrats && <ModalCongrats />}
    </div>
  );
};

export default Step3Page;
