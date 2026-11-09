import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: "#f0df82",
          500: "#e5d15e",
          600: "#cbb443",
          700: "#9e882b",
        },
        navy: {
          800: "#0f172a",
          900: "#090e17",
          950: "#050810",
        },
      },
    },
  },
  plugins: [],
};

export default config;
