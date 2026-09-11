import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import assert from 'node:assert/strict'

const base = process.env.ACCEPTANCE_BASE_URL ?? 'http://localhost:3000'
const output = 'scripts/parity/shots/stage5-sticky'
const widths = (process.env.STAGE5_WIDTHS ?? '320,375,768,1100,1440').split(',').map(Number)
const sections = ['work', 'full-stack', 'resume', 'education']
const results = { widths: {}, dashboard: {}, errors: [] }
await mkdir(output, { recursive: true })
const browser = await chromium.launch({ headless: true })

const watchErrors = page => {
  page.on('pageerror', error => results.errors.push(error.message))
  page.on('console', message => {
    if (message.type() === 'error') results.errors.push(message.text())
  })
}

try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'no-preference' })
    watchErrors(page)
    assert.equal((await page.goto(`${base}/`, { waitUntil: 'networkidle' })).status(), 200)
    await page.evaluate(() => document.documentElement.style.scrollBehavior = 'auto')
    const expectedCompactHeight = width <= 575 ? 56 : 64
    const widthResult = {}

    for (const id of sections) {
      const sentinel = page.locator(`#${id} .section-heading-sentinel`)
      const reserve = page.locator(`#${id} .section-heading-reserve`)
      const sectionTop = await sentinel.evaluate(node => node.getBoundingClientRect().top + scrollY)

      await page.evaluate(y => scrollTo(0, Math.max(0, y - 120)), sectionTop)
      await page.waitForTimeout(80)
      assert.equal(await reserve.evaluate(node => node.classList.contains('is-compact')), false, `${id} starts expanded at ${width}px`)
      assert.equal(await reserve.locator('.section-heading-inner').evaluate(node => getComputedStyle(node).flexDirection), 'column')
      assert.equal(await page.locator(`#${id} .section-heading-title`).count(), 1, `${id} has one semantic heading`)

      await page.evaluate(y => scrollTo(0, y + 2), sectionTop)
      await page.waitForFunction(selector => document.querySelector(selector)?.classList.contains('is-compact'), `#${id} .section-heading-reserve`)
      await page.waitForTimeout(380)
      const compact = await reserve.evaluate(node => {
        const box = node.getBoundingClientRect()
        const surface = node.querySelector('.section-heading-surface')
        const inner = node.querySelector('.section-heading-inner')
        const heading = node.querySelector('.section-heading-title')
        const icon = node.querySelector('.section-heading-icon')
        const surfaceStyle = getComputedStyle(surface)
        const headingBox = heading.getBoundingClientRect()
        const iconBox = icon.getBoundingClientRect()
        const innerBox = inner.getBoundingClientRect()
        const surfaceBox = surface.getBoundingClientRect()
        return {
          active: node.classList.contains('is-compact'),
          top: Math.round(box.top),
          surfaceHeight: Math.round(surface.getBoundingClientRect().height),
          direction: getComputedStyle(inner).flexDirection,
          gap: Number.parseFloat(getComputedStyle(inner).gap),
          background: surfaceStyle.backgroundColor,
          centerDelta: Math.round(Math.abs((innerBox.left + innerBox.right) / 2 - (surfaceBox.left + Number.parseFloat(surfaceStyle.paddingLeft) + surfaceBox.right - Number.parseFloat(surfaceStyle.paddingRight)) / 2)),
          iconBeforeTitle: iconBox.right <= headingBox.left,
        }
      })
      assert.equal(compact.active, true, `${id} becomes compact at ${width}px`)
      assert.equal(compact.top, 0, `${id} sticks at the safe top at ${width}px`)
      assert.ok(compact.surfaceHeight >= expectedCompactHeight, `${id} compact minimum height at ${width}px`)
      assert.equal(compact.direction, 'row')
      assert.equal(compact.gap, 12)
      assert.ok(compact.background.includes('0.9'), `${id} has frosted white backing`)
      assert.ok(compact.centerDelta <= 2, `${id} compact contents are centered`)
      assert.equal(compact.iconBeforeTitle, true, `${id} compact icon remains inline left`)
      const overlap = await page.evaluate(sectionId => {
        const heading = document.querySelector(`#${sectionId} .section-heading-inner`).getBoundingClientRect()
        const motion = document.querySelector('.motion-control').getBoundingClientRect()
        return Math.max(0, Math.min(heading.right, motion.right) - Math.max(heading.left, motion.left)) * Math.max(0, Math.min(heading.bottom, motion.bottom) - Math.max(heading.top, motion.top))
      }, id)
      assert.equal(overlap, 0, `${id} does not collide with the motion control`)
      assert.ok((await page.locator('.section-heading-reserve.is-compact').evaluateAll(nodes => nodes.filter(node => {
        const box = node.getBoundingClientRect()
        return box.top >= -1 && box.top <= 1
      }).length)) <= 1, `no heading pileup at ${id} / ${width}px`)
      if (id === 'work' && [375, 1440].includes(width)) {
        await page.screenshot({ path: `${output}/homepage-work-${width}.png` })
      }

      await page.evaluate(y => scrollTo(0, Math.max(0, y - 120)), sectionTop)
      await page.waitForFunction(selector => !document.querySelector(selector)?.classList.contains('is-compact'), `#${id} .section-heading-reserve`)
      assert.equal(await reserve.evaluate(node => node.classList.contains('is-compact')), false, `${id} expands on backward crossing at ${width}px`)
      widthResult[id] = compact
    }

    await page.locator('#work .featured-work-open').first().scrollIntoViewIfNeeded()
    const trigger = page.locator('#work .featured-work-open').first()
    await trigger.focus()
    await trigger.click()
    const layer = await page.locator('[role="dialog"]').evaluate(node => ({
      z: Number.parseInt(getComputedStyle(node).zIndex, 10),
      headingsAtTop: [...document.querySelectorAll('.section-heading-reserve')].filter(item => {
        const box = item.getBoundingClientRect()
        return box.top >= -1 && box.top <= 1
      }).length,
    }))
    assert.ok(layer.z > 30, 'modal remains above sticky headings')
    await page.keyboard.press('Escape')
    await page.locator('[role="dialog"]').waitFor({ state: 'detached' })
    await page.waitForFunction(selector => document.activeElement === document.querySelector(selector), '#work .featured-work-open')
    assert.equal(await trigger.evaluate(node => document.activeElement === node), true, 'modal returns focus to its trigger')

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.locator('#resume .section-heading-sentinel').scrollIntoViewIfNeeded()
    const transition = await page.locator('#resume .section-heading-surface').evaluate(node => getComputedStyle(node).transitionDuration)
    assert.equal(transition.split(',').every(value => Number.parseFloat(value) === 0), true, 'reduced motion removes relocation animation')

    await page.evaluate(() => document.documentElement.style.fontSize = '200%')
    await page.waitForTimeout(100)
    const zoomState = await page.evaluate(() => ({
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      headingsFit: [...document.querySelectorAll('.section-heading-surface')].every(node => {
        const box = node.getBoundingClientRect()
        const title = node.querySelector('.section-heading-title')
        return box.left >= -1 && box.right <= innerWidth + 1 && title.scrollWidth <= title.clientWidth + 1
      }),
    }))
    assert.equal(zoomState.headingsFit, true, `sticky headings fit at 200% text / ${width}px`)
    await page.evaluate(() => document.documentElement.style.removeProperty('font-size'))
    results.widths[width] = { sections: widthResult, modal: layer, zoom: zoomState }
    await page.close()
  }

  const page = await browser.newPage({ viewport: { width: 375, height: 812 }, reducedMotion: 'reduce' })
  watchErrors(page)
  assert.equal((await page.goto(`${base}/case-studies/`, { waitUntil: 'networkidle' })).status(), 200)
  await page.evaluate(() => document.documentElement.style.scrollBehavior = 'auto')
  await page.getByRole('link', { name: 'Explore the case studies', exact: true }).click()
  await page.waitForFunction(() => Math.abs(document.querySelector('.cs-browse-sticky')?.getBoundingClientRect().top ?? 100) < 2)
  const assembly = page.locator('.cs-browse-sticky')
  const assemblyMetrics = await assembly.evaluate(node => ({
    position: getComputedStyle(node).position,
    top: Math.round(node.getBoundingClientRect().top),
    height: Math.ceil(node.getBoundingClientRect().height),
    context: Math.ceil(node.querySelector('.cs-browse-context').getBoundingClientRect().height),
    filters: Math.ceil(node.querySelector('.cs-filter-bar').getBoundingClientRect().height),
    scrollPadding: Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop),
    ariaHidden: node.querySelector('.cs-browse-context').getAttribute('aria-hidden'),
  }))
  assert.equal(assemblyMetrics.position, 'sticky')
  assert.equal(assemblyMetrics.top, 0)
  assert.ok(assemblyMetrics.context >= 48)
  assert.ok(assemblyMetrics.filters >= 64)
  assert.equal(assemblyMetrics.scrollPadding, assemblyMetrics.height)
  assert.equal(assemblyMetrics.ariaHidden, 'true')
  assert.equal(await page.getByRole('heading', { name: 'Selected Outcomes', exact: true }).count(), 0, 'outcome label remains a span')
  assert.equal(await page.getByRole('heading', { name: 'Different problems. Deliberate decisions.', exact: true }).count(), 1, 'stories keep one source heading')

  await page.locator('#filtered-stories').evaluate(node => node.scrollIntoView())
  await page.waitForFunction(() => document.querySelector('.cs-browse-context')?.textContent?.includes('Different problems'))
  assert.equal(await page.locator('.cs-browse-context').innerText(), 'Different problems. Deliberate decisions.')
  const beforeFilter = await page.evaluate(() => scrollY)
  await page.getByRole('button', { name: 'Systems', exact: true }).focus()
  await page.keyboard.press('Enter')
  await page.waitForTimeout(100)
  assert.equal(await page.locator('.cs-filters button:focus-visible').innerText(), 'Systems')
  const afterFilter = await page.evaluate(() => ({
    y: scrollY,
    browseTop: document.querySelector('.cs-browse').getBoundingClientRect().top + scrollY,
    stickyTop: document.querySelector('.cs-browse-sticky').getBoundingClientRect().top,
  }))
  assert.ok(afterFilter.y >= afterFilter.browseTop - 1, 'filtering at a scrolled position does not jump back to the hero')
  assert.ok(Math.abs(afterFilter.stickyTop) < 2, 'filtering preserves the sticky assembly')
  assert.equal(await page.locator('.cs-study-card').count(), 3)
  assert.equal(await page.locator('.cs-outcomes a').count(), 3)

  await page.evaluate(() => document.activeElement?.blur())
  await page.locator('.cs-perspective').evaluate(node => node.scrollIntoView())
  await page.evaluate(height => scrollTo({ top: scrollY + height + 2, behavior: 'instant' }), assemblyMetrics.height)
  await page.waitForFunction(() => document.querySelector('.cs-browse-sticky')?.getBoundingClientRect().bottom <= 1)
  const yielded = await assembly.evaluate(node => {
    const box = node.getBoundingClientRect()
    return { top: Math.round(box.top), bottom: Math.round(box.bottom) }
  })
  assert.ok(yielded.bottom <= 1, 'browse assembly yields before the through-line section')
  await page.locator('#filtered-stories').evaluate(node => node.scrollIntoView())
  await page.waitForFunction(() => document.querySelector('.cs-browse-context')?.textContent?.includes('Different problems'))
  assert.equal(await page.locator('.cs-browse-context').innerText(), 'Different problems. Deliberate decisions.', 'backward scroll restores stories context')
  await page.locator('#filtered-outcomes').evaluate(node => node.scrollIntoView())
  await page.waitForFunction(() => document.querySelector('.cs-browse-context')?.textContent?.includes('Selected Outcomes'))
  assert.equal(await page.locator('.cs-browse-context').innerText(), 'Selected Outcomes', 'backward boundary crossing restores outcomes context')
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), 0)
  results.dashboard = { assembly: assemblyMetrics, yielded, filterScrollDelta: afterFilter.y - beforeFilter }
  await page.screenshot({ path: `${output}/dashboard-375.png` })
  await page.close()

  assert.deepEqual(results.errors, [])
  console.log(`Stage 5 sticky acceptance passed: ${widths.length} homepage widths, four forward/backward section crossings, modal layering/focus return, reduced motion, 200% text, and measured standalone context/filter behavior.`)
} finally {
  await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2))
  await browser.close()
}
