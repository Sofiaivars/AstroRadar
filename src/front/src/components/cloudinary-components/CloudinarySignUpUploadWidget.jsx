import { useEffect, useRef } from 'react';

const CloudinarySignUpUploadWidget = ({ uwConfig, setPublicId, setUserImage }) => {
  const uploadWidgetRef = useRef(null);
  const uploadButtonRef = useRef(null);

  useEffect(() => {
    const initializeUploadWidget = () => {
      if (window.cloudinary && uploadButtonRef.current) {
        // Create upload widget
        uploadWidgetRef.current = window.cloudinary.createUploadWidget(
          uwConfig,
          (error, result) => {
            if (!error && result && result.event === 'success') {
              setPublicId(result.info.public_id);
              setUserImage(result.info.secure_url)
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

  return (
    <button
      ref={uploadButtonRef}
      id="upload_widget"
      className="rounded-2xl p-1 hover:bg-purple-300 transition-colors cursor-pointer borde-con-degradado"
    >
      Seleccionar imagen de perfil...
    </button>
  );
};

export default CloudinarySignUpUploadWidget;
