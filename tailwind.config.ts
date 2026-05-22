// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",

  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",

        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          hover: "rgb(var(--card-hover) / <alpha-value>)",
        },

        border: "rgb(var(--border) / <alpha-value>)",

        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          hover: "rgb(var(--primary-hover) / <alpha-value>)",
          soft: "rgb(var(--primary-soft) / <alpha-value>)",
        },

        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
        info: "rgb(var(--info) / <alpha-value>)",

        text: {
          primary: "rgb(var(--text-primary) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
          muted: "rgb(var(--text-muted) / <alpha-value>)",
        },

        glass: "rgb(var(--glass) / <alpha-value>)",
        overlay: "rgb(var(--overlay) / <alpha-value>)",
      },

      boxShadow: {
        soft: "0 4px 30px rgba(0,0,0,0.08)",
        glow: "0 0 40px rgba(124,92,255,0.25)",
      },

      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
    },
  },

  plugins: [],
};

export default config;