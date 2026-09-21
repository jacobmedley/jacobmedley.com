import type { Metadata } from 'next'
import DesignSystemExplorer from './DesignSystemExplorer'

export const metadata: Metadata = {
  title: 'Quiet Prism Design System | Jacob Medley',
  description: 'A local reference for the visual primitives and component families used across JacobMedley.com.',
  robots: { index: false, follow: false },
}

export default function DesignSystemPage() {
  return <DesignSystemExplorer />
}
