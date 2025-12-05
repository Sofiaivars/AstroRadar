import { Outlet } from "react-router";
import SideBar from "@components/sidebar/SideBar.jsx";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function DashboardMain() {
  const userData = useSelector((state) => state.userData)

  useEffect(() => {
    console.log(userData)
  }, [userData])

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
