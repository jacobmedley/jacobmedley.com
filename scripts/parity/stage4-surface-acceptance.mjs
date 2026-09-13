import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'
import { PNG } from 'pngjs'

const base = process.env.ACCEPTANCE_BASE_URL ?? 'http://localhost:3011'
const output = 'scripts/parity/shots/surfaces'
const results = { seams: [], cards: [], errors: [] }
await mkdir(output, { recursive: true })
const browser = await chromium.launch({ headless: true })
try {
  for (const [width, height, dpr] of [[375,812,1],[797,1272,1],[1695,1272,1],[1887,1272,1.25],[1440,901,1.5]]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: dpr, reducedMotion: 'reduce' })
    page.on('pageerror', e => results.errors.push(e.message))
    await page.goto(base, { waitUntil: 'networkidle' })
    await page.waitForFunction(() => getComputedStyle(document.querySelector('.featured-work-icon'),'::before').content !== 'none')
    await page.evaluate(() => document.fonts.ready)
    const join = await page.evaluate(() => {
      const hero = document.querySelector('#hi').getBoundingClientRect()
      const work = document.querySelector('#work').getBoundingClientRect()
      window.scrollTo({ top: work.top + window.scrollY - 300, behavior: 'instant' })
      return { y: work.top + window.scrollY, gap: work.top - hero.bottom }
    })
    assert.equal(join.gap, 0)
    const y = await page.locator('#work').evaluate(n => n.getBoundingClientRect().top)
    const buffer = await page.screenshot({ clip: { x: Math.round(width * .55), y: y-2, width: 30, height: 4 } })
    const png = PNG.sync.read(buffer)
    let maxDelta = 0
    for (let i=0; i<png.data.length; i+=4) {
      maxDelta = Math.max(maxDelta, Math.abs(png.data[i]-178), Math.abs(png.data[i+1]-163), Math.abs(png.data[i+2]-185))
    }
    await page.screenshot({ path: `${output}/wave-${width}.png` })
    assert.ok(maxDelta <= 8, `wave seam ${width}x${height}@${dpr}: ${maxDelta}`)
    await page.screenshot({ path: `${output}/wave-${width}.png` })
    results.seams.push({ width, height, dpr, maxDelta })
    const clips = await page.locator('.thinking-thumb').evaluateAll(nodes => nodes.map(n => getComputedStyle(n).clipPath))
    assert.ok(clips.length === 9 && clips.every(c => c === 'inset(0px round 32px)'))
    await page.locator('.thinking-art-wrong').screenshot({ path: `${output}/photo-corners-${width}.png` })
    await page.close()
  }
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
  await page.goto(base, { waitUntil: 'networkidle' })
  for (const card of await page.locator('.featured-work-card').all()) {
    const id = await card.getAttribute('data-project-id')
    const trigger = card.locator('.featured-work-open')
    assert.equal(await card.getByRole('button').count(), 1, 'one keyboard stop per card')
    for (const area of ['edge', '.featured-work-art', '.featured-work-summary', '.case-study-read']) {
      await card.scrollIntoViewIfNeeded()
      const box = await card.boundingBox()
      const target = area === 'edge' ? { x: box.x + 4, y: box.y + box.height/2 } : await card.locator(area).evaluate(n => {
        const r = n.getBoundingClientRect(); return { x:r.x+r.width/2, y:r.y+r.height/2 }
      })
      await page.mouse.click(target.x, target.y)
      await page.getByRole('dialog').waitFor()
      await page.keyboard.press('Escape')
      await page.getByRole('dialog').waitFor({state:'hidden'})
      await page.waitForFunction(id => document.activeElement?.getAttribute('data-modal-trigger') === id, id)
      assert.equal(await trigger.evaluate(n => n === document.activeElement), true)
    }
    await trigger.focus()
    await page.keyboard.press('Enter')
    await page.getByRole('dialog').waitFor()
    await page.keyboard.press('Escape')
    await page.getByRole('dialog').waitFor({state:'hidden'})
    results.cards.push({ id, edgeArtCopyRead: true, keyboard: true, focusReturn: true })
  }
  await page.close()
  assert.deepEqual(results.errors, [])
  console.log('Surface acceptance passed: fractional-scale wave seams, nine clipped cards, and five complete card actions with keyboard/focus return.')
} finally {
  await writeFile(`${output}/results.json`, JSON.stringify(results,null,2))
  await browser.close()
}
