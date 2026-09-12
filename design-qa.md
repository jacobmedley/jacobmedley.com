# Design QA, September 12 visual-system wave

**Source visual truth**

Jacob's browser-comment screenshots 1 through 15 in the September 12 task. The
source evidence is conversation-bound and has no repository filesystem path.

**Rendered implementation**

`http://localhost:3012/` in the Codex in-app browser. Browser-rendered captures
were inspected in-session for the desktop hero, mobile hero, A/B Testing modal,
Reveal modal, Wrong modal, DentalPlans metric cards, call-center desktop
schematic, mobile schematic and mobile state cards. The browser returned image
evidence to the task but its sandbox did not permit persisting those bytes into
the repository, so there is no filesystem screenshot path.

**Viewport and normalization**

- Desktop: 1875 by 992 CSS pixels, browser density unchanged.
- Mobile: requested 375 by 812; browser content measured 360 by 812 in one
  capture because of its visible scrollbar/chrome allocation. Document
  `scrollWidth` equaled `clientWidth` at 360, so there was no page overflow.
- Source and implementation density could not be normalized as files because
  the source screenshots and browser captures were not available as local
  image files. Comparisons therefore used the visible, same-state evidence in
  the task rather than pixel-diff scoring.

**Primary interactions and diagnostics**

- Opened and closed representative modals.
- Verified three Reveal cards, five A/B contribution badges, two technology
  badges, four DentalPlans metric cards, one Value Created card, one call-center
  schematic and three responsive state cards in the DOM.
- Verified one semantic H1 named Jacob Medley.
- Verified the role sequence completed on Human and revealed the closing line.
- Verified a one-second pause held the role text unchanged.
- Emulated reduced motion. The static `{ Product } + Design` composition and
  closing line were visible and the temporary hero motion control was absent.
- Checked browser warnings and errors. None were reported.

**Findings and comparison history**

- P2, call-center mobile schematic: the fifth Message + Offer layer was clipped
  in the first 375px comparison. The narrow-container height was raised from
  310px to 390px. The second browser capture showed the complete fifth card and
  the following section with no overlap.
- P2, call-center desktop schematic: inherited arrow glyphs occupied grid cells
  and broke the intended five-layer row. The arrow selector was strengthened so
  the card grid owns placement. The mobile recheck showed a balanced 2, 2, 1
  layout; desktop is five columns.
- P3, Reveal source image: `reveal-clear-01.jpg` remains badly cropped. Jacob
  explicitly requested a note and source replacement, not a CSS workaround.
- P3, Figma provenance: the rendered call-center wireframes are complete, but
  their editable Figma source is pending Jacob's team-plan selection.

**Required fidelity surfaces**

- Fonts and typography: the existing brand family is retained for content.
  Kinetic punctuation and role text use a system monospace stack. Featured
  summaries now use 1.3 line height and three-line truncation.
- Spacing and layout rhythm: title, subsection and major-divider roles use 12px,
  24px and responsive 32px to 48px intervals. Information and metric cards use
  shared 16px gaps and responsive internal padding.
- Colors and tokens: all modal fields inherit project variables. Wrong adds the
  campaign's teal, orange and deep-blue relationship. State cards use semantic
  green, amber and muted purple.
- Image quality and assets: Reveal and Wrong use existing source assets. The
  supplied DentalPlans SVG is used directly. The bad Reveal crop is deferred at
  source as instructed. No replacement logo or decorative SVG was fabricated.
- Copy and content: B49 was registered before implementation. Existing case-study
  prose and metrics are unchanged.

**Open questions**

- Which Figma plan should own the editable call-center wireframe file?
- When will the corrected Reveal source crop be available?

**Implementation checklist**

- Create and link the editable Figma source after the plan choice.
- Replace and recheck the Reveal source image after Jacob provides it.
- Run the higher-level Resume timeline handoff as a separate wave.

**Final result**

blocked

The rendered site changes pass the browser comparison after the two call-center
fixes. Product Design handoff remains blocked because the required editable Figma
artifact and filesystem-backed comparison captures cannot be completed until
the Figma plan is chosen.
