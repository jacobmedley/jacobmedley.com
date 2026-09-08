# Wave 3 taxonomy checkpoint

Status: accepted locally on 2026-09-06. No deployment or push performed.

## What changed

- The case-study filter now uses the concise shared portfolio discipline language: Product, Systems, UX Research, Leadership, and Brand.
- Each case study carries one or two evidence-backed discipline tags, and filtering matches either tag.
- All 14 project records now carry one or two discipline tags drawn from the same taxonomy, with Visual and Conversion Optimization retained where the work supports those distinctions.
- The home-page section label is now **Selected Work**. Its existing `#full-stack` anchor is unchanged so saved and inbound links continue to work.

## Evidence boundary

The case-study tags are supported by the existing canonical story copy in `docs/case-study-site-copy.json`; project tags are supported by the existing project descriptions in `lib/data/projects.ts`. No project narrative, case-study narrative, or metric was rewritten for this wave.

The current resume masters named in the Genesis brief were not present in the repository or the approved scoped locations checked during this task. The resume's Expertise and Apps & Tools content therefore remains unchanged; no tool or proficiency claim was inferred.

## Verification

- Six case studies have valid tag arrays, with no more than two tags per story.
- All 14 selected-work records have discipline mappings, with no more than two tags per card.
- TypeScript, targeted lint, production build, and whitespace checks pass.
- Phone and desktop checkpoint images show no horizontal overflow or clipped card content.
