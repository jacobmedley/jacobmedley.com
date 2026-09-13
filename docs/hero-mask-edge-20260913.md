# Hero mask edge refinement

Jacob reported that the name and Product reveals still appeared to lag behind
the braces. This scoped correction starts at `8cd2db3` in worktree 4b5e on
`codex/website-visual-system-20260912`.

The old name span included 1.6em of empty space, about 44px per side at the
1706px test width. At 1600ms, the spring added enough travel to measure roughly
54px between the text box and each brace. The earlier acceptance measured
mask/container agreement but missed this visible spacing problem.

Both reveal masks now read the same inherited, registered `--hero-aperture`
length that positions the braces. A single root animation changes that value.
The mask itself has no separate interpolated movement: it releases discretely
after each reveal so the name stays visible during the downward transfer.
The original spring functions and timestamps are retained.

The target span leaves .04em per side between the text box and brace inner
edge. At the desktop test size, the settled measured gap is about 2.3px for
the name and 2.2px for Product. The brief spring overshoot remains visible.
Role widths use the same spacing so the gap does not expand again during the
later cycle; the outer allowance for the plus and Design remains .7em.
No breakpoint was added. Existing narrow/container layout and reduced-motion
fallback remain in place. No copy, reference assets or demo changes.

## Verification

- TypeScript, targeted ESLint, whitespace checks and the 11-page production
  export pass. The new verification script's unused argument warning was
  corrected before the final lint pass.
- 301 sampled frames cover 1706, 992, 768, 375 and 320px plus 200% text at
  320 and 992px. Both actual brace inner edges agree with their active mask
  edge within .25px. All settings have zero page overflow.
- Actual playback: 54 name samples and 20 Product samples. Maximum edge
  differences are .00825px and .00788px respectively. Both animated reveal
  segments were played; this was not a new full 39-second realtime run.
- Screenshots at 1300ms and 2590ms show text directly meeting the moving
  brace edges. The 1450ms screenshot also preserves the opening spring bounce.
- Reduced motion: static name, both braces visible, zero animations.
  Seeking the endpoint and resizing retains all 17 tracks finished at 39000ms.
- Project data, demo source and reference assets match `8cd2db3`.
- Chromium only. Safari, Firefox and physical devices were not tested.

Script: `scripts/parity/hero-mask-edge-20260913.mjs`. Compact evidence:
`docs/reviews/hero-mask-edge-20260913.json`. Full samples and screenshots are
in the ignored `scripts/parity/shots/hero-mask-edge-20260913/` directory.

## Handoff

Changed files: KineticHeroIdentity.tsx, visual-system.css, the new verification
script, this report, compact evidence JSON and STATUS (six files). No B edits
applied or skipped; no registered copy changed. Sol/medium was recommended;
the active model was retained. Deterministic checks used the existing tools,
without local inference or additional spending.

Exchange read at intake, then freshly checked before acceptance at
2026-09-13T04:06:02Z. Intake fingerprint:
`2dba6e4fc92b4a97a274be98e44722c2eadc0384c30585a98be24eff059be8fd`.
Direction event: `20260913T040049Z-f311dfa5557d412d90c9aa1817de6794`.
Acceptance fingerprint:
`3c3eff60fd622a9445d4d1cf312ebe0514e46d3f167cf58ffe12f4beadae99ed`.
No conflicts. The append-only completion event records the final commit;
shared CURRENT/website pointers remain coordinator-owned. No remote read or
acknowledgement is claimed.

Preview http://localhost:3013/ serves this worktree's out/ (PID 35788), HTTP
200. Browser test overrides were cleared and normal playback restored.
No other worktree service was operated. No push, PR, merge or deployment.
Rollback: `8cd2db3`. STATUS is written last, followed by the local recovery
commit and release of the owned lock. No remaining work for this mask fix;
the previously deferred copy, BumblebeeMD and Reveal-source work stays open.
