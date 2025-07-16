import React, { act, useEffect, useState } from "react";
import { useLocation } from "react-router";
import StepsComponent from "../components/missionsSteps/StepsComponent";
import { Outlet } from "react-router";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { CalendarDays, MessageCircleWarning } from "lucide-react";

function MissionsPage() {
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [activeMission, setActiveMission] = useState(null)

  const { store } = useGlobalReducer()

  const routeToStepIndex = {
    "/dashboard/missions/step1": 0,
    "/dashboard/missions/step2": 1,
    "/dashboard/missions/step3": 2,
  };

  useEffect(() => {
    const step = routeToStepIndex[location.pathname] ?? 0;
    setActiveStep(step);
  }, [location.pathname]);

  useEffect(() => {
    if(store.userActiveMission){
      setActiveMission(store.userActiveMission)
    }
  }, [])

  useEffect(() => {
    console.log(activeMission)
  }, [activeMission])

  return (
    <>
      <div className="flex w-full h-full justify-center items-center relative rounded-2xl borde-con-degradado">
        <div
          className="flex flex-col flex-1 rounded-2xl w-full p-5 space-y-8 relative overlay"
          style={{ height: "700px" }}
        >
          <div className="flex w-full justify-between items-start mt-6 ml-6">
            <div className="flex flex-col gap-1">
              {activeMission
                ? (
                    <>
                      <h2 className="text-xl font-bold text-purple-300 whitespace-nowrap">
                        Misión en curso:
                        <span className="text-white ms-2">"{activeMission.event.name}"</span>
                      </h2>
                      <div className="flex flex-row items-center gap-1">
                        <CalendarDays size={19}/>
                        <p className="text-sm">{activeMission.event.start_date}</p>
                      </div>
                    </>
                  )
                : (
                    <div className="flex flex-row gap-1">
                      <MessageCircleWarning />
                      <p className="me-30">No has activado una misión.</p>
                    </div>
                  )}
            </div>
            <div className="flex-grow max-w-[1200px] ml-2">
              <StepsComponent activeIndex={activeStep}/>
            </div>
          </div>

          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MissionsPage;
