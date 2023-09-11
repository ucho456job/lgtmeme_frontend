import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/components/**/*.{ts,tsx,js,jsx}", "./src/app/**/*.{ts,tsx,js,jsx}"],

  // Files to exclude
  exclude: [],

  jsxFramework: "react",

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          BLACK: { value: "#292524" },
          WHITE: { value: "#fff" },
          GHOUST_WHITE: { value: "#fafafa" },
          RED: { value: "#ef4444" },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
