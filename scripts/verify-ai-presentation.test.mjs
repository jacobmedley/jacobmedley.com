import test from 'node:test'
import assert from 'node:assert/strict'
import { inspectPresentation } from './verify-ai-presentation.mjs'

test('rejects literal, encoded, escaped and template arrows, but ignores comments', () => {
  for (const source of ['<a>Paper ↗</a>', '<a>Paper &#8599;</a>', '<a>Paper &nearr;</a>', 'const s = "\\u2197"', 'const s = `Paper ↗ ${title}`']) {
    assert.ok(inspectPresentation('AIStudy.tsx', source).length, source)
  }
  assert.deepEqual(inspectPresentation('AIStudy.tsx', '// A → B\nconst x = <Arrow external />'), [])
  assert.ok(inspectPresentation('AIStudy.css', '.node::after { content: "\\2192"; }').length)
  assert.ok(inspectPresentation('study.json', '{"title":"Paper ↗"}').length)
})
test('rejects decorative horizontal borders including logical and longhand properties', () => {
  for (const property of ['border-top', 'border-bottom', 'border-block', 'border-block-start', 'border-top-width']) {
    assert.ok(inspectPresentation('AIStudy.css', `.entry { ${property}: 1px solid black; }`).length)
  }
  assert.ok(inspectPresentation('AIStudy.css', '.entry { border-bottom-style: solid; }').length)
  assert.deepEqual(inspectPresentation('AIStudy.css', '.entry { border-top: 0; background: var(--surface-rule); }'), [])
})
test('keeps approved control indicators and enclosed card borders', () => {
  assert.deepEqual(inspectPresentation('AIExperience.module.css', '.customerSequence .stateRail button[aria-pressed=true] { border-bottom-color: var(--card-ink); }'), [])
  assert.deepEqual(inspectPresentation('AIServiceWorkspace.module.css', '.nav button { border-bottom: 4px solid transparent; }'), [])
  assert.ok(inspectPresentation('AIServiceWorkspace.module.css', '.nav button, .entry { border-bottom: 4px solid black; }').length)
  assert.deepEqual(inspectPresentation('AIStudy.css', '.card { border: 1px solid var(--card-line); }'), [])
})
