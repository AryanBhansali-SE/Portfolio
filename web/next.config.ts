const isProd = process.env.NODE_ENV === "production";
const repo = "Portfolio"; // exact repo name

export default {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
};
