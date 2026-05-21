/**
 * app.js — SPA initialisation orchestrator.
 *
 * Strategy:
 *   1. Fire ALL fetches in a single Promise.all() — JSON data + HTML components
 *      load in parallel, no sequential waterfall.
 *   2. Inject static HTML shells into their wrapper elements.
 *   3. Render data-driven content into the empty target divs inside those shells.
 *   4. Initialise router and refresh Bootstrap scrollspy.
 */

import { renderCaseStudyCards, renderToolkitItems, renderVisualDesignItems, fetchComponent } from './renderer.js';
import { Router } from './router.js';

const MODAL_FILES = [
  'modal-product',
  'modal-hydra',
  'modal-webmd',
  'modal-opfred',
  'modal-bee',
  'modal-split-test',
  'modal-call-center-ux',
  'modal-marketing-auto',
  'modal-workshops',
  'modal-personas',
  'modal-roadmap',
  'modal-reveal',
  'modal-viva',
  'modal-wrong'
];

async function init() {
  // ── Phase 1: Fetch everything in parallel ──────────────────────────────────
  const [
    caseStudies,
    toolkit,
    visualDesign,
    hiHtml,
    workHtml,
    visualDesignHtml,
    resumeHtml,
    educationHtml,
    quoteHtml,
    ...modalHtmls
  ] = await Promise.all([
    fetch('data/case-studies.json').then(r => r.json()),
    fetch('data/toolkit.json').then(r => r.json()),
    fetch('data/visual-design.json').then(r => r.json()),
    fetchComponent('components/section-hi.html'),
    fetchComponent('components/section-work-v2.html'),
    fetchComponent('components/section-visual-design.html'),
    fetchComponent('components/section-resume.html'),
    fetchComponent('components/section-education.html'),
    fetchComponent('components/section-quote.html'),
    ...MODAL_FILES.map(f => fetchComponent(`components/${f}.html`))
  ]);

  // ── Phase 2: Inject static HTML shells ────────────────────────────────────
  document.getElementById('hi').innerHTML             = hiHtml;
  document.getElementById('work').innerHTML           = workHtml;
  document.getElementById('visual-design').innerHTML  = visualDesignHtml;
  document.getElementById('resume').innerHTML         = resumeHtml;
  document.getElementById('education').innerHTML      = educationHtml;
  document.getElementById('quote-section').innerHTML  = quoteHtml;
  document.getElementById('modals').innerHTML         = modalHtmls.join('\n');

  // ── Phase 3: Render data-driven content ───────────────────────────────────
  renderCaseStudyCards(caseStudies,    document.getElementById('case-studies-list'));
  renderToolkitItems(toolkit,          document.getElementById('toolkit-list'));
  renderVisualDesignItems(visualDesign, document.getElementById('visual-design-list'));

  // ── Phase 4: Housekeeping ─────────────────────────────────────────────────
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Refresh Bootstrap scrollspy — sections were empty at DOMContentLoaded
  const scrollSpy = bootstrap.ScrollSpy.getInstance(document.body);
  if (scrollSpy) scrollSpy.refresh();

  // Init router last (all sections now in DOM)
  Router.init();
}

document.addEventListener('DOMContentLoaded', init);
