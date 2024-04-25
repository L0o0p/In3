/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': "linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url('<path-to-image>')"
      },
      colors: {
        'light-gray': 'lightgray'
      },
      spacing: {
        '396px': '396px',
        '852px': '852px'
      }
    }
  },
  plugins: [],
}

