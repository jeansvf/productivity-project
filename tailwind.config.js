/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        "rubik" : ['Rubik', "sans-serif"],
        "ubuntu" : ['Ubuntu', "sans-serif"],
        "inter" : ['Inter', "sans-serif"],
      },
      dropShadow: {
        'red-title': '3px 3px 16px rgba(255, 115, 115, 0.6)',
        'pink-title': '3px 3px 16px rgba(255, 113, 206, 0.6)',
        'green-title': '3px 3px 16px rgba(115, 255, 163, 0.6)',
        'blue-title': '3px 3px 16px rgba(113, 238, 255, 0.6)',
      },
    },
  },
  plugins: [],
}

