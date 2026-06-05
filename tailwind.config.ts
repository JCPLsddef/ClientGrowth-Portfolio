import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        marble: { DEFAULT: "#F6F2EB", deep: "#ECE6DB" },
        ink: { DEFAULT: "#14110D", soft: "#3A332A" },
        gold: { DEFAULT: "#D4A853", deep: "#B8893B", cream: "#F5F0E8" },
        // Charcoal elevation layers (Chiang's 3-tier dark surfaces) so dark
        // sections gain depth without a second color.
        night: {
          DEFAULT: "#0D0B09",
          soft: "#14110D",
          raised: "#1B1610",
          border: "#2A2318",
        },
        // Single cool secondary, used sparingly alongside gold (the juanmora
        // two-color restraint). Reserved for small craft accents, not body.
        azure: { DEFAULT: "#5B8CFF", soft: "#8FB0FF", deep: "#3B63D9" },
      },
      fontFamily: {
        sans: ["var(--font-jost)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-archivo)", "ui-sans-serif", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
