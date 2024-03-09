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
          typing: {
            "0%": {
              width: "0%",
              visibility: "hidden",
              
            },
            "100%": {
              width: "100%"
            }  
          },
          blink: {
            "50%": {
              borderColor: "transparent"
            },
            "100%": {
              borderColor: "green"
            }  
          },
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
          typing: "typing 2s steps(20) infinite alternate, blink .7s infinite"
        },

      }, // Add your theme customizations here
  },
  plugins: [require("daisyui"), require('tailwindcss-animated')
],
});
