const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.jsx",
        "./resources/**/*.vue",
    ],
    theme: {
        fontFamily: {
            inter: ["Inter", "sans-serif"],
        },
        extend: {
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            colors: {
                primary: colors.amber,
                base: colors.zinc,
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
