/** @type {import('tailwindcss').Config} */
const defaultColors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');
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
      'dark-2': '#263238',
    },
    extend: {
      fontFamily: {
        'passions-conflict': ['Passions Conflict', 'sans-serif'],
      }
    },
  },
  plugins: [],

}
