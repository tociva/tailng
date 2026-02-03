import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const targets = process.argv[2] ?? "";
const selected = targets
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const dist = path.resolve("dist", "libs");

const isLib = (t) => ["cdk", "ui", "icons", "theme"].includes(t);

for (const t of selected) {
  if (!isLib(t)) continue;
  const dir = path.join(dist, t);
  if (!fs.existsSync(dir)) {
    console.error(`npm-pack-dry-run: missing dist folder ${dir}`);
    process.exit(1);
  }

  console.log(`\n--- npm pack --dry-run: ${t} ---`);
  execSync("npm pack --dry-run", { cwd: dir, stdio: "inherit" });
}

console.log("npm-pack-dry-run: completed for selected packages.");