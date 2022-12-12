const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.violet,
        gray: colors.gray,
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(({ addBase }) => {
      addBase({
        "@font-face": {
          fontFamily: "Inter var",
          fontStyle: "normal",
          fontWeight: "100 900",
          fontDisplay: "swap",
          src: "url('/Inter-roman.var.woff2?v=3.19') format('woff2')",
          fontNamedInstance: "Regular",
        },
      });
    }),
  ],
};
