/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        headerColor: "#4A628A",
      },
      backgroundImage: {
        "dark-gradient": "linear-gradient(145deg, rgb(16, 16, 16), #2a2a2a)",
        "light-gradient": "linear-gradient(145deg, #f5f7fa, #e4ebf5)",
      },
    },
  },
  plugins: [],
};
