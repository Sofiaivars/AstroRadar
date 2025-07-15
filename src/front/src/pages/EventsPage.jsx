import { useEffect, useState } from "react"
import { getCategories } from "../servicios/events-missions-service"
import RenderEventList from "../components/renderEvents/RenderEventList"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"
import LoaderMini from '../components/loaders/LoaderMini.jsx'
import './EventsPage.css'
import PageLoader from "../components/loaders/PageLoader.jsx"
import { useNavigate } from "react-router"

function EventsPage(){
  const [eventList, setEventList] = useState(null)
  const [categories, setCategories] = useState(null)
  const categoryList = categories ? Object.keys(categories) : []
  const [renderCategory, setRenderCategory] = useState("all")
  const [userId, setUserId] = useState(null)

  const { store } = useGlobalReducer()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (store?.eventList) setEventList(store.eventList);
    if (store?.userData?.id) setUserId(store.userData.id);
  }, [store]);

  useEffect(() => {
    if(eventList){
      const dataToCategories = getCategories(eventList)
      setCategories(dataToCategories)
    }
  }, [eventList])

  useEffect(() => {
    if(store?.userData === null){
      return navigate('/dashboard')
    }
  }, [store?.userData, navigate])

  return(
    <div className="flex flex-col w-full h-full rounded-2xl p-3 overflow-hidden borde-con-degradado">
      <div className="flex justify-center items-center rounded-2xl w-full gap-5 pb-3 botonera">
        <button 
          className="rounded-2xl p-2 hover:bg-purple-300 transition-colors duration-500 cursor-pointer borde-con-degradado" 
          onClick={() => setRenderCategory("scheduled")}
        >
          Misiones programadas
        </button>
        <div className="h-full rounded-2xl separator"></div>
        <button 
          className="rounded-2xl p-2 hover:bg-purple-300 transition-colors duration-500 cursor-pointer borde-con-degradado" 
          onClick={() => setRenderCategory("all")}
        >
          Mostrar todos
        </button>
        {categories
          ? categoryList.map((key, index) => {
              return (
                <button 
                  key={`${key}${index}`}
                  className="rounded-2xl p-2 hover:bg-purple-300 transition-colors duration-500 cursor-pointer borde-con-degradado" 
                  onClick={() => setRenderCategory(key)}
                >
                  {key}
                </button>
              )
            })
          : <LoaderMini/>}
      </div>
      {eventList && store.userData
      ? <RenderEventList eventList={eventList} renderCategory={renderCategory} userId={userId}/>
      : store?.userData === null
        ? (
            <div className="flex flex-col items-center justify-center h-full w-full text-center p-6">
              <p>⚠️ Datos no disponibles, vuelve al DASHBOARD</p>
            </div>
          )
        : <div className="flex flex-col items-center justify-center h-full w-full text-center p-6"><PageLoader/></div>}
    </div>
  )
}

export default EventsPage