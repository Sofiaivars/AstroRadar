import { Outlet } from "react-router";
import Logotipo from "../components/dashboard/logotipo/Logotipo.jsx";
import SideBar from "../components/sidebar/SideBar.jsx";

function DashboardMain() {
  

  return (
    <>
      <Logotipo />

      <div className="flex flex-row items-center justify-center gap-3">
        <SideBar />

        <div className="flex flex-col items-center justify-center w-350 h-200 overflow-hidden dashboard--main-container">
          <Outlet />
        </div>
        
      </div>
    </>
  );
}

export default DashboardMain;
