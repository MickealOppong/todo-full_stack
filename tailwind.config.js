/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'darkcyan': '#008b8b',
        'm-purple': '#433a87'
      },
      translate: {
        '-100': '-100%'
      }
    },
  },
  plugins: [],
}