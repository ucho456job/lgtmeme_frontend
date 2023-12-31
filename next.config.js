/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "production" ? false : true,
});
module.exports = withPWA({
  output: "standalone",
  images: {
    domains: [
      "localhost",
      "placehold.jp",
      "clilsxztvvlfnlqdwbsa.supabase.co",
      "vaznmnhnwfkbgorhmlbi.supabase.co",
    ],
  },
  typescript: {
    tsconfigPath: "tsconfig.build.json",
  },
});
