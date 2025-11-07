import colors from "tailwindcss/colors";

export default {
    darkMode: "class",
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./lib/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: colors.indigo,
                secondary: colors.slate,
                accent: colors.blue,
            },
            fontFamily: {
                brand: ["var(--font-sora)", "sans-serif"],
            }
        },
    },
    plugins: [],
};