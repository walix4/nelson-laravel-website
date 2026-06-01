import type { NextConfig } from "next";

// Static export for the GitHub-Pages preview (served under /nelson-laravel-website/next/).
// For a real deploy to drayagerate.net (Node), set PREVIEW unset and drop output/basePath.
const isProdPreview = process.env.PREVIEW === "1";
const base = isProdPreview ? "/nelson-laravel-website/next" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: base || undefined,
  assetPrefix: base || undefined,
  env: { NEXT_PUBLIC_BASE: base },
};

export default nextConfig;
