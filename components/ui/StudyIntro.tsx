import type { ReactNode } from 'react'
import styles from './StudyIntro.module.css'

export default function StudyIntro({ children, role, collaboration }: {
  children: ReactNode; role: string; collaboration?: string
}) {
  return <div className={styles.container}>
    <div className={`${styles.intro} study-introduction`}>
      <div className={styles.copy}>{children}</div>
      <dl className={styles.metadata}>
        {([['My role', role], ['Collaboration', collaboration]] as const).map(([label, text]) => text && <div key={label}>
          <dt>{label}</dt>
          <dd><i className="fa-thin fa-angle-right" aria-hidden="true" /><span>{text}</span></dd>
        </div>)}
      </dl>
    </div>
  </div>
}
