import { useEffect, useState } from "react"
import { getCategories } from "../servicios/events-missions-service"
import RenderEventList from "../components/renderEvents/RenderEventList"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"

function EventsPage(){
  const [eventList, setEventList] = useState(null)
  const [categories, setCategories] = useState(null)
  const categoryList = categories ? Object.keys(categories) : []
  const [renderCategory, setRenderCategory] = useState("all")

  const { store } = useGlobalReducer()

  useEffect(() => {
    setEventList(store.eventList)
  }, [])

  useEffect(() => {
    const dataToCategories = getCategories(eventList)
    setCategories(dataToCategories)
  }, [eventList])

  return(
    <div className="flex flex-col w-full h-full rounded-2xl p-3 overflow-hidden borde-con-degradado">
      <div className="flex justify-center items-center rounded-2xl w-full gap-5 pb-3 botonera">
        <button 
          className="rounded-2xl p-2 hover:bg-purple-300 transition-colors duration-500 cursor-pointer borde-con-degradado" 
          onClick={() => setRenderCategory("all")}
        >
          Mostrar todos
        </button>
        {categoryList.map((key, index) => {
          return (
            <button 
              key={`${key}${index}`}
              className="rounded-2xl p-2 hover:bg-purple-300 transition-colors duration-500 cursor-pointer borde-con-degradado" 
              onClick={() => setRenderCategory(key)}
            >
              {key}
            </button>
          )
        })}
      </div>
      <RenderEventList eventList={eventList} renderCategory={renderCategory}/>
    </div>
  )
}

export default EventsPage