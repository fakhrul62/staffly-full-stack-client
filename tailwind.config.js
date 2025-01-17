/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  daisyui: {
    themes: ["light"],
  },
  theme: {
    extend: {
      fontFamily: {
        "head": ["Montserrat, serif"],
        "body": ["Inter, serif"],
        "chivo": ["Chivo, serif"],
        "bebas": ["Bebas Neue, serif"],
      },
    },
  },
  plugins: [require('daisyui'),flowbite.plugin(),],
}
