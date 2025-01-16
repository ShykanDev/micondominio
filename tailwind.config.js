/** @type {import('tailwindcss').Config} */
import tailwindAnimated from "tailwindcss-animated"
export default {
  content: [
	"./index.html",
	"./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
	extend: {
    fontFamily:{
      'poppins': ['Poppins', 'sans-serif'],
      'signika': ['Signika', 'sans-serif'],
    }
  },
  },
  plugins: [tailwindAnimated,],
}
