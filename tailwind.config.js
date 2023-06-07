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
      'primary-orange': '#FF621F',
      // primary: '#F6EEE3',
      // second: '#E9E0D2',
      primary: '#F3F4F4',
      // second: '#dddbd4',
      second: '#E2E4EA',
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
      screens: {
        1400: '1400px',
      },
    },
    plugins: [],
  },
};
