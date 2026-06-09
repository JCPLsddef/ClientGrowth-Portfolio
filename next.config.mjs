import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root to this project so Next does not infer the root from a
  // stray ~/package-lock.json and start watching all of $HOME (known local gotcha).
  outputFileTracingRoot: __dirname,
  images: {
    // Client logos are served from the Client Growth Wix media library and
    // resized/optimized by Next's image pipeline at request time.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
