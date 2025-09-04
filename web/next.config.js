/** @type {import('next').NextConfig} */

const isCI = process.env.GITHUB_ACTIONS === "true";
const base = isCI ? "/Portfolio" : "";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: base,
  assetPrefix: base ? `${base}/` : undefined,
  trailingSlash: true,
  outputFileTracingRoot: __dirname,
};

module.exports = nextConfig;
