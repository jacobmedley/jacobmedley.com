import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const baseUrl = process.env.ACCEPTANCE_BASE_URL ?? 'http://localhost:8090'
const outputDir = path.resolve('scripts/parity/shots/annotations')
const browser = await chromium.launch({ headless: true })
const results = { baseUrl, home: {}, caseStudies: {}, variants: {}, mobileMotion: {}, errors: [] }

await mkdir(outputDir, { recursive: true })

function watch(page, label) {
  page.on('console', (message) => {
    if (message.type() === 'error') results.errors.push(`${label}: ${message.text()}`)
  })
  page.on('pageerror', (error) => results.errors.push(`${label}: ${error.message}`))
}

for (const width of [375, 768, 974, 1191, 1200, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 992 } })
  watch(page, `home-${width}`)
  const response = await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.locator('#hi').screenshot({ path: path.join(outputDir, `hero-${width}.png`) })
  if (width === 1191) await page.locator('#work .container').screenshot({ path: path.join(outputDir, 'case-studies-1191.png') })

  results.home[width] = await page.evaluate(() => {
    const heroIcon = document.querySelector('#hi .h-jakeicon i')
    const sectionIcon = document.querySelector('#work .section-heading-icon i')
    const title = document.querySelector('#hi .hero-title')
    const heroButton = document.querySelector('.hero-case-studies-link')
    const workItems = [...document.querySelectorAll('#work .work-item')]
    const readButtons = [...document.querySelectorAll('#work .case-study-read')]
    const thinkingBadges = [...document.querySelectorAll('.thinking-badges > span')]
    const thinkingItems = [...document.querySelectorAll('.thinking-item')]
    const sectionIconBox = sectionIcon?.getBoundingClientRect()
    const sectionTitleBox = document.querySelector('#work .section-heading-title')?.getBoundingClientRect()
    return {
      overflowPx: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroTitleWeight: title ? getComputedStyle(title).fontWeight : null,
      heroTitleLines: title ? Math.round(title.getBoundingClientRect().height / Number.parseFloat(getComputedStyle(title).lineHeight)) : null,
      heroIconSize: heroIcon ? getComputedStyle(heroIcon).fontSize : null,
      sectionIconSize: sectionIcon ? getComputedStyle(sectionIcon).fontSize : null,
      sectionIconTitleGap: sectionIconBox && sectionTitleBox ? Math.round(sectionTitleBox.top - sectionIconBox.bottom) : null,
      heroButtonSize: heroButton ? [heroButton.clientWidth, heroButton.clientHeight] : null,
      heroButtonAnimation: heroButton?.querySelector('i') ? getComputedStyle(heroButton.querySelector('i')).animationName : null,
      heroButtonBorderWidth: heroButton ? getComputedStyle(heroButton).borderWidth : null,
      mainCaseStudyRouteLinks: [...document.querySelectorAll('a')].filter((link) => link.getAttribute('href')?.startsWith('/case-studies/')).length,
      workItems: workItems.length,
      internalRules: workItems.reduce((count, item) => count + item.querySelectorAll('hr').length, 0),
      betweenRules: document.querySelectorAll('#work .work-separator').length,
      summaryLabels: workItems.filter((item) => item.textContent.includes('Summary:')).length,
      workBadgeGroups: workItems.reduce((count, item) => count + item.querySelectorAll('.work-card-badges').length, 0),
      readButtonWeights: [...new Set(readButtons.map((button) => getComputedStyle(button).fontWeight))],
      readButtonLabels: [...new Set(readButtons.map((button) => button.textContent.trim()))],
      readButtonPaddings: [...new Set(readButtons.map((button) => {
        const style = getComputedStyle(button)
        return [style.paddingTop, style.paddingRight, style.paddingBottom, style.paddingLeft].join('|')
      }))],
      selectedTitles: [...document.querySelectorAll('.thinking-title')].map((node) => node.textContent.trim()),
      selectedSectionTitle: document.querySelector('#full-stack .section-heading-title')?.textContent.trim() ?? null,
      thinkingCards: thinkingItems.map((node) => {
        const box = node.getBoundingClientRect()
        return {
          id: node.getAttribute('data-project-id'),
          kind: node.classList.contains('thinking-item-photo') ? 'photo' : 'icon',
          width: Math.round(box.width),
          top: Math.round(box.top),
        }
      }),
      iconAnchors: document.querySelectorAll('.thinking-thumb-icon .thinking-icon-anchor').length,
      iconAnchorSizes: [...new Set([...document.querySelectorAll('.thinking-thumb-icon .thinking-icon-anchor')].map((node) => {
        const box = node.getBoundingClientRect()
        return `${Math.round(box.width)}x${Math.round(box.height)}`
      }))],
      geometryPieceCounts: [...document.querySelectorAll('.thinking-thumb-icon .thinking-geometry')].map((node) => node.children.length),
      personalizationLines: [...document.querySelectorAll('.thinking-art-marketing-auto .thinking-geometry > i')].filter((node) => getComputedStyle(node).display !== 'none').length,
      personaRings: [...document.querySelectorAll('.thinking-art-personas .thinking-geometry > i')].filter((node) => getComputedStyle(node).display !== 'none').length,
      thinkingBadgeStyles: [...new Set(thinkingBadges.map((badge) => {
        const style = getComputedStyle(badge)
        return [style.fontSize, style.fontWeight, style.lineHeight, style.letterSpacing, style.minHeight, style.padding].join('|')
      }))],
      errorOverlay: Boolean(document.querySelector('[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay')),
    }
  })
  results.home[width].status = response?.status()
  await page.close()
}

for (const width of [375, 974, 1200, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 800 } })
  watch(page, `case-studies-${width}`)
  const response = await page.goto(`${baseUrl}/case-studies/`, { waitUntil: 'networkidle' })
  results.caseStudies[width] = await page.evaluate(() => {
    const action = document.querySelector('.cs-index-hero .cs-button-outline')
    return {
      status: null,
      overflowPx: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      iconClasses: action?.querySelector('i')?.className ?? null,
      errorOverlay: Boolean(document.querySelector('[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay')),
    }
  })
  results.caseStudies[width].status = response?.status()
  await page.close()
}

for (const width of [375, 1191]) {
  const page = await browser.newPage({ viewport: { width, height: 1000 } })
  watch(page, `variants-${width}`)
  const response = await page.goto(`${baseUrl}/design-variants/`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: path.join(outputDir, `design-variants-${width}.png`), fullPage: true })
  results.variants[width] = await page.evaluate(() => ({
    overflowPx: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    sections: document.querySelectorAll('main > section').length,
    cards: document.querySelectorAll('main article').length,
    headings: [...document.querySelectorAll('main section h2')].map((node) => node.textContent.trim()),
    cardKinds: [...document.querySelectorAll('main article')].map((node) => node.classList.contains('thinking-thumb-photo') ? 'photo' : 'icon'),
    badgesTitleCase: [...document.querySelectorAll('.thinking-badges span')].every((node) => node.textContent === node.textContent.replace(/\b\w/g, (character) => character.toUpperCase())),
    errorOverlay: Boolean(document.querySelector('[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay')),
  }))
  results.variants[width].status = response?.status()
  await page.close()
}

const mobileContext = await browser.newContext({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true })
const mobilePage = await mobileContext.newPage()
watch(mobilePage, 'mobile-motion')
const mobileResponse = await mobilePage.goto(`${baseUrl}/`, { waitUntil: 'networkidle' })
results.mobileMotion = await mobilePage.evaluate(() => {
  const anchor = document.querySelector('.thinking-thumb-icon .thinking-icon-anchor')
  const field = document.querySelector('.thinking-thumb-icon .thinking-geometry')
  return {
    status: null,
    hoverNone: matchMedia('(hover: none)').matches,
    pointerCoarse: matchMedia('(pointer: coarse)').matches,
    anchorAnimation: anchor ? getComputedStyle(anchor).animationName : null,
    fieldAnimation: field ? getComputedStyle(field).animationName : null,
  }
})
results.mobileMotion.status = mobileResponse?.status()
await mobileContext.close()

await browser.close()

const failed = results.errors.length > 0 || Object.entries(results.home).some(([width, result]) => (
  result.status !== 200 || result.overflowPx !== 0 || result.errorOverlay ||
  result.internalRules !== 0 || result.betweenRules !== result.workItems - 1 ||
  result.summaryLabels !== 0 || result.workBadgeGroups !== result.workItems ||
  result.readButtonWeights.some((weight) => weight !== '300') ||
  result.readButtonLabels.join(',') !== 'Read' ||
  result.readButtonPaddings.join(',') !== '10px|26px|10px|26px' ||
  result.heroButtonSize.join(',') !== '48,48' || result.heroButtonBorderWidth !== '0px' ||
  result.mainCaseStudyRouteLinks !== 0 || result.iconAnchors !== 6 || result.iconAnchorSizes.join(',') !== '140x140' ||
  result.personalizationLines !== 12 || result.personaRings !== 12 ||
  result.geometryPieceCounts.some((count) => count !== 12) || result.thinkingBadgeStyles.length !== 1 ||
  result.selectedSectionTitle !== 'Full Stack Designer' ||
  result.thinkingCards.filter((card) => card.kind === 'icon').length !== 6 ||
  result.thinkingCards.filter((card) => card.kind === 'photo').map((card) => card.id).join(',') !== 'wrong,reveal,viva' ||
  (Number(width) < 576 && new Set(result.thinkingCards.map((card) => card.width)).size !== 1) ||
  (Number(width) >= 576 && Number(width) < 1200 && result.thinkingCards.find((card) => card.id === 'wrong').width <= result.thinkingCards.find((card) => card.id === 'reveal').width * 1.8) ||
  (Number(width) >= 576 && Number(width) < 1200 && result.thinkingCards.filter((card) => card.kind === 'icon')[0].width !== result.thinkingCards.filter((card) => card.kind === 'icon')[1].width) ||
  (Number(width) >= 1200 && new Set(result.thinkingCards.map((card) => card.width)).size !== 1) ||
  (Number(width) >= 1200 && new Set(result.thinkingCards.slice(0, 3).map((card) => card.top)).size !== 1) ||
  (Number(width) >= 1200 && new Set(result.thinkingCards.filter((card) => card.kind === 'photo').map((card) => card.top)).size !== 1) ||
  !result.selectedTitles.includes('Viva Medicare') || !result.selectedTitles.includes('Modular Experience for Growth') ||
  (Number(width) >= 768 && result.heroTitleLines !== 1)
)) || Object.values(results.caseStudies).some((result) => (
  result.status !== 200 || result.overflowPx !== 0 || result.errorOverlay || !result.iconClasses?.includes('fa-chevron-down')
)) || Object.values(results.variants).some((result) => (
  result.status !== 200 || result.overflowPx !== 0 || result.errorOverlay || result.sections !== 1 || result.cards !== 2 ||
  result.cardKinds.join(',') !== 'photo,icon' || !result.badgesTitleCase
)) || results.mobileMotion.status !== 200 || !results.mobileMotion.hoverNone || !results.mobileMotion.pointerCoarse ||
results.mobileMotion.anchorAnimation !== 'thinking-dolly-anchor-mobile' ||
results.mobileMotion.fieldAnimation !== 'thinking-dolly-field-mobile'

await writeFile(path.join(outputDir, 'results.json'), `${JSON.stringify(results, null, 2)}\n`)
console.log(JSON.stringify(results, null, 2))
if (failed) process.exitCode = 1
