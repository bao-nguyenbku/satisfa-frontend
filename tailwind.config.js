/** @type {import('tailwindcss').Config} */
const defaultColors = require('tailwindcss/colors');
const { fontFamily, screens } = require('tailwindcss/defaultTheme');
module.exports = {
  important: [
    '#__next',
    '.MuiDialog-root',
    '.MuiDrawer-root',
    '.MuiPopover-root',
    '.MuiPaper-root',
    '.MuiButtonBase-root',
  ],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...defaultColors,
      'primary-dark': '#212121',
      'primary-yellow': '#C49246',
      'dark-2': '#263238',
      'primary-orange': '#FF621F',
    },
    screens: {
      xs: '475px',
      ...screens,
    },
    extend: {
      backgroundImage: {
        page: "url('/page-bg.webp')",
      },
      backgroundColor: {
        'dark-theme': '#212121',
        'dark-form': '#2D2D2D',
        'item-background': '#1F1F1F',
      },
      fontFamily: {
        'passions-conflict': ['Passions Conflict', 'sans-serif'],
        'playfair-display': ['Playfair Display', 'sans-serif'],
      },
      spacing: {
        100: '25rem',
        128: '32rem',
      },
    },
    plugins: [],
  },
};
