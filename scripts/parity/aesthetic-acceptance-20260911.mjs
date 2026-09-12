import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import { chromium } from 'playwright'
import { PNG } from 'pngjs'

const base = process.env.ACCEPTANCE_BASE_URL ?? 'http://localhost:3012'
const output = process.env.AESTHETIC_OUTPUT ?? 'scripts/parity/shots/aesthetic-20260911'
const widths = [375, 768, 1384]
const projectIds = ['webmd', 'dentalplans', 'bumblebeemd', 'hydra', 'opfred', 'split-test', 'call-center-ux', 'marketing-auto', 'workshops', 'roadmap', 'personas', 'reveal', 'viva', 'wrong']

await fs.mkdir(output, { recursive: true })
const browser = await chromium.launch({ headless: true })
const results = { base, widths: [], modals: [], responsiveHeaderIcons: [], enlargedText: [], contrast: {}, motion: {}, standalone: {} }
const luminance = (rgb) => rgb.map((value) => value / 255).map((value) => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0)
async function sampleContrast(locator) {
  const saved = await locator.evaluate((node) => ({ color: getComputedStyle(node).color, inline: node.style.color, transition: node.style.transition }))
  await locator.evaluate((node) => { node.style.transition = 'none'; node.style.color = 'transparent' })
  const png = PNG.sync.read(await locator.screenshot({ animations: 'disabled' }))
  await locator.evaluate((node, prior) => { node.style.color = prior.inline; node.style.transition = prior.transition }, saved)
  const ink = luminance(saved.color.match(/[\d.]+/g).slice(0, 3).map(Number))
  let ratio = Infinity
  for (let y = 12; y < png.height - 12; y += 3) for (let x = 12; x < png.width - 12; x += 3) {
    const offset = (y * png.width + x) * 4
    const background = luminance([...png.data.slice(offset, offset + 3)])
    ratio = Math.min(ratio, (Math.max(ink, background) + .05) / (Math.min(ink, background) + .05))
  }
  return Number(ratio.toFixed(2))
}

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 1000 } })
  await page.goto(`${base}/#resume`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.locator('#resume').scrollIntoViewIfNeeded()

  const resume = await page.locator('#resume').evaluate((section) => {
    const belief = section.querySelector('.resume-belief').getBoundingClientRect()
    const grid = section.querySelector('.resume-leadership-grid').getBoundingClientRect()
    const list = section.querySelector('.fa-ul')
    const listItems = [...list.querySelectorAll(':scope > li')]
    const sectionHeader = section.querySelector('.section-heading-reserve')
    return {
      motionVisible: [...document.querySelectorAll('.motion-control')].some((node) => getComputedStyle(node).display !== 'none'),
      title: section.querySelector('.resume-belief h3').textContent.trim(),
      slogan: section.querySelector('.resume-belief-slogan').textContent.trim(),
      leadership: [...section.querySelectorAll('.resume-leadership-grid strong')].map((node) => node.textContent.replace(/:$/, '')),
      beliefGridDelta: Math.abs(belief.left - grid.left) + Math.abs(belief.right - grid.right),
      columns: getComputedStyle(section.querySelector('.resume-leadership-grid')).gridTemplateColumns.split(' ').length,
      listTextAlign: getComputedStyle(list).textAlign,
      listGap: listItems.length > 1 ? Number.parseFloat(getComputedStyle(listItems[1]).marginTop) : 0,
      stickyPosition: getComputedStyle(sectionHeader).position,
      sectionHeaderPositions: [...document.querySelectorAll('.section-heading-reserve')].map((node) => getComputedStyle(node).position),
      overflow: section.scrollWidth - section.clientWidth,
    }
  })
  assert.equal(resume.motionVisible, false, `motion controls hidden at ${width}`)
  assert.equal(resume.title, 'One belief...')
  assert.equal(resume.slogan, 'There is always a better way, together we will find it.')
  assert.deepEqual(resume.leadership, ['AI Product Design', 'Design Systems', 'Business Outcomes', 'Conversion and Experimentation'])
  assert.ok(resume.beliefGridDelta < 2, `belief aligns with leadership grid at ${width}`)
  assert.equal(resume.columns, width < 900 ? 1 : 2)
  assert.equal(resume.listTextAlign, 'left')
  assert.equal(resume.listGap, 4)
  assert.equal(resume.stickyPosition, 'relative')
  assert.ok(resume.sectionHeaderPositions.length === 4 && resume.sectionHeaderPositions.every((position) => position === 'relative'), `all section headings are non-sticky at ${width}`)
  assert.ok(resume.overflow <= 2, `resume overflow at ${width}`)
  results.widths.push({ width, resume })
  await page.screenshot({ path: `${output}/resume-${width}.png`, fullPage: true })
  await page.close()
}

const page = await browser.newPage({ viewport: { width: 1384, height: 1000 } })
await page.goto(`${base}/#full-stack`, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)

for (const id of projectIds) {
  await page.locator(`[data-modal-trigger="${id}"]`).click()
  const dialog = page.getByRole('dialog')
  await dialog.waitFor()
  const state = await dialog.evaluate((node, projectId) => {
    const css = (selector) => getComputedStyle(node.querySelector(selector))
    const headerIcon = node.querySelector('.modal-title img').getBoundingClientRect()
    const headerClose = css('.modal-header .btn-close-modal')
    const footerClose = css('.modal-footer .btn-close-modal')
    const badgeIcon = node.querySelector('.modal-badges i')
    const fieldPhoto = node.querySelector('.modal-card-field-photo img')
    const wrongCampaignLabel = projectId === 'wrong'
      ? [...node.querySelectorAll('.modal-intro-copy p')].find((item) => item.textContent.trim() === 'Campaign Concept:')?.querySelector('strong')
      : null
    return {
      fullBleed: node.querySelector('.modal-content').classList.contains('modal-full-bleed'),
      field: Boolean(node.querySelector('.modal-bleed-field')),
      headerBlur: css('.modal-header').backdropFilter || css('.modal-header').webkitBackdropFilter,
      copyBlur: css('.modal-intro-copy').backdropFilter || css('.modal-intro-copy').webkitBackdropFilter,
      headerBackground: css('.modal-header').backgroundColor,
      headerClose: [headerClose.color, headerClose.backgroundColor, headerClose.borderColor],
      footerClose: [footerClose.color, footerClose.backgroundColor, footerClose.borderColor],
      headerIcon: [headerIcon.width, headerIcon.height],
      badgeIcon: badgeIcon ? getComputedStyle(badgeIcon).color : null,
      motionVisible: [...node.querySelectorAll('.motion-control')].some((item) => getComputedStyle(item).display !== 'none'),
      introImages: node.querySelectorAll('.modal-intro img.modal-brief-image, .modal-brief-compare img').length,
      followupSrc: node.querySelector('.modal-hero-followup img')?.getAttribute('src') ?? null,
      fieldPhotoSrc: fieldPhoto?.getAttribute('src') ?? null,
      brandLogoSrc: node.querySelector('.modal-project-art-brand img')?.getAttribute('src') ?? null,
      revealHeroConcepts: projectId === 'reveal' ? node.querySelector('.modal-intro-copy .modal-intro-support')?.textContent ?? '' : null,
      revealStudyConcepts: projectId === 'reveal' ? node.querySelector('.modal-study-content')?.textContent ?? '' : null,
      wrongCampaignWeight: wrongCampaignLabel ? getComputedStyle(wrongCampaignLabel).fontWeight : null,
      hydraHeadings: projectId === 'hydra' ? [...node.querySelectorAll('.modal-study-content h3, .modal-study-content h4')].slice(0, 2).map((item) => [item.tagName, item.textContent.trim()]) : null,
      vivaMats: projectId === 'viva' ? [...node.querySelectorAll('.modal-study-content img.img-fluid')].map((item) => {
        const style = getComputedStyle(item)
        return [style.paddingTop, style.paddingRight, style.paddingBottom, style.paddingLeft, style.backgroundColor]
      }) : null,
      vivaLogoCenterDelta: projectId === 'viva' ? (() => {
        const images = [...node.querySelectorAll('img[src*="logo-design-"]')].map((item) => item.getBoundingClientRect())
        return images.length === 2 ? Math.abs((images[0].top + images[0].height / 2) - (images[1].top + images[1].height / 2)) : null
      })() : null,
      bodyOverflow: node.querySelector('.modal-body').scrollWidth - node.querySelector('.modal-body').clientWidth,
    }
  }, id)
  assert.equal(state.fullBleed, true, `${id} full bleed`)
  assert.equal(state.field, true, `${id} field`)
  assert.equal(state.headerBlur, 'blur(6px)', `${id} header blur`)
  assert.equal(state.copyBlur, 'blur(6px)', `${id} copy blur`)
  assert.equal(state.headerBackground, 'rgba(255, 255, 255, 0.57)', `${id} header background`)
  assert.deepEqual(state.headerClose, ['rgb(0, 0, 0)', 'rgba(255, 255, 255, 0.63)', 'rgba(255, 255, 255, 0.95)'])
  assert.deepEqual(state.footerClose, ['rgb(0, 0, 0)', 'rgba(255, 255, 255, 0.63)', 'rgba(0, 0, 0, 0.41)'])
  assert.ok(state.headerIcon.every((value) => Math.abs(value - 58) < .01), `${id} large header icon`)
  if (state.badgeIcon) assert.equal(state.badgeIcon, 'rgb(33, 30, 36)', `${id} badge icon ink`)
  assert.equal(state.motionVisible, false, `${id} modal motion hidden`)
  assert.equal(state.introImages, 0, `${id} old brief media removed from hero`)
  assert.ok(state.bodyOverflow <= 2, `${id} body overflow`)
  if (id === 'split-test') assert.equal(state.followupSrc, null, 'A/B lead comparison removed')
  if (id === 'personas') assert.equal(state.followupSrc, '/images/work/kitchen-sink/Persona-Cards.png')
  if (id === 'wrong') {
    assert.equal(state.fieldPhotoSrc, '/images/work/kitchen-sink/wrong-cover.jpg')
    assert.ok(Number(state.wrongCampaignWeight) >= 700, 'Wrong Campaign Concept label is bold')
  }
  if (id === 'reveal') {
    assert.equal(state.brandLogoSrc, '/images/work/kitchen-sink/reveal-cover.jpg')
    assert.match(state.revealHeroConcepts, /My Concepts:/)
    assert.match(state.revealHeroConcepts, /Creative Concepting/)
    assert.doesNotMatch(state.revealStudyConcepts, /My Concepts:/)
    assert.doesNotMatch(state.revealStudyConcepts, /Creative Concepting/)
  }
  if (id === 'viva') {
    assert.equal(state.brandLogoSrc, '/images/work/viva-modal/brief.png')
    assert.ok(state.vivaMats.length > 0)
    assert.ok(state.vivaMats.every((mat) => mat.join('|') === '24px|24px|24px|24px|rgb(255, 255, 255)'))
    assert.ok(state.vivaLogoCenterDelta < 1, 'Viva logo variants align vertically')
  }
  if (id === 'hydra') assert.deepEqual(state.hydraHeadings, [['H3', 'The Problem'], ['H4', 'Severe UI Fragmentation']])
  if (['hydra', 'personas', 'wrong', 'reveal', 'viva'].includes(id)) await dialog.screenshot({ path: `${output}/modal-${id}.png` })
  if (['hydra', 'personas', 'wrong', 'reveal', 'viva', 'split-test'].includes(id)) {
    results.contrast[id] = await sampleContrast(dialog.locator('.modal-intro-copy > p').first())
    assert.ok(results.contrast[id] >= 4.5, `${id} hero copy contrast`)
  }
  results.modals.push({ id, state })
  await dialog.locator('.modal-header .btn-close-modal').click()
  await dialog.waitFor({ state: 'hidden' })
}

for (const [width, expected] of [[375, 40], [768, 48], [1200, 58]]) {
  const responsive = await browser.newPage({ viewport: { width, height: 900 } })
  await responsive.goto(`${base}/#full-stack`, { waitUntil: 'networkidle' })
  await responsive.locator('[data-modal-trigger="hydra"]').click()
  const icon = await responsive.getByRole('dialog').locator('.modal-title img').evaluate((node) => {
    const bounds = node.getBoundingClientRect()
    return [bounds.width, bounds.height]
  })
  assert.ok(icon.every((value) => Math.abs(value - expected) < .01), `${width}px modal header icon`)
  results.responsiveHeaderIcons.push({ width, expected, icon })
  await responsive.close()
}

const enlarged = await browser.newPage({ viewport: { width: 320, height: 900 } })
await enlarged.goto(`${base}/#resume`, { waitUntil: 'networkidle' })
await enlarged.addStyleTag({ content: ':root { font-size: 200% !important; }' })
await enlarged.locator('#resume').scrollIntoViewIfNeeded()
assert.ok(await enlarged.locator('#resume').evaluate((node) => node.scrollWidth - node.clientWidth <= 2), 'Resume fits at 200% text')
for (const id of projectIds) {
  await enlarged.locator(`[data-modal-trigger="${id}"]`).click()
  const dialog = enlarged.getByRole('dialog')
  const fit = await dialog.evaluate((node) => {
    const body = node.querySelector('.modal-body')
    const copy = node.querySelector('.modal-intro-copy')
    const bounds = copy.getBoundingClientRect()
    const textFits = [...copy.querySelectorAll('h3,h4,p,.badge-work')].every((item) => {
      const rect = item.getBoundingClientRect()
      return rect.left >= bounds.left - 1 && rect.right <= bounds.right + 1 && item.scrollWidth <= item.clientWidth + 1
    })
    return { overflow: body.scrollWidth - body.clientWidth, textFits }
  })
  assert.ok(fit.overflow <= 2 && fit.textFits, `${id} hero fits at 200% text`)
  results.enlargedText.push({ id, ...fit })
  await dialog.locator('.modal-header .btn-close-modal').click()
}
await enlarged.close()

const standalone = await browser.newPage({ viewport: { width: 768, height: 900 } })
await standalone.goto(`${base}/case-studies/`, { waitUntil: 'networkidle' })
results.standalone.browsePosition = await standalone.locator('.cs-browse-sticky').evaluate((node) => getComputedStyle(node).position)
assert.equal(results.standalone.browsePosition, 'relative', 'standalone browse header is non-sticky')
assert.equal(await standalone.locator('.motion-control').evaluate((node) => getComputedStyle(node).display), 'none')
await standalone.close()

const motion = await browser.newPage({ viewport: { width: 1384, height: 900 }, reducedMotion: 'no-preference' })
await motion.goto(`${base}/#full-stack`, { waitUntil: 'networkidle' })
results.motion.cardNormal = await motion.locator('.thinking-photo-image').first().evaluate((node) => getComputedStyle(node).animationName)
assert.notEqual(results.motion.cardNormal, 'none', 'card motion remains active when motion is allowed')
await motion.locator('[data-modal-trigger="wrong"]').click()
results.motion.modalNormal = await motion.getByRole('dialog').locator('.modal-card-field-photo img').evaluate((node) => getComputedStyle(node).animationName)
assert.equal(results.motion.modalNormal, 'modal-photo-drift')
await motion.emulateMedia({ reducedMotion: 'reduce' })
results.motion.modalReduced = await motion.getByRole('dialog').locator('.modal-card-field-photo img').evaluate((node) => getComputedStyle(node).animationName)
assert.equal(results.motion.modalReduced, 'none', 'new hero motion respects reduced motion')
await motion.keyboard.press('Escape')
results.motion.cardReduced = await motion.locator('.thinking-photo-image').first().evaluate((node) => getComputedStyle(node).animationName)
assert.equal(results.motion.cardReduced, 'none', 'existing card motion respects reduced motion')
await motion.close()

await fs.writeFile(`${output}/results.json`, JSON.stringify(results, null, 2))
await browser.close()
console.log(`Aesthetic acceptance passed: ${widths.length} Resume widths and ${projectIds.length} full-bleed modal treatments.`)
