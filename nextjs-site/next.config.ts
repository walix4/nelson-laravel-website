import type { NextConfig } from "next";

// Static export for the GitHub-Pages preview (served under /nelson-laravel-website/<PREVIEW_PATH>/).
// PREVIEW_PATH defaults to "next"; set e.g. PREVIEW_PATH=draytoll for a second preview.
const isProdPreview = process.env.PREVIEW === "1";
const previewPath = process.env.PREVIEW_PATH || "next";
const base = isProdPreview ? `/nelson-laravel-website/${previewPath}` : "";

// drayagerate.net's Apache vhost reverse-proxies /_next to a separate admin Next.js app
// on :3003. To avoid that collision, the live marketing export serves its bundled assets
// from a non-/_next prefix (set ASSET_PREFIX=/_assets at build time for the live deploy).
const assetPrefix = isProdPreview ? base : process.env.ASSET_PREFIX || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: base || undefined,
  assetPrefix: assetPrefix || undefined,
  env: { NEXT_PUBLIC_BASE: base },
};

export default nextConfig;
