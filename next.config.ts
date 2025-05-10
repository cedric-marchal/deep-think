import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  //serverComponentsExternalPackages: ["@prisma/client"],
  transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
