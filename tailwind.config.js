/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontWeight: {
        light: '300',  // Add light weight if necessary
        normal: '400',
        medium: '500',
        bold: '600',
      },
      colors: {
        mainColor: "#026980",
        secoundColor: "#FFFFFF",
        thirdColor: "#F8F9FA",
        fouthColor:"#F0F2F5",
        fithColor:"#848181",
      },
      backgroundColor: {
        mainBgColor: "#E5E5E5",
        secoundBgColor: "#F5F5F5",
        thirdBgColor: "#9D9D9D",
        AddButton: "#ffffff",
      },
      screens: {
        sm: "320px",
        md: "640px",
        lg: "740px",
        xl: "1280px",
        // "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
