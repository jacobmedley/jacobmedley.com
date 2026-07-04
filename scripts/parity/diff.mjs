/**
 * Parity harness — diff step.
 *
 * Compares scripts/parity/shots/legacy/*.png against .../new/*.png with
 * pixelmatch, writes diff PNGs to .../diff/ and a report table to
 * scripts/parity/report.md. Pass threshold: < 2% differing pixels.
 *
 * Images of unequal size are compared on a white canvas the size of the
 * larger of the two; the size mismatch is noted in the report.
 */
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { join } from 'path'

const PARITY_DIR = fileURLToPath(new URL('./', import.meta.url))
const SHOTS_DIR = join(PARITY_DIR, 'shots')
const DIFF_DIR = join(SHOTS_DIR, 'diff')
const REPORT_PATH = join(PARITY_DIR, 'report.md')

const PASS_THRESHOLD = 2 // percent
const BREAKPOINTS = [375, 768, 1280, 1920]
const SECTIONS = ['nav', 'hi', 'work', 'visual-design', 'resume', 'education']

/** Copy `src` onto a white W×H canvas (top-left aligned). */
function onCanvas(src, width, height) {
  if (src.width === width && src.height === height) return src
  const out = new PNG({ width, height })
  out.data.fill(255)
  PNG.bitblt(src, out, 0, 0, src.width, src.height, 0, 0)
  return out
}

function compare(section, bp) {
  const legacyPath = join(SHOTS_DIR, 'legacy', `${section}-${bp}.png`)
  const newPath = join(SHOTS_DIR, 'new', `${section}-${bp}.png`)
  if (!existsSync(legacyPath) || !existsSync(newPath)) {
    return { section, bp, missing: true }
  }
  const legacy = PNG.sync.read(readFileSync(legacyPath))
  const fresh = PNG.sync.read(readFileSync(newPath))

  const width = Math.max(legacy.width, fresh.width)
  const height = Math.max(legacy.height, fresh.height)
  const a = onCanvas(legacy, width, height)
  const b = onCanvas(fresh, width, height)
  const diff = new PNG({ width, height })

  const diffPixels = pixelmatch(a.data, b.data, diff.data, width, height, {
    threshold: 0.1,
  })
  writeFileSync(
    join(DIFF_DIR, `${section}-${bp}.png`),
    PNG.sync.write(diff)
  )

  const pct = (diffPixels / (width * height)) * 100
  const sizeMismatch =
    legacy.width !== fresh.width || legacy.height !== fresh.height
      ? `${legacy.width}×${legacy.height} vs ${fresh.width}×${fresh.height}`
      : null
  return { section, bp, pct, sizeMismatch }
}

mkdirSync(DIFF_DIR, { recursive: true })

const results = []
for (const section of SECTIONS) {
  for (const bp of BREAKPOINTS) {
    results.push(compare(section, bp))
  }
}

function cell(r) {
  if (r.missing) return '—'
  const mark = r.pct < PASS_THRESHOLD ? '✅' : '❌'
  return `${r.pct.toFixed(2)}% ${mark}`
}

const now = new Date().toISOString().replace('T', ' ').slice(0, 16)
const lines = [
  '# Parity Report',
  '',
  `Generated: ${now} UTC · pass threshold: < ${PASS_THRESHOLD}% pixel diff`,
  '',
  `| Section | ${BREAKPOINTS.map((b) => `${b}px`).join(' | ')} |`,
  `|---|${BREAKPOINTS.map(() => '---').join('|')}|`,
]
for (const section of SECTIONS) {
  const row = results.filter((r) => r.section === section)
  lines.push(`| \`${section}\` | ${row.map(cell).join(' | ')} |`)
}

const mismatches = results.filter((r) => r.sizeMismatch)
if (mismatches.length) {
  lines.push('', '## Size mismatches (legacy vs new)', '')
  for (const m of mismatches) {
    lines.push(`- \`${m.section}\` @ ${m.bp}px: ${m.sizeMismatch}`)
  }
}

const missing = results.filter((r) => r.missing)
if (missing.length) {
  lines.push('', '## Missing captures', '')
  for (const m of missing) lines.push(`- \`${m.section}\` @ ${m.bp}px`)
}

const compared = results.filter((r) => !r.missing)
const passing = compared.filter((r) => r.pct < PASS_THRESHOLD)
lines.push(
  '',
  `**${passing.length}/${compared.length} passing** (${missing.length} missing)`,
  ''
)

writeFileSync(REPORT_PATH, lines.join('\n'))
console.log(lines.join('\n'))
console.log(`Report written to ${REPORT_PATH}`)

if (process.argv.includes('--strict') && passing.length < compared.length) {
  process.exit(1)
}
