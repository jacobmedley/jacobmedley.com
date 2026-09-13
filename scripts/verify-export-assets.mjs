import { createHash } from "node:crypto";
import { readdir, readFile, stat } from "node:fs/promises";
import { extname, join, relative, resolve, sep } from "node:path";

const root = process.cwd();
const sourceRoot = join(root, "images");
const exportRoot = join(root, "out");
const exportedImageRoot = join(exportRoot, "images");
const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".map",
  ".svg",
  ".txt",
  ".webmanifest",
  ".xml",
]);
const representativeReferences = [
  "/images/icons/favicon-32x32.png",
  "/images/brand/SVG/jm-icon-full-brand-prime.svg",
  "/images/work/WebMD-HM.png",
  "/images/work/webmd-modal/home-dt.png",
];

function toPosix(path) {
  return path.split(sep).join("/");
}

async function requireDirectory(path, label) {
  let details;

  try {
    details = await stat(path);
  } catch {
    throw new Error(`${label} is missing: ${path}`);
  }

  if (!details.isDirectory()) {
    throw new Error(`${label} is not a directory: ${path}`);
  }
}

async function listFiles(directory) {
  const files = [];
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listFiles(absolutePath)));
    } else if (entry.isFile()) {
      files.push(absolutePath);
    }
  }

  return files;
}

async function sha256(path) {
  return createHash("sha256").update(await readFile(path)).digest("hex");
}

function relativePathForReference(reference) {
  const normalized = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
  const relativePath = normalized.replace(/^\/images\//, "");
  const destination = resolve(exportedImageRoot, relativePath);
  const allowedRoot = `${resolve(exportedImageRoot)}${sep}`;

  if (!destination.startsWith(allowedRoot)) {
    throw new Error(`Unsafe image reference in production export: ${reference}`);
  }

  return toPosix(relativePath);
}

await requireDirectory(sourceRoot, "Tracked image source");
await requireDirectory(exportRoot, "Production export");
await requireDirectory(exportedImageRoot, "Exported image tree");

const sourceFiles = await listFiles(sourceRoot);
const exportedFiles = await listFiles(exportedImageRoot);
const sourceRelativePaths = sourceFiles.map((path) => toPosix(relative(sourceRoot, path))).sort();
const exportedRelativePaths = exportedFiles
  .map((path) => toPosix(relative(exportedImageRoot, path)))
  .sort();
const sourceSet = new Set(sourceRelativePaths);
const exportedSet = new Set(exportedRelativePaths);
const missingFromExport = sourceRelativePaths.filter((path) => !exportedSet.has(path));
const unexpectedInExport = exportedRelativePaths.filter((path) => !sourceSet.has(path));
const contentMismatches = [];

for (const relativePath of sourceRelativePaths) {
  if (!exportedSet.has(relativePath)) continue;

  const [sourceHash, exportedHash] = await Promise.all([
    sha256(join(sourceRoot, relativePath)),
    sha256(join(exportedImageRoot, relativePath)),
  ]);

  if (sourceHash !== exportedHash) contentMismatches.push(relativePath);
}

const exportFiles = await listFiles(exportRoot);
const activeReferences = new Set();
const imageReferencePattern = /\/images\/[A-Za-z0-9._~!$&'*+,;=:@%/-]+/g;

for (const path of exportFiles) {
  if (path.startsWith(`${exportedImageRoot}${sep}`)) continue;
  if (!textExtensions.has(extname(path).toLowerCase())) continue;

  const content = await readFile(path, "utf8");

  for (const match of content.matchAll(imageReferencePattern)) {
    activeReferences.add(match[0]);
  }
}

const absentReferences = [];

for (const reference of [...activeReferences, ...representativeReferences]) {
  try {
    if (!exportedSet.has(relativePathForReference(reference))) {
      absentReferences.push(reference);
    }
  } catch {
    absentReferences.push(reference);
  }
}

const absentRepresentativeReferences = representativeReferences.filter(
  (reference) => !activeReferences.has(reference),
);
const failures = [];

if (missingFromExport.length > 0) {
  failures.push(`missing source files: ${missingFromExport.join(", ")}`);
}
if (unexpectedInExport.length > 0) {
  failures.push(`unexpected exported files: ${unexpectedInExport.join(", ")}`);
}
if (contentMismatches.length > 0) {
  failures.push(`content mismatches: ${contentMismatches.join(", ")}`);
}
if (activeReferences.size === 0) {
  failures.push("no active /images references were found in the production export");
}
if (absentRepresentativeReferences.length > 0) {
  failures.push(
    `representative active references were not emitted: ${absentRepresentativeReferences.join(", ")}`,
  );
}
if (absentReferences.length > 0) {
  failures.push(`referenced files absent from export: ${[...new Set(absentReferences)].join(", ")}`);
}

if (failures.length > 0) {
  throw new Error(`Production image verification failed:\n- ${failures.join("\n- ")}`);
}

console.log(
  `Verified ${exportedFiles.length} exported images against tracked source and ${activeReferences.size} active production references.`,
);
