import { useNavigate } from "react-router";
import { ChevronRight } from "lucide-react";

const EventoSugerido = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative rounded-xl w-[350px] h-[286px] overflow-hidden borde-con-degradado border-4 font-poppins">
        <div className="flex w-full h-full  bg-[var(--components-background)] rounded-xl ">
          <div className="w-full h-full z-0">
            <img
              src="https://media.istockphoto.com/id/452969547/es/foto/superluna-creciente.jpg?s=612x612&w=0&k=20&c=MVgqQ_NR8qC9tevdhq14AF7FkWtLim51Z7kcC-CJOLg="
              alt="Evento Sugerido"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 ease-in-out group-hover:bg-black/10" />
          </div>

          <div className="w-full flex flex-col justify-left z-10 -ml-60 mt-4 p-4">
            <p className="text-xl font-bold mb-4 ">Proximos eventos</p>

            <p className="text-sm">
              Busca los proximos eventos en tu zona y se parte de la comunidad
              astronomica local.
            </p>
          </div>

          <div className="w-[20%] flex justify-between mt-40 pr-4">
            <button
              className="               
                rounded-[12px]       
                z-10         
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
                mt-16
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
              onClick={() => navigate("/dashboard/events")}
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
                <span>
                  <ChevronRight size={20} />
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default EventoSugerido;
