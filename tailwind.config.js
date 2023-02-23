/** @type {import('tailwindcss').Config} */
module.exports = {
  important: "#__next",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.ts",
    "./src/**/*.tsx",
    "./src/**/*.js",

  ],
  theme: {
    extend: {
      backgroundColor:{
        'dark-theme': '#212121',
        'dark-form': '#2D2D2D',
        'item-background': '#1F1F1F' 
      }
    },
  },
  plugins: [],

}
