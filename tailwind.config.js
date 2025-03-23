/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#114FD7',
          dark: '#0D3BA3',
          light: '#67BCE9',
        },
        secondary: {
          DEFAULT: '#67BCE9',
          dark: '#4A9ED1',
          light: '#8CC9ED',
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
    },
  },
  plugins: [],
} 