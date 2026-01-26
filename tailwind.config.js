/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'booking-blue': '#006ce4',
        'booking-dark-blue': '#003b95',
        'booking-yellow': '#febb02',
        'booking-light-bg': '#f5f5f5',
        'youku-pink': '#ff6699',
        'youku-blue': '#1890ff',
        'youku-dark': '#1a1a1a',
        'youku-gray': '#2a2a2a',
        'youku-light-gray': '#3a3a3a',
        'youku-darker': '#121212',
      },
      fontFamily: {
        sans: ['Avenir Next', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 