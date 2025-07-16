import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol:"https",
        hostname:'image.tmdb.org',
        // pathname: '/t/p/w500/**'
      }
    ],
    domains: ['static.vecteezy.com']//for no image,
  },
};

export default nextConfig;
