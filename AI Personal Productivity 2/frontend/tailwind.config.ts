import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#030014", // Deep space blue/black
        surface: {
          1: "rgba(255, 255, 255, 0.03)",
          2: "rgba(255, 255, 255, 0.05)",
          3: "rgba(255, 255, 255, 0.08)",
        },
        primary: {
          DEFAULT: "#38bdf8", // Sky blue
          glow: "#38bdf8",
        },
        accent: {
          purple: "#a855f7",
          pink: "#ec4899",
          emerald: "#10b981",
        }
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "fade-in-up": "fadeInUp 0.7s ease-out forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
