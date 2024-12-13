/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Poppins: ["Poppins", "sans-serif"],
      Roboto: ["Roboto", "sans-serif"],
      Montserrat: ["Montserrat", "sans-serif"],
    },
    extend: {
      height: {
        132: "33rem",
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss-textshadow")

  ],
  daisyui: {
    themes: ["light"],

  },
};
