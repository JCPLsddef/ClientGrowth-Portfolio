import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root to this project so Next does not infer the root from a
  // stray ~/package-lock.json and start watching all of $HOME (known local gotcha).
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
