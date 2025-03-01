/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          'dark': '#DBDBDB',
          'medium': 'f0f0f0',
          'DEFAULT': '#f0f0f0',
          'light': '#F0F0F0'
        },
        background: {
          'DEFAULT': '#FAFAFA',
          'light': '#FAFAFA'
        },
        black: {
          'dark': '#000000',
          'DEFAULT': '#000000',
          'light': '#333333'
        }
      }
    },
  },
  plugins: [],
}

