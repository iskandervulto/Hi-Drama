import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
        },
        gold: {
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        cream: "#fdf8f4",
        charcoal: "#2d2d2d",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        lato: ["var(--font-lato)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "curtain-texture":
          "repeating-linear-gradient(90deg, rgba(107,33,168,0.04) 0px, rgba(107,33,168,0.04) 1px, transparent 1px, transparent 40px)",
      },
    },
  },
  plugins: [],
};
export default config;
