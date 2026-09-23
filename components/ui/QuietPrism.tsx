import Image from 'next/image'
import Link from 'next/link'
import { MAIN_WAVE_PATH } from './WaveSeparator'
import styles from './QuietPrism.module.css'

type BannerProps = {
  eyebrow: string
  title: string
  description: string
  icon: string
  action: string
  href?: string
  tone: 'gold' | 'green' | 'purple' | 'rose'
}

export function DirectionalArrow() {
  return (
    <svg className={styles.directionalArrow} viewBox="0 0 28 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M3 12h21M16 4l8 8-8 8" />
    </svg>
  )
}

export function PrismWave({ priority = false }: { priority?: boolean }) {
  return (
    <span className={styles.prismWave} aria-hidden="true">
      <Image
        src="/assets/visual-lab/quiet-prism-wave.png"
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 820px) 100vw, 1200px"
      />
    </span>
  )
}

// Crop the original wave diagonally into the corner, with independent layers.
export function CornerWaves({ both = false }: { both?: boolean }) {
  const artwork = <svg viewBox="0 0 400 200" fill="currentColor" focusable="false">
    <g transform="translate(410 220) rotate(205)">
      <g className={styles.cornerLayer}><path d={MAIN_WAVE_PATH} opacity=".3" transform="translate(160 25) scale(2.4 2) rotate(-5)" /></g>
      <g className={styles.cornerLayer}><path d={MAIN_WAVE_PATH} opacity=".34" transform="translate(130 43) scale(2.3 1.8) rotate(4)" /></g>
      <g className={styles.cornerLayer}><path d={MAIN_WAVE_PATH} opacity=".24" transform="translate(140 61) scale(2.5 1.5) rotate(-8)" /></g>
    </g>
  </svg>
  return <>
    <span className={styles.cornerTop} aria-hidden="true"><span data-atmosphere-wave>{artwork}</span></span>
    {both ? <span className={styles.cornerBottom} aria-hidden="true"><span data-atmosphere-wave>{artwork}</span></span> : null}
  </>
}

export function BannerCard({ eyebrow, title, description, icon, action, href, tone }: BannerProps) {
  const content = (
    <>
      <CornerWaves />
      <span className={styles.bannerContext} aria-hidden="true"><i className={icon} /></span>
      <span className={styles.bannerCopy}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <strong>{title}</strong>
        <span>{description}</span>
      </span>
      <span className={styles.bannerAction}>
        <span>{action}</span>
        <DirectionalArrow />
      </span>
    </>
  )

  if (href) {
    return <Link className={`${styles.banner} ${styles[tone]}`} href={href} data-motion-root data-atmosphere>{content}</Link>
  }

  return <article className={`${styles.banner} ${styles[tone]}`} data-motion-root data-atmosphere>{content}</article>
}


export function PrismDefinitions() {
  return (
<svg width="0" height="0" aria-hidden="true" focusable="false" className={styles.filterDefinitions}>
        <defs>
          <filter id="quiet-prism-frost" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency=".012 .035" numOctaves="2" seed="8" result="grain" />
            <feDisplacementMap in="SourceGraphic" in2="grain" scale="28" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
  )
}
