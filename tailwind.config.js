module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    // fontFamily: {
    //   gilory: ["Gilory", "ui-sans-serif", "system-ui"],
    //   apparel: ["Apparel", "ui-sans-serif", "system-ui"],
    // },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        primary: "#123",
        transparent: "transparent",
        current: "current",
        white: "#ffffffff",
        black: "#00000000",
        success: "#5a5",
        error: "#a55",
      },
    },
  },
  plugins: [require("daisyui")],
};
