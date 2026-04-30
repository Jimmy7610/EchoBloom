import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@echobloom/ai'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
