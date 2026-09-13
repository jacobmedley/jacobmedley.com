# September 11 aesthetic checkpoint

Jacob's browser comments 1–34 are implemented locally on
`codex/website-art-layout-20260910`, starting from documentation checkpoint
`12fb8c0` and application candidate `fcfe272`. This checkpoint is unpublished;
it does not authorize a push, PR, merge or deployment.

## Applied requests

- The global and modal motion controls are hidden with CSS. Their React state and
  motion infrastructure remain in the codebase for the requested later removal
  refactor. Existing card/hero animation still runs when motion is allowed and
  stops for `prefers-reduced-motion`.
- Homepage section headings and the standalone case-study browse assembly no
  longer stick. Their semantic content remains in normal document flow; the
  existing sticky controller is deliberately dormant and marked in source for
  later removal.
- B48 was registered before implementation. Resume now reads `One belief...` and
  `There is always a better way, together we will find it.` The belief block spans
  and aligns to the leadership list. Research and Measurement is removed. The
  four retained leadership items render as a strict two-column, two-row grid in
  Jacob's requested order; their wording is explicitly flagged for his later copy
  review. Resume skill lists align left with four pixels between items.
- All fourteen modal intros now use a full-bleed treatment connected to the
  corresponding card. The five featured systems retain their established fields;
  six icon-led studies use their existing icon vocabulary; Wrong uses its existing
  text-free card portrait as the hero field; Reveal and Viva use their existing
  logo-led brief assets over distinct animated brand gradients. No asset was
  generated or replaced.
- The A/B lead comparison is removed. Persona's source artifact moves below the
  hero at full width. Other meaningful non-featured brief evidence (call-center
  flow, personalization workflow, workshops and roadmap) also remains available
  below the card-led hero.
- Viva study images use a 24px white mat. Its two logo variants are vertically
  centered. This reconciles the equivalent `2rem` comment and 24px browser
  property annotations at the source-owned modal-image treatment.
- Global modal header/footer glass is `#ffffff91` with 6px blur. Header Close uses
  black on `#ffffffa1` with `#fffffff2`; footer Close uses black on `#ffffffa1`
  with `#00000069`. Thin contribution/technology icons use near-black ink and a
  stronger stroke.
- The modal header mark is 40px below 768px, 48px from 768px, and 58px from
  1200px, with the requested white circular background and glow.
- Hydra's redundant outer Problem heading is removed. The narrative now begins
  with H3 `The Problem` and H4 `Severe UI Fragmentation`; its existing prose and
  evidence remain unchanged.

## Verification

The final static export at `http://localhost:3011/#full-stack` passed the new
`scripts/parity/aesthetic-acceptance-20260911.mjs` suite:

- Resume at 375, 768 and 1384px, including exact copy/order, one/two-column
  behavior, edge alignment, list spacing, four non-sticky section headings and no
  overflow.
- All fourteen full-bleed modals at 1384px, including 6px glass, exact close-control
  colors, dark badge icons, removed/moved lead images, brand/photo/icon hero
  selection, Viva mats/centering, Hydra hierarchy and no modal-body overflow.
- Header icons measured 40×40 at 375px, 48×48 at 768px and 58×58 at 1200px.
- At a 320px viewport with root text at 200%, all fourteen modal hero copy panels
  and the Resume fit without local overflow or clipped text.
- Sampled hero-copy contrast: Hydra 9.03:1, A/B 10.61:1, Personas 8.31:1,
  Reveal 8.85:1, Viva 9.54:1 and Wrong 9.19:1. Wrong's photo-backed panel was
  raised to 78% white after the first targeted contrast run found the prior 40%
  glass insufficient.
- Normal and reduced-motion checks passed for existing cards and the new photo
  hero. Motion controls were absent visually on the homepage, standalone index and
  in modals.

Production `next build` compiled, type-checked, generated 11 static pages and
exported two route groups. TypeScript, authored-source ESLint and `git diff
--check` passed. The existing annotation suite passed at its six homepage and four
standalone widths. The Stage 4 surface suite passed fractional wave seams, nine
clipped cards and five keyboard/focus-return card actions. Initial browser launches
without sandbox escalation returned `spawn EPERM` and were rerun successfully;
they are environment failures, not product failures. The first two build attempts
were blocked by verified same-worktree dev/static preview locks (`.next/trace` and
`out/assets/featured`); only those verified processes were stopped, and the clean
rerun passed.

Older Stage 5, dashboard, housekeeping, imagery and motion suites retain their
historical evidence but are not acceptance for this changed build. Several encode
the now-superseded requirements that section headers remain sticky, motion controls
remain visible, only five modals are full bleed, or the former A/B/Persona lead
placement remains. Their assertions were not weakened or relabeled.

## Remaining blockers and limits

- ACC-B02's visible collision mechanism is addressed for this build by hiding the
  fixed control and disabling sticky positioning, and the affected routes/states
  passed targeted re-verification. The independent release report remains a
  historical blocked verdict until a separate acceptance owner reviews this new
  checkpoint.
- ACC-B01 remains open and unchanged: the six supporting schematics can still lose
  internal content at small-container 200% text. The new hero checks do not claim
  to fix those lower-page diagrams.
- Actual browser UI 200% zoom and a native hidden-tab transition remain unverified.
  Root-font 200% checks are not presented as substitutes. Firefox, WebKit, physical
  devices and full WCAG certification remain untested. Local Node is 22.11.0; CI
  Node 20 remains a release-time check.

## Files and recovery

Application and verification files:

- `app/globals.css`
- `app/case-studies/dashboard.css`
- `components/sections/ResumeSection.tsx`
- `components/ui/CaseStudyModal.tsx`
- `lib/data/projects.ts`
- `scripts/parity/aesthetic-acceptance-20260911.mjs`
- `docs/copy-register.md`
- this checkpoint and `docs/STATUS.md` (written last)

Recovery baseline is `12fb8c0064107bfdf48a4adf6a3b4a2cdb6f40fd`; use a
reviewed revert that preserves subsequent work, never a shared-tree reset. Final
export preview PID 41964 serves this worktree's `out/` at
`http://localhost:3011/#full-stack`. No local inference, paid fallback, reset,
download, dependency change, push, PR, merge or deployment occurred. The Genesis
helper remains blocked by the preserved malformed Stage 3 event; a fresh direct
read and manual inventory fingerprint were used, and a unique final update follows
the local commit.
