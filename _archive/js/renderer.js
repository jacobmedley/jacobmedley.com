/**
 * renderer.js — template functions and component fetcher for the JM SPA.
 *
 * All functions that accept a data array inject rendered HTML into a target
 * DOM element. Component fetches return the raw HTML string so app.js can
 * batch-await them in a single Promise.all().
 */

// ─── Case Study Card ─────────────────────────────────────────────────────────

function caseStudyCardHTML(item) {
  const rowMod = item.layout === 'reverse' ? ' flex-row-reverse' : '';
  return `
<article class="${item.cssClass} work-item py-2 py-lg-4 py-xxl-5">
  <div class="row align-items-start align-items-xxl-center${rowMod}">
    <div class="col-24 col-lg-12 mb-5 mb-lg-0">
      <button type="button" class="btn p-0 m-0"
              data-bs-toggle="modal" data-bs-target="#${item.modalTarget}"
              aria-label="View ${item.title} case study">
        <img loading="lazy"
             src="${item.heroImage}"
             class="img-fluid rounded-4 shadow-lg btn-art"
             alt="${item.heroImageAlt}">
      </button>
    </div>
    <div class="col-24 col-lg-12">
      <h3 class="h2">${item.title}</h3>
      <p class="h5">${item.subtitle}</p>
      <hr class="solid-center">
      <p class="h4">Summary:</p>
      <p>${item.summary}</p>
      <div class="row text-center text-md-start">
        <div class="col-24">
          <button type="button"
                  class="btn btn-lg btn-second-dark rounded-pill"
                  data-bs-toggle="modal" data-bs-target="#${item.modalTarget}">
            <img loading="lazy"
                 src="images/the-eye-third-reverse.gif"
                 alt="" width="36" height="36"
                 class="mix-blend-screen mt-n2"
                 role="presentation" aria-hidden="true">
            Case Study
          </button>
        </div>
      </div>
      <hr class="solid-center">
    </div>
  </div>
</article>`.trim();
}

export function renderCaseStudyCards(items, targetEl) {
  if (!targetEl) return;
  targetEl.innerHTML = items.map(caseStudyCardHTML).join('\n');
}

// ─── Toolkit Item ─────────────────────────────────────────────────────────────

function toolkitItemHTML(item) {
  return `
<div class="col-24 col-sm-8 col-xxl-6 thinking-item">
  <button class="btn btn-outline-second-light thinking-thumb"
          data-bs-toggle="modal" data-bs-target="#${item.modalTarget}"
          aria-label="View ${item.title}">
    <i class="${item.icon} thinking-icon" aria-hidden="true"></i>
    <span class="thinking-title d-block">${item.title}</span>
    <span class="thinking-view d-block" aria-hidden="true">
      <i class="fa-regular fa-eye"></i> View
    </span>
  </button>
</div>`.trim();
}

export function renderToolkitItems(items, targetEl) {
  if (!targetEl) return;
  targetEl.innerHTML = items.map(toolkitItemHTML).join('\n');
}

// ─── Visual Design Item ───────────────────────────────────────────────────────

function visualDesignItemHTML(item) {
  return `
<div class="col thinking-item">
  <button class="btn btn-outline-second-light thinking-thumb ${item.bgClass} text-white position-relative overflow-hidden shadow-lg"
          data-bs-toggle="modal" data-bs-target="#${item.modalTarget}"
          aria-label="View ${item.title}">
    <span class="thinking-title d-block fw-bold fs-1 z-2 position-relative">${item.title}</span>
    <span class="thinking-view d-block z-2 position-relative" aria-hidden="true">
      <i class="fa-regular fa-eye"></i> View
    </span>
    <span class="screen position-absolute top-0 start-0 h-100 w-100 bg-black opacity-50 z-1" aria-hidden="true"></span>
  </button>
</div>`.trim();
}

export function renderVisualDesignItems(items, targetEl) {
  if (!targetEl) return;
  targetEl.innerHTML = items.map(visualDesignItemHTML).join('\n');
}

// ─── Component Fetcher ────────────────────────────────────────────────────────

export async function fetchComponent(path) {
  const res = await fetch(path);
  if (!res.ok) {
    console.error(`[renderer] Failed to load component: ${path} (${res.status})`);
    return '';
  }
  return res.text();
}
