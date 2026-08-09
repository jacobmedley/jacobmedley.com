import Link from 'next/link'
import { notFound } from 'next/navigation'
import { portfolioStudies } from '@/lib/data/portfolio-studies'
import StudyPage from '@/components/portfolio/StudyPage'

// Required for static export (output: 'export' in next.config.ts) — the
// dynamic [slug] segment has no server to resolve at request time, so every
// path has to be enumerated at build time.
export function generateStaticParams() {
  return portfolioStudies.map((study) => ({ slug: study.slug }))
}

export default async function PortfolioStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = portfolioStudies.find((s) => s.slug === slug)
  if (!study) notFound()

  return (
    <>
      <p className="mb-6">
        <Link href="/portfolio/">
          <i className="fa-regular fa-arrow-left" aria-hidden="true" /> Back to all work
        </Link>
      </p>

      <StudyPage study={study} />

      <p className="mt-12">
        <Link href="/portfolio/">
          <i className="fa-regular fa-arrow-left" aria-hidden="true" /> Back to all work
        </Link>
      </p>
    </>
  )
}
