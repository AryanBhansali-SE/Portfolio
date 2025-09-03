// web/next.config.ts
const isProd = process.env.NODE_ENV === "production";
const repo = "Portfolio"; // <-- EXACT repo name (case-sensitive)

export default {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
};
