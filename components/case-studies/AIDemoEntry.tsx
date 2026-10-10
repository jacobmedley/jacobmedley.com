import type { Ref } from 'react'
import { PrismStudySurface, type PrismTone } from '@/components/ui/PrismStudy'
import Arrow from './Arrow'
import styles from './AIStudyContent.module.css'

export default function AIDemoEntry({ id, icon, tone, title, body, action, onOpen, buttonRef, headingLevel = 'h4' }: {
  id: string; icon: string; tone: PrismTone; title: string; body: string; action: string
  onOpen: () => void; buttonRef: Ref<HTMLButtonElement>; headingLevel?: 'h3' | 'h4'
}) {
  const Heading = headingLevel
  return <div id={id}><PrismStudySurface tone={tone} className={styles.workspaceEntry}>
    <i className={`fa-thin ${icon}`} aria-hidden="true" />
    <div><Heading>{title}</Heading><p>{body}</p></div>
    <button ref={buttonRef} type="button" onClick={onOpen}>{action}<Arrow /></button>
  </PrismStudySurface></div>
}
