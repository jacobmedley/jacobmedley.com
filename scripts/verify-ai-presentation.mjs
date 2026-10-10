// Build gate for Jacob's recurring AI-study arrow and separator corrections.
// Scope: AI-prefixed components/styles and their canonical JSON, not artwork or
// mathematical notation elsewhere. Rendered review is still required.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'
import postcss from 'postcss'

const arrows = /[\u2190-\u21ff\u27f0-\u27ff\u2900-\u297f]/u
const decode = value => value
  .replace(/&#(x[\da-f]+|\d+);/gi, (_, code) => String.fromCodePoint(code[0].toLowerCase() === 'x' ? Number.parseInt(code.slice(1), 16) : Number(code)))
  .replace(/&(rarr|larr|uarr|darr|nearr|nwarr|searr|swarr);/gi, '→')
  .replace(/\\([\da-f]{1,6})\s?/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))

export function inspectPresentation(file, source) {
  const findings = []
  const checkText = (text, line) => {
    if (arrows.test(decode(text))) findings.push(`${file}:${line}: use the Font Awesome Arrow component, not an arrow glyph`)
  }
  if (file.endsWith('.css')) {
    postcss.parse(source, { from: file }).walkDecls(decl => {
      if (decl.prop === 'content') checkText(decl.value, decl.source.start.line)
      if (!/^border-(top|bottom|block)(?:-(?:start|end))?(?:-(?:width|style|color))?$/.test(decl.prop)) return
      if (/^(0(?:px|rem|em)?|none)(?:\s|$)/.test(decl.value)) return
      // Solid underlines identify selectable controls, not prose sections.
      const selector = decl.parent.selector ?? ''
      const control = file.endsWith('AIExperience.module.css') && /^\.customerSequence \.stateRail button(?:\[aria-pressed=true\])?$/.test(selector)
        || file.endsWith('AIServiceWorkspace.module.css') && /^\.nav button(?:\[aria-pressed='true'\])?$/.test(selector)
      if (!control) findings.push(`${file}:${decl.source.start.line}: ${selector} uses a horizontal border; use solid-center or var(--surface-rule)`)
    })
  } else if (file.endsWith('.json')) {
    const walk = value => {
      if (typeof value === 'string') checkText(value, 1)
      else if (value && typeof value === 'object') Object.values(value).forEach(walk)
    }
    walk(JSON.parse(source))
  } else {
    const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
    const walk = node => {
      if (ts.isJsxText(node) || ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
        checkText(node.text, tree.getLineAndCharacterOfPosition(node.getStart(tree)).line + 1)
      }
      ts.forEachChild(node, walk)
    }
    walk(tree)
  }
  return findings
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const directory = 'components/case-studies'
  const files = fs.readdirSync(directory).filter(name => /^AI.*\.(tsx|css)$/.test(name)).map(name => `${directory}/${name}`)
  files.push('docs/ai-chat-study.json', 'docs/ai-service-demo.json')
  const findings = files.flatMap(file => inspectPresentation(file, fs.readFileSync(file, 'utf8')))
  if (findings.length) { console.error(findings.join('\n')); process.exitCode = 1 }
  else console.log(`AI presentation guard passed: ${files.length} files; Font Awesome arrows and fading decorative rules.`)
}
