/** @type {import('tailwindcss').Config} */
const defaultColors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme')
module.exports = {
  important: ["#__next", ".MuiPopover-root"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
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
        'playfair': ['Playfair Display', 'sans-serif'],
        'playfair-display': ['Playfair Display'],
        'podkova': ['Podkova', ...fontFamily.sans],
        backgroundColor: {
          'dark-theme': '#212121',
          'dark-form': '#2D2D2D',
          'item-background': '#1F1F1F'
        }
      },
    },
    plugins: [],
  }
}