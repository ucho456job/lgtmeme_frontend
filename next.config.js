/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: [
      "placehold.jp",
      "clilsxztvvlfnlqdwbsa.supabase.co",
      "vaznmnhnwfkbgorhmlbi.supabase.co",
    ],
  },
  typescript: {
    tsconfigPath: "tsconfig.build.json",
  },
};

module.exports = nextConfig;
