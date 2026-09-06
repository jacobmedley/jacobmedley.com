# Website brand wave: focused continuation

September 6, 2026. Recommended continuation: GPT-5.6 Sol, medium. Astra High performed this first pass; no local model or alternate cloud model was invoked this turn. Deterministic tools handled edits and checks. No measured model-offset savings are claimed.

## Recovery and ownership

- Original checkout: `C:\dev\jacobmedley.com`. Its existing edits, Git index and `claude-code-1` marker were preserved.
- Exact pre-change source checkpoint: `b8aac95d758d1048d643b79826a4b390dea04f66`, tag `checkpoint/portfolio-before-brand-wave-20260906`. Includes the previously uncommitted case-study source using an isolated Git index; excludes ignored machine/private files.
- Working copy: `C:\dev\jacobmedley-brand-wave`.
- Branch: `work/portfolio-brand-wave-20260906`. Continue here, do not reset or overwrite the original checkout.
- Recovery without destroying current work: create another worktree from the checkpoint tag. After this wave is committed, its implementation commit can also be reverted on this branch. No force/reset operation is necessary.
- No remote push or publication. Node dependencies are a local junction to the original checkout's installed node_modules; public/images points to this worktree's images. Build output stays local.

## Scope and approval

Jacob authorized beginning the staged plan and asked for a recovery checkpoint. Full annotation mapping and later waves are in `X:\sync-project-genesis\docs\plans\2026-09-06-website-production-plan.md`. Read the owning repository's copy/style/data rules before content work. Genesis coordination lives in `X:\Genesis Exchange\START-HERE.md`; read current brief, direct notes, relevant workstream and inbox. Desktop context at this checkpoint: CURRENT revision 2026-09-06.3, fingerprint 8d3b3bd05a71f84c76f888751c26f0ab6fb3adc7e6621bf8ae41c145791cd15e. Recompute before continuing.

The laptop inference hold remains unresolved. Do not dispatch laptop jobs to bypass it. Coordinator-owned shared files were not edited; UUID inbox records report website approval, isolated ownership, policy refinements and the user's reset instruction. Jacob manually redeemed a reset, reports one left, and explicitly prohibits automatic redemption. No extra spending.

## Implemented in the first pass

- Product & Design Leader in website branding and metadata; 78px normal-weight custom logo; fluid case-study name 18–30px, proportional subtitle; text hidden below 576px. Existing historical job titles are unchanged.
- Thin interface icons across rendered components and icon data; preserve custom/brand glyph families.
- Outline hero scroll actions use circle-arrow-down. Internal actions use label then arrow-right, 10px spacing. Removed action eye images/icons and decorative case-study diagonal arrows.
- Case-study links back to the main site open new tabs, with external-link indicators and accessible descriptions. External education and modal links have matching indicators.
- Case-study category/eyebrow/diagram labels use Title Case and // separators; count handles singular/plural. Canonical JSON edits preserve narrative, metrics and provenance.
- Case-study eyebrow margin is 4px; record title margins are zero. Main typography changes are scoped to the brand glyph, not every heading.
- Homepage has an explicit link to the separate case-study index; legacy modals remain.

## Verification and remaining acceptance

Passed: standalone TypeScript check; ESLint on components, case-study routes, layout and data; production build/type/lint/static export after the final edits; git diff whitespace check. React review found no new effects, fetches, state or dependencies.

Browser: desktop case-study index inspected at 1280px without horizontal overflow. Custom logo resolved to Font Awesome Kit at 78px/400; external and down-circle glyphs resolved to Font Awesome 6 Pro at weight 100. Design Systems filter returned 2 // Case Studies; Product Design returned 1 // Case Study. These browser checks preceded the final small inline-external-link and card-title-spacing refinements; final build passed afterward.

Before accepting Wave 1, reload the current build and finish browser checks at 320/375/576/768/1440 widths: header text visibility and no overflow; main hero; CTA icons; modal open/close; keyboard focus; main-site new-tab behavior; all six detail routes and compact diagram lockups. Check thin glyphs that appear only in modals. Confirm all label casing scopes and eyebrow spacing visually. Verify no narrative or metric changes against the checkpoint.

The local static preview process serves `out` at `http://localhost:3001/`; it may need restarting in another session. Build with `npm run build`; preview with `node node_modules/serve/build/main.js out -l tcp://127.0.0.1:3001`. Do not assume a running process survives a task handoff.

Wave 1 is a reviewable implementation, not fully visually accepted. Waves 2–4 have not started: unified/glass cards and rule treatments; IA/resume/tool alignment and badges; sourced results dashboard. The colored hero dashes and existing card architecture remain for Wave 2. Current resume masters still need locating before substantive resume copy changes.

## Compact next-task prompt

Continue the website work in C:\dev\jacobmedley-brand-wave on its existing branch. Read docs/brand-wave-handoff.md and current Genesis context. Use Sol/medium. Finish Wave 1 responsive and interaction acceptance before starting later approved waves. Preserve the recovery checkpoint and original checkout, respect the laptop inference hold, and never automatically redeem Jacob's remaining reset. Use scripts for exact checks, keep context bounded, and report actual model routes without claiming projected savings as measured.
