/**
 * Parity harness — legacy target setup.
 *
 * `_archive/index.html` loads shared assets that live at the repo root,
 * not inside `_archive/`: root-absolute `/images/...` links, relative
 * `components/*.html` fetches (the `data-jm-include` mechanism), and
 * `node_modules/bootstrap/dist/js/bootstrap.bundle.min.js` (needed for
 * the Bootstrap modal JS that opens/closes case-study modals). Mirrors
 * the junction approach in scripts/setup-dev.mjs so `npx serve _archive
 * -p 4000` can resolve all three without copying anything into _archive/.
 */
import { existsSync, symlinkSync } from 'fs'
import { join } from 'path'

const archive = join(process.cwd(), '_archive')

const links = [
  { target: join(process.cwd(), 'images'), link: join(archive, 'images') },
  { target: join(process.cwd(), 'components'), link: join(archive, 'components') },
  { target: join(process.cwd(), 'node_modules'), link: join(archive, 'node_modules') },
]

for (const { target, link } of links) {
  if (existsSync(link)) {
    console.log(`✓ ${link} already linked`)
    continue
  }
  symlinkSync(target, link, 'junction')
  console.log(`✓ ${link} → ${target} junction created`)
}
