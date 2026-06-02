import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        marble: { DEFAULT: "#F6F2EB", deep: "#ECE6DB" },
        ink: { DEFAULT: "#14110D", soft: "#3A332A" },
        gold: { DEFAULT: "#D4A853", deep: "#B8893B", cream: "#F5F0E8" },
        night: { DEFAULT: "#0D0B09", soft: "#14110D", border: "#2A2318" },
      },
      fontFamily: {
        sans: ["var(--font-jost)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-archivo)", "ui-sans-serif", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
