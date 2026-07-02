/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#F8FAFC",
        midnight: "#F1F5F9",
        surface: "#FFFFFF",
        violet: {
          DEFAULT: "#6366F1",
          dim: "#4F46E5",
          glow: "#4F46E5",
        },
        cyan: { DEFAULT: "#06B6D4" },
        mist: "#475569",
      },
      fontFamily: {
        display: ["'Sora'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(124, 92, 255, 0.35)",
        card: "0 20px 60px -15px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, #0B0E1A), repeating-linear-gradient(0deg, rgba(124,92,255,0.06) 0px, rgba(124,92,255,0.06) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(124,92,255,0.06) 0px, rgba(124,92,255,0.06) 1px, transparent 1px, transparent 40px)",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(2400%)", opacity: "0" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        scan: "scan 3.5s ease-in-out infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};