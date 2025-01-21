/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";
import withMT from "@material-tailwind/react/utils/withMT";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
    'node_modules/preline/dist/*.js',
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
  plugins: [require('daisyui'),flowbite.plugin(),require('preline/plugin'),
  ],
}
