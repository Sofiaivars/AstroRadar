import { useEffect, useMemo, useRef, useState } from 'react'
import LoaderMini from '@components/loaders/LoaderMini.jsx'
import { Telescope, Moon } from 'lucide-react'
import CountdownComponent from '@components/renderEvents/CountdownComponent.jsx'
import { addUserMission } from '@services/events-missions-service.js'
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux'
import AstroButton from '@components/shared/AstroButton'

const EventoDestacado = () => {
  const { events } = useSelector((state) => state.eventList)
  const firstEvent = useMemo(() => {
    if(events){
      const now = new Date()
      const sortedList = [...events].sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
      const upEvents = sortedList.filter((e) => new Date(e.start_date) >= now)
      return upEvents[0]
    }
  }, [events])

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
    missionAlreadyCreatedShow()
  }

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
          <AstroButton text="Comenzar misión" handleClick={handleClick}/> 
        </div>
      </div>
    </div>
  </>)
}

export default EventoDestacado