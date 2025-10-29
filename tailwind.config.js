/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        slateInk: '#0f172a',
      },
      boxShadow: {
        card: '0 6px 18px rgba(20,30,50,0.04)',
      },
    },
  },
  plugins: [],
};


