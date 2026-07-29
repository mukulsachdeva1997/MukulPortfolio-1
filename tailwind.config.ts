import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        "ring-spin": {
          to: {
            transform: "rotate(360deg)",
          },
        },
        "eq-bar": {
          "0%, 100%": {
            height: "4px",
          },
          "50%": {
            height: "18px",
          },
        },
        "cursor-blink": {
          "50%": {
            opacity: "0",
          },
        },
        "banner-tip": {
          "0%, 100%": { transform: "rotate(-7deg)" },
          "50%": { transform: "rotate(7deg)" },
        },
        "banner-orbit-dash": {
          to: { strokeDashoffset: "-180" },
        },
        "banner-levitate": {
          "0%, 100%": { transform: "translateY(-2.5px)" },
          "50%": { transform: "translateY(2.5px)" },
        },
        "banner-ripple": {
          "0%": { transform: "translate(-50%, -50%) scale(0.75)", opacity: "0.7" },
          "100%": { transform: "translate(-50%, -50%) scale(1.5)", opacity: "0" },
        },
        "banner-chart-bar": {
          from: { transform: "scaleY(0.85)" },
          to: { transform: "scaleY(1.18)" },
        },
        "exp-travel": {
          from: { top: "-70px" },
          to: { top: "100%" },
        },
        "exp-ripple": {
          "0%": { transform: "scale(0.7)", opacity: "0.8" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
        "skill-reveal": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "ask-ring-pulse": {
          "0%": { transform: "scale(1)", opacity: "0.5" },
          "75%, 100%": { transform: "scale(1.3)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "ring-spin": "ring-spin 4s linear infinite",
        "eq-bar": "eq-bar 0.9s ease-in-out infinite",
        "cursor-blink": "cursor-blink 1s step-end infinite",
        "banner-tip": "banner-tip 3.4s ease-in-out infinite",
        "banner-orbit-dash": "banner-orbit-dash 14s linear infinite",
        "banner-levitate": "banner-levitate 3s ease-in-out infinite",
        "banner-ripple": "banner-ripple 3s ease-out infinite",
        "banner-chart-bar": "banner-chart-bar 1.9s ease-in-out infinite alternate",
        "exp-travel": "exp-travel 3.2s linear infinite",
        "exp-ripple": "exp-ripple 2.6s ease-out infinite",
        "skill-reveal": "skill-reveal 0.4s ease-out forwards",
        "ask-ring-pulse": "ask-ring-pulse 2.8s cubic-bezier(0,0,0.2,1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
