// Bump SITE_VERSION by hand when a redesign is significant enough to call
// a new "version" of the site (and reset the iteration baseline below).
export const SITE_VERSION = 12

// Iteration within the current version. Locally/in dev this falls back to
// the count as of the version-12 baseline; in CI, deploy.yml computes the
// real count (commits since the baseline SHA) and passes it in via
// NEXT_PUBLIC_SITE_ITERATION, so it ticks up automatically on every push
// to main that deploys.
export const SITE_ITERATION = Number(process.env.NEXT_PUBLIC_SITE_ITERATION ?? 5)
