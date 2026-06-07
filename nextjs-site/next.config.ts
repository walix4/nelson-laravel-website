import type { NextConfig } from "next";

// Static export for the GitHub-Pages preview (served under /nelson-laravel-website/next/).
// For a real deploy to drayagerate.net (Node), set PREVIEW unset and drop output/basePath.
const isProdPreview = process.env.PREVIEW === "1";
const base = isProdPreview ? "/nelson-laravel-website/next" : "";
// Live deploy (drayagerate.net): build with ASSET_PREFIX=/_assets so the /_next chunks
// are referenced under /_assets/_next and don't collide with the admin app proxied at /_next.
const assetPrefix = isProdPreview ? base : (process.env.ASSET_PREFIX || "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: base || undefined,
  assetPrefix: assetPrefix || undefined,
  env: { NEXT_PUBLIC_BASE: base },
};

export default nextConfig;
