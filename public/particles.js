var pJSDom = []; // This array stores the Particle.js instances

// Function to initialize Particle.js
window.particlesJS = function (elementId, options) {
    // Your initialization code here...
    // This function initializes Particle.js with the provided options
    // and adds it to the pJSDom array.
};

// Function to load Particle.js configuration from a file
window.particlesJS.load = function (elementId, path, callback) {
    // Your code for loading Particle.js configuration from a file
    // This function loads the configuration from a JSON file and initializes Particle.js.
    // It also accepts a callback function to execute after loading and initializing.
};

// Here you have the configuration options for Particle.js
// You can modify these options to adjust the behavior and appearance of the particles.
// Look for the 'size' property to adjust the size of the particles.
var pJS = {
    particles: {
        number: { value: 400, density: { enable: true, value_area: 800 } },
        color: { value: "#fff" },
        shape: { type: "circle", stroke: { width: 0, color: "#ff0000" }, polygon: { nb_sides: 5 }, image: { src: "", width: 100, height: 100 } },
        opacity: { value: 1, random: false, anim: { enable: false, speed: 2, opacity_min: 0, sync: false } },
        size: { value: 20, random: false, anim: { enable: false, speed: 20, size_min: 0, sync: false } },
        // Adjust the 'value' property here to change the size of the particles
        // For example, change 'value: 20' to 'value: 10' for smaller particles
        // Or increase it for larger particles
        line_linked: { enable: true, distance: 100, color: "#fff", opacity: 1, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false, attract: { enable: false, rotateX: 3000, rotateY: 3000 } }
    },
    // Other configuration options...
};

// Your other functions and event listeners...
