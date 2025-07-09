import { useNavigate } from "react-router"
import { List } from "lucide-react";

const EventoSugerido = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="rounded-xl w-[350px] h-71">
        <div className="flex w-full h-full  bg-[var(--components-background)] rounded-xl overflow-hidden text-[var(--astroradar-white)] borde-con-degradado">
  
          <div className="w-[50%] h-full">
            <img
              src="https://media.istockphoto.com/id/452969547/es/foto/superluna-creciente.jpg?s=612x612&w=0&k=20&c=MVgqQ_NR8qC9tevdhq14AF7FkWtLim51Z7kcC-CJOLg=" 
              alt="Evento Sugerido"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contenido central */}
          <div className="flex flex-col justify-start ps-1 pe-1 h-full w-[50%]">
            <p className="text-lg mb-3 mt-3">SUGERIDAS</p>
            <p className="text-sm mb-2">"SUPERLUNA"</p>
            <p className="text-xs mt-1">
              La superluna ocurre cuando la luna llena está en su punto más cercano a la Tierra, luciendo más grande y brillante visualmente.
            </p>
            <button
              className="
                btn-sug  
                group
                rounded-[12px]
                p-[1.5px]
                text-white
                text-sm
                h-10
                w-10
                font-medium
                transition
                duration-300
                flex
                items-center
                justify-center
                hover:shadow-2xl
                hover:shadow-purple-600/30"
              style={{
                backgroundImage:
                  "linear-gradient(var(--components-background), var(--components-background)), " +
                  "linear-gradient(to right, #a855f7, #d946ef, #22d3ee)", //bordeeeeeeeee
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                border: "2px solid transparent",  
              }}
              onClick={() => navigate('/dashboard/events')}
            >
              <div
                className="
                  rounded-[12px]
                  w-full
                  h-full
                  flex
                  items-center
                  justify-center
                  transition
                  duration-300
                  ease-in-out
                  group-hover:bg-gradient-to-br
                  group-hover:from-gray-700
                  group-hover:to-gray-900"
                style={{
                  backgroundColor: "var(--components-background)",
                }}
              >
                <span><List size={17}/></span>
              </div>
            </button>
          </div>

        </div>
      </div>
    </>
  )
}
export default EventoSugerido