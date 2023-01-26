/** @type {import('tailwindcss').Config} */
const defaultColors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...defaultColors,
      'primary-dark': '#212121',
      'primary-yellow': '#C49246',
    },
    extend: {},
  },
  plugins: [],

}
