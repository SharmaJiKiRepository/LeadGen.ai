/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4A3AFF",
          dark: "#3E31CC",
        },
        secondary: "#10B981",
        light: {
          bg: "#F8F9FA",
          text: "#6B7280",
        },
        dark: {
          bg: "#111827",
          card: "#1F2937",
          text: "#D1D5DB",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};