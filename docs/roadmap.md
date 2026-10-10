# Website roadmap

Current additions from Jacob's October 9, 2026 direction. This file owns future
website work; historical release plans retain their original evidence. A planned
item does not authorize a deployment or an install in another project.

## Feeral UX

### QP-01: Apply Quiet Prism from real reference patterns

**Priority:** first. **Status:** AI pilot implemented locally; wider adoption planned.
**Owner:** website design-system maintainer. **Dependency:** current catalog and
the accepted Product Framework and Design System modal.

- Maintain an element-by-element reference map for every new case study.
- Use [the application contract](quiet-prism-application.md), shared primitives
  and live examples before adding local visual rules.
- Keep evidence, art, navigation, actions and messages distinct. Carry the same
  typography, spacing, icon weight, tone and surface rules through each role.
- Add automated drift checks for independent surface colors/radii, missing
  source examples, accidental nested surfaces and inaccessible states. Start
  advisory, with documented exceptions for project art and reconstructed UI.
- Build a reference screenshot set and review changed patterns at desktop,
  tablet and narrow phone widths, including keyboard and reduced-motion states.

**Acceptance:** AI mapping has no unmapped element; shared tokens render equally
in the reference and AI surfaces; responsive and interaction evidence is attached.
Wider adoption completes only when each targeted modal has its own reviewed map.
The pilot does not certify the entire site.

### FUX-01: Create the Feeral UX best-practice plugin

**Priority:** next, after the Quiet Prism pilot. **Status:** planned, not built or
installed. **Owner:** Feeral UX plugin workstream, to be assigned at implementation.
**Dependency:** QP-01's reviewed method and evidence; a dedicated plugin source
repository and explicit target hosts selected before installation.

Create a plugin named **Feeral UX** that helps an agent apply a product's own design
system and test the resulting user experience. Quiet Prism is its first design-system
profile, not a universal style to impose on unrelated products.

Proposed capabilities:

1. **Intake and reference map:** identify user task, content authority, current
   components, approved references and missing evidence. Produce an element map.
2. **Design-system application:** resolve tokens and components from source and
   rendered examples; require an explicit reason for each extension.
3. **UX review:** assess navigation, hierarchy, reading, forms, feedback, errors,
   recovery, keyboard use, contrast, touch targets and responsive behavior.
4. **Journey verification:** use stored journeys where present; test actual outcomes,
   not just that controls exist. Keep untested checks visibly unverified.
5. **Evidence and handoff:** emit prioritized findings, screenshots, source references,
   acceptance results and a bounded implementation plan. Preserve factual limits.

Build sequence and completion criteria:

| Stage | Deliverable | Exit evidence |
|---|---|---|
| Design | Plugin manifest, capability boundaries, Quiet Prism profile and example element map | Review against this AI pilot and one different design system; no accidental site-wide styling assumptions |
| Build | Reusable skills, schemas and deterministic validators in the owning plugin repository | Host path handling, output isolation, permission boundaries and schema fixtures pass |
| Evaluate | Known good/bad fixtures plus a live reference-to-target journey | Detect drift, ambiguous controls and missing feedback; do not label missing coverage a pass |
| Package | Installable plugin with versioned docs and rollback | Validate package; test in a disposable workspace on chosen hosts before authorized installation |

**Guardrails:** read-only audit by default; implementation only when requested;
no automatic publishing, account access, dependency installation or edits outside
the selected project. Keep instructions separate from untrusted page evidence.
Reuse compatible audit capabilities where useful, credit their sources, and avoid
duplicating existing plugins without a demonstrated gap.

## Project access

### AUTH-01: A polished portfolio authentication flow

**Status:** planned, carried forward from Jacob's earlier request. Define invite,
sign-in, expired session, denied access, recovery and return-to-study behavior.
Use server-enforced access control with a clear public/private content boundary.
Acceptance requires mobile and keyboard journeys, no private content in the public
export, and a documented deployment/rollback plan. This roadmap item does not claim
the private portfolio has been secured or deployed.
