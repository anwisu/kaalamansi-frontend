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
        keyframes: {
          slidein: {
            from: {
              opacity: "0",
              transform: "translateY(-10px)",
            },
            to: {
              opacity: "1",
              transform: "translateY(0)",
            },
          },
        },
        animation: {
          slidein: "slidein 1s ease 300ms",
        },

      }, // Add your theme customizations here
  },
  plugins: [require("daisyui")],
});
