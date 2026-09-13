# ACC-B03 production image resolution, September 13, 2026

## Scope and result

ACC-B03 is resolved in the local application candidate at
`5c4efc9958d4baf6d9a619cf4c838fcc76d37872`. A production build now creates a
self-contained `out/images` tree from the repository-owned `images/` directory
and fails the build if that tree or an image referenced by the emitted
application is incomplete.

This is a bounded blocker resolution, not publication approval. No branch was
pushed, no PR was created, and nothing was merged or deployed. ACC-V01 native
visibility coverage, ACC-V02 native browser-chrome 200% zoom coverage, Firefox,
WebKit, physical-device and screen-reader coverage remain open. The existing
dependency audit still reports six high and one critical finding on the unchanged
dependency graph; exploitability was not assessed here.

## Root cause

The tracked images live in the top-level `images/` directory, while the site
retains `/images/...` URLs. Development setup creates an ignored
`public/images` junction to that source. Local builds and the existing static
preview therefore appeared complete whenever the junction happened to exist.

The SiteGround workflow starts from a clean checkout, runs `npm ci`, then
`npm run build`. It did not run development setup, so Next's static export had no
`out/images`. The successful compilation concealed an incomplete deployment
artifact. Existing remote files could also conceal the omission because the
deployment intentionally uses `dangerous-clean-slate: false`; no current
production outage was claimed.

## Fix

- `npm run build` now runs the Next export, prepares production images, and then
  verifies the export.
- `scripts/prepare-production-assets.mjs` replaces only the generated
  `out/images` path with real copies from tracked `images/`. It verifies the
  destination is the expected child of `out/` and uses real paths before removing
  an existing output. The ignored `public/images` development junction and its
  source are never removed or modified.
- `scripts/verify-export-assets.mjs` compares the complete exported image tree to
  repository source by relative path and SHA-256 content. It separately scans
  emitted production HTML, JavaScript, CSS and metadata for active `/images`
  references, checks exact path casing, and requires representative favicon,
  modal identity, homepage and case-study media references.

The active-reference check found 104 required production URLs. It does not reuse
the earlier 117-entry source inventory, which mixed active application references
with unused historical media. Copying and hashing the full repository-owned tree
is a separate artifact-integrity check required to preserve original content.

The SiteGround provider, destination and workflow remain unchanged, including
`dangerous-clean-slate: false`. Dependencies, design, copy and `/images` URLs are
unchanged.

## Windows verification

The tested revision was exported with `git archive` into
`C:\Users\jacob\AppData\Local\Temp\jacobmedley-acc-b03-080862a1ccaa4ce0be226f99244a3a39`.
That source had no `public/images` path or prior `out/` content.

- Runtime: Node `20.20.2`, npm `10.9.9`, Windows.
- `npm ci`: passed; it reported the unchanged six high and one critical audit
  findings.
- `npm run build`: passed; Next compiled, type/lint checked, generated 11 static
  pages and exported the site. The production hooks then prepared and verified
  the image tree.
- Export integrity: `out/images` is a normal directory, not a link. All 288 files
  matched tracked source by exact relative path and SHA-256 content. The verifier
  resolved all 104 active production references.
- Negative control: temporarily moving
  `/images/work/webmd-modal/home-dt.png` inside the isolated export caused the
  verifier to fail for the missing source file, unexpected held file and absent
  active URL. Restoring it returned the verifier to a pass.
- Separate checks passed under Node 20:
  `tsc --noEmit --incremental false`; ESLint over `app`, `components` and the two
  new production scripts; and the standalone export verifier.
- The working checkout also completed `npm run build`, proving the preparation
  safely replaces the export produced while the existing development junction is
  present without touching source images.

## Clean-export browser inspection

The isolated `out/` was served separately at `http://localhost:8090/`; the normal
worktree preview was not used as evidence. The temporary server was stopped after
inspection.

- The homepage loaded from the clean export and visibly rendered the
  `wrong-cover.jpg` media card.
- The WebMD modal opened from that homepage. Its identity SVG loaded at 150×150,
  and all 14 case-study image elements completed with nonzero natural dimensions.
  The representative desktop homepage image loaded at 1183×2237 and was visually
  inspected in the modal.
- The standalone `/case-studies/one-platform-five-properties/` route loaded from
  the same clean export. That reconstructed story uses authored HTML/CSS rather
  than image elements, so no image result was invented for it.

## Ubuntu and release limitations

Ubuntu CI was not run. The authorization excluded pushing, and this workstation
has no Docker engine or installed WSL distribution for an honest local Ubuntu
substitute. The implementation uses Node 20 APIs supported by the existing Ubuntu
workflow, but that is code review evidence rather than an executed Linux result.
Run the unchanged GitHub Actions workflow after push authorization and record its
actual result before treating Ubuntu coverage as complete.

The production rollback point remains
`e6b3672f88e5847d84a854f45ae3d29ca8269952`. The local pre-fix documentation
checkpoint is `47f1aff7689eeb9e688af1e8058d197d017fec31`.
