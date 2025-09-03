// web/next.config.ts
const isProd = process.env.NODE_ENV === "production";
const repo = "Portfolio"; // <-- replace with your repo name (case sensitive)

export default {
  output: "export",
  images: { unoptimized: true },
  // For *project pages* (https://username.github.io/<repo>), we need a basePath/assetPrefix in production.
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
};
