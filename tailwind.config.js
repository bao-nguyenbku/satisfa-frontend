/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
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
