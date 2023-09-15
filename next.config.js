/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["placehold.jp"],
  },
  typescript: {
    tsconfigPath: "tsconfig.build.json",
  },
};

module.exports = nextConfig;
