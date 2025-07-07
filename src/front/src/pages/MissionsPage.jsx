import React from "react";
import StepsComponent from "../components/missionsSteps/StepsComponent";
import Logotipo from "../components/dashboard/logotipo/Logotipo";
import { motion } from "framer-motion";

function MissionsPage() {
  return (
    <>
      <Logotipo />
      <div
        className="pt-20 flex min-h-[700px] min-w-[1280px] justify-center items-center relative"
        style={{ height: "700px" }}
      >
        <div
          className="flex flex-col flex-1 px-6 rounded-2xl p-8 space-y-8 borde-con-degradado relative overlay"
          style={{ width: "1100px", height: "700px" }}
        >
          <div className="flex w-full justify-between items-start">
            <div className="flex-shrink-0">
              <h2 className="text-xl font-bold text-purple-300 whitespace-nowrap">
                Misión en curso:{" "}
                <span className="text-white">"Lluvia de Perseidas"</span>
              </h2>
            </div>
            <div className="flex-grow max-w-[700px] ml-8">
              <StepsComponent />
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
            style={{ width: "60%", marginLeft: "5%", paddingTop: "20px" }}
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
          <img
            src="/cosmo-step1.png"
            alt="Cosmo Step 1"
            className="absolute"
            style={{
              bottom: "2px", // ajusta según cuánto quieres que salga
              right: "-60px",
              width: "300px", // ajusta tamaño según prefieras
              height: "auto",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </>
  );
}
export default MissionsPage;
