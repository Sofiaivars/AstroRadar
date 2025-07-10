import { Outlet } from "react-router";
import SideBar from "../components/sidebar/SideBar.jsx";
import { useEffect } from "react";
import { getEventsFromAPI } from "../servicios/events-missions-service.js";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

function DashboardMain() {
  const { store, dispatch } = useGlobalReducer()

  useEffect(() => {
    if(!Array.isArray(store.eventList) || store.eventList.length === 0){
      const getEvents = async () => {
        const eventsFromAPI = await getEventsFromAPI()
        dispatch({ type: "SET_EVENT_LIST", payload: eventsFromAPI })
      }
      getEvents()
    }
  }, [])

  return (
    <>
      <div className="flex flex-row items-center justify-center w-350 h-200 gap-3">
        <SideBar />

        <div className="flex flex-col items-center justify-center w-full h-full overflow-hidden dashboard--main-container">
          <Outlet />
        </div>
        
      </div>
    </>
  );
}

export default DashboardMain;
