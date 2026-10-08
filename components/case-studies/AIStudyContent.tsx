'use client'

import study from '@/docs/ai-chat-study.json'
import { CustomerExperience, RepresentativeExperience } from './AIExperience'
import styles from './AIStudyContent.module.css'

type AssetId = keyof typeof study.assets

function Evidence({ id }: { id: AssetId }) {
  const asset = study.assets[id]
  if (id === 'P03-A') return <CustomerExperience customer={asset} timing={study.assets['P03-C']} />
  if (id === 'P03-B') return <RepresentativeExperience asset={asset} />
  return <figure className={styles.evidence} aria-label={asset.alt}>
    <h3>{asset.name}</h3>
    {id === 'P03-C' ? <a href="#ai-customer-demo">Explore the timing demonstration ↑</a> : id === 'P03-E' ?
      <ol className={styles.nodes}>
        <li><strong>Sample account statement</strong><p>Source material</p></li>
        <li><strong>Specific balance returned</strong><p>No value shown</p></li>
        <li><strong>Required response</strong><p>Please contact your account manager to confirm your account balance.</p></li>
      </ol> : <>
        <div className={styles.nodes}>
          <div><strong>Specified</strong><p>Conduct, source quality, waiting, failure routes, context.</p></div>
          <div><strong>Delivery</strong><p>A subset of requirements shipped.</p></div>
          <div><strong>Observed use</strong><p>Early customer interest followed by falloff; internal adoption remained low.</p></div>
        </div>
        <p>The record does not isolate a causal effect for each feature. No individual requirement is marked as shipped.</p>
      </>}
    <figcaption>{asset.caption}</figcaption>
  </figure>
}

export default function AIStudyContent({ readingPage = false }: { readingPage?: boolean }) {
  return <article className={styles.story} onClick={event => {
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href="#ai-customer-demo"]')
    if (link) {
      event.preventDefault()
      const target = event.currentTarget.querySelector<HTMLElement>('#ai-customer-demo')
      target?.scrollIntoView({ block: 'start', behavior: 'instant' })
      target?.querySelector<HTMLElement>('button')?.focus({ preventScroll: true })
    }
  }}>
    <dl className={styles.metadata}>
      <div><dt>My role</dt><dd>{study.role}</dd></div>
      <div><dt>Collaboration</dt><dd>{study.collaboration}</dd></div>
    </dl>
    {study.blocks.map((block, index) => block.type === 'paragraph' ? <p className={styles.prose} key={index}>{block.text}</p> : block.type === 'heading' ? <h3 className={styles.heading} key={index}>{block.text}</h3> : <Evidence key={index} id={block.assetId as AssetId} />)}
    <section className={styles.evidence}><h3>Outcome</h3><p>{study.outcome}</p></section>
    <p className={styles.prose}><a href={readingPage ? '/#work' : `/case-studies/${study.suggestedSlug}/`}>{readingPage ? 'Back to case studies' : 'Open the reading page'} →</a></p>
  </article>
}
