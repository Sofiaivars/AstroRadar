import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import StepsComponent from "../components/missionsSteps/StepsComponent";
import { Outlet } from "react-router";

function MissionsPage() {
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const routeToStepIndex = {
    "/dashboard/missions/step1": 0,
    "/dashboard/missions/step2": 1,
    "/dashboard/missions/step3": 2,
  };

  useEffect(() => {
    const step = routeToStepIndex[location.pathname] ?? 0;
    setActiveStep(step);
  }, [location.pathname]);

  return (
    <>
      <div className="flex w-full h-full justify-center items-center relative rounded-2xl borde-con-degradado">
        <div
          className="flex flex-col flex-1 rounded-2xl w-full p-5 space-y-8 relative overlay"
          style={{ height: "700px" }}
        >
          <div className="flex w-full justify-between items-start mt-6 ml-6">
            <h2 className="text-xl font-bold text-purple-300 whitespace-nowrap">
              Misión en curso:{" "}
              <span className="text-white">"Lluvia de Perseidas"</span>
            </h2>
            <div className="flex-grow max-w-[1200px] ml-2">
              <StepsComponent activeIndex={activeStep} />
            </div>
          </div>

          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MissionsPage;
