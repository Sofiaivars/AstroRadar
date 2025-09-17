import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
    console.log("Particles engine init", engine);
  }, []);
  const particlesLoaded = useCallback(async (container) => {
    console.log("Particles loaded", container);
  }, []);

  const particlesConfig = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#61d4ff",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.8,
      },
      size: {
        value: 3,
        random: true,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        out_mode: "out",
      },
      links: {
        enable: true,
        distance: 150,
        color: "#b466de",
        opacity: 0.5,
        width: 1,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
      },
    },
    retina_detect: true,
  };

  console.log("Particles config loaded", particlesConfig);
  return (
    <div
      style={{
        zindex: -10,
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesConfig}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};
