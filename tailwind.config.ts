import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-background)",
        surface: "var(--color-surface)",
        primary: "var(--color-primary)",
        gold: "var(--color-gold)",
        rose: "var(--color-rose)",
        sage: "var(--color-sage)",
        sky: "var(--color-sky)",
        ink: "var(--color-text)",
        muted: "var(--color-muted)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Nunito", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Nunito", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
        serif: ["var(--font-display)", "Nunito", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
