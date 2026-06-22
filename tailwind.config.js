/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandGreen: '#118A42',
        brandYellow: '#FFF200',
        brandRed: '#E31E24',
      }
    },
  },
  plugins: [],
}