import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: { 
      fontFamily: {
      optima: ["Optima", "sans-serif"],
      jane: ["Jane", "sans-serif"]
    },
  },
  },
  plugins: [animate],
};

export default config;
