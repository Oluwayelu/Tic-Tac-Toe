import React from "react";
import Particles from "react-tsparticles";

const Particle = () => {
  return (
    <Particles
      options={{
        backgroundMode: {
          enable: true,
          zIndex: 0,
        },
        background: {
          color: "inherit",
        },
        fpsLimit: 60,
        interactivity: {
          detectsOn: "canvas",
          events: {
            onClick: { enable: true, mode: "repulse" },
            onHover: {
              enable: true,
              mode: "bubble",
              parallax: { enable: false, force: 2, smooth: 10 },
            },
            // resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 0.3,
              opacity: 0.7,
              size: 2,
              speed: 3,
            },
            grab: { distance: 400, line_linked: { opacity: 0.5 } },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
            repulse: { distance: 200, duration: 0.4 },
          },
        },
        particles: {
          color: { value: "#fff" },
          links: {
            color: "#ffffff",
            distance: 500,
            enable: false,
            opacity: 0.4,
            width: 1,
          },
          move: {
            attract: { enable: false, rotateX: 600, rotateY: 1200 },
            direction: "bottom",
            enable: true,
            outMode: "out",
            random: true,
            size: true,
            speed: 2,
            straight: false,
          },
          number: { density: { enable: true, area: 800 }, value: 200 },
          opacity: {
            random: true,
            value: 0.5,
          },
          shape: {
            type: "square",
          },
          size: {
            random: true,
            value: 10,
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default Particle;
