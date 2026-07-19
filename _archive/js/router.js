/**
 * router.js — lightweight hash router.
 *
 * Bootstrap scrollspy handles active-state during scroll; this module handles:
 *   1. Deep-link on first load  (#work → scroll to #work on page open)
 *   2. programmatic navigate()  (call Router.navigate('resume') from anywhere)
 *
 * It runs alongside scrollspy without interfering — scrollspy owns the active
 * class on scroll, the router only drives the initial scroll position.
 */

export const Router = {
  init() {
    // Handle hash already present when page first loads
    if (window.location.hash) {
      this._scrollTo(window.location.hash.slice(1));
    }

    // Future-proof: if hash changes programmatically (not from scrollspy clicks)
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      if (hash) this._scrollTo(hash);
    });
  },

  navigate(sectionId) {
    window.location.hash = sectionId;
  },

  _scrollTo(id) {
    const target = document.getElementById(id);
    if (target) {
      // Small delay lets async-injected content settle before measuring offsets
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }
};
