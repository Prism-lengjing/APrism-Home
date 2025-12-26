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
      {
        protocol: 'https',
        hostname: 'assets.vercel.com',
      },
      {
        protocol: 'https',
        hostname: 'tailwindcss.com',
      },
      {
        protocol: 'https',
        hostname: '*.amethyst.ltd',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '*.tailwindcss.cn',
      },
      {
        protocol: 'https',
        hostname: '*.furcraft.top',
      },
      {
        protocol: 'https',
        hostname: 'furcraft.top',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
