// tailwind.config.js
const {heroui} = require("@heroui/theme");
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/(select|form|listbox|divider|popover|button|ripple|spinner|scroll-shadow).js",
  ],
  theme: {
    extend: {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', ...fontFamily.sans],
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};