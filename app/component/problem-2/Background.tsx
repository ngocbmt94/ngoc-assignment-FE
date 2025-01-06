"use client";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine, ISourceOptions } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

const options: ISourceOptions = {
  background: {
    color: { value: "#2e1065" },
  },
  particles: {
    number: { value: 80 },
    color: { value: "#fff" },
    move: { enable: true, speed: 3, direction: "none" },
    links: { enable: true, distance: 150, color: "#fff", opacity: 0.5, width: 1 },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 5 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "push" },
    },
    modes: {
      repulse: { distance: 200, duration: 0.4 },
      push: { quantity: 4 },
    },
  },
  detectRetina: true,
};

function Background() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine); // Load the engine
  }, []);

  return <Particles id="tsparticles" init={particlesInit} options={options} />;
}

export default Background;
