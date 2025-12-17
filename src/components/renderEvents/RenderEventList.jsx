import { useMemo, useRef } from "react"
import '@components/renderEvents/RenderEventList.css'
import EventCard from "@components/renderEvents/EventCard"
import PageLoader from "@components/loaders/PageLoader"
import UserMissionCard from '@components/renderEvents/UserMissionCard'
import { deleteMission, getUserMissions, updateMissionState } from "@services/events-missions-service";
import { Toast } from 'primereact/toast';

function RenderEventList({eventList, renderCategory, userId}){
  const renderList = useMemo(() => {
    if(!eventList) return []
    
    const sortedList = [...eventList].sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
    if(renderCategory !== "all"){
      return sortedList.filter((event) => event.category === renderCategory)
    }

    return sortedList
  },[eventList, renderCategory])
  
  //Toast
  // const toast = useRef(null)
  // const alreadyActiveMission = () => {
  //   toast.current.show({ severity: 'info', summary: 'Info', detail: 'Ya hay una misión activada!' });
  // }
  // const deletedMissionShow = (missionId) => {
  //   toast.current.show({ severity: 'success', summary: 'Success', detail: `Misión ${missionId} borrada con éxito!` });
  // }
  // Toast end

  const _checkActiveMissions = async () => {
    const activeMissionsData = await getUserMissions(userId)
    const filteredList = [...activeMissionsData].filter((mission) => mission.state === "active")
    if(filteredList.length >= 1){
      return true
    }
    return false
  }

  const handleUserMissionButton = async (missionId) => {
    console.log("handleUserMissionButton")
  }

  const deleteUserMission = async (missionId) => {
    console.log("deleteUserMission")
  }

  return(
    <div className="flex flex-col gap-3 w-full h-full overflow-y-auto p-3 render-events-list">
      {/* <Toast ref={toast} /> */}
      {renderCategory !== "programada"
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