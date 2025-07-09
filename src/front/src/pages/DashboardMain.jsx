import { Outlet } from "react-router";
import SideBar from "../components/sidebar/SideBar.jsx";

function DashboardMain() {
  

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
