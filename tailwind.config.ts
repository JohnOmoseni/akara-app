import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        input: "var(--input)",
        ring: "var(--ring)",
        placeholder: "var(--placeholder)",
        white: "var(--white)",
        border: {
          "100": "var(--border-100)",
          DEFAULT: "var(--border)",
          variant: "var(--border-variant)",
        },
        background: {
          "100": "var(--background-100)",
          DEFAULT: "var(--background)",
          skeleton: "var(--skeleton)",
        },
        foreground: {
          "100": "var(--foreground-100)",
          DEFAULT: "var(--foreground)",
          variant: "var(--foreground-variant)",
        },
        secondary: {
          "100": "var(--secondary-100)",
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        grey: {
          "100": "var(--grey-100)",
          "200": "var(--grey-200)",
          DEFAULT: "var(--grey)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        inter: ["Inter", "Arial", "sans-serif"],
      },
      fontSize: {
        sm: "0.8rem",
        subtitle: ["clamp(0.9rem, 3vw, 1rem)", { lineHeight: "1.2" }],
        secondaryFont: ["clamp(1.2rem, 3vw, 24px) ", { lineHeight: "1.2" }],
        primaryFont: ["clamp(2.2rem, 5vw, 36px)", { lineHeight: "1.2" }],
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        ".clip-circle ": {
          clipPath: "circle()",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
} satisfies Config;

export default config;
