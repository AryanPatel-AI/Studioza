import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve 100% original full-resolution master files without any downsampling, resizing, or compression
    unoptimized: true,
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5001/api/:path*",
      },
    ];
  },
};

export default nextConfig;
