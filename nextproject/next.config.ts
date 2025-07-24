import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/inspeccion',
        destination: '/presentation/inspeccion',
      },
      {
        source: '/desempeno',
        destination: '/presentation/desempeno',
      },
    ];
  },
};

export default nextConfig;
