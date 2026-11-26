import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const assets = JSON.parse(
  readFileSync(resolve(root, "src/data/assets.json"), "utf8"),
);
const missing = Object.entries(assets).filter(
  ([, asset]) =>
    !asset.src.startsWith("/assets/") ||
    !existsSync(resolve(root, "public", asset.src.slice(1))) ||
    !(asset.width > 0 && asset.height > 0),
);
if (missing.length)
  throw new Error(
    `Invalid or missing café assets: ${missing.map(([name]) => name).join(", ")}`,
  );
console.log(
  `Verified ${Object.keys(assets).length} bundled café images and their dimensions.`,
);
