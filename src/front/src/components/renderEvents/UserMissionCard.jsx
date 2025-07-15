import { CalendarDays, CalendarClock, CalendarOff, Telescope, Moon, Hourglass, Satellite, Trash } from "lucide-react";
import CountdownComponent from "./CountdownComponent";

function UserMissionCard({eventImg, eventName, eventCategory, eventStart, eventEnd, eventVisibility, eventMoon, missionState, missionId, userId, handleClick, deleteUserMission}){

  return(
    <div className="flex rounded-2xl w-full items-center gap-3 text-sm border-b-2 border-purple-800">
      <div className="flex w-50 max-h-33 rounded-l-2xl overflow-hidden">
        <img 
          src={eventImg ? eventImg : "https://skyandaluz.com/wp-content/uploads/2024/02/imagen-Conoce-las-misiones-espaciales-mas-importantes-de-la-historia.jpg"} 
          alt={eventCategory} className="w-full h-full object-cover" 
        />
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
      <div className="flex flex-col gap-3 justify-end items-end w-2/10 me-3">
        <div className="flex items-center gap-1">
          <Satellite />
          <p>{missionState}</p>
        </div>
        <div className="flex gap-2">
          <button className={`bg-red-700 hover:bg-red-300 p-2 rounded-2xl cursor-pointer borde-con-degradado`} onClick={() => deleteUserMission(missionId)}>
            <Trash size={20}/>
          </button>
          <button className={`bg-purple-700 ${missionState !== "active" ? "hover:bg-purple-300" : ""} p-2 rounded-2xl w-30 cursor-pointer borde-con-degradado`} onClick={() => handleClick(missionId)} disabled={missionState === "active"}>
            {missionState !== "active" ? "Empezar!" : "En curso..."}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserMissionCard