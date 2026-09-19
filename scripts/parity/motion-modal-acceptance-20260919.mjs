import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'

const base = process.env.ACCEPTANCE_BASE_URL ?? 'http://localhost:8092'
const output = 'scripts/parity/shots/motion-modal-20260919'
const results = { base, hero: {}, desktop: {}, desktopMotion: {}, mobile: {}, reducedMotion: {}, loading: {}, errors: [] }

await mkdir(output, { recursive: true })
const browser = await chromium.launch({ headless: true })

function watch(page, label) {
  page.on('pageerror', error => results.errors.push(`${label}: ${error.message}`))
  page.on('console', message => {
    if (message.type() === 'error' && !message.text().includes('Failed to load resource')) {
      results.errors.push(`${label}: ${message.text()}`)
    }
  })
}

async function setHeroTime(page, time) {
  await page.evaluate((currentTime) => {
    const root = document.querySelector('.kinetic-identity')
    for (const animation of root.getAnimations({ subtree: true })) {
      animation.pause()
      animation.currentTime = currentTime
    }
  }, time)
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => resolve())))
}

async function heroMeasure(page) {
  return page.evaluate(() => {
    const root = document.querySelector('.kinetic-identity')
    const stage = root.querySelector('.kinetic-stage')
    const name = root.querySelector('.hero-name')
    const product = root.querySelector('[data-role="Product"]')
    return {
      aperture: parseFloat(getComputedStyle(root).getPropertyValue('--hero-aperture')),
      size: parseFloat(getComputedStyle(stage).fontSize),
      nameWidth: name.getBoundingClientRect().width,
      productWidth: product.scrollWidth,
    }
  })
}

try {
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 950 } })
    watch(page, 'hero')
    assert.equal((await page.goto(`${base}/`, { waitUntil: 'networkidle' })).status(), 200)
    await page.evaluate(() => document.fonts.ready)
    const figmaDuration = 3089.468
    const nameOpen = figmaDuration * .6893
    const productOpen = figmaDuration * .9251 + 180
    await setHeroTime(page, nameOpen)
    const nameOpening = await heroMeasure(page)
    await setHeroTime(page, nameOpen + 180)
    const nameRest = await heroMeasure(page)
    await setHeroTime(page, productOpen)
    const productOpening = await heroMeasure(page)
    await setHeroTime(page, productOpen + 180)
    const productRest = await heroMeasure(page)
    assert.ok(Math.abs(nameOpening.aperture - nameRest.aperture) < 1, 'name reveal must reach its roomy resting aperture')
    assert.ok(nameOpening.aperture - nameOpening.nameWidth > nameOpening.size * 1.45, 'name braces need roomy side spacing')
    assert.ok(Math.abs(productOpening.aperture - productRest.aperture) < 1, 'Product reveal must reach its final resting aperture')
    assert.ok(productOpening.aperture - productOpening.productWidth > productOpening.size * .8, 'Product braces need visible side spacing')
    results.hero = { nameOpening, nameRest, productOpening, productRest }
    await page.screenshot({ path: `${output}/hero-product-rest.png` })
    await page.close()
  }

  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 950 } })
    watch(page, 'desktop')
    await page.goto(`${base}/`, { waitUntil: 'networkidle' })
    const trigger = page.locator('[data-modal-trigger="webmd"]')
    await trigger.scrollIntoViewIfNeeded()
    const initialModalAssets = await page.evaluate(() => performance.getEntriesByType('resource').filter(entry => entry.name.includes('/webmd-modal/')).length)
    await trigger.focus()
    await page.waitForTimeout(250)
    const intentModalAssets = await page.evaluate(() => performance.getEntriesByType('resource').filter(entry => entry.name.includes('/webmd-modal/')).length)
    assert.equal(initialModalAssets, 0, 'modal evidence assets stay unloaded before intent')
    assert.ok(intentModalAssets >= 1 && intentModalAssets <= 3, `intent preload is bounded to three assets, observed ${intentModalAssets}`)
    const before = await page.evaluate(() => ({ url: location.href, history: history.length, scrollY, bodyOverflow: getComputedStyle(document.body).overflow }))
    await page.evaluate(() => {
      window.__modalMotionPerformance = { frames: [], longTasks: [] }
      const started = performance.now()
      const sample = now => {
        window.__modalMotionPerformance.frames.push(now)
        if (now - started < 1200) requestAnimationFrame(sample)
      }
      requestAnimationFrame(sample)
      new PerformanceObserver(list => {
        window.__modalMotionPerformance.longTasks.push(...list.getEntries().map(entry => entry.duration))
      }).observe({ type: 'longtask', buffered: true })
    })
    await trigger.click()
    const dialog = page.getByRole('dialog')
    await dialog.waitFor({ state: 'visible' })
    await page.screenshot({ path: `${output}/desktop-camera-begin.png` })
    await page.waitForTimeout(260)
    const passingPlane = await page.evaluate(() => {
      const modalDialog = document.querySelector('.modal-dialog')
      const modalContent = document.querySelector('.modal-content')
      const pageLayer = document.querySelector('#hi')
      const style = getComputedStyle(modalDialog)
      const rect = modalDialog.getBoundingClientRect()
      const contentRect = modalContent.getBoundingClientRect()
      return {
        dialogTransform: style.transform,
        dialogFilter: style.filter,
        dialogOpacity: Number(style.opacity),
        pageTransform: getComputedStyle(pageLayer).transform,
        pageFilter: getComputedStyle(pageLayer).filter,
        viewport: { width: innerWidth, height: innerHeight },
        dialogRect: { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom },
        contentRect: { left: contentRect.left, top: contentRect.top, right: contentRect.right, bottom: contentRect.bottom },
      }
    })
    assert.notEqual(passingPlane.dialogTransform, 'none', 'mid-transition dialog is still crossing the focal plane')
    assert.equal(passingPlane.dialogFilter, 'none', 'zoom-pan avoids full-dialog filter rasterization')
    assert.equal(passingPlane.pageFilter, 'none', 'site push-forward avoids full-page filter rasterization')
    assert.ok(passingPlane.dialogOpacity > .35 && passingPlane.dialogOpacity < 1, `mid-transition dialog is legible but unsettled: ${JSON.stringify(passingPlane)}`)
    assert.ok(passingPlane.dialogRect.left >= -1 && passingPlane.dialogRect.top >= -1 && passingPlane.dialogRect.right <= passingPlane.viewport.width + 1 && passingPlane.dialogRect.bottom <= passingPlane.viewport.height + 1, `dialog remains inside the viewport during zoom-pan: ${JSON.stringify(passingPlane)}`)
    assert.ok(passingPlane.contentRect.left >= -1 && passingPlane.contentRect.top >= -1 && passingPlane.contentRect.right <= passingPlane.viewport.width + 1 && passingPlane.contentRect.bottom <= passingPlane.viewport.height + 1, `modal content is not cropped during zoom-pan: ${JSON.stringify(passingPlane)}`)
    await page.screenshot({ path: `${output}/desktop-camera-passing-plane.png` })
    await page.waitForTimeout(450)
    const openState = await page.evaluate(() => {
      const dialog = document.querySelector('[role="dialog"]')
      const modalDialog = document.querySelector('.modal-dialog')
      const pageLayer = document.querySelector('#hi')
      const body = document.querySelector('.modal-body')
      return {
        camera: document.body.dataset.modalCamera,
        dialogTransform: getComputedStyle(modalDialog).transform,
        dialogFilter: getComputedStyle(modalDialog).filter,
        dialogAnimationDuration: parseFloat(getComputedStyle(modalDialog).animationDuration) * 1000,
        pageTransform: getComputedStyle(pageLayer).transform,
        pageFilter: getComputedStyle(pageLayer).filter,
        focusInside: dialog.contains(document.activeElement),
        backgroundHidden: [...document.body.children].filter(node => !node.matches('.modal,.modal-backdrop,[data-radix-focus-guard],script,noscript')).some(node => node.getAttribute('aria-hidden') === 'true' || node.inert),
        bodyOverflow: getComputedStyle(document.body).overflow,
        internalScrollable: body.scrollHeight > body.clientHeight,
      }
    })
    assert.equal(openState.camera, 'open')
    assert.notEqual(openState.pageTransform, 'none')
    assert.equal(openState.pageFilter, 'none')
    assert.ok(openState.dialogFilter === 'none' || openState.dialogFilter === 'blur(0px)', `settled dialog is sharp: ${openState.dialogFilter}`)
    assert.equal(openState.dialogAnimationDuration, 650, 'desktop zoom-pan entrance uses the requested 650ms clock')
    assert.equal(openState.focusInside, true)
    assert.equal(openState.backgroundHidden, true)
    assert.equal(openState.internalScrollable, true)
    const motionPerformance = await page.evaluate(() => {
      const { frames, longTasks } = window.__modalMotionPerformance
      const gaps = frames.slice(1).map((frame, index) => frame - frames[index])
      return {
        sampledFrames: frames.length,
        maxFrameGap: gaps.length ? Math.max(...gaps) : 0,
        longTaskCount: longTasks.length,
        maxLongTask: longTasks.length ? Math.max(...longTasks) : 0,
      }
    })
    assert.ok(motionPerformance.sampledFrames >= 20, `transition produced too few frame samples: ${JSON.stringify(motionPerformance)}`)
    assert.ok(motionPerformance.maxFrameGap < 250, `transition suffered a blocking frame gap: ${JSON.stringify(motionPerformance)}`)
    for (let i = 0; i < 10; i += 1) await page.keyboard.press('Tab')
    assert.equal(await dialog.evaluate(node => node.contains(document.activeElement)), true, 'focus remains trapped')
    await dialog.locator('.modal-body').evaluate(node => { node.scrollTop = 500 })
    assert.ok(await dialog.locator('.modal-body').evaluate(node => node.scrollTop > 0), 'modal body scrolls internally')
    await page.screenshot({ path: `${output}/desktop-camera-settled.png` })
    await page.keyboard.press('Escape')
    await page.waitForTimeout(330)
    const reverseState = await page.evaluate(() => ({
      camera: document.body.dataset.modalCamera,
      dialogOpacity: Number(getComputedStyle(document.querySelector('.modal-dialog')).opacity),
      pageTransform: getComputedStyle(document.querySelector('#hi')).transform,
    }))
    assert.equal(reverseState.camera, 'closing', 'reverse camera state remains active through the exit')
    assert.ok(reverseState.dialogOpacity > 0 && reverseState.dialogOpacity < 1, `dialog reverses through an intermediate plane: ${JSON.stringify(reverseState)}`)
    await dialog.waitFor({ state: 'detached' })
    await page.waitForTimeout(60)
    const after = await page.evaluate(() => ({ url: location.href, history: history.length, scrollY, camera: document.body.dataset.modalCamera ?? null }))
    assert.equal(await trigger.evaluate(node => document.activeElement === node), true, 'Escape returns focus')
    assert.deepEqual({ url: after.url, history: after.history }, { url: before.url, history: before.history }, 'modal does not mutate route/history')
    assert.equal(after.scrollY, before.scrollY, 'page scroll is restored')
    assert.equal(after.camera, null, 'camera state cleans up')

    const second = page.locator('[data-modal-trigger="split-test"]')
    await second.click()
    await page.getByRole('dialog').waitFor({ state: 'visible' })
    assert.match(await page.getByRole('dialog').innerText(), /A\/B Testing|Testing the experience/i)
    await page.waitForTimeout(180)
    await page.keyboard.press('Escape')
    await page.getByRole('dialog').waitFor({ state: 'detached' })
    await trigger.click()
    await page.getByRole('dialog').waitFor({ state: 'visible' })
    assert.match(await page.getByRole('dialog').innerText(), /WebMD|plan search to checkout/i)
    await page.getByRole('button', { name: 'Close', exact: true }).first().click()
    await page.getByRole('dialog').waitFor({ state: 'detached' })
    results.desktop = { before, openState, after, switchedProject: 'split-test-to-webmd', motionPerformance, intentPreload: { initialModalAssets, intentModalAssets } }
    results.desktopMotion = { passingPlane, reverseState }
    await page.close()
  }

  {
    const page = await browser.newPage({ viewport: { width: 375, height: 812 }, hasTouch: true })
    watch(page, 'mobile')
    await page.goto(`${base}/`, { waitUntil: 'networkidle' })
    const trigger = page.locator('[data-modal-trigger="webmd"]')
    await trigger.scrollIntoViewIfNeeded()
    await trigger.tap()
    const dialog = page.getByRole('dialog')
    await dialog.waitFor({ state: 'visible' })
    await page.waitForTimeout(380)
    const sheet = await page.evaluate(() => {
      const dialog = document.querySelector('[role="dialog"]').getBoundingClientRect()
      const navigation = document.querySelector('#the-menu').getBoundingClientRect()
      const navigationHeight = document.querySelector('#the-menu').offsetHeight
      const close = document.querySelector('.modal-header .btn-close-modal').getBoundingClientRect()
      const footer = document.querySelector('.modal-footer').getBoundingClientRect()
      const body = document.querySelector('.modal-body')
      return {
        dialog: { left: dialog.left, right: dialog.right, top: dialog.top, bottom: dialog.bottom, width: dialog.width },
        navigation: { top: navigation.top, height: navigationHeight },
        footer: { height: footer.height },
        close: { width: close.width, height: close.height },
        internalScrollable: body.scrollHeight > body.clientHeight,
      }
    })
    assert.ok(Math.abs(sheet.dialog.left) < 1 && Math.abs(sheet.dialog.width - 375) < 1, 'sheet is full width')
    assert.ok(sheet.dialog.top >= 11, 'sheet preserves top breathing room')
    assert.ok(Math.abs(sheet.dialog.bottom - 812) < 1, 'sheet covers the bottom navigation to the dynamic viewport edge')
    assert.ok(Math.abs(sheet.footer.height - sheet.navigation.height) < 2, `footer reuses the measured mobile navigation footprint: ${JSON.stringify(sheet)}`)
    assert.ok(sheet.close.width >= 44 && sheet.close.height >= 44, 'visible close target remains at least 44px')
    assert.equal(sheet.internalScrollable, true)
    await dialog.locator('.modal-body').evaluate(node => { node.scrollTop = 420 })
    await dialog.locator('.modal-body').dispatchEvent('pointermove', { pointerId: 8, clientY: 700 })
    assert.equal(await dialog.isVisible(), true, 'content interaction does not trigger swipe dismissal')
    await page.screenshot({ path: `${output}/mobile-webmd-sheet.png` })
    const handle = dialog.locator('.modal-sheet-grabber')
    const box = await handle.boundingBox()
    assert.ok(box)
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
    await page.mouse.down()
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2 + 130, { steps: 6 })
    await page.mouse.up()
    await dialog.waitFor({ state: 'detached' })
    assert.equal(await trigger.evaluate(node => document.activeElement === node), true, 'swipe close returns focus')
    results.mobile = sheet
    await page.close()
  }

  {
    const mobileViewports = [{ width: 320, height: 568 }, { width: 360, height: 640 }, { width: 390, height: 664 }]
    results.mobileViewports = []
    for (const viewport of mobileViewports) {
      const page = await browser.newPage({ viewport, hasTouch: true })
      watch(page, `mobile-${viewport.width}x${viewport.height}`)
      await page.goto(`${base}/`, { waitUntil: 'networkidle' })
      await page.locator('[data-modal-trigger="personas"]').evaluate(node => node.click())
      const dialog = page.getByRole('dialog')
      await dialog.waitFor({ state: 'visible' })
      await page.waitForTimeout(380)
      const geometry = await page.evaluate(() => {
        const modal = document.querySelector('[role="dialog"]').getBoundingClientRect()
        const footer = document.querySelector('.modal-footer').getBoundingClientRect()
        const navigation = document.querySelector('#the-menu')
        const close = document.querySelector('.modal-header .btn-close-modal').getBoundingClientRect()
        const body = document.querySelector('.modal-body')
        return {
          viewport: { width: innerWidth, height: innerHeight },
          modal: { left: modal.left, right: modal.right, top: modal.top, bottom: modal.bottom },
          footerHeight: footer.height,
          navigationHeight: navigation.offsetHeight,
          closeSize: Math.min(close.width, close.height),
          bodyScrollable: body.scrollHeight > body.clientHeight,
        }
      })
      assert.ok(geometry.modal.top >= 11 && Math.abs(geometry.modal.bottom - viewport.height) < 1)
      assert.ok(Math.abs(geometry.footerHeight - geometry.navigationHeight) < 2)
      assert.ok(geometry.closeSize >= 44 && geometry.bodyScrollable)
      results.mobileViewports.push(geometry)
      await page.keyboard.press('Escape')
      await dialog.waitFor({ state: 'detached' })
      await page.close()
    }
  }

  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 850 }, reducedMotion: 'reduce' })
    watch(page, 'reduced')
    await page.goto(`${base}/`, { waitUntil: 'networkidle' })
    await page.locator('[data-modal-trigger="webmd"]').evaluate(node => node.click())
    const dialog = page.getByRole('dialog')
    await dialog.waitFor({ state: 'visible' })
    const reduced = await page.evaluate(() => ({
      dialogAnimations: document.querySelector('[role="dialog"]').getAnimations({ subtree: true }).filter(animation => animation.playState === 'running').length,
      pageTransform: getComputedStyle(document.querySelector('#hi')).transform,
      pageFilter: getComputedStyle(document.querySelector('#hi')).filter,
    }))
    assert.equal(reduced.pageTransform, 'none')
    assert.equal(reduced.pageFilter, 'none')
    assert.equal(reduced.dialogAnimations, 0, 'reduced motion has no running modal animation')
    await page.keyboard.press('Escape')
    await dialog.waitFor({ state: 'detached' })
    results.reducedMotion = reduced
    await page.close()
  }

  {
    const imagePath = '/images/work/kitchen-sink/Persona-Cards.png'
    const slow = await browser.newPage({ viewport: { width: 1280, height: 850 } })
    watch(slow, 'slow-image')
    await slow.route(`**${imagePath}`, async route => {
      await new Promise(resolve => setTimeout(resolve, 2200))
      await route.continue()
    })
    await slow.goto(`${base}/`, { waitUntil: 'networkidle' })
    await slow.locator('[data-modal-trigger="personas"]').evaluate(node => node.click())
    const slowFrame = slow.locator(`.modal-image-frame:has(img[src*="Persona-Cards.png"])`)
    await slowFrame.scrollIntoViewIfNeeded()
    await slowFrame.waitFor({ state: 'visible' })
    assert.equal(await slowFrame.getAttribute('data-load-state'), 'loading')
    await slow.waitForFunction(() => document.querySelector('.modal-image-frame:has(img[src*="Persona-Cards.png"])')?.dataset.loadState === 'loaded')
    await slow.keyboard.press('Escape')
    await slow.getByRole('dialog').waitFor({ state: 'detached' })
    await slow.close()

    const failed = await browser.newPage({ viewport: { width: 1280, height: 850 } })
    watch(failed, 'failed-image')
    let requests = 0
    await failed.route(`**${imagePath}*`, async route => {
      requests += 1
      if (requests === 1) await route.abort('failed')
      else await route.continue()
    })
    await failed.goto(`${base}/`, { waitUntil: 'networkidle' })
    await failed.locator('[data-modal-trigger="personas"]').evaluate(node => node.click())
    const failedFrame = failed.locator(`.modal-image-frame:has(img[src*="Persona-Cards.png"])`)
    await failedFrame.scrollIntoViewIfNeeded()
    await failedFrame.waitFor({ state: 'visible' })
    await failedFrame.getByRole('button', { name: 'Retry' }).waitFor()
    assert.equal(await failedFrame.getAttribute('data-load-state'), 'error')
    await failedFrame.getByRole('button', { name: 'Retry' }).click()
    await failed.waitForFunction(() => document.querySelector('.modal-image-frame:has(img[src*="Persona-Cards.png"])')?.dataset.loadState === 'loaded')
    results.loading = { slowFeedback: true, errorFeedback: true, retryRecovered: true, requests }
    await failed.close()
  }

  assert.deepEqual(results.errors, [])
  await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2))
  console.log('Motion/modal acceptance passed: hero apertures, desktop camera/focus/history/scroll, mobile sheet/swipe, reduced motion, and slow/error/retry states.')
} finally {
  await browser.close()
}
