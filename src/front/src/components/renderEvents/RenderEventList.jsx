import './RenderEventList.css'
import { useEffect, useState } from "react"
import EventCard from "./EventCard"
import PageLoader from "../loaders/PageLoader"

function RenderEventList({eventList, renderCategory}){
  const [renderList, setRenderList] = useState(eventList)

  useEffect(() => {
    const setList = () => {
      if(eventList){
        const sortedList = eventList.sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
        if(renderCategory !== "all"){
          const filteredList = sortedList.filter((event) => event.category === renderCategory)
          return setRenderList(filteredList)
        }

        return setRenderList(sortedList)
      }
    }
    setList()
  }, [renderCategory, eventList])

  return(
    <div className="rounded-2xl w-full h-full overflow-hidden">
      <div className="flex flex-col gap-3 w-full h-full rounded-2xl overflow-y-auto p-3 render-events-list borde-con-degradado">
        {eventList && renderList
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
                />
              })
            )
          : <div className="flex items-center justify-center w-full h-full"><PageLoader /></div>}
      </div>
    </div>
  )
}

export default RenderEventList