/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
      "./src/**/*.{html,js,jsx}",
      "./pages/**/*.{html,js,jsx}",
      "./Components/**/*.{html,js,jsx}",
  ],
  theme: {
      extend: {

      }, // Add your theme customizations here
  },
  plugins: [require("daisyui")],
});
