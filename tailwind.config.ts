import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          dark: "#051610",
          deep: "#081e17",
          forest: "#0b261e",
          card: "#0d2e24",
          cardHover: "#113b2f",
          border: "rgba(229, 183, 88, 0.22)",
          borderHover: "rgba(229, 183, 88, 0.55)",
          gold: "#e5b758",
          goldLight: "#f7d983",
          goldDark: "#c69634",
          goldAccent: "#dfa83b",
          sage: "#a0b5ab",
          muted: "#788f85",
        },
      },
      boxShadow: {
        gold: "0 0 25px -5px rgba(229, 183, 88, 0.25)",
        goldGlow: "0 0 40px -8px rgba(229, 183, 88, 0.35)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #f7d983 0%, #e5b758 50%, #c69634 100%)",
        "gold-gradient-hover": "linear-gradient(135deg, #fae29c 0%, #f0c365 50%, #d4a340 100%)",
        "dark-radial": "radial-gradient(circle at 50% 20%, #0d382c 0%, #081e17 60%, #051610 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
