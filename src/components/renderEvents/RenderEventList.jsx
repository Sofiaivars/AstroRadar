import './RenderEventList.css'
import { useEffect, useRef, useState } from "react"
import EventCard from "./EventCard"
import PageLoader from "../loaders/PageLoader"
import UserMissionCard from './UserMissionCard'
import { deleteMission, getUserMissions, updateMissionState } from "../../servicios/events-missions-service";
import useGlobalReducer from '../../hooks/useGlobalReducer'
import { Toast } from 'primereact/toast';

function RenderEventList({eventList, renderCategory, userId}){
  const [renderList, setRenderList] = useState(eventList)
  const [userMissionsList, setUserMissionsList] = useState([])

  const {dispatch} = useGlobalReducer()
  
  //Toast
  const toast = useRef(null)
  const alreadyActiveMission = () => {
    toast.current.show({ severity: 'info', summary: 'Info', detail: 'Ya hay una misión activada!' });
  }
  const deletedMissionShow = (missionId) => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: `Misión ${missionId} borrada con éxito!` });
  }
  // Toast end

  const getUserMissionsFromDB = async () => {
    const response = await getUserMissions(userId)
    setUserMissionsList(response)
    const active = [...response].filter((mission) => mission.state === "active")
    dispatch({ type: "ADD_USER_ACTIVE_MISSION", payload: active[0] })
    return
  }

  const checkActiveMissions = async () => {
    const activeMissionsData = await getUserMissions(userId)
    const filteredList = [...activeMissionsData].filter((mission) => mission.state === "active")
    if(filteredList.length >= 1){
      return true
    }
    return false
  }

  const handleUserMissionButton = async (missionId) => {
    try{
      const isMoreThanOneActive = await checkActiveMissions()
      if(isMoreThanOneActive){
        alreadyActiveMission()
        return 
      }
      const response = await updateMissionState(missionId, "active")
      await getUserMissionsFromDB()
      return console.log(response)
    }catch(error){
      console.error(`Error al actualizar estado de misión: ${error}`)
    }
  }

  const deleteUserMission = async (missionId) => {
    try{
      await deleteMission(missionId)
      await getUserMissionsFromDB()
      deletedMissionShow(missionId)
      return 
    }catch(error){
      console.error(`Error al borrar misión: ${error}`);
    }
  }

  useEffect(() => {
    getUserMissionsFromDB()
  }, [renderCategory])

  useEffect(() => {
    console.log(userMissionsList)
  }, [userMissionsList])

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
      <Toast ref={toast} />
      {renderCategory !== "scheduled"
        ? Array.isArray(eventList) && Array.isArray(renderList) && renderList.length > 0
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
          : <div className="flex items-center justify-center w-full h-full"><PageLoader /></div>
        : (userMissionsList.length > 0)
            ? (userMissionsList.map((mission) => {
                return (
                  <UserMissionCard
                    key={mission.id}
                    eventImg={mission.image}
                    eventName={mission.event.name}
                    eventCategory={mission.event.category}
                    eventStart={mission.event.start_date}
                    eventEnd={mission.event.end_date}
                    eventVisibility={mission.event.visibility}
                    eventMoon={mission.event.moon}
                    eventId={mission.event.id}
                    missionState={mission.state}
                    missionId={mission.id}
                    userId={mission.user_id}
                    handleClick={handleUserMissionButton}
                    deleteUserMission={deleteUserMission}
                  />
                )
              }))
            : <div className="flex items-center justify-center w-full h-full">No tienes misiones guardadas...</div>
      }
    </div> 
  )
}

export default RenderEventList