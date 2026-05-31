/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#2A1622", // deep warm plum-black
          soft: "#5C4150",
          muted: "#8A7280",
        },
        // soft pink-tinted cream / backgrounds (key "blush" kept for components)
        blush: { 50: "#FFF6FA", 100: "#FFE9F3", 200: "#FDD7E9" },
        cream: { 50: "#FFF6FA", 100: "#FFE9F3", 200: "#FDD7E9" },
        // soft pinks (used for borders, strips, chips)
        sand: { 100: "#FBDDEA", 200: "#F7C2DA", 300: "#EFA6C8" },
        // primary brand — bubblegum/rose pink scale
        brand: {
          50: "#FFF1F8",
          100: "#FFE1F0",
          200: "#FEC6E1",
          300: "#FB9ACB",
          400: "#F663B0",
          500: "#ED2A8C",
          600: "#D6207E",
          700: "#AE1565",
          800: "#860F4D",
          900: "#5E0935",
        },
        // repurposed "gold" → pink so accent classes stay pink
        gold: { 400: "#F663B0", 500: "#ED2A8C", 600: "#D6207E" },
        nude: { 300: "#FCDDEB", 400: "#F8B9D5", 500: "#EF8FBC", 600: "#E573AA" },
        // deep magenta accents
        mocha: { 500: "#C42E92", 600: "#A81E78", 700: "#7E125A" },
        plum: "#B5179E",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        script: ["var(--font-sacramento)", "cursive"],
      },
      boxShadow: {
        soft: "0 10px 40px -14px rgba(190, 30, 110, 0.18)",
        glow: "0 20px 55px -20px rgba(237, 42, 140, 0.40)",
        card: "0 26px 60px -30px rgba(42, 22, 34, 0.20)",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(125deg, #D6207E 0%, #B5179E 55%, #7E125A 100%)",
        "gold-gradient": "linear-gradient(90deg, #ED2A8C 0%, #D6207E 100%)",
        "blush-radial":
          "radial-gradient(60% 60% at 50% 0%, #FFE1F0 0%, #FFF6FA 70%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.9s ease both",
        float: "float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
