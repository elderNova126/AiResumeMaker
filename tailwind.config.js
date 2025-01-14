const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        'main-color': '#0082e6',
        'main-color-50': 'rgba(0, 130, 230, 0.2)',
        'secondary-color': '#e66400',
        'text-color': '#ffffff',
      },
      fontSize: {
        'base-55': '55.5%',
        'base-62': '62.5%',
        'base-47': '47%',
        'base-42': '42%',
      },
    },
    screens: {
      xl: { min: '2000px' },
      lg: { max: '1280px' },
      md: { max: '800px' },
    },
  },
  plugins: [],
};
