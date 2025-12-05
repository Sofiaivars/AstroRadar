import { useState } from "react";
import { useNavigate } from "react-router";
import ModalCongrats from "@components/missionsSteps/ModalCongrats";


const Step3Page = () => {
  const [showCongrats, setShowCongrats] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div className="text-white mt-4">
      <h3 className="text-lg font-bold">📸 Enviar captura del evento</h3>

      <div className="flex flex-row gap-3 items-center mt-4 bg-gray-800 p-6 rounded-xl text-sm text-gray-300">
        <p>
          Asegúrate de que la imagen sea clara y muestre el evento de manera
          efectiva.
        </p>
      </div>
      
      {showCongrats && <ModalCongrats />}
    </div>
  );
};

export default Step3Page;
