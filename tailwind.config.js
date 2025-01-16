/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        "head": ["Montserrat, serif"],
        "body": ["Inter, serif"],
        "chivo": ["Chivo, serif"],
      },
    },
  },
  plugins: [flowbite.plugin(),],
}
