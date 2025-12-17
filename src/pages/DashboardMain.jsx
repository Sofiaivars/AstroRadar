import { Outlet } from "react-router";
import SideBar from "@components/sidebar/SideBar.jsx";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserLocation } from "@features/userLocation/userLocationSlice";
import { fetchEventList } from "@features/eventList/eventListSlice";
import { getUserLocation } from "@services/geolocation-service";
import { fetchIssPassesList } from "@/features/issPassesList/issPassesListSlice";
import { getUserData } from "@services/authService";
import { setUserData } from "@features/userData/userDataSlice";
import { fetchMissionList } from "@features/missionList/missionListSlice";

function DashboardMain() {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.userData)
  const userLocation = useSelector((state) => state.userLocation)
  const missionList = useSelector((state) => state.missionList)
  const eventList = useSelector((state) => state.eventList)
  const issPassesList = useSelector((state) => state.issPassesList)
  const setLocationCoords = useCallback((coords) => dispatch(setUserLocation(coords)), [dispatch])

  useEffect(() => {
    const hasCoords = Object.values(userLocation).every(value => value !== null)
    const hasData = Object.values(userData).every(value => value !== null)
    if(!hasCoords){
      getUserLocation(setLocationCoords)
    }
    if(eventList.status === "idle" || eventList.status === "rejected"){
      dispatch(fetchEventList())
    }
    if((issPassesList.status === "idle" || issPassesList.status === "rejected") && hasCoords){
      dispatch(fetchIssPassesList(userLocation))
    }
    if(!hasData){
      const getUserDataFromDB = async () => {
        const response = await getUserData()
        dispatch(setUserData(response))
      }
      getUserDataFromDB()
    }
  }, [userLocation, setLocationCoords, dispatch, eventList.status, issPassesList.status, userData])

  useEffect(() => {
    if(userData.id && (missionList.status === "idle" || missionList.status === "rejected")){
      dispatch(fetchMissionList(userData.id));
    }
  }, [userData.id, missionList.status, dispatch])

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-center w-full lg:w-4/5 h-205 gap-3 z-10">
        <SideBar />

        <div className="flex flex-col lg:items-center lg:justify-center w-full h-full overflow-hidden dashboard--main-container">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default DashboardMain;
