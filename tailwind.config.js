/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src-frontend/**/*.{vue,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
