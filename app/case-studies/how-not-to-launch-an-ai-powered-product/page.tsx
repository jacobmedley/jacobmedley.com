import Link from 'next/link'
import type { Metadata } from 'next'
import study from '@/docs/ai-chat-study.json'
import AIStudyContent from '@/components/case-studies/AIStudyContent'
import styles from '@/components/case-studies/AIStudyContent.module.css'

export const metadata: Metadata = { title: `${study.title} | Jacob Medley`, description: study.summary }

export default function AIChatStudyPage() {
  return <main id="main-content" className={`modal-study-content ${styles.page}`}>
    <header className={styles.hero}>
      <Link href="/#work">← Case studies</Link>
      <h1>{study.title}</h1>
      <p>{study.summary}</p>
    </header>
    <AIStudyContent readingPage />
  </main>
}
