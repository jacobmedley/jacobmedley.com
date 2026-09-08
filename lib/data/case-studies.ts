import copy from '@/docs/case-study-site-copy.json'

export type StudySection = {
  id: string
  label: string
  title: string
  paragraphs: string[]
  decision?: string
  points?: string[]
  takeaway?: string
}

export type CaseStudy = {
  slug: string
  title: string
  shortTitle: string
  category: string
  tags: string[]
  discipline: string
  theme: string
  visual: string
  summary: string
  role: string
  scope: string
  collaboration: string
  source: string
  proof: { value: string; label: string }[]
  atAGlance: string[]
  sections: StudySection[]
}

export type CaseStudyOutcome = {
  slug: string
  shortTitle: string
  tags: string[]
  theme: string
  visual: string
  value: string
  label: string
  context: string
  source: string
}

// The copy register designates this JSON as the canonical page copy.
// No runtime import of the legacy modal data or the private portfolio branch.
export const caseStudies: CaseStudy[] = copy.studies
export const caseStudyIntro = copy.intro
export const getCaseStudy = (slug: string) => caseStudies.find((study) => study.slug === slug)

const outcomeReferences = [
  { slug: 'one-platform-five-properties', proofIndex: 0, atAGlanceIndex: 2 },
  { slug: 'building-a-design-function', proofIndex: 0, atAGlanceIndex: 2 },
  { slug: 'one-customer-journey', proofIndex: 0, atAGlanceIndex: 2 },
  { slug: 'navigation-beyond-opinion', proofIndex: 2, atAGlanceIndex: 2 },
  { slug: 'tokens-before-pages', proofIndex: 1, atAGlanceIndex: 2 },
  { slug: 'a-checkout-decision-with-receipts', proofIndex: 1, atAGlanceIndex: 2 },
] as const

// Dashboard records point into canonical story fields instead of restating claims.
export const caseStudyOutcomes: CaseStudyOutcome[] = outcomeReferences.map(({ slug, proofIndex, atAGlanceIndex }) => {
  const study = getCaseStudy(slug)
  if (!study) throw new Error(`Missing case study for outcome: ${slug}`)
  const proof = study.proof[proofIndex]
  const context = study.atAGlance[atAGlanceIndex]
  if (!proof || !context) throw new Error(`Missing canonical outcome fields for: ${slug}`)

  return {
    slug: study.slug,
    shortTitle: study.shortTitle,
    tags: study.tags,
    theme: study.theme,
    visual: study.visual,
    value: proof.value,
    label: proof.label,
    context,
    source: study.source,
  }
})
