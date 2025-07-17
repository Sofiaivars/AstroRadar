import { CalendarDays, CalendarClock, CalendarOff, Telescope, Moon, Hourglass, Tornado } from "lucide-react";
import CountdownComponent from "./CountdownComponent";
import { addUserMission } from "../../servicios/events-missions-service";
import { Toast } from 'primereact/toast';
import { useRef } from "react";

function EventCard({eventImg, eventName, eventCategory, eventStart, eventEnd, eventVisibility, eventMoon, eventId, userId}){

  //Toast
    const toast = useRef(null)
    const missionProgrammedShow = () => {
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Misión programada correctamente!' });
    }
    const missionExistsShow = () => {
      toast.current.show({ severity: 'warn', summary: 'Warning', detail: `La misión ya existe!` });
    }
    // Toast end

  const handleClick = async () => {
    try{
      if(!userId || !eventId){
        return console.log('userId o eventId vacíos.')
      }
      const missionState = "scheduled"
      const response = await addUserMission(userId, eventId, missionState)
      missionProgrammedShow()
      return console.log(response)
    }catch(error){
      missionExistsShow()
      console.log(error)
      return
    }
    
  }

  return(
    <div className="flex rounded-2xl w-full items-center gap-3 text-sm border-b-2 border-purple-800">
      <Toast ref={toast}/>
      <div className="flex w-50 max-h-33 rounded-l-2xl overflow-hidden">
        <img src={eventImg} alt={eventCategory} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col w-3/10 gap-3">
        <div className="flex items-center w-full gap-1">
          <CalendarDays/>
          <p>{eventName}</p>
        </div>
        <div className="flex items-center w-full gap-1">
          <CalendarClock />
          <p>
            {new Date(eventStart).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </p>
        </div>
        <div className="flex items-center w-full gap-1">
          <CalendarOff />
          <p>
            {new Date(eventEnd).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-3/10 me-3">
        <div className="flex items-center w-full gap-1">
          <Telescope />
          <p>{eventVisibility}</p>
        </div>
        <div className="flex items-center w-full gap-1">
          <Moon />
          <p>{`Luna ${eventMoon}`}</p>
        </div>
        <div className="flex items-center w-full gap-1">
          <Hourglass />
          <CountdownComponent eventStart={eventStart}/>
        </div>
        
      </div>
      <div className="flex justify-end items-end w-2/10 me-3">
        <button className="bg-purple-700 hover:bg-purple-300 p-2 rounded-2xl borde-con-degradado" onClick={handleClick}>
          Guardar evento
        </button>
      </div>
    </div>
  )
}

export default EventCard