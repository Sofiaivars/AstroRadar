import '@components/dashboard/EventoSugerido.css'
import { Link, useNavigate } from "react-router";
import { ChevronRight } from "lucide-react";

const EventoSugerido = () => {
  const navigate = useNavigate();

  return (
    <>
      <Link to="/dashboard/events" className="relative rounded-xl w-full sm:w-1/2 sm:h-full overflow-hidden borde-con-degradado border-4 font-poppins p-5 eventList">
          <div className="w-full flex flex-col justify-left z-10">
            <p className="text-xl font-bold mb-4 ">Proximos eventos</p>

            <p className="text-sm">
              Busca los proximos eventos en tu zona y se parte de la comunidad
              astronomica local.
            </p>
          </div>
      </Link>
    </>
  );
};
export default EventoSugerido;
