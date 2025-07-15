import { CalendarDays, CalendarClock, CalendarOff, Telescope, Moon, Hourglass, Satellite } from "lucide-react";
import CountdownComponent from "./CountdownComponent";

function UserMissionCard({eventImg, eventName, eventCategory, eventStart, eventEnd, eventVisibility, eventMoon, missionState}){

  return(
    <div className="flex rounded-2xl w-full items-center gap-3 text-sm border-b-2 border-purple-800">
      <div className="flex w-50 max-h-33 rounded-l-2xl overflow-hidden">
        <img 
          src={eventImg ? eventImg : "https://sdmntpreastus.oaiusercontent.com/files/00000000-d1ac-61f9-8711-fab305d95c64/raw?se=2025-07-15T11%3A28%3A22Z&sp=r&sv=2024-08-04&sr=b&scid=07f251fe-f8f3-54af-bfab-bef9fbd9535b&skoid=b32d65cd-c8f1-46fb-90df-c208671889d4&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-15T06%3A48%3A00Z&ske=2025-07-16T06%3A48%3A00Z&sks=b&skv=2024-08-04&sig=yKvhb5FrrhG0h2dAlf3jYUNzyJYhVLTkvNycRlXOjsk%3D"} 
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
      <div className="flex justify-end items-end w-2/10 me-3">
        <div className="flex items-center gap-1">
          <Satellite />
          <p>{missionState}</p>
        </div>
      </div>
    </div>
  )
}

export default UserMissionCard