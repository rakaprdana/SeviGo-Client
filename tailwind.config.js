/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import textshadow from "tailwindcss-textshadow";

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
  plugins: [daisyui, textshadow],
  daisyui: {
    themes: ["light"],
  },
};
