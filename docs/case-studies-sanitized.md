# Case Studies: Sanitized Source

**Status:** Cleared for public site and gated portfolio
**Rule set:** No PII. No company specifics. No identifiable dates. No named individuals. No internal codenames.

Fifteen case studies. Seven where AI carries the work, eight on core craft. Use whole, or pull sections.

---

# Part One: AI as Working Capacity

---

## Buy the Audit or Build the Machine

**Skim:** Automated accessibility auditing. Days per page down to hours. Vendor line item replaced by owned capability. Now runs on a schedule.

Two people. Seven workstreams. A health commerce platform about to push condition-specific landing pages live, and accessibility sitting in our lap. Accessibility can sit quietly on a backlog right up until it introduces itself through counsel.

Two ways to handle it, both rough. Audit by hand and burn days per page, with results that shift depending on who ran them. Hire a vendor, pay full freight, wait weeks, and by the time the report lands the page has already moved.

Neither one survives a team of two. So I stopped asking how to audit the page. The better question was how to make auditing so cheap we would never skip it.

**What I built**

A static analysis pipeline that reads saved page HTML and checks what actually breaks for people. Document structure. Landmark regions. Heading order. Alt text coverage. ARIA. Keyboard operability. Motion guards. Contrast ratios pulled from what renders in the browser, not what the design file promised.

I let AI chew through the mechanical portion and kept the pieces where being confidently wrong would matter. I put AI on the work whose primary requirement was refusing to become bored. I checked every finding against the standard, ranked severity, and turned raw output into work an engineer could pick up without a translation meeting.

Fourteen findings came back on the first pass, sorted into four tiers. Keyboard access on interactive elements. Missing semantic headings. Alt text gaps. Motion with no off switch.

**The finding under the findings**

Components held up. Color system held up. Almost every failure clustered in the layer where non-engineers assemble pages.

That changes what you fix. Nobody needs to rebuild a component library, and nobody needs another manual review gate slowing down teams that are already stretched. Those approaches inspect the wreckage. I wanted to close the door the defects were walking through.

Good people were shipping bad markup because the software was perfectly content to let them. Nothing in the publishing flow objected. That was the defect.

The publishing path needed teeth. Give it enough rules to refuse the failures we already know how to detect.

**What it changed**

Findings went out as ticket groups split by owner, content, front end, design, each carrying severity and evidence. Triage time dropped to near zero. Fixes landed before launch instead of after a complaint.

Because it is code and not a one-time effort, the next page cost nothing. Then the one after that. Now it runs on a schedule against the live site, so drift gets caught while it is still small.

Tactically, days became hours. Strategically, two people picked up a practice we had no headcount to hire for. That is the real answer to covering seven workstreams with two heads. You do not move faster. You make the work smaller.

---

## Four Documents, One Checkout, Zero Agreement

**Skim:** Conflicting specs at the payment step. Resolved in a day with a documented decision trail instead of another meeting cycle.

Checkout is the money step. A customer committing to a telehealth subscription with a consult fee attached, deciding in that moment whether this feels legitimate.

Four requirements documents said show the consult fee itemized, broken out on its own line. The most recent meeting directive and the design said show one combined price. Both were written down. Both had authors who believed they were current.

Engineering could build either. Whichever they picked, someone was going to call it wrong after the fact.

You can call it a spec conflict right up until it changes what appears beside the Buy button.

**What I did**

Fed the full requirements corpus to AI and had it read everything at once. Specification pages, meeting transcripts, ticket history. Forty source documents is exactly the sort of reading problem where human working memory begins quietly dropping plates.

AI surfaced the contradictions. I made the call.

Single combined price, matching a checkout pattern already converting with real customers. Documented the decision, tagged all four superseded requirements with their sources, and flagged the open dependency: refund messaging had to match the combined-price model or we would create a new conflict solving the old one.

**Why it stuck**

The decision closed in a day instead of circling through another meeting cycle. Engineering built once. The superseded trail meant nobody could reopen it three weeks later on a hunch.

A checkout question accidentally gave us a governance answer. It established that design makes experience calls and owns them, with receipts, rather than offering opinions and waiting.

---

## Reporting Should Not Cost a Headcount

**Skim:** Status, goals, and priority scans automated from live systems. Hours per week down to minutes. No workstream dropped at a two-to-seven ratio.

A new function, two people, roughly half-allocated to one major program, accountable across seven-plus initiatives.

Do the math on status reporting alone. Rollups, goal tracking, leadership visibility, cross-project scanning. There was a headcount-shaped hole in the operating work, and it competed directly with the work people actually hired us to do.

Nobody gets promoted for status decks. But leadership blindness is fatal, so it cannot simply be dropped.

**The operational layer**

I built reporting that runs on live data instead of memory.

A tri-weekly rollup pulling straight from the ticket system, chat, and calendar, formatted and ready to post. Performance and goal updates generated from actual work records, not recollection. Quarterly goals built directly from live ticket data. Cross-project priority scans that surface what needs attention, including tickets other teams file into ours without telling anyone.

**What came of it**

Leadership visibility held without recurring status meetings. Reporting overhead went from hours a week to minutes. Nothing dropped, at a ratio where dropping things is the expected outcome.

Every team I have worked on is lean and covering more ground than its headcount suggests. Teams short on capacity have a curious habit of prescribing themselves more meetings. Automate the reporting layer instead and design time goes back to design.

Eventually, nobody had to ask whether the work was under control. That is a useful reputation to acquire.

---

## Finance-Grade Answers From a Design Team

**Skim:** Software license spend analysis for marketing leadership. Seat allocation, external accounts, and waste identified. Analysis to leadership deck in a fraction of typical turnaround.

Marketing leadership needed answers about design software spend. Who holds paid seats. Which departments they sit in. Where the waste is hiding.

Budget questions, not design questions. The raw material was a seat export and an HR employee index, two files that answer nothing on their own and everything when joined correctly.

**How it ran**

Structured analysis joining the seat export against the employee index, then five specific business questions answered with defensible numbers. Packaged as a fourteen-slide deck built for a leadership audience, meaning conclusions first and methodology available if asked.

Paid seat split established at roughly half marketing, half everyone else. Forty-one external guest accounts identified, most of which nobody had inventoried. Concrete basis for cleanup and renewal negotiation.

**What it turned into**

I thought I was answering a budget question. I was also changing the team's job description by a few degrees.

Design moved a few seats upstream. The organization changed its idea of our lane after watching us operate outside it without hitting anything.

---

## A Retrospective Built on Evidence, Not Memory

**Skim:** Forensic launch timeline assembled from system records. Twelve contradictions documented with sources. Blameless format. Unestimated work identified as the systemic gap.

A six-week product launch closed with a senior leadership process review scheduled.

Post-launch memory is a poor database with excellent confidence. Everyone arrives with a version of events shaped by where they sat and what went badly for them personally, and the loudest recollection tends to win. That produces a blame session, and a blame session teaches an organization to hide problems rather than surface them.

**Building the record**

AI assembled a forensic timeline from ticket history, documentation pages, chat records, and screenshots. Every entry traced to a source. Twelve contradictions and pivots surfaced, each one anchored to evidence rather than recollection.

I translated it into visual review panels with friction markers, structured so the conversation stays on the process and off the people.

Memory makes people defend themselves. Evidence gives everyone a third object to look at.

Two facts landed on the record that had been circulating as informal knowledge. The creative estimate excluded wireframing entirely. Wireframing, reusable component design, and content template work appeared in no timeline, anywhere, on any version of the plan.

**Why that finding is the whole story**

The failure was pleasantly impersonal: whole categories of work had never entered the estimate. The team was measured against a schedule that never included what they were doing.

Once we found the omission, the remedy became rather boring. Estimate it next time.

A blameless account can still have sharp edges. Ours had citations. A timestamp is not infallible, but it is wonderfully indifferent to office politics.

---

## Measuring the Thing That Measures Everything

**Skim:** AI usage instrumented across twelve task types. Time saved, quality, and risk logged per use. Team survey synthesized. Adoption decisions made on data.

"It feels faster" is a poor unit of measure.

AI usage was expanding faster than our ability to explain whether any of it was useful. I needed to know where the machine was genuinely earning its electricity.

**The instrument**

A usage tracker covering twelve task types across six categories, spanning research, design, business writing, presentation work, and design system work. Every row logs time saved, frequency, quality rating, effort saved, and a specific risk note.

The risk note is mandatory. Every logged use case names what could go wrong with it, and every AI-assisted deliverable gets director review before it reaches leadership. A verbal guardrail is mostly a preference with witnesses, so I wrote them down.

Separately, a formatted team report analyzing survey responses across seven people.

**What the numbers said**

Individual tasks saved up to eight hours each. Coding was the dominant use case at seventy-one percent of respondents. Collective savings landed around 690 minutes per cycle. Daily usage across every respondent, unanimous on both would-use-again and would-recommend.

They were numbers I was willing to put in front of finance without developing a sudden interest in changing the subject.

Measurement gave the habit handles. Other people could finally pick it up, inspect it, copy it, or decide it was nonsense. And we needed the savings on paper before they quietly disappeared into everyone's expectations.

---

## Catching Conflicts Before Anyone Writes Code

**Skim:** Same forensic method as the checkout decision, moved earlier in the lifecycle. Five conflicts resolved before build started.

A landing page redesign sitting at the intersection of three artifacts. Creative brief, wireframe specifications, component library. Different authors, different weeks, all under launch pressure.

We had three sources of truth, which is an ambitious number of truths for one landing page.

**Running it early**

Same cross-referencing method proven on the checkout conflict, applied before build instead of during it. AI reconciled all three artifacts against each other and surfaced five documented conflicts, queued for resolution before a single component got built.

**The shift**

Resolve the argument while it still has a Delete key. Everyone knows this. Almost nobody organizes around it, because catching conflicts early requires doing work when nothing appears to be wrong yet.

Same machinery, installed at a much better point in the plumbing. The technique stayed put. The timing graduated.

---

# Part Two: Core Craft

---

## Four Executives, Four Different Customer Journeys

**Skim:** Cross-functional journey workshop with C-level participation. Custom board system, moderator guide, scenario matrix. Reusable assets, not a one-off event.

A major integration touching marketing, digital health, engineering, and the core commerce experience.

Every leader held a piece of the customer journey and believed they held the whole thing. The organization had divided the journey into departments. Customers had declined to do the same.

No shared end-to-end view existed of how a customer moves from first awareness to subscription to refill.

**Designing the session**

Built a custom board system for this specific session rather than pulling a generic template, because a template shapes the conversation toward whatever the template was originally for.

Wrote a moderator guide so facilitation quality did not depend on how sharp I happened to be that morning. Constructed a scenario matrix so the group worked concrete customer situations. The matrix kept the conversation attached to gravity.

**What came out**

A documented end-to-end journey map with C-level participation and buy-in. Handoff failures surfaced live, in the room, with the owners of both sides present. That conversation does not happen over email.

The assets outlived the session. Board system, moderator guide, and scenario matrix all exist for future journey work.

The workshop mattered partly because the people in the room had budgets attached to their opinions. And it demonstrated that design runs executive working sessions, not just screens.

---

## Navigation Decisions Were Being Made on Taste

**Skim:** Moderated usability study, ten participants. Evidence-backed IA findings feeding a navigation redesign. Established the research template.

Site navigation was being decided by preference. Mega menu, category structure, shop-by paths, none of it tested against a single real user.

Navigation is the front door to every product page in the catalog. Getting it wrong does not cost you one page, it costs you findability across everything behind it. Deciding that on taste is an expensive habit.

**The study**

Moderated usability testing with ten participants against the navigation and information architecture, synthesized into a report built to feed a decision rather than sit in a folder.

Shop by Condition outperformed the alternative entry paths, which told us users arrive thinking about their problem, not our catalog structure. The mega menu had discoverability and visibility failures that no amount of internal debate had surfaced.

**The recurring trap**

We were testing the menu on people who already knew where the kitchen was. Expertise had become a blindfold with excellent credentials.

My field has elegant terms for this. Cognitive load. Mental models. If those words do not mean anything to you, that is exactly the point, and it is the same gap a first-time visitor hits on our navigation.

The durable result was procedural: preference had lost its monopoly.

---

## Reframing a Scope Fight as a Staffing Question

**Skim:** One page ended a circling launch scope debate. Phasing paths with staffing implications. Recommended path adopted with the hire as an explicit gate.

Leadership was debating launch scope. Everything at once, or phase it.

The conversation had developed a stable orbit. Every stakeholder owned a different piece of the scope, and every piece is the important one when you own it.

**Changing the question**

One page. Phasing paths laid out with their staffing implications attached, so the tradeoff became visible instead of theoretical.

Recommended phasing weight loss first, with a full-stack designer hire named as the explicit gate to phase two. Not a suggestion, a gate. Phase two starts when the person starts.

Written for a VP audience, which means short, decision-ready, tradeoffs on the surface.

**The outcome**

A circling debate converted into a bounded, decidable resourcing question. The recommended path was adopted with the hire formally tied to phase two.

Scope could expand indefinitely. Staffing had the courtesy to be finite.

A debate that refuses to resolve is often answering the wrong question very diligently.

---

## Tokens Before Surface Area

**Skim:** Design token foundation and second brand theme on a shared commerce platform. Accessibility enforced at the token layer. Built before the pages, not after.

A second brand needed to live inside an existing commerce platform. The company had no design system at all.

Without a token layer, every surface for the new brand gets hand-styled. Every brand adjustment becomes a manual hunt through files. Inconsistency compounds with each page, and it compounds quietly, so you do not notice until the cleanup is enormous.

The first layer was going to either save us work or manufacture it.

**The build**

Theme tokens covering color, typography, and spacing, with the new brand theme layered on top of the base. Four button variants with accessibility flags baked into the tokens rather than checked afterward. Evaluated a component substrate and documented the recommendation with reasoning.

Governance model established first, so the system leads the build instead of chasing it.

**What it bought**

The new brand launched coherent, on shared infrastructure, instead of arriving as a pile of one-off styles nobody could maintain.

Accessibility stopped depending on somebody remembering to be virtuous on page seventeen.

Brand changes now happen once, at the token layer, rather than page by page. And the incoming designer inherits a documented foundation to build against on day one instead of a folder of conventions living in someone's head.

Everything is designed, everything. Including whether your next page is easy or expensive.

---

## Reviews That End in Decisions

**Skim:** Design review operating model. Rules of engagement, critique-with-solution format, routed ticket outcomes. Reviews produce decisions instead of open threads.

Design reviews were opinion sessions.

Feedback arrived as taste. I do not like the button. No owner attached, no decision reached, no record kept. A review without a decision is just a very elaborate way to move an argument to next Tuesday.

**The model**

Rules of engagement defining what feedback is in bounds and what is not.

A point-of-view-plus-proposed-solution format. Critique arrives with a recommendation attached or it does not arrive. That single constraint forces reviewers past preference and into reasoning, and the quality of feedback changed immediately once people had to finish the thought.

Structured ticket comments with corrected owner routing, so every review output lands with the person accountable for it rather than dissolving into a thread.

**Effect**

Reviews end with decisions and routed actions. Settled things stay settled because they are written down and traceable.

The model is documented, so the next designer inherits a working practice instead of absorbing tribal habits by osmosis.

The model turned an improvement into furniture. It stayed in the room.

---

## Estimates That Excluded the Work

**Skim:** Cross-functional prioritization workshop. Timeline math corrected on the record. Unestimated work named as the structural gap. Agreed system authored by the CMO.

Landing page work was contested ground. Which pages, what order, what timeline, built by whom.

Estimates were circulating that quietly excluded entire categories of work. Not maliciously, just by habit, because the excluded work is invisible to people who do not do it.

**Facilitation, then the carpentry**

Ran a prioritization and alignment workshop with cross-functional leadership. The session produced raw material. I stayed for the carpentry: executive summaries, a process document, and talking points for the follow-up one-on-one.

Two corrections landed on the record during the session. The creative estimate excluded wireframing entirely, confirmed by the person who owned the estimate. And wireframing, reusable component design, and content template work appeared in no timeline anywhere, which nobody had said out loud before.

The CMO proposed the two-template wireframe structure that became the agreed system.

**Why authorship matters**

That last detail is not incidental. The system had an executive co-owner before it had a chance to become "the UX process." My recommendation could be reconsidered. One carrying her handwriting was harder to dislodge.

The facilitator has an unusual job: engineer the collision, then avoid standing in the crater.

Future timelines have to account for wireframing, components, and templates now, because the omission is documented and cannot be quietly repeated.

---

## Making UX Visible in the Numbers

**Skim:** KPI framework pairing experience metrics to business outcomes. Scorecard across three data sources. Voice of customer program replacing NPS with CSAT and CES.

Design had an accounting problem. Value went in; attribution did not come back out.

Conversion and test wins were joint efforts reported entirely through another team. Worse, the company had no standing way to measure experience quality at all. No framework, no instruments, no customer feedback program.

**Building the measurement layer**

A standing KPI framework structured on the HEART model, pairing experience metrics directly to business outcomes so the connection is explicit rather than implied.

A scorecard drawing on three data sources: real user monitoring, moderated testing, and survey data. Each instrument had a blind spot, so I did not give any of them sole custody of the truth.

A voice of customer program replacing NPS with CSAT and CES, including a structured vendor evaluation. NPS tells you a number moved. CSAT and CES tell you which experience caused it, which is the only version a designer can act on.

**Result**

A repeatable scorecard connecting experience to business outcomes, and a feedback program ready for instrumentation with a vendor recommendation attached.

Experience work now reports under its own name instead of being absorbed.

If UX never appears in the numbers, eventually someone asks why it appears in the budget.

---

## Building the Function That Was Not There

**Skim:** Design system, research practice, review model, measurement framework, and facilitation capability. All net-new in year one, alongside shipping a major integration.

No prior team. No design system. No research practice. No operating model. No measurement.

A function standing up from zero while simultaneously shipping a major product integration and covering seven-plus workstreams with two people.

Visible work has an unfair advantage: people clap for it. Infrastructure rarely gets applause. It would have been easy to spend the year shipping screens and leave the machinery untouched.

**What got built alongside the delivery work**

A token foundation with governance, before the surface area scaled. A usability testing practice with a repeatable report format. A review operating model with rules and routing. A KPI framework and customer feedback program. Executive facilitation capability with reusable assets.

**The through line**

Successful UX often leaves very poor trophies. Nobody praises a review that ended cleanly, a timeline that included all the work, or a page that inherited its brand automatically.

The artifact was stability. Portfolio photography remains challenging.

If the second version costs as much as the first, I probably have not finished designing the first one. Wherever the work repeated, I tried to leave machinery behind.

I like decisions to leave a paper trail and dead arguments to remain dead.

There is always a better way.
