/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['ui-sans-serif', 'system-ui'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        brand: {
          light: "#f3f2ee", // fundo claro
          dark: "#201d1c",  // preto sofisticado
          gold: "#c6a253",  // dourado luxo
        },
      },
    },
  },
  plugins: [],
}
