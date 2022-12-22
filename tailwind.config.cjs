/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: "#868686",
        black: "#3F3C3C",
        red: "#B54141",
        darkBlue: "#085071",
        secondary_1: "#f2f2f2",
        secondary_2: "#df575b",
        secondary_3: "#c3c3ac",
        secondary_4: "#a2bac4",
        secondary_5: "#c0d5de",
        secondary_6: "#b9b1a3",
        secondary_7: "#6ea8bd",
        secondary_8: "#d38d82",
      },
    },
  },
  plugins: [],
};
