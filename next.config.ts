import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('http://localhost:3000/**'),
      new URL('https://qr-service.rabeh.sy/**')
    ],
  },
};

export default nextConfig;
