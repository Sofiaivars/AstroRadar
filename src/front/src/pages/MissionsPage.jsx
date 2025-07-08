import React from "react";
import StepsComponent from "../components/missionsSteps/StepsComponent";
import Logotipo from "../components/dashboard/logotipo/Logotipo";
import { Outlet } from "react-router";

function MissionsPage() {
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
          <div className="flex w-full justify-between items-start">
            <h2 className="text-xl font-bold text-purple-300 whitespace-nowrap">
              Misión en curso:{" "}
              <span className="text-white">"Lluvia de Perseidas"</span>
            </h2>
            <div className="flex-grow max-w-[700px] ml-8">
              <StepsComponent />
            </div>
          </div>

          {/* Aquí se inyectará el contenido de Step1, Step2 o Step3 */}
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MissionsPage;
