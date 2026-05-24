import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "primary-end": "rgb(var(--color-primary-end) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-muted": "rgb(var(--color-surface-muted) / <alpha-value>)",
        "text-muted": "rgb(var(--color-text-muted) / <alpha-value>)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-primary-end)))",
      },
      fontFamily: {
        Outfit: ["var(--font-outfit)", "sans-serif"],
        Kanit: ["var(--font-kanit)", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: false,
    prefersdark: false,
    defaultTheme: "earthport",
    themes: [
      {
        earthport: {
          primary: "#2563eb",
          secondary: "#0284c7",
          accent: "#0284c7",
          neutral: "#1c1917",
          "base-100": "#ffffff",
          "base-200": "#eff6ff",
          "base-300": "#dbeafe",
        },
      },
    ],
  },
} satisfies Config;
