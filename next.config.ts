import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://cdn.sanity.io/**")],
  },
  async redirects() {
    return [
      // Consolidate ranking signals on the apex domain.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.famedia.co.in" }],
        destination: "https://famedia.co.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
