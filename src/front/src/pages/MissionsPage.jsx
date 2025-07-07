import React from "react";
import StepsComponent from "../components/missionsSteps/StepsComponent";
import Logotipo from "../components/dashboard/logotipo/Logotipo";
import CosmoDashboard from "../components/dashboard/cosmo-dashboard/CosmoDashboard";
import { motion } from "framer-motion";

function MissionsPage() {
  return (
    <>
      <Logotipo />
      <div
        className="pt-20 flex min-h-[700px] min-w-[1280px] justify-center items-center"
        style={{ height: "700px" }}
      >
        <div
          className="flex flex-1 px-6 rounded-2xl p-8 space-x-8 relative"
          style={{
            backgroundImage:
              "linear-gradient(var(--components-background), var(--components-background)), " +
              "linear-gradient(to right, #a855f7, #d946ef, #22d3ee)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            border: "2px solid transparent",
            backgroundColor: "var(--components-background)",
            backdropFilter: "blur(10px)",
            width: "1100px",
            height: "700px",
          }}
        >
          {/* Contenido izquierdo con tarjetas y StepsComponent */}
          <div className="flex flex-col flex-grow gap-10 overflow-visible max-w-[650px]">
            <StepsComponent />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-6"
            >
              {[
                {
                  title: "🌠 Tipo de evento",
                  content:
                    "<strong>Lluvia de Perseidas:</strong> visibles en agosto, con decenas de meteoros por hora en la madrugada.",
                },
                {
                  title: "👁️ Visión necesaria",
                  content:
                    "Visión nocturna de <strong>campo amplio</strong>. Ideal con telescopios o cámaras gran angular.",
                },
                {
                  title: "☁️ Clima ideal",
                  content:
                    "Cielos parcialmente despejados, <strong>baja contaminación lumínica</strong>. Niebla o nubes dificultan la visión.",
                },
              ].map(({ title, content }, i) => (
                <motion.div
                  key={i}
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
                  dangerouslySetInnerHTML={{
                    __html: `<h2 class="text-lg font-bold mb-2 text-purple-300">${title}</h2><p class="text-sm leading-relaxed">${content}</p>`,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* CosmoDashboard a la derecha */}
          <div
            className="w-[400px] h-auto overflow-y-auto absolute"
            style={{ bottom: "20px", right: "20px" }}
          >
            <CosmoDashboard />
          </div>
        </div>
      </div>
    </>
  );
}

export default MissionsPage;
