import { useState, useEffect, useRef } from 'react';
import useGlobalReducer from '../../hooks/useGlobalReducer.jsx'
import { updateMissionImage } from '../../servicios/events-missions-service.js'

const CloudinaryUploadWidget = ({ uwConfig, setPublicId, setShowCongrats }) => {
  const uploadWidgetRef = useRef(null);
  const uploadButtonRef = useRef(null);
  const [missionImageSrc, setMissionImageSrc] = useState(null)
  const [missionId, setMissionId] = useState(null)

  const { store, dispatch } = useGlobalReducer()

  useEffect(() => {
    const initializeUploadWidget = () => {
      if (window.cloudinary && uploadButtonRef.current) {
        // Create upload widget
        uploadWidgetRef.current = window.cloudinary.createUploadWidget(
          uwConfig,
          (error, result) => {
            if (!error && result && result.event === 'success') {
              setPublicId(result.info.public_id);
              setShowCongrats(true)
              setMissionImageSrc(result.info.secure_url)
            }
          }
        );

        // Add click event to open widget
        const handleUploadClick = () => {
          if (uploadWidgetRef.current) {
            uploadWidgetRef.current.open();
          }
        };

        const buttonElement = uploadButtonRef.current;
        buttonElement.addEventListener('click', handleUploadClick);

        // Cleanup
        return () => {
          buttonElement.removeEventListener('click', handleUploadClick);
        };
      }
    };

    initializeUploadWidget();
  }, [uwConfig, setPublicId]);

  useEffect(() => {
    if(store.userActiveMission){
      setMissionId(store.userActiveMission.id)
    }
  }, [])

  useEffect(() => {
    console.log(missionImageSrc)
    const updateImage = async () => {
      try{
        const response = await updateMissionImage(missionId, missionImageSrc)
        console.log(response)
      }catch(error){
        console.log(`Error al enviar imagen a base de datos: ${error}`)
      }
    }
    updateImage()
  }, [missionImageSrc])

  return (
    <button
      ref={uploadButtonRef}
      id="upload_widget"
      className="rounded-2xl p-3 hover:bg-purple-300 transition-colors delay-150 borde-con-degradado"
    >
      Seleccionar imagen del evento...
    </button>
  );
};

export default CloudinaryUploadWidget;
