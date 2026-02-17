// Replaces symlinks with real file copies before npm pack
// npm doesn't follow symlinks in the files field

import {
  readdirSync,
  lstatSync,
  readlinkSync,
  rmSync,
  cpSync,
  realpathSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

function resolveDir(dir) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const full = join(dir, entry);
    const stat = lstatSync(full);
    if (stat.isSymbolicLink()) {
      const real = realpathSync(full);
      const targetStat = lstatSync(real);
      rmSync(full);
      cpSync(real, full, {
        recursive: targetStat.isDirectory(),
      });
      console.log(`  resolved: ${entry}`);
    }
  }
}

console.log("Resolving symlinks for npm pack...");
console.log("Skills:");
resolveDir(join(ROOT, "skills"));
console.log("Agents:");
resolveDir(join(ROOT, "agents"));
console.log("Done.");
