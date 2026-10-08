# Ideas

Feature and interaction ideas that are not copy. `docs/copy-register.md` holds
written copy as numbered, implementable B edits — this file holds things that
aren't that: proposals with engineering requirements attached, not yet
scheduled, no branch open.

An idea here is not authorized for implementation. It moves to a branch when
someone decides to build it, not before.

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
