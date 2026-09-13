import { cp, lstat, realpath, rm, stat } from "node:fs/promises";
import { relative, resolve } from "node:path";

const root = process.cwd();
const source = resolve(root, "images");
const exportRoot = resolve(root, "out");
const destination = resolve(exportRoot, "images");

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

await requireDirectory(source, "Tracked image source");
await requireDirectory(exportRoot, "Production export");

if (relative(exportRoot, destination) !== "images") {
  throw new Error(`Refusing to replace an unexpected export path: ${destination}`);
}

try {
  const destinationDetails = await lstat(destination);
  const [sourceRealPath, destinationRealPath] = await Promise.all([
    realpath(source),
    realpath(destination),
  ]);

  if (sourceRealPath === destinationRealPath && !destinationDetails.isSymbolicLink()) {
    throw new Error("Exported images resolve to source images without a removable link");
  }

  // rm removes a directory link itself rather than traversing into its target. The
  // real-path guard above ensures a normal directory can never alias the source.
  await rm(destination, { recursive: true, force: true });
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}

await cp(source, destination, { recursive: true, force: true });

console.log("Prepared a self-contained production image tree from tracked images/ source.");
