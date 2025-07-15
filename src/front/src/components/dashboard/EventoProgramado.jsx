import { List } from "lucide-react";
import { useNavigate } from "react-router";
import useGlobalReducer from '../../hooks/useGlobalReducer.jsx'
import CountdownComponent from '../renderEvents/CountdownComponent.jsx'
import LoaderMini from '../loaders/LoaderMini.jsx'
import { useEffect, useState } from "react";

const EventoProgramado = () => {
  const [firstIssPass, setFirstIssPass] = useState()
  const navigate = useNavigate()
  const { store } = useGlobalReducer()

  useEffect(() => {
    if(store.issPassesList){
      setFirstIssPass(store.issPassesList.passes[0])
    }
  }, [store.issPassesList])

    return (<>
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
        <div className="flex flex-col justify-start px-4 py-3 mt-4 w-[50%]">
          <h3 className="text-lg font-semibold mb-1 mt-2">Próximo paso cercano de la ISS:</h3>
          <p className="text-xs mb-1 mt-3">
            La Estación Espacial Internacional será visible cruzando el cielo como una estrella brillante ¡No te lo pierdas! Solo dura unos minutos y se ve a simple vista.
          </p>
          
        </div>

        
        <div className="flex flex-col justify-between items-end pr-4 py-3 w-[20%]">
          <div className="text-sm">
            {firstIssPass ? <CountdownComponent eventStart={new Date(firstIssPass.startVisibility * 1000).toUTCString()}/> : <LoaderMini/>}
          </div>
          <button
              
              className="
    btn-prog    
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
    hover:shadow-purple-600/30
  "
              style={{
                backgroundImage:
                  "linear-gradient(var(--components-background), var(--components-background)), " +
                  "linear-gradient(to right, #a855f7, #d946ef, #22d3ee)", //bordeeeeeeeee
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                border: "2px solid transparent",
               
                
              }}
              onClick={() => navigate('/dashboard/iss')}
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
      group-hover:to-gray-900
    "
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

    
    </>)
}

export default EventoProgramado