import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';
const repo = 'Portfolio'; // <-- EXACT repo name

const nextConfig: NextConfig = {
  output: 'export',                // needed for static export
  images: { unoptimized: true },   // disable server-side optimizer
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
};

export default nextConfig;
