import { CalendarDays, Hourglass } from "lucide-react";
import CountdownComponent from '../renderEvents/CountdownComponent.jsx'

function ISSCard({issImg, issDuration, issStart}){

  return(
    <div className="flex rounded-2xl w-full items-center gap-5 text-sm border-b-2 border-purple-800">
      <div className="flex w-50 max-h-33 rounded-l-2xl overflow-hidden">
        <img src={issImg} alt="iss image" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-1 items-center">
          <CalendarDays/>
          <p>{new Date(issStart * 1000).toLocaleString()}</p>
        </div>
        <div className="flex gap-1 items-center">
          <p>Duración aproximada:</p>
          <p>{Math.floor(issDuration / 60)} minutos</p>
        </div>
      </div>
      <div className="flex gap-1 items-center">
        <Hourglass />
        <CountdownComponent eventStart={new Date(issStart * 1000).toUTCString()} />
      </div>
    </div>
  )
}

export default ISSCard