/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...require('tailwindcss/defaultTheme').fontFamily.sans],
      },
    },
  },
  plugins: [],
}
