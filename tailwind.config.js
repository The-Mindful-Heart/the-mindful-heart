/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          sky: "#66CCFF",
          mint: "#66FF99",
          rose: "#F8BBD0",
          sun: "#FFF59D",
          offwhite: "#FFFEFA"
        }
      },
      fontFamily: {
        heading: ["Playfair Display", "Lora", "serif"],
        body: ["Inter", "Quicksand", "sans-serif"]
      },
      boxShadow: {
        boutique: "0 10px 40px rgba(70, 117, 145, 0.12)"
      }
    }
  },
  plugins: []
};
