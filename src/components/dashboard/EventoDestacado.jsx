import { useEffect, useRef, useState } from 'react'
import useGlobalReducer from '../../hooks/useGlobalReducer.jsx'
import LoaderMini from '../loaders/LoaderMini.jsx'
import { Telescope, Moon } from 'lucide-react'
import CountdownComponent from '../renderEvents/CountdownComponent.jsx'
import { addUserMission } from '../../servicios/events-missions-service.js'
import { Toast } from 'primereact/toast';

const EventoDestacado = () => {
  const [eventList, setEventList] = useState(null)
  const [firstEvent, setFirstEvent] = useState(null)
  const { store } = useGlobalReducer()

  //Toast
    const toast = useRef(null)
    const successOnCreateMissionShow = () => {
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Misión programada correctamente!' });
    }
    const missionAlreadyCreatedShow = () => {
      toast.current.show({ severity: 'warn', summary: 'Warning', detail: `La misión ya existe!` });
    }
    // Toast end

  const handleClick = async () => {
    if(!store.userData.id || !firstEvent.id){
      return console.log('userId o eventId vacíos.')
    }
    try{
      const missionState = "scheduled"
      await addUserMission(store.userData.id, firstEvent.id, missionState)
      return successOnCreateMissionShow()
    }catch(error){
      console.error(error)
      missionAlreadyCreatedShow()
    }
    
  }

  useEffect(() => {
    setEventList(store.eventList)
  }, [])

  useEffect(() => {
    if(eventList){
      const now = new Date()
      const sortedList = eventList.sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
      const upEvents = sortedList.filter((e) => new Date(e.start_date) >= now)
      setFirstEvent(upEvents[0])
    }
  }, [eventList])

  return (<>
    <div className="rounded-xl w-full h-[140px]">
      <Toast ref={toast}/>
      <div className="flex w-full h-full bg-[var(--components-background)] rounded-xl overflow-hidden text-[var(--astroradar-white)] borde-con-degradado">
        
        <div className="w-[30%] h-full">
          <img
            src={firstEvent ? firstEvent.image : "https://linda-hoang.com/wp-content/uploads/2014/10/img-placeholder-dark.jpg"} 
            alt={`imagen del evento destacado ${firstEvent ? firstEvent.category : ""}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contenido central */}
        <div className="flex flex-col justify-start gap-2 mt-3 px-4 py-3 w-[50%]">
          <h3 className="text-md font-semibold">{firstEvent ? firstEvent.event : <LoaderMini/>}</h3>
          <p className="text-xs mt-2">
            Categoría: {firstEvent ? firstEvent.category : "Cargando..."}
          </p>
          <div className='flex flex-row gap-4 items-center mt-2'>
            <div className='flex flex-row gap-1 items-center'>
              <Telescope size={25}/>
              <p className="text-xs mt-3">
                {firstEvent ? firstEvent.visibility : "Cargando..."}
              </p>
            </div>
            <div className='flex flex-row gap-1 items-center'>
              <Moon size={25}/>
              <p className="text-xs mt-3">
                Luna {firstEvent ? firstEvent.moon : "Cargando..."}
              </p>
            </div>
          </div>
        </div>

        
        <div className="flex flex-col justify-between items-end pr-4 py-3 w-[20%]">
          <div className='flex text-sm items-center'>
            {firstEvent ? <CountdownComponent eventStart={firstEvent.start_date}/> : "Cargando..."}
          </div>
          <button className="
            group
            rounded-[12px]
            p-[1.5px]
            text-white
            text-sm
            h-10
            w-40
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
            onClick={handleClick}
          >
            <div className="
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
              Comenzar misión
            </div>
          </button>
        </div>
      </div>
    </div>
  </>)
}

export default EventoDestacado