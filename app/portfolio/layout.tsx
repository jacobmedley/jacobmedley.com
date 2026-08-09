import type { Metadata } from 'next'
import PortfolioShell from '@/components/portfolio/PortfolioShell'

export const metadata: Metadata = {
  title: 'Portfolio — Jacob Medley',
  robots: {
    index: false,
    follow: false,
  },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <PortfolioShell>{children}</PortfolioShell>
}
