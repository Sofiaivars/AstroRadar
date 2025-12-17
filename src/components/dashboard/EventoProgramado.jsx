import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import CountdownComponent from "@components/renderEvents/CountdownComponent.jsx";
import LoaderMini from "@components/loaders/LoaderMini.jsx";
import { useSelector } from "react-redux";
import AstroButton from "@components/shared/AstroButton";

const EventoProgramado = () => {
  const { passes } = useSelector((state) => state.issPassesList)
  const firstIssPass = passes[0]
  const navigate = useNavigate();

  return (
    <>
      <div className="rounded-xl w-full h-[190px]">
        <div className="flex w-full h-full bg-[var(--components-background)] rounded-xl overflow-hidden text-[var(--astroradar-white)] borde-con-degradado">
          <div className="w-[30%] h-full">
            <img
              src="https://fuerzasmilitares.es/wp-content/uploads/2021/07/ERS-1-in-orbit-cAirbusHeritage-715x1024.jpg"
              alt="Evento Programado"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contenido central */}
          <div className="flex flex-col justify-start px-4 py-3 mt-6 w-[50%]">
            <h3 className="text-lg font-semibold mb-1 mt-4 w-[100%]">
              Próximo paso cercano de la ISS:
            </h3>
            <p className="text-xs mb-1 mt-1 w-[120%]">
              La Estación Espacial Internacional será visible cruzando el cielo
              como una estrella brillante ¡No te lo pierdas! Solo dura unos
              minutos y se ve a simple vista.
            </p>
          </div>

          <div className="flex flex-col justify-between items-end pr-4 py-3 w-[20%]">
            <div className="text-sm">
              {firstIssPass ? (
                <CountdownComponent
                  eventStart={new Date(
                    firstIssPass.startVisibility * 1000
                  ).toUTCString()}
                />
              ) : (
                <LoaderMini />
              )}
            </div>
            <div className="w-full flex justify-end mb-2 mr-2">
              <AstroButton text={<ChevronRight size={20} />} handleClick={() => navigate('/dashboard/iss')}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventoProgramado;
