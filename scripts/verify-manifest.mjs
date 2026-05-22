import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const manifest = JSON.parse(readFileSync(join(root, "integrations.manifest.json"), "utf8"));
const packageLock = JSON.parse(readFileSync(join(root, "package-lock.json"), "utf8"));
const tsconfig = JSON.parse(readFileSync(join(root, "tsconfig.json"), "utf8"));

const failures = [];

function fail(message) {
  failures.push(message);
}

if (!Array.isArray(manifest.packages) || manifest.packages.length === 0) {
  fail("manifest.packages must be a non-empty array");
}

const workspacePackages = readdirSync(join(root, "packages"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => `packages/${entry.name}`)
  .filter((path) => existsSync(join(root, path, "package.json")))
  .sort();

const manifestPaths = new Set((manifest.packages ?? []).map((entry) => entry.path));
const manifestNames = new Set();
const tsconfigReferences = new Set((tsconfig.references ?? []).map((reference) => reference.path));

for (const packagePath of workspacePackages) {
  if (!manifestPaths.has(packagePath)) {
    fail(`${packagePath}: workspace package is missing from integrations.manifest.json`);
  }
  if (!tsconfigReferences.has(packagePath)) {
    fail(`${packagePath}: workspace package is missing from tsconfig.json references`);
  }
}

for (const referencePath of tsconfigReferences) {
  if (!workspacePackages.includes(referencePath)) {
    fail(`${referencePath}: tsconfig reference does not point at a workspace package`);
  }
}

for (const entry of manifest.packages ?? []) {
  if (!entry.name || !entry.path) {
    fail(`manifest package entry is missing name/path: ${JSON.stringify(entry)}`);
    continue;
  }
  if (manifestNames.has(entry.name)) {
    fail(`${entry.name}: duplicate manifest package name`);
  }
  manifestNames.add(entry.name);
  if (!workspacePackages.includes(entry.path)) {
    fail(`${entry.name}: manifest path is not a workspace package: ${entry.path}`);
  }

  const packageJsonPath = join(root, entry.path, "package.json");
  const sourcePath = join(root, entry.path, "src", "index.ts");
  if (!existsSync(packageJsonPath)) {
    fail(`${entry.name}: missing ${entry.path}/package.json`);
    continue;
  }
  if (!existsSync(sourcePath)) {
    fail(`${entry.name}: missing ${entry.path}/src/index.ts`);
    continue;
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  if (packageJson.name !== entry.name) {
    fail(`${entry.name}: package.json name is ${packageJson.name}`);
  }

  const lockEntry = packageLock.packages?.[entry.path];
  if (!lockEntry) {
    fail(`${entry.name}: missing package-lock entry for ${entry.path}`);
  } else if (lockEntry.name !== entry.name) {
    fail(`${entry.name}: package-lock name is ${lockEntry.name}`);
  }

  const source = readFileSync(sourcePath, "utf8");
  for (const toolName of entry.tools ?? []) {
    if (!source.includes(`name: "${toolName}"`) && !source.includes(`name: '${toolName}'`)) {
      fail(`${entry.name}: declared tool ${toolName} was not found in src/index.ts`);
    }
  }

  const distPath = join(root, entry.path, "dist", "index.js");
  if (!existsSync(distPath)) {
    fail(`${entry.name}: missing built output ${relative(root, distPath)}`);
  }
}

if (failures.length > 0) {
  console.error("Manifest verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Verified ${manifest.packages.length} integration packages.`);
