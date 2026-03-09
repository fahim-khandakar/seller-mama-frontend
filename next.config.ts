import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Ei line ta add koro
      },
      {
        protocol: "https",
        hostname: "cdn.worldvectorlogo.com", // Ager barer jonno
      },
    ],
  },
};

export default nextConfig;
