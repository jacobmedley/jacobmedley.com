# WCAG 2.0 A/AA coverage, local integration

Scope: the eight public pages and fourteen main-site dialogs in the September 20
integration. Reference: [W3C WCAG 2.0](https://www.w3.org/TR/WCAG20/).
This matrix covers all 38 A/AA success criteria and separates observed checks,
not-applicable content and remaining verification. It is not a certification.

`Checked` means the specified checks passed, within their stated scope. `Partial`
identifies evidence that does not establish the whole criterion. Automated checks
used axe-core 4.13.0 in Chromium; screenshots, DOM inspection and keyboard checks
supplemented them. Details and measured values are in
[the integration report](../full-site-integration-20260920.md) and
[structured evidence](full-site-integration-20260920.json).

| Criterion | Level | Coverage and evidence |
| --- | --- | --- |
| 1.1.1 Non-text Content | A | Partial. Axe passed image/control names. Decorative card art is hidden; evidence images retain descriptive alt text. Full semantic equivalence of every historical screenshot/diagram is not independently established. |
| 1.2.1 Audio-only and Video-only | A | Partial. No audio-only material found. Animated study images have text alternatives and a static canvas fallback; equivalence of all historical visual sequences not independently reviewed. |
| 1.2.2 Captions (Prerecorded) | A | Not applicable to inspected content: no synchronized audio/video. |
| 1.2.3 Audio Description or Media Alternative | A | Not applicable to inspected content: no synchronized audio/video. |
| 1.2.4 Captions (Live) | AA | Not applicable: no live media. |
| 1.2.5 Audio Description (Prerecorded) | AA | Not applicable to inspected content: no synchronized audio/video. |
| 1.3.1 Info and Relationships | A | Checked with axe, headings, named filter groups, lists, native disclosures and dialog structure. Education/section hierarchy and generic labeled groups corrected. Screen-reader speech not tested. |
| 1.3.2 Meaningful Sequence | A | Checked reading order in homepage/story snapshots and single-column layouts. Art is decorative; copy and actions remain in DOM order. |
| 1.3.3 Sensory Characteristics | A | Checked interface instructions and copy. Controls are named; navigation does not require interpreting color or decorative icons. |
| 1.4.1 Use of Color | A | Checked filter pressed state, text labels, focus outlines and forced-colors keyboard presentation. Filters do not communicate selection only through hue. |
| 1.4.2 Audio Control | A | Not applicable: no autoplay audio found. |
| 1.4.3 Contrast (Minimum) | AA | Partial. Solid-background axe violations corrected; 90 rendered featured-card text/background positions sampled and two final footer fixes retested above 4.5:1. Gradients remain axe incompletes. Not every frame or source image audited. |
| 1.4.4 Resize Text | AA | Partial. Responsive layouts checked from 320 to 1440px and four threshold edges. Native 200% zoom was not achieved in the in-app browser and is explicitly unverified. |
| 1.4.5 Images of Text | AA | Partial. Current interface headings/body/actions use live text. Historical brand marks and screenshots preserve evidence; necessity of every text-bearing historical image has not been independently audited. |
| 2.1.1 Keyboard | A | Checked all fourteen modal triggers, reading-area Page Down, Close/Escape, five native experience disclosures, navigation and filter controls. Interactive demo retains native controls. |
| 2.1.2 No Keyboard Trap | A | Checked modal focus containment and Escape exit/return for all fourteen dialogs. No mandatory gesture-only action. |
| 2.2.1 Timing Adjustable | A | Checked source: no user-task timeout. Demo cycles can be held by choosing a state and honor reduced/global paused motion. |
| 2.2.2 Pause, Stop, Hide | A | Checked page-wide pause stops CSS animations; reduced motion yields zero running animations; GIF component reads pause state. Demo's automatic state cycle also reads pause state. |
| 2.3.1 Three Flashes or Below Threshold | A | Partial. Reviewed effects are slow drift, opacity and short entrance transitions; no intentional flash effect. No formal luminance/flash analyzer run over historical media. |
| 2.4.1 Bypass Blocks | A | Checked main/dedicated skip links and their valid main targets. Homepage skip link added. |
| 2.4.2 Page Titled | A | Checked generated route metadata and axe across eight pages. Dialogs have project titles. |
| 2.4.3 Focus Order | A | Checked native document order, dialog initial focus, Tab containment, newly focusable reading area and return to each trigger. |
| 2.4.4 Link Purpose (In Context) | A | Checked named card links/triggers, education links with credential context and same-tab dedicated navigation. |
| 2.4.5 Multiple Ways | AA | Checked index, discipline filtering, header links, homepage entries, in-page navigation and next-story links. |
| 2.4.6 Headings and Labels | AA | Checked main section, study, employer/disclosure, filter and dialog labels. Retained headings describe their content. |
| 2.4.7 Focus Visible | AA | Checked 3px card and reading-area outlines. Informational focus glow replaced by solid outline; forced-colors retest returned a visible 3px solid system-color outline. |
| 3.1.1 Language of Page | A | Checked root lang=en and axe. |
| 3.1.2 Language of Parts | AA | Checked edited copy: English prose, conventional names and acronyms; no newly introduced foreign-language passage. |
| 3.2.1 On Focus | A | Checked focus preloads at most three assets and changes decorative speed without navigating or opening dialogs. |
| 3.2.2 On Input | A | Checked explicit click/Enter selection for filters and disclosures. Filter updates remain on the same page and expose a live count. |
| 3.2.3 Consistent Navigation | AA | Checked shared dedicated header/footer and main navigation. Internal links use the same browsing context. |
| 3.2.4 Consistent Identification | AA | Checked repeated close, view, filter and navigation controls across families. |
| 3.3.1 Error Identification | A | Not applicable to user-data submission: no submission form. Media error/Retry separately checked. |
| 3.3.2 Labels or Instructions | A | Checked named filter/demo controls; no data-entry form. |
| 3.3.3 Error Suggestion | AA | Not applicable to user-data submission. A simulated image failure presents Retry and the retry succeeds. |
| 3.3.4 Error Prevention | AA | Not applicable: no financial/legal/data-deletion transaction or test submission. |
| 4.1.1 Parsing | A | Partial. React production export, TypeScript and axe passed; one filter definition/h1 per route verified. No full HTML conformance-validator run. |
| 4.1.2 Name, Role, Value | A | Checked axe on eight routes/fourteen dialogs, native disclosure state, filter aria-pressed/live count, named dialogs, pause aria-pressed and group-label corrections. |

Physical assistive technology, native zoom and Safari/Firefox remain separate
acceptance work. Do not convert the zero detected axe violations into a blanket
WCAG conformance claim or imply Jacob has approved this final visual result.
