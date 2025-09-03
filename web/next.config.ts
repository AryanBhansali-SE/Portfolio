// web/next.config.ts
const isProd = process.env.NODE_ENV === "production";
const repo = "Portfolio"; // must exactly match your repo name

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
};

export default nextConfig;
