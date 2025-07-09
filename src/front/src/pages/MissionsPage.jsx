import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import StepsComponent from "../components/missionsSteps/StepsComponent";
import Logotipo from "../components/dashboard/logotipo/Logotipo";
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
      <Logotipo />
      <div
        className="flex min-h-[700px] min-w-[1280px] justify-center items-center relative"
        style={{ height: "700px" }}
      >
        <div
          className="flex flex-col flex-1 px-6 rounded-2xl p-8 space-y-8 borde-con-degradado relative overlay"
          style={{ width: "1100px", height: "700px" }}
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
