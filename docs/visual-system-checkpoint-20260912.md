# September 12 visual-system checkpoint

Jacob's 15 browser comments are recorded here against the local
`codex/website-art-layout-20260910` branch. This checkpoint is unpublished. It
does not authorize a push, PR, merge or deployment.

## Implemented

1. Reveal's three concept descriptions moved out of the brief copy and into a
   full-width concept-card row at the top of the modal. Each card uses a thin
   lightbulb at left and the label and description at right.
2. Plain modal information lists now share the same icon-card component. The
   Wrong campaign's Visual Approach, Inclusivity and Execution cards each use a
   distinct icon.
3. The Wrong campaign hero now uses the supplied DentalPlans vector mark and a
   teal, orange and deep-blue campaign palette. Its portrait remains available
   in the campaign executions below the hero.
4. The call-center brief image was replaced in the rendered experience by a
   semantic five-layer schematic: Site, timed status check, Call Center API,
   state response, and site message plus offer. It uses the site's Font Awesome
   vocabulary and reflows from five columns to a balanced two-column stack.
5. The six call-center header screenshots were replaced by responsive Open,
   Busy and Closed wireframe cards. They are one row on wide screens and a
   single column on phones.
6. Non-featured icon-led modal heroes use a 320px circle and approximately
   120px icon at wide modal widths. Their field color and restrained motion
   inherit each card's project theme.
7. A/B Testing now lists Strategy, Analysis, UX, Planning and Implementation as
   contributions, plus Adobe Target and WordPress as technologies. Adobe's
   current documentation still names the product Adobe Target.
8. Featured-work summaries use 130% line height and a three-line CSS clamp with
   an ellipsis.
9. Modal dividers now use the site's faded rule rather than a solid line.
   Contextual spacing tokens distinguish title rules, subsection rules and
   major section breaks. Existing Resume and work separators already match the
   major-section token and were retained.
10. DentalPlans business results now render as four metric cards beside one
    Value Created card.
11. The homepage semantic H1 is `Jacob Medley`. Its visible kinetic treatment
    types `// Jacob Medley //`, cycles Product, UX, Systems, Service, Motion,
    Interaction and Human inside stable braces, rotates the plus twice once,
    and ends on the registered closing line. The mark fades in. The sequence
    runs once, pauses when offscreen or hidden, honors the shared pause control,
    and becomes a complete static composition under reduced motion.

## Deliberately not executed

- Browser comment 2: `reveal-clear-01.jpg` has a bad crop. This is a source-file
  problem. Replace the source image, then verify the existing rendered slot. No
  crop workaround was added to CSS.
- Browser comment 9: do not redesign Resume in this wave. The immediate next
  design step is an expandable work-history timeline with one highlighted item,
  a Read more disclosure, and the same card grammar now used elsewhere.

## Figma dependency

Resolved September 12: Jacob selected `Medley In Design` on Full/Pro as the
standing owner for Figma artifacts. The editable call-center source is
`https://www.figma.com/design/X9tbhBL2oYEBxwcYEKr5UT`. It contains source-derived
foundations, a reusable three-variant availability-state component, editable
five-step flow vectors, and desktop and 375px mobile assemblies. Manrope is used
as the site's declared fallback because `urw-form` was unavailable in the
connected Figma font inventory.

## Continuation outcome

Resume is now the registered expandable five-entry timeline described by the
handoff. The later browser comments also removed all visible motion controls,
the A/B leading divider and the two selected follow-up images; tightened and
rebalanced the call-center schematic; centered shared icon circles; added the
reviewed contextual Title Case icon-and-rule heading treatment; padded the Wrong
mark; and moved Reveal concept cards below the hero with brand-color variance.
Recovery commit `a0c992b` contains that implementation. The current development
preview was subsequently restored at `http://localhost:3012/` after a verified
stale same-worktree Next.js process was returning the framework 404.

## Verification

- TypeScript: `npx tsc --noEmit --incremental false`, passed.
- ESLint: `npx eslint app components hooks lib scripts --no-cache`, passed.
- Diff whitespace: `git diff --check`, passed.
- Browser: desktop and 375px hero, A/B modal, Reveal concept cards, Wrong hero,
  DentalPlans data cards, call-center schematic and responsive state cards.
  No horizontal overflow or console errors were found.
- Reduced motion: static Product composition, closing line visible, no hero
  motion control. Passed.
- Pause: the visible role remained unchanged for the sampled one-second pause.
- The repository Playwright scripts could not start Chromium in the current
  sandbox (`spawn EPERM`). The in-app browser covered the affected states.
- `next build` reached compilation but produced no further output within the
  90-second verification window while the dev preview was active, so it was
  stopped. TypeScript and ESLint remain clean.

## Higher-level handoff prompt

Use GPT-6 Astra with high reasoning. Continue from the September 12 visual-system
checkpoint. First read `docs/STATUS.md`, `docs/copy-register.md`,
`docs/jacob-style.md`, `docs/voice-and-tone.md`,
`docs/visual-system-checkpoint-20260912.md`, `design-qa.md`, the repository
`AGENTS.md`, and the current Genesis website workstream and unresolved inbox.
Confirm the branch and lock before editing. Ask Jacob which Figma plan should own
the editable call-center wireframes if that choice is still unresolved, then
create the Figma source and record its URL. Replace `reveal-clear-01.jpg` only
after Jacob supplies or approves a corrected source. Redesign Resume as an
expandable work-history timeline using the established icon-card, faded-rule,
spacing and project-color language. One entry should be highlighted, longer
detail should open through an accessible Read more disclosure, and the closed
state should remain skimmable. Preserve every employment fact, date, metric and
registered sentence unless a new copy-register entry explicitly authorizes a
change. Test 320, 375, 768, 992, 1440 and 1875 widths, 200% text, keyboard and
screen-reader semantics, reduced motion, pause/resume, modal focus return and
horizontal overflow. Update `design-qa.md`, write `docs/STATUS.md` last, append
the Genesis event, and finish with a recovery commit. Do not push, open a PR,
merge or deploy without Jacob's direct instruction.
