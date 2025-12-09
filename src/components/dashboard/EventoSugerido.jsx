import '@components/dashboard/EventoSugerido.css'
import { Link } from "react-router";

const EventoSugerido = () => {

  return (
    <>
      <Link to="/dashboard/events" className="group relative rounded-xl w-full sm:w-1/2 sm:h-full overflow-hidden borde-con-degradado border-4 font-poppins p-5">
          <div className='absolute inset-0 bg-center group-hover:blur-xs transition-all duration-100 eventListBg'></div>
          <div className="relative z-10 w-full flex flex-col">
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
