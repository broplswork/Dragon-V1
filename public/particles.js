particlesJS("particles-js", {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 800 } },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true, anim: { enable: true, speed: 0.5, opacity_min: 0 } },
    size: { value: 3, random: true },
    move: { enable: true, speed: 1, direction: "bottom", straight: false }
  },
  interactivity: { detect_on: "canvas", events: { onhover: { enable: false }, onclick: { enable: false }, resize: true } }
});
