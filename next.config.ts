import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "propertyla-upload-bucket-2026.s3.ap-southeast-2.amazonaws.com",
      "propertyla-server-production.up.railway.app",
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
