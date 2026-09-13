# Browser refinements, September 12

Scope: Jacob's 25 comments on preview 3013, baseline `869e5cd`, branch
`codex/website-visual-system-20260912`, isolated worktree 4b5e. No publication.

1. Shared visual wave: lighter/spacious icon headings, larger icon-to-copy gaps,
   paragraph rhythm, four leadership cards with 42px/32px wide padding, stronger
   gradients and corner edge highlights; equal title/rule/content spacing.
2. Content presentation: B54 removes rendered technologies and curates at most
   four contribution pills per project; preserve underlying technology history
   and narrative. Static white modal waves and half the prior transition gap.
3. Resume/education: replace timeline presentation with internal-logo cards;
   centered 12/12 desktop columns, full-card toggle, top-right chevron (comment
   14 supersedes plus in 13), slower reversible opening; smaller indented prior
   role with an L progression marker. Education uses deterministic varied tints
   and responsive mosaic spans in DOM order, left-aligned icon/title/content/View.
4. Artwork/motion: shared reusable thumbnail/modal geometry, warm section colors,
   staggered breathing icons and visibly floating simplified Hydra components.
   Use the updated supplied MOA knockout SVG; preserve the other source SVGs.
5. Hero: icon only, horizontal stacked braces centered over the hidden name,
   coordinated rotation/expansion to reveal it. First role pass at 1000ms per
   word, later 3000ms; after the first pass the braces reveal the closing line
   and exit while the line remains. Role weight increases one step; plus aligns
   optically to the brace middle. Bounded motion, reduced-motion and visibility
   guards remain. No visible motion controls.
6. Acceptance: production export; six widths and enlarged text; all modal
   badges/art/spacing; keyboard and whole-card toggles; education order/links;
   sampled hero phases and animation changes over actual time. Write STATUS last,
   commit a recovery point and append Exchange completion event.

Interpretations: prior (earlier chronological) Health-E role is indented and
smaller while current role remains prominent. Roadmap retains its maze in the
thumbnail, adds visible path motion and shares it with the modal, with subtle
circle motion as requested. Broad marketing copy rewrite is a later phase.

Intake Exchange observed 2026-09-12T23:42:39Z, fingerprint
`548262985e650b6d8b8b6afa18dfccbbea8b4fbd05d45bfd7b265027bb1e55b5`, no conflicts.
Fresh entry/notes/current/rules/website card and newer local-inference note read;
the latter does not overlap website work. Change event:
`20260912T234321Z-223f8295be494d0d90334a7096f319b7`.

Model: selected Astra/high; forecast 35,000-60,000 cloud tokens including review
and retries, zero planned local inference. Deterministic extraction and checks.
No subagents, paid fallback, deployment or additional spending.

## Acceptance

All 25 comments are implemented. B54 is APPLIED. Wide leadership padding is
42px vertical / 32px horizontal, with fluid values below that size. Experience
and expertise use equal desktop columns from 992px. Phone headers let text wrap
around an internal logo; education switches from one column to two at 600px and
to a twelve-track mosaic at 1200px, preserving source and focus order. Tints and
animation offsets are deterministic, avoiding hydration differences.

Hero: name stays hidden through the stacked horizontal-brace entrance, reveals
after their rotation/expansion, and the first five roles cycle at one-second
intervals. Later changes occur at three-second intervals. Braces move to the
closing line after the first cycle, exit, and the line stays. Motion settles at
39 seconds. The heavier type and plus alignment were reviewed in screenshots.

Seven widths (320, 375, 768, 992, 1440, 1706, 1875) and 200% text at 320/992
passed, covering 126 modal cases. Checks include no horizontal overflow,
at most four contribution pills, no technologies, static modal waves, circular
plaques, focus return, internal employer icons, balanced columns and ten valid
education links. Twelve hero phases per setting verify the name reveal, fast
role cycle and persistent ending. The final export was rechecked at 320/200%,
992/200% and 1706px; the subsequent first-section margin correction was checked
separately. The compact JSON record documents these scopes.

Actual 400ms browser samples found moving geometry in all six requested fields:
Hydra, A/B, call center, personalization, workshops and roadmap. Icon periods are
8.7, 9.4, 11.3 and 12.1 seconds. Reduced-motion hero has zero animations and a
visible closing line. Offscreen time remained unchanged, rapid disclosure
reversal finished open with focus on SUMMARY, and settled resize stayed finished.

TypeScript, ESLint, production export and whitespace checks pass. AST/string
comparisons preserve employment/leadership copy and all education data; project
data outside contribution labels matches `869e5cd`. Original images are unchanged.
The reference folder's MOA SVG had been updated to a knockout; the final site uses
that supplied file byte-for-byte. The temporary derived copy was discarded.

Validation repaired a legacy 24-column span leaking into the new two-column grid,
unbreakable education headings at enlarged text, inherited first-section
spacing and pale education-icon contrast after lightening its plaque. Repeated exports were necessary for the source fixes and the updated
MOA input. Available screenshot review covered the stacked hero, role/plus
alignment, wide Resume, education mosaic, Hydra, personalization and data cards.

Limits: no actual screen-reader session or Firefox/WebKit run. Native background-tab
visibility remains unverified from the earlier pass; offscreen and reduced-motion
paths were exercised here. No new Figma work or image generation was needed.
Broader marketing copy rewriting is the next phase; Reveal's corrected source
image remains separately deferred. No deployment occurred. Rollback: `869e5cd`.

Closing model estimate: 35,000-55,000 cloud tokens including retries, acceptance
and documentation; exact telemetry unavailable, zero local inference. Estimated
avoided manual extraction/review work: 8,000-15,000 cloud tokens, unmeasured and
not a claim of measured savings. Selected Astra/high remained in use.
