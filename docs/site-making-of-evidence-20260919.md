# Making the portfolio — evidence journal, not a finished case study

> September 20 supersession: Jacob authorized full-site implementation, including
> brand/marketing copy and the dedicated case-study experience, in task 01a0bf66,
> turn 01a0bfb7-e5d4-7122-8950-67022ed30378. The planning-only/lab-approval hold
> and dedicated-page deferral below are historical. Current local implementation,
> accepted source commits, evidence and remaining limits are recorded in
> [the full-site integration report](full-site-integration-20260920.md).
> Publication remains separate. This note preserves the original decision history.

Status: foundation verified locally; parallel exploration and testing continue. This document
records decisions as they happen. It does not claim validated outcomes or WCAG
conformance. The current program/approval ledger is experience-program-20260919.md.

## Problem and intent

Jacob identified inconsistent spacing, competing focus outlines, hero reveal
spacing, insufficiently unified card materials, and an opportunity to make modal
transitions feel spatial while preserving usability. He also reported difficulty
tracking copy across multiple AI revisions. The response is one source-backed
editorial recommendation and one decision ledger, not additional competing rewrites.

## Starting evidence

- Published baseline v12.160, production1325c6b, documented main909ea22.
- Jacob's ten annotated requests and visual references, September19, are the
  primary brief. They are design feedback, not user-research or usability-study data.
- Existing source, approved copy register and dated release/browser reports are
  the implementation and factual authorities. Original dirty checkout preserved.

## Foundation decisions

1. Education padding is card-scoped22px top/sides and16px bottom in rem units.
   Icon/title/source reading order stays logical. The existing600px grid threshold
   also controls icon-above-text stacking; no arbitrary extra mobile breakpoint.
2. Footer optical rhythm is independent of main content rhythm:18px below header,
   14px before link plus2px link top padding,16px card bottom. Link's transparent
   pseudo-element expands its26px visual row to44px of clickable height without
   increasing visible whitespace or adding an extra tab stop.
3. Focus uses one3px inset outline inheriting85% of each employer's ink tone.
   Only color transitions,220ms; no layout shift,blur or glow. Reduced-motion
   preference removes transition and forced-colors uses Highlight.
4. Section divider adopts existing --rule-gap-section on both sides instead of
   half --section-rhythm. Hero action stacks without changing words or link target.
5. Featured CTA fills content width only under the existing819px card-container
   query. Desktop remains content-sized. The existing real whole-card button is
   retained, rather than nesting a second interactive button inside it.
6. Supplied Hydra SVG copied to public/assets/references/hydra-mark.svg; XML matches
   original beyond formatting. No scripts,foreign objects,event handlers or external
   references found. Existing palette comes from CSS mask; original file unchanged.

## Parallel decisions still open

Material direction and its performance/readability tradeoffs;bounded hover/scroll
lighting;modal motion and gesture behavior;preload/loading/error strategy;one
mentorship wording proposal;brand-logo availability;final editorial acceptance.
Do not describe these as delivered until their owning task's evidence is reviewed.

## Foundation evidence, September 19

Production export passed with Next compile/type/lint checks,11 pages,288 source
image hashes and104 active image references. git diff --check passed. Hydra XML
parity and absence of executable/external SVG references were checked separately.

Browser layouts checked320,375,599,600,614,768,1024,1376px: no horizontal
overflow. The375px viewport was rechecked separately after a resize propagation
race in the first scripted loop; the final measurement confirmed375px. Education
stacking,22/22/16px padding, compact footer, container-driven full-width CTA,
stacked hero action and section-rule rhythm matched the requested behavior.

Mutual of America disclosure opened and closed with Enter. Focus was visible as
one3px employer-toned inset outline, without the old summary rectangle. Reduced
motion removed its transition; forced-colors used system Highlight. A computed
44px education-link hit region is not claimed as separately pointer-tested.

Saved and visually inspected screenshots:

- 20-education-balanced-desktop.png,1376px
- 21-education-stacked-mobile.png,375px
- 22-hero-stacked-mobile.png,375px
- 23-featured-fullwidth-cta.png,614px
- 24-hydra-supplied-mark.png,1376px
- 25-contextual-focus.png,1376px

Artifact directory:
C:\Users\jacob\.codex\visualizations\2026\09\19\01a0b75f-e43c-7772-b8ea-d78334ce9284.
No production test or deployment occurred in this round. These are bounded UI
checks, not full WCAG conformance, physical-device or cross-browser coverage.

The editorial task's completed39-row inventory recommends retaining the factual
core rather than another full rewrite. Its only proposed changes are four
mentorship bullets and one clearer leadership heading, B60 pending approval.
This is a documented editorial judgment, not measured audience research.

## Evidence still required before a final public story

Primary standards checked September19: [WCAG2.0](https://www.w3.org/TR/WCAG20/)
is the requested conformance target; its testing combines automation and human
evaluation. [WAI-ARIA modal dialog guidance](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
grounds keyboard/focus/inert-background behavior. These references define checks;
reading them does not establish that this site passes them.

Record selected/rejected alternatives and why,implementation commits,manual and
automated test results,performance measurements and environments,accessibility
criterion matrix,failures/fixes/retests,and remaining limitations. Actual user
testing and business outcomes require real participants/data; none are invented.
The full WCAG2.0 A+AA evaluation is the FINAL implementation acceptance step,
after integrated design,motion and copy. Automated scan results alone cannot
substitute for keyboard,screen-reader,zoom,contrast and complete-flow evaluation.
Newer accessibility best practices may be tracked separately without relabeling
the requested standard. If coverage is incomplete,the case study must say so.
