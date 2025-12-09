import { Outlet } from "react-router";
import SideBar from "@components/sidebar/SideBar.jsx";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserLocation } from "@features/userLocation/userLocationSlice";
import { fetchEventList } from "@features/eventList/eventListSlice";
import { getUserLocation } from "@services/geolocation-service";

function DashboardMain() {
  const dispatch = useDispatch()
  const { userData, userLocation, eventList } = useSelector((state) => state)
  const setLocationCoords = useCallback((coords) => dispatch(setUserLocation(coords)), [dispatch])

  useEffect(() => {
    const hasCoords = Object.values(userLocation).some(value => value !== null)
    if(!hasCoords){
      getUserLocation(setLocationCoords)
    }
    if(eventList.status === "idle" || eventList.status === "rejected"){
      dispatch(fetchEventList())
    }

    //TRAER DATOS POR SI SE RECARGA PÁGINA
  }, [userLocation, setLocationCoords, dispatch, eventList.status])

  useEffect(() => {
    console.log(userData)
    console.log(userLocation)
    console.log(eventList.events)
  }, [userData, userLocation, eventList])

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-center w-full md:w-4/5 h-205 gap-3 z-10">
        <SideBar />

        <div className="flex flex-col md:items-center md:justify-center w-full h-full overflow-hidden dashboard--main-container">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default DashboardMain;
