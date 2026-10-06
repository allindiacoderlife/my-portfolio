const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        "great-vibes": ["'Great Vibes'", "cursive"],
        "poiret-one": ["'Poiret One'", "cursive"],
        "montserrat-alternates": ["'Montserrat Alternates'", "sans-serif"],
        sacramento: ["Sacramento", "cursive"],
        plaster: ["Plaster", "cursive"],
        stretch: ["StretchPro", "sans-serif"],
        morona: ["Morona", "sans-serif"],
      },
      animation: {
        spotlight: "spotlight 2s ease 1 forwards",
        animateSVG: "animateSVG 5s ease-in-out 1s",
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
        animateSkills: "animateSkills 30s linear infinite",
        animateSkillsReverse: "animateSkillsReverse 30s linear infinite",
        strokeFill: "strokeFill 3s ease-in-out infinite",
        loopScroll: "loopScroll 20s linear infinite",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        animateSVG: {
          "0%": {
            strokeDashoffset: 1100,
          },
          "50%": {
            strokeDashoffset: 0,
          },
          "100%": {
            strokeDashoffset: 1100,
          },
        },
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        animateSkills: {
          "0%": {
            left: "100%",
          },
          "100%": {
            left: "-250px",
          },
        },
        animateSkillsReverse: {
          "0%": {
            right: "100%",
          },
          "100%": {
            right: "-250px",
          },
        },
        strokeFill: {
          "0%": {
            fill: "transparent",
            strokeDasharray: "0 100",
          },
          "50%": {
            fill: "transparent",
            strokeDasharray: "100 0",
          },
          "100%": {
            fill: "white",
            strokeDasharray: "100 0",
          },
        },
        loopScroll: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(calc(-50% - 20px))",
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
