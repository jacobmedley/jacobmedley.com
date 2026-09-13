import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'

const base = process.env.ACCEPTANCE_BASE_URL ?? 'http://127.0.0.1:3011'
const output = process.env.IMAGERY_OUTPUT ?? 'scripts/parity/shots/imagery-consistency'
const widths = (process.env.IMAGERY_WIDTHS ?? '320,375,768,1100,1440').split(',').map(Number)
const results = { widths: {}, errors: [] }

await mkdir(output, { recursive: true })
const browser = await chromium.launch({ headless: true })
try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' })
    page.on('pageerror', error => results.errors.push(error.message))
    assert.equal((await page.goto(base, { waitUntil: 'networkidle' })).status(), 200)
    await page.evaluate(() => document.fonts.ready)
    const widthResult = {}

    for (const id of ['dentalplans', 'hydra', 'split-test', 'marketing-auto', 'personas']) {
      await page.locator(`[data-modal-trigger="${id}"]`).click()
      const dialog = page.getByRole('dialog')
      await dialog.waitFor()
      await dialog.locator('img').evaluateAll(async images => Promise.all(images.map(async image => {
        image.loading = 'eager'
        try { await image.decode() } catch {}
      })))
      const state = await dialog.evaluate(node => {
        const body = node.querySelector('.modal-body')
        const arts = [...node.querySelectorAll('[data-supporting-art]')]
        return {
          overflow: Math.max(0, body.scrollWidth - body.clientWidth),
          artKinds: arts.map(art => art.dataset.supportingArt),
          artNames: arts.map(art => art.getAttribute('aria-label')),
          artOverflow: arts.map(art => Math.max(0, art.scrollWidth - art.clientWidth)),
          sources: [...node.querySelectorAll('img')].map(image => image.getAttribute('src')),
          alts: [...node.querySelectorAll('img')].map(image => image.getAttribute('alt')),
          imageFailures: [...node.querySelectorAll('img')].filter(image => !image.complete || image.naturalWidth === 0).map(image => image.getAttribute('src')),
          compareCount: node.querySelectorAll('.modal-brief-compare img').length,
          personaArtifactCount: node.querySelectorAll('img[src$="/Persona-Cards.png"]').length,
          animated: Boolean(node.querySelector('.modal-animated-image[data-frozen="true"] canvas')),
        }
      })
      assert.ok(state.overflow <= 1, `${id} modal fits at ${width}px`)
      assert.ok(state.artOverflow.every(value => value <= 1), `${id} supporting art fits at ${width}px: ${state.artOverflow.join(',')}`)
      assert.deepEqual(state.imageFailures, [], `${id} images load at ${width}px`)
      if (id === 'dentalplans') assert.deepEqual(state.artKinds, ['dental-platform', 'dental-mvp-one', 'dental-mvp-two', 'dental-mvp-three', 'dental-mvp-four'])
      if (id === 'hydra') assert.deepEqual(state.artKinds, ['hydra'])
      if (id === 'split-test') {
        assert.equal(state.compareCount, 2)
        assert.ok(state.sources.includes('/images/work/webmd-modal/control.png') && state.sources.includes('/images/work/webmd-modal/winner.png'))
        assert.ok(state.alts.includes('WebMD homepage control') && state.alts.includes('WebMD homepage, winning variant V1'))
      }
      if (id === 'personas') {
        assert.equal(state.personaArtifactCount, 1)
        assert.ok(state.alts.includes('Frugal Francine persona card with demographics, motivations, preferences, channels, and reasons to buy.'))
      }
      if (id === 'marketing-auto') {
        assert.ok(state.sources.includes('/images/work/ma-modal/automation.gif'))
        assert.equal(state.animated, true)
      }
      const obsolete = state.sources.filter(source => /dpprod-modal\/(rocket|mvp-(one|two|three|four))\.png|hydra\/why\.jpg|split01-modal\/thumb\.png|kitchen-sink\/persona-one\.webp/.test(source ?? ''))
      assert.deepEqual(obsolete, [])
      widthResult[id] = state
      if ([375, 1440].includes(width)) {
        await page.screenshot({ path: `${output}/${id}-${width}.png` })
        const arts = dialog.locator('[data-supporting-art]')
        for (let index = 0; index < await arts.count(); index++) {
          const art = arts.nth(index)
          await art.scrollIntoViewIfNeeded()
          await art.screenshot({ path: `${output}/${id}-art-${index + 1}-${width}.png` })
        }
      }
      await dialog.getByRole('button', { name: 'Close', exact: true }).last().click()
      await dialog.waitFor({ state: 'hidden' })
    }

    await page.evaluate(() => { document.documentElement.style.fontSize = '200%' })
    await page.locator('#education').scrollIntoViewIfNeeded()
    const reflow = await page.locator('#education').evaluate(section => {
      const button = section.querySelector('a[href^="mailto:"]')
      const bounds = button.getBoundingClientRect()
      return {
        pageOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
        buttonOverflow: Math.max(0, button.scrollWidth - button.clientWidth),
        buttonInsideViewport: bounds.left >= -1 && bounds.right <= innerWidth + 1,
        offenders: [...document.querySelectorAll('body *')].map(node => ({
          name: `${node.tagName.toLowerCase()}${node.id ? `#${node.id}` : ''}${node.classList.length ? `.${[...node.classList].join('.')}` : ''}`,
          bounds: node.getBoundingClientRect(),
        })).filter(item => item.bounds.right > innerWidth + 1 || item.bounds.left < -1).slice(0, 12).map(item => ({ name: item.name, left: item.bounds.left, right: item.bounds.right })),
      }
    })
    widthResult.educationReflow = reflow
    results.widths[width] = widthResult
    assert.ok(reflow.buttonOverflow <= 1 && reflow.buttonInsideViewport, `Education contact fits at 200% text / ${width}px`)
    await page.close()
  }
  assert.deepEqual(results.errors, [])
  console.log(`Imagery consistency passed: five affected studies across ${widths.length} widths, source-backed replacements, retained animation, image loading, modal overflow and 200% Education reflow.`)
} finally {
  await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2) + '\n')
  await browser.close()
}
