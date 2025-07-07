import React from "react";
import SideBar from "../components/sidebar/SideBar";
import StepsComponent from "../components/missionsSteps/StepsComponent";
import Logotipo from "../components/dashboard/logotipo/Logotipo";
import CosmoDashboard from "../components/dashboard/cosmo-dashboard/CosmoDashboard";
import { motion } from "framer-motion";

function MissionsPage() {
  return (
    <>
      <Logotipo />
      <div className="pt-20 flex min-h-[750px] min-w-[1280px]">
        <div className="h-[750px] ml-6">
          <SideBar />
        </div>
        <div
          className="flex flex-1 px-6 rounded-2xl p-8 space-x-8 relative h-[750px]"
          style={{
            backgroundImage:
              "linear-gradient(var(--components-background), var(--components-background)), " +
              "linear-gradient(to right, #a855f7, #d946ef, #22d3ee)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            border: "2px solid transparent",
            backgroundColor: "var(--components-background)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex flex-col ml-4 flex-grow gap-10 overflow-visible">
            <StepsComponent />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-6 max-w-[500px]"
            >
              {/* TARJETA: Tipo de evento */}
              <motion.div
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 20px #a855f7",
                }}
                transition={{ type: "spring", stiffness: 150 }}
                className="relative rounded-2xl p-4 w-full text-white cursor-pointer overflow-visible"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--components-background), var(--components-background)), " +
                    "linear-gradient(to right, #a855f7, #d946ef, #22d3ee)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  border: "2px solid transparent",
                  backgroundColor: "var(--components-background)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <h2 className="text-lg font-bold mb-2 text-purple-300">
                  🌠 Tipo de evento
                </h2>
                <p className="text-sm leading-relaxed">
                  <strong>Lluvia de Perseidas:</strong> visibles en agosto, con
                  decenas de meteoros por hora en la madrugada.
                </p>
              </motion.div>

              {/* TARJETA: Visión */}
              <motion.div
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 20px #a855f7",
                }}
                transition={{ type: "spring", stiffness: 150 }}
                className="relative rounded-2xl p-4 w-full text-white cursor-pointer overflow-visible"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--components-background), var(--components-background)), " +
                    "linear-gradient(to right, #a855f7, #d946ef, #22d3ee)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  border: "2px solid transparent",
                  backgroundColor: "var(--components-background)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <h2 className="text-lg font-bold mb-2 text-purple-300">
                  👁️ Visión necesaria
                </h2>
                <p className="text-sm leading-relaxed">
                  Visión nocturna de <strong>campo amplio</strong>. Ideal con
                  telescopios o cámaras gran angular.
                </p>
              </motion.div>

              {/* TARJETA: Clima */}
              <motion.div
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 20px #a855f7",
                }}
                transition={{ type: "spring", stiffness: 150 }}
                className="relative rounded-2xl p-4 w-full text-white cursor-pointer overflow-visible"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--components-background), var(--components-background)), " +
                    "linear-gradient(to right, #a855f7, #d946ef, #22d3ee)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  border: "2px solid transparent",
                  backgroundColor: "var(--components-background)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <h2 className="text-lg font-bold mb-2 text-purple-300">
                  ☁️ Clima ideal
                </h2>
                <p className="text-sm leading-relaxed">
                  Cielos parcialmente despejados,{" "}
                  <strong>baja contaminación lumínica</strong>. Niebla o nubes
                  dificultan la visión.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* CosmoDashboard */}
          <div className="w-[400px] h-auto absolute bottom-4 right-0.5 overflow-y-auto">
            <CosmoDashboard />
          </div>
        </div>
      </div>
    </>
  );
}

export default MissionsPage;
