const targets = (process.argv[2] ?? "").trim();
const releaseType = (process.argv[3] ?? "").trim();

const VALID = new Set(["cdk", "theme", "icons", "ui", "docs"]);

if (!targets) {
  console.error("ERROR: targets is empty");
  process.exit(1);
}

// Check for spaces in the targets string (after trimming)
if (targets.includes(" ")) {
  console.error("ERROR: targets must not contain spaces. Example: cdk,ui,docs");
  console.error(`Received: "${targets}"`);
  process.exit(1);
}

const list = targets.split(",").filter(Boolean);
if (list.length === 0) {
  console.error("ERROR: targets is empty after parsing");
  process.exit(1);
}

const dedup = new Set(list);
if (dedup.size !== list.length) {
  console.error(`ERROR: targets contains duplicates: ${targets}`);
  process.exit(1);
}

for (const t of list) {
  if (!VALID.has(t)) {
    console.error(`ERROR: Invalid target '${t}'. Valid: ${[...VALID].join(", ")}`);
    process.exit(1);
  }
}

if (!["minor", "major"].includes(releaseType)) {
  console.error(`ERROR: Invalid release_type '${releaseType}'. Use minor|major`);
  process.exit(1);
}

console.log(`OK: targets=${targets}`);
console.log(`OK: release_type=${releaseType}`);