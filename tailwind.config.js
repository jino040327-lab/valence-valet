/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { brand: "#3A76F0" },
      fontFamily: {
        sans: ["var(--font-inter)","var(--font-noto)","ui-sans-serif","system-ui","-apple-system","Segoe UI","Roboto","Helvetica","Arial","Noto Sans KR","sans-serif"],
      },
    },
  },
  plugins: [],
};
