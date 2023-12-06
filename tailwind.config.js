import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFD771",
        secondary: "#777777",
        maintenance: "#9CD6D6",
        function: "#A4D6FF",
        appearance: "#A6B6B6",
        occupation: "#99B1D4",
        usage: "#FDAFC6",
        crowd: "#FA8888",
        noise: "#D3AAB1",
        thermalComfort: "#FCA6D4",
        cleanliness: "#DAAEDB",
        unknown: "#D4D4D8",
        textBtn: "#D4D4D8",
        textBtnHover: "#b6b6ba",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
