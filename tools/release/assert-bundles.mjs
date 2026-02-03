import fs from "node:fs";
import path from "node:path";

const targets = process.argv[2] ?? "";
const selected = new Set(
  targets
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
);

const DIST = path.resolve("dist");

const exists = (p) => fs.existsSync(p);
const stat = (p) => fs.statSync(p);

const fail = (msg) => {
  console.error(`assert-bundles: ${msg}`);
  process.exit(1);
};

const warn = (msg) => console.warn(`assert-bundles: ${msg}`);

/**
 * Minimum file sizes to detect "stub" outputs.
 * Tune as needed. These are conservative so they don't false-fail.
 */
const MIN_BYTES = {
  // Angular packages (real bundles are usually much bigger than this)
  mjs: 2_000, // 2KB: stubs are often ~900B
  dts: 200, // basic sanity
  // UI tends to be larger; we can enforce a stronger check if desired
  uiFormControls: 20_000,
};

const libDist = (name) => path.join(DIST, "libs", name);

function listFiles(dir, predicate) {
  if (!exists(dir)) return [];
  const out = [];
  const walk = (d) => {
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, ent.name);
      if (ent.isDirectory()) walk(full);
      else if (!predicate || predicate(full)) out.push(full);
    }
  };
  walk(dir);
  return out;
}

function assertAngularPackage(name, { requireFesm = true } = {}) {
  const root = libDist(name);
  if (!exists(root)) fail(`Missing dist folder: ${root}`);

  const pkgJson = path.join(root, "package.json");
  if (!exists(pkgJson)) fail(`Missing ${name} package.json in dist: ${pkgJson}`);

  const typesDir = path.join(root, "types");
  if (!exists(typesDir)) fail(`Missing ${name} types folder: ${typesDir}`);

  const dtsFiles = listFiles(typesDir, (f) => f.endsWith(".d.ts"));
  if (dtsFiles.length === 0) fail(`${name}: no .d.ts files under ${typesDir}`);

  for (const f of dtsFiles) {
    if (stat(f).size < MIN_BYTES.dts) {
      warn(`${name}: suspiciously small d.ts: ${path.relative(root, f)} (${stat(f).size} bytes)`);
    }
  }

  if (requireFesm) {
    const fesmDir = path.join(root, "fesm2022");
    if (!exists(fesmDir)) fail(`Missing ${name} fesm2022 folder: ${fesmDir}`);

    const mjsFiles = listFiles(fesmDir, (f) => f.endsWith(".mjs"));
    if (mjsFiles.length === 0) fail(`${name}: no .mjs files under ${fesmDir}`);

    for (const f of mjsFiles) {
      const size = stat(f).size;
      if (size < MIN_BYTES.mjs) {
        fail(
          `${name}: stub/suspiciously small bundle detected: ${path.relative(
            root,
            f
          )} (${size} bytes)`
        );
      }
    }
  }
}

function assertThemePackage() {
  const root = libDist("theme");
  if (!exists(root)) fail(`Missing dist folder: ${root}`);

  const pkgJson = path.join(root, "package.json");
  if (!exists(pkgJson)) fail(`Missing theme package.json in dist: ${pkgJson}`);

  // assets copied by ng-packagr
  const tokensIndex = path.join(root, "tokens", "index.css");
  if (!exists(tokensIndex)) fail(`theme: missing tokens/index.css in dist: ${tokensIndex}`);

  const tailwindPreset = path.join(root, "tailwind", "tailng.preset.cjs");
  if (!exists(tailwindPreset)) fail(`theme: missing tailwind/tailng.preset.cjs in dist: ${tailwindPreset}`);

  // optional: ensure tokens directory is not empty
  const tokensCss = listFiles(path.join(root, "tokens"), (f) => f.endsWith(".css"));
  if (tokensCss.length === 0) fail(`theme: tokens folder has no css files`);
}

function assertUiSpecific() {
  // Stronger guard for the exact pain-point bundle:
  const root = libDist("ui");
  const f = path.join(root, "fesm2022", "tociva-tailng-ui-form-controls.mjs");
  if (!exists(f)) return; // if naming differs, don't hard-fail here
  const size = stat(f).size;
  if (size < MIN_BYTES.uiFormControls) {
    fail(`ui: form-controls bundle too small (${size} bytes). Likely stub output: ${f}`);
  }
}

const wants = (t) => selected.has(t);

if (wants("cdk")) assertAngularPackage("cdk");
if (wants("icons")) assertAngularPackage("icons", { requireFesm: true });
if (wants("ui")) {
  assertAngularPackage("ui");
  assertUiSpecific();
}
if (wants("theme")) assertThemePackage();

// docs is not an npm package dist/libs/* check
console.log("assert-bundles: all selected dist outputs look sane.");