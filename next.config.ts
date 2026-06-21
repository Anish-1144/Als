import type { NextConfig } from "next";

function getApiUrl(): string {
  if (process.env.API_URL) {
    return process.env.API_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api-backend`;
  }
  return "http://localhost:4000";
}

const apiUrl = getApiUrl();

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiUrl}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
