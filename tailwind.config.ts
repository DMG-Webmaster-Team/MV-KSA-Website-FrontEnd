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
      fontSize: {
        "5xl": ["3rem", { lineHeight: "1.2" }],
      },
      colors: {
        primary: "#001A70",
        gray: "#F6F6F6",
        gray2: "#EAEAEA",
        darkblue: "#000F3D",
        yellow: "#FAC63E",
        beige: "#F1EEE8",
        CoolGray: "#EDF1F4",
        DarkGray: "#777777",
        Gray03: "#CDCDCD",
        Gray04: "#E3E3E3",
        Gray05: "#F2F2F2",
        Gold: "#E2B162"
      },
    },
  },
  plugins: [],
} satisfies Config;
