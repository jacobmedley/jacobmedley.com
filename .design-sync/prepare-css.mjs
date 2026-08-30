// design-sync helper: Next.js emits its compiled CSS under a content-hashed
// filename (.next/static/css/<hash>.css), which the raw source
// (app/globals.css) can't stand in for — the raw file still has an
// unresolved `@import "tailwindcss";` that only a Tailwind build resolves
// into real custom properties + utility classes. This script copies the
// compiled output to a stable path so cfg.cssEntry can point at something
// that doesn't change name on every build.
//
// Run via cfg.buildCmd ("npm run build && node .design-sync/prepare-css.mjs")
// before the design-sync converter. Output is gitignored cache
// (.design-sync/.cache/), regenerated every run — never committed.

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const CSS_DIR = '.next/static/css';
const OUT = '.design-sync/.cache/compiled-globals.css';

if (!existsSync(CSS_DIR)) {
  console.error(`[prepare-css] ${CSS_DIR} doesn't exist — run "npm run build" first.`);
  process.exit(1);
}

const files = readdirSync(CSS_DIR).filter((f) => f.endsWith('.css'));
if (!files.length) {
  console.error(`[prepare-css] no .css files found in ${CSS_DIR}.`);
  process.exit(1);
}

// Next may split into multiple chunk CSS files; concatenate all of them so
// nothing compiled gets left out.
const combined = files.map((f) => readFileSync(join(CSS_DIR, f), 'utf8')).join('\n');

mkdirSync('.design-sync/.cache', { recursive: true });
writeFileSync(OUT, combined);
console.error(`[prepare-css] wrote ${OUT} from ${files.length} compiled file(s): ${files.join(', ')}`);
