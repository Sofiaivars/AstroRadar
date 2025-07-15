import './RenderEventList.css'
import { useEffect, useState } from "react"
import EventCard from "./EventCard"
import PageLoader from "../loaders/PageLoader"

function RenderEventList({eventList, renderCategory, userId}){
  const [renderList, setRenderList] = useState(eventList)

  useEffect(() => {
    if(eventList){
      const sortedList = eventList.sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
      if(renderCategory !== "all"){
        const filteredList = sortedList.filter((event) => event.category === renderCategory)
        setRenderList(filteredList)
      } else {
        return setRenderList(sortedList)
      }
    }
  }, [renderCategory, eventList])

  return(
    <div className="flex flex-col gap-3 w-full h-full overflow-y-auto p-3 render-events-list">
      {Array.isArray(eventList) && Array.isArray(renderList) && renderList.length > 0
        ? (renderList.map((astroEvent) => {
              return <EventCard 
                key={astroEvent.id}
                eventImg={astroEvent.image}
                eventName={astroEvent.event}
                eventCategory={astroEvent.category}
                eventStart={astroEvent.start_date}
                eventEnd={astroEvent.end_date}
                eventVisibility={astroEvent.visibility}
                eventMoon={astroEvent.moon}
                eventId={astroEvent.id}
                userId={userId}
              />
            })
          )
        : <div className="flex items-center justify-center w-full h-full"><PageLoader /></div>}
    </div> 
  )
}

export default RenderEventList