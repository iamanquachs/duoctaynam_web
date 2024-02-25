const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/flowbite/**/*.js",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand_Regular"],
        quicksand_semibold: ["Quicksand_SemiBold"],
        quicksand_bold: ["Quicksand_Bold"],
        inter: ["Inter-Regular"],
        inter_semibold: ["Inter-SemiBold"],
        inter_bold: ["Inter-Bold"],
      },
    },
    screens: {
      mobile: { max: "767px" },
      ip678: { min: "375px", max: "375px" },
      ipx: { min: "376px", max: "411px" },
      ip12mini: { min: "360px", max: "374px" },
      galaxy: { min: "412px", max: "767px" },
      minmb: { min: "500px", max: "562px" },
      minmb2: { min: "450px", max: "499px" },
      minmb3: { min: "400px", max: "449px" },
      minmb4: { min: "350px", max: "399px" },

      // => @media ( max-width: 767px) { ... }

      tablet: { min: "768px", max: "1024px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }
      mintablet: { min: "836", max: "1023px" },

      smlap: { min: "1025px", max: "1279px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      minlap: { min: "1200px", max: "1279px" },

      lglap: { min: "1280px", max: "1535px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      fullscreen: { min: "1536px" },
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [
    require("tw-elements/dist/plugin"),
    require("@tailwindcss/line-clamp"),
    require("flowbite/plugin"),
  ],
});
