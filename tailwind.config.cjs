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
        concrete: "#f2f2f2",
        mandy: "#df575b",
        foggyGray: "#c3c3ac",
        cadetBlue: "#a2bac4",
        ziggurat: "#c0d5de",
        nomad: "#b9b1a3",
        glacier: "#6ea8bd",
        mypink: "#d38d82",
      },
    },
  },
  plugins: [],
};
