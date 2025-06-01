import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      md2: "880px",
      lg: "1024px",
      l: "1120px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1660px",
      "4xl": "500px",
      "5xl": "1511px",
    },
    extend: {
      colors: {
        primary: "#D9C6A5",
        gray:"#0000009c"
       
       
      },
    },
  },
  plugins: [],
} satisfies Config;
