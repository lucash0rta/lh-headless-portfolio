import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/links',
          destination: '/links/index.html',
        },
      ],
    }
  },
  async redirects() {
    return [
      {
        source: '/weblog',
        destination: 'https://localpiserver.tail1ff89c.ts.net',
        permanent: false,
      },
      {
        source: '/weblog/:path*',
        destination: 'https://localpiserver.tail1ff89c.ts.net/:path*',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
