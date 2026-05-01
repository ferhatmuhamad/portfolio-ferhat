import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.{ts,tsx,js,jsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
            screens: { "2xl": "1280px" },
        },
        extend: {
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
                display: [
                    '"Clash Display"',
                    "Inter",
                    ...defaultTheme.fontFamily.sans,
                ],
                mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
            },
            colors: {
                ink: {
                    950: "#08080c",
                    900: "#0a0a10",
                    800: "#101018",
                    700: "#15151f",
                    600: "#1c1c28",
                    500: "#262633",
                    400: "#3a3a4a",
                    300: "#5a5a6e",
                    200: "#9a9ab0",
                    100: "#c8c8d4",
                    50: "#f1f1f5",
                },
                cream: { 50: "#fbf8f3", 100: "#f5f1ea", 200: "#ece5d6" },
                brand: {
                    50: "#fff7ec",
                    100: "#ffecd0",
                    200: "#ffd6a0",
                    300: "#ffb866",
                    400: "#ff9a3a",
                    500: "#ff7a1a",
                    600: "#f05a0a",
                    700: "#c7420a",
                    800: "#9c350f",
                    900: "#7e2c10",
                },
                sun: {
                    300: "#ffe48a",
                    400: "#ffd166",
                    500: "#fbbf24",
                    600: "#e09e0a",
                },
            },
            backgroundImage: {
                "glow-radial":
                    "radial-gradient(circle at 50% 0%, rgba(255,122,26,0.18), transparent 60%)",
                "brand-gradient":
                    "linear-gradient(135deg, #ff7a1a 0%, #ffd166 100%)",
                "brand-gradient-soft":
                    "linear-gradient(135deg, rgba(255,122,26,0.18) 0%, rgba(255,209,102,0.18) 100%)",
                "glass-border":
                    "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.02) 60%, rgba(255,255,255,0.14))",
            },
            boxShadow: {
                glass: "0 8px 32px 0 rgba(0,0,0,0.45), inset 0 1px 0 0 rgba(255,255,255,0.08)",
                "glass-lg":
                    "0 20px 60px -10px rgba(0,0,0,0.6), inset 0 1px 0 0 rgba(255,255,255,0.1)",
                glow: "0 0 40px -8px rgba(255,122,26,0.5)",
                "glow-lg": "0 0 80px -10px rgba(255,122,26,0.6)",
            },
            keyframes: {
                "fade-in-up": {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "pulse-ring": {
                    "0%": { transform: "scale(.9)", opacity: ".7" },
                    "80%, 100%": { transform: "scale(1.6)", opacity: "0" },
                },
                shine: {
                    "0%": { backgroundPosition: "200% 0" },
                    "100%": { backgroundPosition: "-200% 0" },
                },
                marquee: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-8px)" },
                },
            },
            animation: {
                "fade-in-up": "fade-in-up 0.6s ease-out both",
                "pulse-ring":
                    "pulse-ring 1.8s cubic-bezier(.4,0,.6,1) infinite",
                shine: "shine 3s linear infinite",
                marquee: "marquee 30s linear infinite",
                float: "float 4s ease-in-out infinite",
            },
        },
    },
    plugins: [forms, typography, animate],
};
