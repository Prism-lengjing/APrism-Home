import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'q1.qlogo.cn',
      },
      {
        protocol: 'https',
        hostname: 'q.qlogo.cn',
      },
      {
        protocol: 'http',
        hostname: 'q1.qlogo.cn',
      },
      {
        protocol: 'http',
        hostname: 'q.qlogo.cn',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
