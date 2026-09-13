# Release readiness — September 13, 2026

**Ready for the authorized production release.** This disposition supersedes the
historical blocked release disposition in `release-acceptance-20260913.md`.
Jacob explicitly requested unblocking and publishing the site, with WCAG 2.0 AA
as the accessibility target. PR: https://github.com/jacobmedley/jacobmedley.com/pull/9.

## Reviewed boundary

Application/build checkpoint: `0dce63f0c1dfb1bf60ee9417b696d0fd2e5c2388`.
Fresh main/base and rollback: `e6b3672f88e5847d84a854f45ae3d29ca8269952`.
The earlier independent whole-release review remains the source for unchanged
copy, artwork, responsive structure, navigation and content preservation.
This continuation changes only dependencies, the verification workflow and
release documentation; application components, CSS, copy and original images
are unchanged from independently reviewed `a8f1ee2`.

## Acceptance decisions

| Item | Final evidence and disposition |
| --- | --- |
| ACC-B03 | Resolved. Retained independent evidence at application `5c4efc9`; rebuilt final dependency graph on Windows and Ubuntu verifies all 288 tracked images and 104 active references. |
| ACC-V01 | Resolved for native Chrome. Disabled the debugger's focus emulation, switched actual browser tabs, and captured trusted hidden/visible events. All 19 hero animation clocks paused at 1184.299 ms for 21.064 seconds, then resumed at 1684.711 ms. Demo stayed Ready for 22.653 seconds hidden, with no state mutations, then changed to Busy after becoming visible. No synthetic visibility event or overridden document.hidden was used. |
| ACC-V02 | Resolved for native Chrome. Chrome toolbar displayed 200%; devicePixelRatio changed from 1 to 2 and CSS viewport from 1272 to 636, with visualViewport.scale 1. All 14 project modals, the index and six standalone stories had zero horizontal page/dialog overflow. Modal open/Escape worked throughout; representative enlarged content was visually inspected. Browser zoom restored to 100%. |
| ACC-V04 | Resolved. Actual Ubuntu/Node 20 CI installation, authored-source lint, typecheck, clean static build, asset verification and online audit passed. Windows Node 20.20.2/npm 10.9.9 also built a fresh archive with no development image junction or previous output. |
| Reduced motion / focus | Final artifact produced a static hero with zero hero animations under reduced motion. Escape returned to the call-center trigger. Existing independent keyboard/focus coverage is retained for unchanged components. |
| ACC-V03 / ACC-L01 | Coverage limitations, not additional launch gates under Jacob's scoped personal-site release: Firefox, WebKit, physical devices, screen readers and historical whole-repository/generated/archive lint remain unverified. Authored-source lint passed on Ubuntu. |

Machine-readable native evidence: `reviews/release-native-20260913.json`.
Successful Ubuntu run: https://github.com/jacobmedley/jacobmedley.com/actions/runs/34763361743.
Local screenshots, audit JSON and complete CI logs are retained in this task's
`release` evidence folder under the Codex visualization directory.

At 200% zoom the tall demo can remain automatically paused when its visible
intersection is below the existing threshold. Its Ready/Busy/Closed controls
remain usable. This is not a loss of the site's manual functionality.

## Audit reconciliation and dependency changes

The earlier zero-finding audit observation is historical. Actual Ubuntu CI and
an explicit online public-registry audit reproduced six high and one critical
finding before changes. A cached npm runtime launched with `npm exec --offline`
can pass offline configuration into its child npm command; this continuation
reproduced a misleading zero result on the vulnerable graph. Do not use that
invocation to certify a fresh advisory check.

Next was updated within major 15 from 15.5.15 to 15.5.25. Compatible lockfile
updates include Sharp 0.35.4, PostCSS 8.5.28, brace-expansion, fast-uri, js-yaml
and nanoid. Next's pinned nested PostCSS 8.4.31 needed an explicit override to
the patched 8.5 line and lockfile reconciliation. No forced Next 16 upgrade was
used. Both final Windows and Ubuntu online audits report zero findings.

The PR verification workflow has read-only repository permissions, no FTP
secrets and no deployment step. It retains the verified static artifact for
seven days. Audit runs with `--offline=false` and the public npm registry.
The existing SiteGround deployment workflow, destination and
`dangerous-clean-slate: false` are unchanged.

## Accessibility scope

WCAG 2.0 AA is the target, not a claim of complete certification. Its
[1.4.4 Resize Text requirement](https://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale)
includes resizing text to 200%, so this check was completed rather than waived.
The larger browser/device matrix and later-version/outlier expectations are
follow-up coverage. Native tab suspension is an engineering check, not a
standalone WCAG success criterion. Existing design decisions, including removed
visible global motion controls, are retained; a complete criterion-by-criterion
conformance audit remains outside this release verification.

## Publication and recovery

Jacob's current instruction authorizes branch push, PR, merge and deployment,
superseding prior local-only instructions for this candidate. Before merge,
verify the exact PR head/base and a passing check, then use the existing main
push deployment. Afterward verify visitor-visible HTML/assets, cache headers,
`/musings/` and `/interaction-design-concepts/response-times/`. Both legacy
pages returned HTTP 200 before deployment. Preserve rollback `e6b3672`.

Genesis direction event: `20260913T143310Z-483c6d67679142198ff9d1c47d559fc0`.
Fresh checkpoint fingerprint at 14:46 UTC:
`3b8789f712b595c0c21fbb92350cee6f32d59c3c286c3884ef4eb65193b07f1c`.
The original dirty checkout and other worktrees remain untouched; the existing
3013 preview is preserved. A separate final-artifact preview runs on 8090 for
this release verification and will be closed after deployment.
