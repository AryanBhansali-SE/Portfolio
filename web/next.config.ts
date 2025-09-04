import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repo = "Portfolio"; // must exactly match your repo name

const nextConfig: NextConfig = {
  output: "export", // ensures static export
  images: {
    unoptimized: true, // needed for export with next/image
  },
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
};

export default nextConfig;
