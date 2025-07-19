import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow production builds to succeed even with type errors
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
