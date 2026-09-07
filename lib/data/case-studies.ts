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

// The copy register designates this JSON as the canonical page copy.
// No runtime import of the legacy modal data or the private portfolio branch.
export const caseStudies: CaseStudy[] = copy.studies
export const caseStudyIntro = copy.intro
export const getCaseStudy = (slug: string) => caseStudies.find((study) => study.slug === slug)
