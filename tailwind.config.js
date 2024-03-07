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
        textBtn: "#D4D4D8",
        textBtnHover: "#b6b6ba",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
