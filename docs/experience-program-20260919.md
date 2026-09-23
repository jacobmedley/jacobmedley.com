# Experience refinement program — one decision ledger

> September 20 supersession: Jacob authorized full-site implementation, including
> brand/marketing copy and the dedicated case-study experience, in task 01a0bf66,
> turn 01a0bfb7-e5d4-7122-8950-67022ed30378. The planning-only/lab-approval hold
> and dedicated-page deferral below are historical. Current local implementation,
> accepted source commits, evidence and remaining limits are recorded in
> [the full-site integration report](full-site-integration-20260920.md).
> Publication remains separate. This note preserves the original decision history.

Owner/coordinator: Jacob's current task 01a0b75f-e43c-7772-b8ea-d78334ce9284.
Baseline: main909ea22, live v12.160 / production1325c6b. No new publication authorized.
Primary handoff location: this file in X:\website-release-20260919. Other tasks
read it, but write their own worktree's report; the coordinator integrates.

## Outcome and boundaries

Make the existing main site a coherent, legible, usable, accessible experience
with restrained material and kinetic detail. Preserve approved content and working
behavior. Do not equate more animation with better UX. Do not redesign or rewrite
dedicated case-study pages. Existing main-site modal mechanics are in scope;
their case-study narratives are not part of the editorial rewrite.

Jacob requested two implementation chats and an additional editorial chat.
Each uses an isolated Git worktree, reads AGENTS/STATUS/working-agreement and fresh
Genesis context, and retains its own lock. Do not touch C:\dev\jacobmedley.com,
other worktrees, or parent preview8090. New previews use a verified unused port.
New worktrees may begin on old local main: inspect first, then safely fast-forward
the clean task worktree to fetched origin/main. Never discard user changes.
Expected current published baseline is909ea22; report unexpected remote changes.

Model recommendation: Astra/high for all three design/editorial workstreams.
Task creation retains configured defaults; verify actual settings when available,
stop on known mismatch for Jacob to switch, and do not claim a switch occurred.
Use deterministic checks first; only verified existing local inference routes,
no setup/new downloads/paid fallback. First-wave estimate25–50k cloud tokens total,
including review overhead, not measured savings or an instruction to exhaust usage.

## Requested annotations and ownership

| ID | Request | Owner / acceptance |
| --- | --- | --- |
| 1 | All education cards:22px top/sides,16px bottom. Optical content-to-rule,rule-to-View,View-to-bottom balance; footer compact. Single-column mobile:icon above title/source. | Parent foundation; keep existing600/1200px grid thresholds. |
| 2 | Stronger smooth focus using darker inherited card tone. | Parent foundation; interpret3px total, no glow, reduced-motion fallback. |
| 3 | Stack Explore selected work label and arrow. | Parent foundation. |
| 4 | Hero Jacob Medley and Product Design entrance/reveal brace spacing must match the final spaced { word } state; avoid stopping at text edges. | Motion task; inspect actual kinetic code and settled dimensions. |
| 5 | Outcomes-to-Experience divider:increase spacing to match section rules. | Parent foundation; reuse existing rule spacing token. |
| 6 | New isolated page with alternative card materials and interactions for approval:subtle edge shine,slow hover movement,scroll-linked shifting light. All card families. Case-card outer satin/matte,inner frosted glass. Readability before effect. | Visual-system task; prototype only, no global rollout before selection. |
| 7 | When featured case cards are one column,the visible button fills available width. | Parent foundation; scope to actual existing single-column breakpoint. |
| 8 | Replace Hydra icon with supplied C:\dev\jacobmedley.com\public\assets\references\hydra\HYDRA-ICON.svg. | Parent foundation; original asset read-only, validate and copy into tracked asset authority. |
| 9 | Desktop modal camera effect:background recedes/softens,modal settles into focus; reverse on close. Mobile bottom sheet starts above bottom nav,full width with top breathing room,downward swipe dismissal plus visible close. Lazy content stays; add bounded intent preloading and loading/error feedback if feasible. | Motion task; preserve focus trap/return,Escape,inert background,scroll lock,safe areas,internal scrolling,reduced motion and performance. No gesture-only path. |
| 10 | Single card wraps Team Building and Mentorship above Expertise above Apps & Tools. Preserve bullet readability;mentorship <=4 bullets. Slow application-logo rotation below tools;report missing approved icons. | Visual task owns layout/logo feasibility prototype; editorial task owns registered wording. Coordinate rather than invent copy. |

Visual references supplied in parent chat:dark satin membership card with fine
edge highlights and soft pink/purple lighting;blue translucent rounded panels
with restrained bright edges. These are material cues,not palette replacement.
Task tools may not carry the attached bitmap images; do not claim to have seen
them unless retrieved. Ground options in current site captures and this brief;
request the exact attachment only if necessary for a faithful comparison.

## Workstream deliverables

Visual: bounded inspection, approval-ready material options, working isolated
preview when workflow allows, motion/readability evidence and an adoption map.
Own new visual-lab page/components/CSS/report; avoid editing production global CSS
or modal/kinetic internals. New unlinked/noindex routes must not ship accidentally.

Motion: implement/review hero entrance and modal lifecycle in own worktree,
scoped CSS, tests, decision log and a reversible patch. Own modal/kinetic modules;
do not change the parent foundation selectors, prose or visual-lab materials.

Editorial: authoritative main-site inventory and one recommended editorial pass,
not competing AI rewrites. Read copy-register,jacob-style,voice-and-tone and
data-reporting. Review as industry practitioner,marketing editor and brand writer;
keep factual meaning,role precision,and Jacob's direct human voice. Flag provenance
gaps. Register proposals before implementation; separate mechanical corrections
from meaning/positioning changes needing approval. Own editorial report and
proposed register edits only; no source implementation or case-story rewrite.

Team Building and Mentorship must derive from B58 and Jacob's supplied practice:
walk beside junior staff;ask leading questions about next steps/dependencies;
make autonomy explicit;support considered risks and mistakes;remove blockers;
own outcomes,learn from mistakes,and make good results repeatable. No invented
mentee result,metrics,permission claim or unsupported management promise.

## Approval and evidence gates

1. Foundation edits locally verified and checkpointed.
2. Jacob selects one material/motion direction;editorial task presents one compact
   change summary with only consequential decisions,not a wall of alternatives.
3. Coordinator integrates accepted work and runs journey/regression testing.
4. After ALL accepted implementation/copy work is integrated,perform the requested
   full WCAG2.0 A+AA evaluation,criterion by criterion:automated AND manual tests,
   keyboard,focus,semantics,contrast,zoom/reflow,media/forms where applicable,
   screen-reader flows,modal states,loading/error states,all relevant responsive
   configurations. Mark Pass/Fail/Not applicable/Not tested with dated evidence.
   Automated scan alone is not conformance. Any missing assistive-technology
   coverage remains explicitly unverified. Consider newer best practices separately
   without quietly changing the requested conformance target.
5. Fix findings,retest,and request publication approval. Earlier Push live applied
   only to v12.160,not this new program.

Secondary deliverable: evidence-led making-of case study,A to Z. Maintain a log of
the initial problems,user intent,requirements,alternatives,rejected effects,
design tokens,copy governance,accessibility/performance decisions,implementation,
tests,findings/retests and limitations. Do not claim successful user research,
measured conversion gains,or WCAG compliance before evidence exists. This is a
future case-study draft,not a new public case page or a rewrite of existing ones.

## Current state

Foundation: complete locally; annotations 1,2,3,5,7,8 implemented and checked.
Preview: http://localhost:8090/ (this task's static server, PID12432).
No new publication, global material rollout or copy change.

| Task | ID | Checkpoint, September 19 |
| --- | --- | --- |
| Explore unified card materials and visual language | 01a0ba6e-ce13-7701-a6a9-206e048245ea | Three image-based directions presented in its chat; awaits Jacob's selection before implementation. Its recommendation is option2, Frosted Ledger. No source changes yet. |
| Refine hero motion and accessible modal transitions | 01a0ba6e-e37a-7ee3-bff1-63b5baf86fa5 | Implementation and export passed; browser interaction testing continues in its own worktree. Not integrated or accepted here. |
| Unify main-site copy and Jacob's editorial voice | 01a0ba6e-f542-77a3-b0f5-c8172fbdf40a | Review complete at4015702 on codex/main-site-editorial-20260919.39-row inventory; B60 pending. No application changes. |

Editorial recommends preserving published copy with only two approval decisions:
four B58-derived mentorship bullets, and How I lead the work replacing How I
approach the work. The report is docs/main-site-editorial-review-20260919.md in
that task's branch. Parent read the full report. Do not treat B60 as approved.

Visual task reports that the existing Font Awesome subset lacks the named app
brands. Obtain approved kit additions or supplied/approved SVGs before a real logo
strip; no dependency purchase or substitute logos. Exact asset list belongs in
that task. Nine education cards means one degree plus eight certificates.

Next user gate: choose a visual direction in the visual task. Copy decisions
remain in the editorial task. Final WCAG evaluation is not started by design;
it follows accepted integration, not these isolated foundation checks.

## Foundation verification and recovery

Production build, Next type/lint checks,11-page export,288 source-image hashes,
104 active image references and git diff --check passed. Supplied Hydra SVG
matches the original XML apart from formatting and renders as a theme-colored
mask. No source images, approved prose or dedicated case-study pages changed.

In-app browser checked320,375,599,600,614,768,1024,1376px with no horizontal
overflow. Education uses22/22/16px padding, icon-above-content below600px;
featured visible CTA fills its content width under the existing819px container
threshold and stays content-sized above it. Hero label/arrow stack; section-rule
margins use the existing32–48px fluid token. Keyboard disclosure,3px themed focus,
reduced-motion zero transition and forced-colors Highlight checked. The footer's
44px hit area is CSS-computed, not a separate pointer hit-test result.

Six inspected screenshots20–25 are in the current task's dated local artifact
folder, detailed in site-making-of-evidence-20260919.md. These checks are not a
full accessibility audit, assistive-technology review or cross-browser evaluation.

Local rollback909ea22; production remains v12.160 /1325c6b. Final foundation
commit is recorded in Genesis. No push, merge, deployment or additional spending.
