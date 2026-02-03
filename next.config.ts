import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Catch-all rewrite for PartyKit
  async rewrites() {
    return [
      {
        source: "/party/:path*",
        destination: "http://127.0.0.1:1999/party/:path*",
      },
    ];
  },
};

export default nextConfig;
