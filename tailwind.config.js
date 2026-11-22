/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
    "node_modules/preline/dist/*.js",
  ],
  daisyui: {
    themes: ["light"],
  },
  theme: {
    extend: {
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "Inter", "sans-serif"],
        head: ["'Plus Jakarta Sans'", "Montserrat", "sans-serif"],
        body: ["Inter", "sans-serif"],
        chivo: ["Chivo", "sans-serif"],
        bebas: ["'Bebas Neue'", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui"), flowbite.plugin(), require("preline/plugin")],
};
