/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray900: "#121214",
        gray800: "#202024",
        gray700: "#29292e",
        gray500: "#323238",
        gray400: "#7c7c8a",
        gray300: "#c4c4cc",
        gray100: "#E1E1E6",
    
        white: "#fff",
    
        green700: "#015F43",
        green500: "#00875f",
        green300: "#00b37e",
    
        red500: "#aa2834",
        red300: "#f75A68",
      }
    },
  },
  plugins: [],
}

