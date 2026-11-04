# Approved copy release, November 3, 2026

## Authorization and source

Jacob authorized exact implementation of B109, minimum compatible dependency
repairs, scoped commits and a PR, then merge and SiteGround publication after the
existing checks pass. No further editorial review or copy changes were requested.

The supplied patch was checked against remote main and local baseline
`b5d54e28601ead125b8d77a02bbf58696ef858aa`. Its SHA-256 is
`de2bdd1ef79f42621e04ba0b232201fa7b7dcc37694b266da9ed09a1096bba2c`.
`git apply --check` passed. B109 was unused. The approved copy and four CSS rules
were applied exactly; packaged STATUS and verification paragraphs were excluded
because they describe a previous temporary environment. Raw attachments stay
outside this public repository.

Canonical desktop: FEERAL-AEGIS-R2. The primary checkout has unrelated Figma
documentation and a lock held by `quiet-prism-figma-a4e0fdd2`; neither was changed.
Implementation uses `C:/dev/jacobmedley-copy-release-20261103`, branch
`codex/copy-release-20261103`, under its own lock. GitHub CLI authentication and
connector permission checks reported admin access. An actual feature-branch push
succeeded. Reading branch protection via the token returned 403; protections are
not modified or bypassed. Normal PR checks and merge enforcement remain required.

## Copy and scope acceptance

- Hero, section introductions, leadership, mentorship, WebMD, DentalPlans and
  Hydra match B109 exactly, including the final hero and leadership corrections.
- Product & Design Leader and the complete signature remain.
- Structured comparisons confirm all twelve other project objects are unchanged.
  Target titles, themes, routing metadata, image references/alternatives and metric
  grids are unchanged. Existing numeric claims, timeframes, attribution and team
  ownership remain in the approved text.
- Employment, credentials and expertise source sections are unchanged, allowing
  only checkout line-ending normalization. No individual-study tools inventory,
  new asset, routing, motion, icon, typography-system or hosting change was made.
- Before updating this release record, reverse patch applicability confirmed the
  seven copy files matched the package exactly. Complete source and dependency
  diffs were reviewed; no private samples, attachments, secrets or unrelated
  worktree changes are staged.

## Dependency security

Fresh full-category registry audit: initially 5 high, 1 critical, 16 moderate
entries. After repair: **0 high, 0 critical, 17 moderate**, exit 0 at the unchanged
`--audit-level=high` threshold. The increase in moderate entries is `serve` moving
from high to moderate after compression was repaired. No category was omitted.

| Finding and path | Before → after | Exposure and repair |
| --- | --- | --- |
| Direct `next` | 15.5.25 → 15.5.29 | Production framework dependency, exercised in build; deployment exports static files. Pin current maintained 15.5 patch, preserving Node 20 and React 19 compatibility. No major upgrade. |
| `next → sharp → bundled libvips` | sharp 0.35.4 → 0.35.5; libvips package 1.3.3 → 1.3.4 | Optional image/build dependency. Patched native binaries retained for Windows and Ubuntu CI. No claim that static export makes the advisory irrelevant. |
| `serve → compression` | 1.8.1 → 1.8.2 | Development static-preview server. `serve` 14.2.6 still pins 1.8.1; a scoped override selects the compatible fixed patch. The suggested serve 10 downgrade was rejected. |
| ESLint/config/plugins and `serve-handler → minimatch@3 → brace-expansion` | 1.1.18 → 1.1.21 | Lint/configuration and preview glob parsing. Scoped minimatch@3 override stays within its `^1.1.7` dependency contract. |
| `eslint-config-next → @typescript-eslint/parser → typescript-estree → minimatch@10 → brace-expansion` | 5.0.9 → 5.0.12 | Development lint parsing; lockfile update within the existing range. |
| `postcss`, `next → postcss`, and `@tailwindcss/postcss → @tailwindcss/node → source-map-js` | 1.2.1 → 1.2.2 | CSS/source-map build tooling; compatible lockfile update. |

Affected/fixed ranges were checked against current primary advisories:
[Next image API](https://github.com/advisories/GHSA-2464-fhr4-w9xw),
[Next Server Actions](https://github.com/advisories/GHSA-p3m5-59mp-jv5r),
[sharp](https://github.com/advisories/GHSA-wq5f-xc86-pv6w),
[compression](https://github.com/advisories/GHSA-vc2v-76pw-4v95),
[source-map-js](https://github.com/advisories/GHSA-68fv-2mgg-jv7q), and brace-expansion
[nested recursion](https://github.com/advisories/GHSA-qhr7-859c-m2p7),
[comma recursion](https://github.com/advisories/GHSA-6j4f-fj2g-mc7p),
[quadratic rewrite](https://github.com/advisories/GHSA-q2hr-2g5m-vwhr).
Official [Next 15.5.29 notes](https://github.com/vercel/next.js/releases/tag/v15.5.29),
[sharp 0.35.5 notes](https://github.com/lovell/sharp/releases/tag/v0.35.5),
[source-map-js 1.2.2 notes](https://github.com/7rulnik/source-map-js/releases/tag/v1.2.2),
compression HISTORY and brace-expansion tags were also inspected.

The remaining moderate roots are minimatch and fast-uri. Minimatch 3.1.5 and
10.2.5 flow through ESLint, @eslint/config-array, @eslint/eslintrc,
@eslint-community/eslint-utils, the @typescript-eslint parser/plugin/type-utils/
utils/typescript-estree chain, eslint-config-next, eslint-plugin-import,
eslint-plugin-jsx-a11y, eslint-plugin-react, serve-handler and serve. The current
[minimatch advisory](https://github.com/advisories/GHSA-g3hv-75wg-m249) specifies
11.0.1 as fixed, a major dependency/API migration outside this minimal release.
`serve → ajv@8.18.0 → fast-uri@3.1.7` is development configuration validation;
its [normalization](https://github.com/advisories/GHSA-hrr3-gc8f-f4qj),
[scheme](https://github.com/advisories/GHSA-w74x-v6f9-j3xg),
[path](https://github.com/advisories/GHSA-xhq7-xmqj-769h),
[host](https://github.com/advisories/GHSA-wjr9-j795-jxcr) and
[suffix](https://github.com/advisories/GHSA-333x-w4r6-6crp) advisories identify
3.1.9 as the combined fix. These moderate findings are disclosed and left for
separate maintenance; the user requested minimum changes necessary for the gate.

## Fresh local verification

CI remains Ubuntu / Node 20; neither workflow changed. Local checks used official
Node 20.20.2 with bundled npm 10.8.2, extracted outside the repository and verified
against the official distribution SHA-256. The host Node 22 installation is unchanged.

- `npm ci` from the updated lockfile passed.
- `tsc --noEmit --incremental false` and ESLint over app/components/hooks/lib/scripts passed.
- Production build passed, including lint/types, 14 route entries, presentation
  guard on 10 files, static export, 288 image hashes and 104 asset references.
- All three presentation-guard regression tests passed.
- Design-system check passed: 59 patterns, 197 examples, 36 tokens.
- Fresh dependency audit with the workflow's full-category high threshold passed.
- `git diff --check` passed.

## Rendered verification

Flow: homepage → keyboard-open WebMD/DentalPlans/Hydra → read approved story →
Tab/Shift+Tab → Escape or Close → focus returns to the originating card.
Playwright 1.61.1 Chromium checked 1440, 820, 390 and 320 CSS pixels at
`http://localhost:8090/`, served from inside the isolated worktree's `out/`.
The dedicated Browser plugin/skill was unavailable; the installed repository
Playwright provided the permitted fallback.

All registered strings were asserted in rendered content. Every dialog's images
decoded, with no broken images, text clipping or horizontal overflow. URW Form,
Font Awesome 7 Pro and the custom kit were loaded. Normal hero animation advances;
reduced motion has zero running animations. All three dialogs also passed normal
motion opening/closing/focus checks at 1440 and 320 pixels. No app runtime error,
framework overlay, failed first-party response or failed visual asset remains.

Fifty-two final screenshots cover home, hero copy, leadership, mentorship, and the
top/body/end of each revised study at all four widths. They were visually reviewed
at full size where needed and in grouped sheets; hierarchy, wrapping, artwork,
mobile dialog headers and close controls are readable. No further layout edit
was needed. Raw captures and test logs are outside the public repo at
`C:/dev/_handoffs/copy-release-20261103/`.

The first test used 127.0.0.1, which the external icon kit rejected with 403.
Using the repository's localhost origin resolved that without configuration or
permission changes. The initial focus assertion was too early; it now waits for
the existing dialog transition and focus event. Screenshot scrolling was made
instant so captures actually show their named sections. Those failed preliminary
observations are retained locally and are not reported as passing checks.

DNS failures remain for Adobe's `p.typekit.net` telemetry and Google analytics/
DoubleClick collection. The same failures were observed on the pre-release public
site. They are separate from the successfully loaded font assets and application
code. No network, antivirus or analytics control was changed. Screen readers,
actual 400% zoom and other browser engines were not tested.

## Publication and rollback

Pending actual PR CI and normal protected merge. The latest successful deployment
is `db9278a6002c056da1b075dfb3e8711c5fbb2fa3`, workflow run 39722704770.
This is the pre-release production rollback reference; main's documentation-only
baseline is b5d54e2. Ordinary homepage GET returned 200/MISS, Last-Modified
October 22, 2026 04:31:10 UTC. `/musings/` and
`/interaction-design-concepts/response-times/` returned 200 before publication.
`dangerous-clean-slate: false` is unchanged. Publication and fresh public cache
checks will be recorded after deployment; no live claim is made yet.

## Coordination

Fresh canonical Genesis reads at intake and acceptance: revision
`afa7dda5b112f5ca9c971e549726ca9574d4a006`, STATE updated November 1, with
SHA-256 `ae55ec0a74d012d830ed3c742646b8b826a52031bedaedcba79574eb3dcd8f60`.
STATE and pipeline README have unrelated local modifications. The retirement
decision supersedes old website Exchange instructions. Exchange remains read-only;
local unique change/update handoffs are retained outside the public repo. No
coordinator receipt, shared-state update, Genesis job, model dispatch, paid fallback,
lead-setting change or measured savings is claimed.
