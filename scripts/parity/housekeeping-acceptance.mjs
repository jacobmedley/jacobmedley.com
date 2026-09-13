import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'
import { PNG } from 'pngjs'

const base = process.env.ACCEPTANCE_BASE_URL ?? 'http://localhost:3011'
const output = process.env.HOUSEKEEPING_OUTPUT ?? 'scripts/parity/shots/housekeeping'
const results = { resume: [], modals: [], motion: {}, contrast: {}, errors: [], failures: [] }
const luminance = rgb => rgb.map(v => v/255).map(v => v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4).reduce((s,v,i) => s+v*[.2126,.7152,.0722][i],0)
async function sampleContrast(locator) {
  const saved = await locator.evaluate(n => { const saved = { color: getComputedStyle(n).color, inline: n.style.color, transition: n.style.transition }; n.style.transition = 'none'; n.style.color = 'transparent'; return saved })
  const png = PNG.sync.read(await locator.screenshot({ animations: 'disabled' }))
  await locator.evaluate((n, saved) => { n.style.color = saved.inline; n.style.transition = saved.transition }, saved)
  const ink = luminance(saved.color.match(/[\d.]+/g).slice(0,3).map(Number))
  let ratio = Infinity
  for (let y=12; y<png.height-12; y+=3) for (let x=12; x<png.width-12; x+=3) {
    const offset = (y*png.width+x)*4
    const bg = luminance([...png.data.slice(offset,offset+3)])
    ratio = Math.min(ratio,(Math.max(ink,bg)+.05)/(Math.min(ink,bg)+.05))
  }
  return Number(ratio.toFixed(2))
}
await mkdir(output, { recursive: true })
// Playwright hides scrollbars by default in headless mode; keep the real track
// visible so full-bleed pixel checks and thumb dragging test browser behavior.
const browser = await chromium.launch({ headless: true, ignoreDefaultArgs: ['--hide-scrollbars'] })
try {
  for (const width of (process.env.HOUSEKEEPING_WIDTHS ?? '320,375,768,899,900,1100,1440').split(',').filter(Boolean).map(Number)) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' })
    page.on('pageerror', e => results.errors.push(e.message))
    await page.goto(base, { waitUntil: 'networkidle' })
    await page.waitForFunction(() => getComputedStyle(document.querySelector('.section-heading-icon i'),'::before').content !== 'none')
    await page.evaluate(() => document.fonts.ready)
    const resume = await page.locator('#resume').evaluate(n => {
      const intro = n.querySelector('.resume-leadership-intro')
      const grid = n.querySelector('.resume-leadership-grid')
      return {
        title: n.querySelector('.resume-belief h3').textContent,
        slogan: n.querySelector('.resume-belief-slogan').textContent,
        size: getComputedStyle(intro).fontSize,
        columns: getComputedStyle(grid).gridTemplateColumns,
        bullets: grid.children.length,
        divider: n.querySelector('.resume-belief-divider').getBoundingClientRect().bottom <= grid.getBoundingClientRect().top,
        oldHeading: [...n.querySelectorAll('h3')].some(n => n.textContent === 'Design Leadership'),
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      }
    })
    results.resume.push({ width, ...resume })
    assert.equal(resume.title, 'Twenty years. One belief.')
    assert.equal(resume.slogan, "I believe there's always a better way, together we can find it.")
    assert.equal(resume.size, '18px')
    assert.equal(resume.bullets, 5)
    assert.ok(resume.divider && !resume.oldHeading && resume.overflow === 0)
    await page.locator('.resume-belief').scrollIntoViewIfNeeded()
    if ([375,1440].includes(width)) await page.screenshot({ path: `${output}/resume-${width}.png` })
    if (width === 1440) results.contrast.resumeBody = await sampleContrast(page.locator('.resume-leadership-intro'))
    if ([899,900].includes(width)) { await page.close(); continue }
    const ids = await page.locator('[data-modal-trigger]').evaluateAll(nodes => nodes.map(n => n.dataset.modalTrigger))
    assert.equal(ids.length, 14)
    for (const id of ids) {
      const trigger = page.locator(`[data-modal-trigger="${id}"]`)
      await trigger.click()
      const dialog = page.getByRole('dialog')
      await dialog.waitFor()
      await dialog.locator('img').evaluateAll(async nodes => {
        await Promise.all(nodes.map(async n => { n.loading = 'eager'; try { await n.decode() } catch {} }))
      })
      const check = await dialog.evaluate(n => {
        const body = n.querySelector('.modal-body')
        const shell = n.querySelector('.modal-content')
        const images = [...body.querySelectorAll('img.img-fluid')]
        const icons = [...body.querySelectorAll('.modal-badges i')]
        const close = n.querySelector('.modal-header button').getBoundingClientRect()
        const glyphs = icons.map(i => ({ size: getComputedStyle(i).fontSize, color: getComputedStyle(i).color, content: getComputedStyle(i,'::before').content }))
        const hero = n.querySelector('.modal-featured-hero')
        let heroCheck = null
        if (hero) {
          const field = n.querySelector('.modal-bleed-field')
          const scene = field.getBoundingClientRect()
          const bounds = hero.getBoundingClientRect()
          const shellBounds = shell.getBoundingClientRect()
          const header = n.querySelector('.modal-header')
          const copy = hero.querySelector(':scope > .modal-intro-copy')
          const art = hero.querySelector(':scope > .modal-intro-art').getBoundingClientRect()
          const copyBounds = copy.getBoundingClientRect()
          const columns = getComputedStyle(hero).gridTemplateColumns.split(' ').length
          heroCheck = {
            fullField: scene.left <= bounds.left+1 && scene.right >= bounds.right-1 && scene.top <= bounds.top+1 && scene.bottom >= bounds.bottom-1,
            glass: getComputedStyle(copy).backgroundColor,
            blur: getComputedStyle(copy).backdropFilter,
            columns,
            placement: columns === 2 ? copyBounds.left >= art.right : copyBounds.top >= art.bottom,
            shellBleed: [scene, body.getBoundingClientRect(), header.getBoundingClientRect()].every(r => Math.abs(r.left-shellBounds.left-1) < 1 && Math.abs(r.right-shellBounds.right+1) < 1),
            nativeGutter: body.offsetWidth-body.clientWidth,
            headerGlass: getComputedStyle(header).backgroundColor,
            headerBlur: getComputedStyle(header).backdropFilter,
            aligned: Math.abs(scene.bottom-bounds.bottom) < 1,
          }
        }
        return {
          hero: heroCheck,
          overflow: Math.max(0, body.scrollWidth - body.clientWidth),
          badImages: images.filter(i => !i.complete || i.naturalWidth === 0).map(i=>i.getAttribute('src')),
          radii: [...new Set(images.map(i => getComputedStyle(i).borderRadius))],
          radius: getComputedStyle(shell).borderRadius,
          glyphs,
          closeSize: [close.width, close.height],
          title: n.getAttribute('aria-labelledby') && document.getElementById(n.getAttribute('aria-labelledby'))?.textContent,
          featured: !!n.querySelector('.modal-project-art'),
          clip: getComputedStyle(shell).overflow,
        }
      })
      results.modals.push({ width, id, ...check })
      if (check.featured) assert.ok(check.hero?.fullField && check.hero.placement && check.hero.glass === 'rgba(255, 255, 255, 0.4)' && check.hero.blur === 'blur(3px)', `${id}: continuous field and glass hero`)
      if (check.featured) {
        assert.ok(check.hero.shellBleed && check.hero.aligned && check.hero.headerGlass === 'rgba(255, 255, 255, 0.4)' && check.hero.headerBlur === 'blur(3px)', `${id}: full bleed and translucent header`)
        // Render a diagnostic solid field: a native scrollbar with an opaque
        // track would produce a contrasting strip at the modal's right edge.
        const probe = await dialog.evaluate(n => {
          const field = n.querySelector('.modal-bleed-field')
          const scene = field.querySelector('.featured-work-scene')
          const body = n.querySelector('.modal-body').getBoundingClientRect()
          const bounds = field.getBoundingClientRect()
          const saved = { background: field.style.background, visibility: scene.style.visibility }
          field.style.background = 'rgb(10, 255, 40)'
          scene.style.visibility = 'hidden'
          return { saved, x: Math.floor(bounds.right)-2, top: Math.ceil(body.top)+20, bottom: Math.floor(Math.min(body.bottom,bounds.bottom))-20 }
        })
        const pixels = PNG.sync.read(await page.screenshot())
        let matching = 0, sampled = 0
        for (let y=probe.top; y<probe.bottom; y+=3) {
          const offset=(y*pixels.width+probe.x)*4
          if ([10,255,40].every((v,i) => Math.abs(pixels.data[offset+i]-v)<3)) matching++
          sampled++
        }
        await dialog.evaluate((n,saved) => {
          const field=n.querySelector('.modal-bleed-field')
          field.style.background=saved.background
          field.querySelector('.featured-work-scene').style.visibility=saved.visibility
        },probe.saved)
        results.modals.at(-1).hero.edgeCoverage=matching/sampled
        assert.ok(matching/sampled>.8, `${id}: native scrollbar preserves the full-bleed edge`)
        await dialog.locator('.modal-body').evaluate(n => { n.scrollTop=120 })
        await page.waitForFunction(() => {
          const field=document.querySelector('.modal-bleed-field').getBoundingClientRect()
          const hero=document.querySelector('.modal-featured-hero').getBoundingClientRect()
          return Math.abs(field.bottom-hero.bottom)<1
        })
        await dialog.locator('.modal-body').evaluate(n => { n.scrollTop=0 })
        await page.waitForFunction(() => Math.abs(document.querySelector('.modal-bleed-field').getBoundingClientRect().top-document.querySelector('.modal-content').getBoundingClientRect().top-1)<1)
      }
      if (check.overflow > 1 || check.badImages.length || check.radii.some(r => parseFloat(r) < 16) || check.closeSize.some(v => v < 44) || !check.title || check.glyphs.some(g => g.size !== '20px' || ['none','normal','""'].includes(g.content))) results.failures.push({ width, id, check })
      if ([375,1440].includes(width)) await page.screenshot({ path: `${output}/${id}-${width}.png` })
      if (width === 1440 && check.featured) {
        results.contrast[`modal-${id}`] = await sampleContrast(dialog.locator('.modal-intro-copy > p').first())
      }
      if (width === 1440 && id === 'webmd') {
        results.contrast.closeButton = await sampleContrast(dialog.locator('.modal-footer .btn-close-modal'))
      }
      await page.keyboard.press('Tab')
      assert.ok(await dialog.evaluate(n => n.contains(document.activeElement)), `${id}: focus remains in dialog`)
      await dialog.locator('.modal-body').evaluate(n => { n.scrollTop = n.scrollHeight })
      const footer = dialog.locator('.modal-footer').getByRole('button', { name: 'Close', exact: true })
      assert.ok(await footer.isVisible())
      await footer.click()
      await dialog.waitFor({ state: 'hidden' })
      await page.waitForFunction(id => document.activeElement?.getAttribute('data-modal-trigger') === id, id)
    }
    await page.close()
  }
  const motion = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' })
  motion.on('pageerror', e => results.errors.push(e.message))
  await motion.goto(base, { waitUntil: 'networkidle' })
  await motion.locator('[data-modal-trigger="webmd"]').click()
  await motion.getByRole('dialog').getByRole('button', { name: 'Pause motion' }).click()
  assert.ok(await motion.locator('.motion-control').evaluateAll(nodes => nodes.every(n => n.textContent.includes('Resume motion') && !n.hasAttribute('aria-pressed'))))
  assert.equal(await motion.locator('.modal .featured-work-anchor').evaluate(n => getComputedStyle(n).animationPlayState), 'paused')
  const scrollBody=motion.locator('.modal-body')
  const scrollBox=await scrollBody.boundingBox()
  await motion.mouse.move(scrollBox.x+scrollBox.width/2,scrollBox.y+120)
  await motion.mouse.wheel(0,180)
  await motion.waitForFunction(() => document.querySelector('.modal-body').scrollTop>0)
  await motion.waitForFunction(() => Math.abs(document.querySelector('.modal-bleed-field').getBoundingClientRect().bottom-document.querySelector('.modal-featured-hero').getBoundingClientRect().bottom)<1)
  await motion.screenshot({path:`${output}/webmd-scrolled.png`})
  await scrollBody.evaluate(n => {n.scrollTop=0})
  await motion.waitForFunction(() => document.querySelector('.modal-body').scrollTop===0)
  // Wait for the scroll listener and native thumb to paint at their reset
  // position before grabbing it; scrollTop alone can lead the compositor.
  await motion.waitForFunction(() => Math.abs(document.querySelector('.modal-bleed-field').getBoundingClientRect().top-document.querySelector('.modal-content').getBoundingClientRect().top-1)<1)
  await motion.screenshot({path:`${output}/native-scrollbar-before-drag.png`})
  await motion.mouse.move(scrollBox.x+scrollBox.width-5,scrollBox.y+18)
  await motion.mouse.down()
  await motion.mouse.move(scrollBox.x+scrollBox.width-5,scrollBox.y+85,{steps:8})
  await motion.mouse.up()
  await motion.waitForFunction(() => document.querySelector('.modal-body').scrollTop>0)
  await motion.waitForFunction(() => Math.abs(document.querySelector('.modal-bleed-field').getBoundingClientRect().bottom-document.querySelector('.modal-featured-hero').getBoundingClientRect().bottom)<1)
  results.nativeScrolling={wheel:true,scrollbarDrag:true,fieldAligned:true}
  await motion.keyboard.press('Escape')
  await motion.getByRole('dialog').waitFor({ state: 'hidden' })
  await motion.locator('[data-modal-trigger="marketing-auto"]').click()
  const animation = motion.locator('.modal-animated-image')
  await motion.waitForFunction(() => document.querySelector('.modal-animated-image canvas')?.width > 300)
  assert.equal(await animation.getAttribute('data-frozen'), 'true')
  const frozen = await animation.locator('canvas').evaluate(n => ({ frame: n.toDataURL(), nonblank: n.getContext('2d').getImageData(0,0,n.width,n.height).data.some((v,i) => i%4 === 3 && v > 0) }))
  assert.ok(frozen.nonblank)
  await motion.waitForTimeout(700)
  assert.equal(await animation.locator('canvas').evaluate(n => n.toDataURL()), frozen.frame)
  await motion.getByRole('dialog').getByRole('button', { name: 'Resume motion' }).click()
  await motion.waitForFunction(() => document.querySelector('.modal-animated-image')?.getAttribute('data-frozen') === 'false')
  assert.ok(await animation.locator('img').isVisible())
  await motion.emulateMedia({ reducedMotion: 'reduce' })
  await motion.waitForFunction(() => document.querySelector('.modal-animated-image')?.getAttribute('data-frozen') === 'true')
  assert.ok(await animation.locator('canvas').isVisible())
  assert.ok(!await animation.locator('img').isVisible())
  assert.equal(await motion.getByRole('dialog').getByRole('button', { name: /motion/ }).count(), 0)
  assert.ok(await motion.getByRole('dialog').getByText('Motion off: reduced motion').isVisible())
  results.motion = { synchronized: true, frozenFrameStable: true, nonblank: frozen.nonblank, resumed: true, reducedPreferenceChange: true }
  await motion.close()
  assert.deepEqual(results.errors, [])
  assert.deepEqual(results.failures, [])
  assert.ok(Object.values(results.contrast).every(ratio => Number.isFinite(ratio) && ratio >= 4.5))
  console.log(`Housekeeping passed: ${results.modals.length} modal/viewport combinations; ${results.resume.length} resume widths; images, glyphs, overflow, close controls, keyboard focus, contrast and motion.`)
} finally {
  await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2)+'\n')
  await browser.close()
}
