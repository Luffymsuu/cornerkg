import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All product imagery is served from /public/products/ — no external CDNs.
  images: {
    formats: ["image/avif", "image/webp"],
    // Match the responsive widths actually used by the storefront so the
    // built-in optimizer cache stays small.
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536],
    imageSizes: [64, 96, 128, 192, 256, 384],
  },
};

export default nextConfig;
