# Ideas

Feature and interaction ideas that are not copy. `docs/copy-register.md` holds
written copy as numbered, implementable B edits — this file holds things that
aren't that: proposals with engineering requirements attached, not yet
scheduled, no branch open.

An idea here is not authorized for implementation. It moves to a branch when
someone decides to build it, not before.

---

## Amrons castle — scalable agent visualisation platform

**Status: IDEA. Backlog. Not scheduled. No branch.**

Create a customizable, themable visualisation of agents that can scale from a
personal animated environment into a reusable product that people can install
and use across multiple frameworks and platforms.

### Product direction

- Make the experience feel like a living place rather than a static dashboard.
- Support a full-screen castle mode with a persistent sidebar.
- Improve layout density and reclaim wasted screen space across the experience.
- Add better statistics, reporting, and operational visibility.
- Replace the factory concept when the product direction is clearer; retire the
  current factory presentation rather than expanding it by default.
- Create a Genesis animated logo and a coherent onboarding flow.
- Design the system so themes, characters, spaces, and interactions are
  composable rather than hard-coded to one setting.

### World, characters, and interaction

- Build an infinite, tileable forest space.
- Refine the fairy and fish visuals.
- Give Loki a set of random, bounded animations.
- Add his brother Thor.
- Redesign Loki and Thor to match Jacob's real dogs.
- Let people give characters custom names.
- Add meaningful character-to-character and character-to-environment
  interactions.

### Theme backlog

Treat these as interchangeable presentation layers over the same underlying
agent, data, and interaction model:

- Office
- Castle
- Orcs
- Factory
- AI robot factory

### Suggested roadmap

1. **Foundation:** define the agent model, visualisation states, theme contract,
   responsive layout rules, and cross-platform installation target.
2. **Core shell:** build the full-screen mode, sidebar, onboarding, naming, and
   improved stats/reporting surfaces; remove wasted layout space.
3. **Castle world:** establish the castle as the first complete theme, including
   the Genesis animated logo and a stable visual language.
4. **Living world:** add the tileable forest, fairy and fish refinements,
   character animation scheduling, and basic interactions.
5. **Companion system:** redesign Loki, add Thor, support custom names, and
   introduce dog-inspired character variants.
6. **Theme expansion:** implement Office, Orcs, Factory, and AI robot factory as
   theme packages against the shared foundation.
7. **Distribution:** validate installation, embedding, and persistence across
   the intended frameworks and platforms before calling the system reusable.

### Open decisions for a future build brief

- Which frameworks and platforms are in the first supported release?
- Is the visualisation embedded in an existing product or distributed as a
  standalone application/component?
- What agent state and reporting data must be real, simulated, or user-defined?
- What parts of the real-dog resemblance are visual references versus literal
  character assets?
- Which theme is the first release target: Castle, Office, or another layer?

---

## Animated hero title cycle

**Status: IDEA. Not scheduled. No branch.**

Current hero subtitle: "UX/UI Designer & Digital Strategist"

Replace with a cycling sequence where shared letters persist and only the deltas
animate. Not a crossfade.

**Sequence:**

```
Product Designer
UX Designer          (UX splits in, Product moves out)
Design Systems       (UX and -er animate out, Design holds, Systems in)
Digital Strategist   (slot-machine letter roll)
Product Designer     (returns, Digital Strategist out)
```

**Requirements, non-negotiable:**

- Wrapped in `@media (prefers-reduced-motion: no-preference)`. Under reduce,
  render one static title.
- Fixed-width container sized to the longest string, or the hero shifts on
  every transition and CLS regresses from its current zero.
- Real text in the DOM, not canvas or image, so it stays selectable and
  readable by assistive tech.
- `aria-live` off. A cycling decorative title should not announce.

**Why build it:** the animation demonstrates recomposition, which is the same
argument the Design Leadership lead paragraph makes. That is the reason to
build it, not the motion itself.
