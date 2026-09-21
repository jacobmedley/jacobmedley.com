'use client'

import { Fragment, useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'
import { FeaturedAnchor, FeaturedField } from './FeaturedArtwork'
import AnimatedStudyImage from './AnimatedStudyImage'
import StudySupportingArt from './StudySupportingArt'
import ProjectGeometry from './ProjectGeometry'
import CallCenterDemo from './CallCenterDemo'
import {
  projects,
  type Project,
  type ProjectMedia,
  type ProjectBadge,
  type ProjectMetric,
  type StyledListBlock,
  type CardBlock,
  type BrandShade,
  type ProgressCell,
  type ProgressBand,
  type ProgressDiagramBlock,
  type SplitRowBlock
} from '@/lib/data/projects'

// Literal utility strings keep media widths visible to Tailwind's scanner.
const WIDTH_PCT_CLASS = { 25: 'w-1/4', 50: 'w-1/2', 75: 'w-3/4', 100: 'w-full' } as const

const BG_SHADE: Record<BrandShade, string> = {
  prime: 'bg-prime', 'prime-light': 'bg-prime-light', 'prime-dark': 'bg-prime-dark',
  second: 'bg-second', 'second-light': 'bg-second-light', 'second-dark': 'bg-second-dark',
  third: 'bg-third', 'third-light': 'bg-third-light', 'third-dark': 'bg-third-dark',
  fourth: 'bg-fourth', 'fourth-light': 'bg-fourth-light', 'fourth-dark': 'bg-fourth-dark',
  fifth: 'bg-fifth', 'fifth-light': 'bg-fifth-light', 'fifth-dark': 'bg-fifth-dark',
  pop: 'bg-pop', 'pop-light': 'bg-pop-light', 'pop-dark': 'bg-pop-dark',
  'dark-subtle': 'bg-dark-subtle', black: 'bg-black', white: 'bg-white'
}

const TEXT_SHADE: Record<BrandShade, string> = {
  prime: 'text-prime', 'prime-light': 'text-prime-light', 'prime-dark': 'text-prime-dark',
  second: 'text-second', 'second-light': 'text-second-light', 'second-dark': 'text-second-dark',
  third: 'text-third', 'third-light': 'text-third-light', 'third-dark': 'text-third-dark',
  fourth: 'text-fourth', 'fourth-light': 'text-fourth-light', 'fourth-dark': 'text-fourth-dark',
  fifth: 'text-fifth', 'fifth-light': 'text-fifth-light', 'fifth-dark': 'text-fifth-dark',
  pop: 'text-pop', 'pop-light': 'text-pop-light', 'pop-dark': 'text-pop-dark',
  'dark-subtle': 'text-[#ced4da]', black: 'text-black', white: 'text-white'
}

// Legacy col-N spans used by the hydra diagram (24-col grid, unprefixed).
const COL_SPAN: Record<number, string> = { 6: 'col-6', 12: 'col-12', 18: 'col-18', 24: 'col-24' }
const ROW_COLS_LG: Record<number, string> = { 3: 'row-cols-lg-3', 4: 'row-cols-lg-4', 5: 'row-cols-lg-5' }

interface CaseStudyModalProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

// The installed kit supplies thin icons but omits these brand glyphs.
// Technology names remain explicit; use the site's available visual vocabulary.
function projectIcon(icon: string) {
  const alternatives: Record<string, string> = {
    'fa-brands fa-wordpress-simple': 'fa-thin fa-browser',
    'fa-brands fa-bootstrap': 'fa-thin fa-layer-group',
    'fa-brands fa-git-alt': 'fa-thin fa-code-branch',
    'fa-brands fa-laravel': 'fa-thin fa-code',
  }
  return alternatives[icon] ?? icon
}

const intentPreloadCache = new Set<string>()
const intentProjectCache = new Set<string>()
let intentListenerUsers = 0

function preloadCaseStudyAssets(projectId: string) {
  if (intentProjectCache.has(projectId)) return
  intentProjectCache.add(projectId)
  const project = projects.find((candidate) => candidate.id === projectId)
  if (!project) return
  const sources: string[] = []
  const visit = (value: unknown) => {
    if (!value || sources.length >= 3) return
    if (Array.isArray(value)) {
      value.forEach(visit)
      return
    }
    if (typeof value !== 'object') return
    const record = value as Record<string, unknown>
    if (typeof record.src === 'string' && !sources.includes(record.src)) sources.push(record.src)
    Object.values(record).forEach(visit)
  }
  visit(project.heroBrandImage)
  visit(project.brief)
  visit(project.media)
  sources.slice(0, 3).forEach((src) => {
    if (intentPreloadCache.has(src)) return
    intentPreloadCache.add(src)
    const image = new window.Image()
    image.decoding = 'async'
    image.src = src
  })
}

function warmCaseStudyFromTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return
  const trigger = target.closest<HTMLElement>('[data-modal-trigger]')
  if (trigger?.dataset.modalTrigger) preloadCaseStudyAssets(trigger.dataset.modalTrigger)
}

const onCaseStudyPointerIntent = (event: PointerEvent) => warmCaseStudyFromTarget(event.target)
const onCaseStudyFocusIntent = (event: FocusEvent) => warmCaseStudyFromTarget(event.target)

function ModalStudyImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>('loading')
  const retrySrc = attempt === 0 ? src : `${src}${src.includes('?') ? '&' : '?'}retry=${attempt}`
  return (
    <span className="modal-image-frame" data-load-state={state} aria-busy={state === 'loading'}>
      <span className="modal-image-loading" aria-hidden="true">Loading image…</span>
      {/* eslint-disable-next-line @next/next/no-img-element -- existing case-study evidence asset */}
      <img
        loading="lazy"
        decoding="async"
        className={className}
        src={retrySrc}
        alt={alt}
        onLoad={() => setState('loaded')}
        onError={() => setState('error')}
      />
      {state === 'error' && (
        <span className="modal-image-error" role="alert">
          Image unavailable.
          <button
            type="button"
            className="btn btn-outline-prime-dark rounded-full"
            onClick={() => {
              setState('loading')
              setAttempt((value) => value + 1)
            }}
          >
            Retry
          </button>
        </span>
      )}
    </span>
  )
}

/**
 * Legacy Bootstrap modal (components/modal-*.html): fullscreen dialog
 * with container-width content, blur behind the modal viewport, fade +
 * translateY(-50px) entrance, circular header close button and centered
 * footer Close button. Body renders the project's typed media blocks in
 * the original legacy section order. Styles in globals.css (.modal…).
 */
export default function CaseStudyModal({ project, open, onOpenChange }: CaseStudyModalProps) {
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const wasOpenRef = useRef(false)
  const swipeRef = useRef({ pointerId: -1, startY: 0, currentY: 0, startTime: 0 })
  const featured = !!project

  useEffect(() => {
    intentListenerUsers += 1
    if (intentListenerUsers === 1) {
      document.addEventListener('pointerover', onCaseStudyPointerIntent, { passive: true })
      document.addEventListener('pointerdown', onCaseStudyPointerIntent, { passive: true })
      document.addEventListener('focusin', onCaseStudyFocusIntent)
    }
    return () => {
      intentListenerUsers -= 1
      if (intentListenerUsers === 0) {
        document.removeEventListener('pointerover', onCaseStudyPointerIntent)
        document.removeEventListener('pointerdown', onCaseStudyPointerIntent)
        document.removeEventListener('focusin', onCaseStudyFocusIntent)
      }
    }
  }, [])

  useEffect(() => {
    let cameraTimer = 0
    const body = document.body
    if (open) {
      body.dataset.modalCamera = 'open'
      wasOpenRef.current = true
    } else if (wasOpenRef.current) {
      body.dataset.modalCamera = 'closing'
      cameraTimer = window.setTimeout(() => {
        if (!document.querySelector(".modal[data-state='open']")) delete body.dataset.modalCamera
      }, 280)
      wasOpenRef.current = false
    }
    return () => window.clearTimeout(cameraTimer)
  }, [open])

  useEffect(() => {
    if (!open) return
    let frame = 0
    let observer: ResizeObserver | undefined
    const connect = () => {
      const modal = modalRef.current
      if (!modal) {
        frame = requestAnimationFrame(connect)
        return
      }
      const navigation = document.querySelector<HTMLElement>('#the-menu')
      const measureNavigation = () => {
        const height = navigation?.offsetHeight ?? 0
        modal.style.setProperty('--modal-mobile-footer-height', `${Math.ceil(height)}px`)
      }
      measureNavigation()
      if (navigation) {
        observer = new ResizeObserver(measureNavigation)
        observer.observe(navigation)
      }
    }
    connect()
    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
    }
  }, [open])

  const setSwipeOffset = (value: number) => {
    modalRef.current?.querySelector<HTMLElement>('.modal-content')?.style.setProperty('--modal-swipe-y', `${Math.max(0, value)}px`)
  }
  const resetSwipe = () => {
    const content = modalRef.current?.querySelector<HTMLElement>('.modal-content')
    if (!content) return
    content.dataset.swipeSettling = 'true'
    setSwipeOffset(0)
    window.setTimeout(() => { delete content.dataset.swipeSettling }, 260)
  }
  const onSwipePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || !matchMedia('(max-width: 767px)').matches) return
    swipeRef.current = { pointerId: event.pointerId, startY: event.clientY, currentY: event.clientY, startTime: performance.now() }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const onSwipePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (swipeRef.current.pointerId !== event.pointerId) return
    swipeRef.current.currentY = event.clientY
    setSwipeOffset(event.clientY - swipeRef.current.startY)
  }
  const finishSwipe = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (swipeRef.current.pointerId !== event.pointerId) return
    const distance = Math.max(0, swipeRef.current.currentY - swipeRef.current.startY)
    const duration = Math.max(1, performance.now() - swipeRef.current.startTime)
    const velocity = distance / duration
    swipeRef.current.pointerId = -1
    if (distance > 88 || (distance > 32 && velocity > .65)) {
      onOpenChange(false)
      window.setTimeout(() => setSwipeOffset(0), 340)
    } else {
      resetSwipe()
    }
  }
  const cancelSwipe = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (swipeRef.current.pointerId !== event.pointerId) return
    swipeRef.current.pointerId = -1
    resetSwipe()
  }
  // Paint outside the native scroll viewport so its transparent gutter cannot
  // crop the artwork. Keep this one field aligned with the scrolling intro.
  const bindFeaturedBody = useCallback((body: HTMLDivElement | null) => {
    if (!body || !featured) return
    const shell = body.parentElement!
    const field = shell.querySelector<HTMLElement>('.modal-bleed-field')!
    const header = shell.querySelector<HTMLElement>('.modal-header')!
    const hero = body.querySelector<HTMLElement>('.modal-featured-hero')!
    const scroll = () => { field.style.transform = `translateY(${-body.scrollTop}px)` }
    const resize = () => {
      field.style.height = `${header.getBoundingClientRect().height + hero.getBoundingClientRect().height}px`
      scroll()
    }
    const observer = new ResizeObserver(resize)
    observer.observe(header)
    observer.observe(hero)
    body.addEventListener('scroll', scroll, { passive: true })
    resize()
    return () => {
      observer.disconnect()
      body.removeEventListener('scroll', scroll)
    }
  }, [featured])

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-backdrop" />
        <Dialog.Content
          ref={modalRef}
          aria-describedby={undefined}
          className="modal"
          onOpenAutoFocus={() => {
            returnFocusRef.current = document.activeElement as HTMLElement | null
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault()
            returnFocusRef.current?.focus()
            returnFocusRef.current = null
          }}
          onClick={(e) => {
            // Bootstrap closes when the area outside the dialog content is clicked
            if (!(e.target as HTMLElement).closest('.modal-content')) onOpenChange(false)
          }}
        >
          <div className="modal-dialog modal-fullscreen md:py-6">
            <div className={cn('modal-content container', featured && 'modal-full-bleed', project && `featured-work-card-${project.id}`, project && !project.thumb && !ORIGINAL_FEATURED_IDS.has(project.id) && 'modal-theme-thinking')} data-project-id={project?.id}>
              <div
                className="modal-sheet-grabber"
                aria-hidden="true"
                onPointerDown={onSwipePointerDown}
                onPointerMove={onSwipePointerMove}
                onPointerUp={finishSwipe}
                onPointerCancel={cancelSwipe}
              ><span /></div>
              {featured && project && (
                <div className={`modal-bleed-field featured-work-card featured-work-card-${project.id}`} data-motion-root aria-hidden="true">
                  <ModalHeroField project={project} />
                </div>
              )}
              <div className="modal-header">
                <Dialog.Title asChild>
                  <h2 className="modal-title flex min-w-0 flex-1 items-center gap-3 pr-3">
                    {/* eslint-disable-next-line @next/next/no-img-element -- legacy brand asset */}
                    <img
                      loading="lazy"
                      src="/images/brand/SVG/jm-icon-full-brand-prime.svg"
                      alt=""
                      height={58}
                      width={58}
                      className="shrink-0"
                    />
                    <span className="min-w-0 flex-1">{project?.modalTitle ?? project?.title}</span>
                  </h2>
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="btn btn-prime rounded-full btn-close-modal shrink-0"
                    aria-label="Close"
                  >
                    <i className="fa-thin fa-xmark-large" aria-hidden="true" />
                  </button>
                </Dialog.Close>
              </div>

              <div className="modal-body" tabIndex={0} ref={bindFeaturedBody}>
                <div className="container">{project && <ModalContent project={project} />}</div>
              </div>

              <div className="modal-footer">
                <Dialog.Close asChild>
                  <button type="button" className="btn btn-prime btn-lg rounded-full btn-close-modal">
                    Close
                  </button>
                </Dialog.Close>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function BadgeList({ badges }: { badges: ProjectBadge[] }) {
  return (
    <div className="modal-badges" role="group" aria-label="Contributions">
      {badges.map((b) => (
        <span key={b.label} className="badge-work">
          <i className={projectIcon(b.icon)} aria-hidden="true" /> {b.label}
        </span>
      ))}
    </div>
  )
}

/** Shared by ModalContent's fixed post-brief slot and the `contributions`
 * media block (reveal's inlineContributions — legacy interleaves this badge
 * row among its custom prose instead of right after the brief). */
function ContributionsSection({ contributions }: { contributions: ProjectBadge[] }) {
  if (contributions.length === 0) return null
  return (
    <>
      <hr className="solid-center" />
      <BadgeList badges={contributions} />
    </>
  )
}

const ORIGINAL_FEATURED_IDS = new Set(['webmd', 'dentalplans', 'bumblebeemd', 'hydra', 'opfred'])
const BRIEF_FOLLOWUP_IDS = new Set(['call-center-ux', 'personas'])

function ModalHeroField({ project }: { project: Project }) {
  if (ORIGINAL_FEATURED_IDS.has(project.id)) return <FeaturedField projectId={project.id} />
  if (project.id === 'reveal' || project.id === 'viva' || project.heroBrandImage) {
    return (
      <div className="modal-card-field modal-card-field-brand">
        <span className="modal-card-field-brand-glow" />
      </div>
    )
  }
  if (project.thumb) {
    return (
      <div className="modal-card-field modal-card-field-photo">
        {/* eslint-disable-next-line @next/next/no-img-element -- existing case-study card asset */}
        <img src={project.thumb.src} alt="" />
      </div>
    )
  }
  return (
    <div className={`modal-card-field modal-card-field-icon thinking-art-${project.id}`}>
      <ProjectGeometry projectId={project.id} />
    </div>
  )
}

function BriefFollowup({ project }: { project: Project }) {
  const image = project.brief.image
  if (!image || !BRIEF_FOLLOWUP_IDS.has(project.id)) return null
  if (project.id === 'call-center-ux') {
    return (
      <div className="modal-hero-followup">
        <StudySupportingArt kind="call-center" alt="Site availability flow from status check through the call center API to a state-based message and offer." />
      </div>
    )
  }
  return (
    <div className="modal-hero-followup">
      {image.src.endsWith('.gif') ? (
        <AnimatedStudyImage src={image.src} alt={image.alt} />
      ) : (
        <ModalStudyImage className="img-fluid" src={image.src} alt={image.alt} />
      )}
    </div>
  )
}

/*
 * Legacy modal copy occasionally carries an inline anchor (e.g. the J.R.
 * Hernandez LinkedIn link in modal-split-test.html 40). Prose in the data
 * layer is plain `string`, so links are authored markdown-style as
 * `[label](https://url)` and expanded here. Strings without the marker are
 * returned untouched, so every existing paragraph renders exactly as before.
 */
const INLINE_LINK_SPLIT = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g

function withInlineLinks(text: string): ReactNode {
  const parts = text.split(INLINE_LINK_SPLIT)
  if (parts.length === 1) return text
  const out: ReactNode[] = []
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) out.push(parts[i])
    const label = parts[i + 1]
    const href = parts[i + 2]
    if (label && href) {
      out.push(
        <a
          key={i}
          className="link-inline"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}{' '}<i className="fa-thin fa-arrow-up-right-from-square" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
        </a>
      )
    }
  }
  return out
}

/* eslint-disable @next/next/no-img-element -- legacy parity: native imgs */
/**
 * Bare content for a media block, with no outer `.row`/`.col-*` shell.
 * MediaBlock wraps this in the appropriate row/column for top-level use;
 * split-row renders it directly inside its own col-lg-N so children stack
 * without an extra nested full-width row. Composite types that manage their
 * own multi-column grid (image-pair, image-row, metric-grid, progress-diagram,
 * split-row) fall back to the full MediaBlock render — their internal `.row`
 * is load-bearing, not a superfluous wrapper.
 */
function BlockContent({ block }: { block: ProjectMedia }): ReactNode {
  switch (block.type) {
    case 'heading': {
      const Tag = `h${block.level ?? 5}` as 'h2' | 'h3' | 'h4' | 'h5'
      if (block.treatment === 'section' || block.icon) {
        return (
          <>
            <div className="modal-section-heading">
              {block.icon && <span><i className={block.icon} aria-hidden="true" /></span>}
              <Tag>{block.text}</Tag>
            </div>
            <hr className="solid-center rule-heading" />
          </>
        )
      }
      return (
        <>
          {block.sectionDivider && <hr className="solid-center my-12" />}
          {block.icon && (
            <p className="display-4">
              <i className={block.icon} aria-hidden="true" />
            </p>
          )}
          <Tag>{block.text}</Tag>
          <hr className={cn('solid-center', block.sectionDivider && 'my-12')} />
        </>
      )
    }
    case 'text':
      return <p>{withInlineLinks(block.text)}</p>
    case 'list':
      return (
        <ul className="fa-ul">
          {block.items.map((item) => (
            <li key={item} className="mb-2">
              <span className="fa-li">
                <i className="fa-thin fa-angle-right" aria-hidden="true" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      )
    case 'image': {
      const shapeClass = block.shape === 'circle' ? 'rounded-full' : 'rounded'
      const widthClass = block.widthPct && WIDTH_PCT_CLASS[block.widthPct]
      return block.caption ? (
        // .figure is display:inline-block (Bootstrap), so text-center has to
        // live on this wrapping block, not the figure itself, to actually
        // reposition it within the column.
        <div className="text-center">
          <figure className="figure">
            <ModalStudyImage
              className={cn(
                'figure-img img-fluid',
                widthClass,
                block.bordered && 'border border-white',
                !block.flush && [shapeClass, 'shadow-[var(--shadow-bs-lg)]']
              )}
              src={block.src}
              alt={block.alt}
            />
            <figcaption className="figure-caption text-right">{block.caption}</figcaption>
          </figure>
        </div>
      ) : (
        <p className="text-center">
          <ModalStudyImage
            className={cn(
              'img-fluid',
              widthClass,
              block.bordered && 'border border-white',
              !block.flush && ['shadow-[var(--shadow-bs-lg)]', block.shape === 'circle' && shapeClass]
            )}
            src={block.src}
            alt={block.alt}
          />
        </p>
      )
    }
    case 'styled-list':
      return <StyledListContent block={block} />
    case 'card':
      return <CardContent block={block} />
    case 'supporting-art':
      return <StudySupportingArt kind={block.kind} alt={block.alt} />
    case 'call-center-states':
      return <CallCenterDemo />
    default:
      return <MediaBlock block={block} />
  }
}

function MediaBlock({ block }: { block: ProjectMedia }) {
  switch (block.type) {
    // Legacy consistently wraps a new section's heading col in `mt-5`
    // (occasionally `py-5`) to separate it from the previous block — every
    // other block type here has no such margin in legacy, so this is
    // heading-only, matching ProgressDiagram's own inline heading (mt-12).
    case 'heading':
      return (
        <div className="row">
          <div className={cn('col-24', block.sectionDivider ? 'text-center' : 'mt-12')}>
            <BlockContent block={block} />
          </div>
        </div>
      )
    case 'divider':
      return (
        <div className="row modal-content-divider">
          <div className="col-24">
            <hr className="solid-center" />
          </div>
        </div>
      )
    case 'text':
    case 'list':
    case 'styled-list':
    case 'card':
    case 'call-center-states':
      return (
        <div className="row">
          <div className="col-24">
            <BlockContent block={block} />
          </div>
        </div>
      )
    case 'image':
    case 'supporting-art':
      return (
        <div className="row mb-6 justify-center">
          <div className={block.type === 'image' && block.span ? `col-24 col-lg-${block.span}` : 'col-24'}>
            <BlockContent block={block} />
          </div>
        </div>
      )
    case 'image-pair':
      return (
        <div className="row mb-6">
          <div className="col-24 col-lg-18">
            <p className="lg:text-left">
              <i className="fa-thin fa-desktop fa-2x" aria-hidden="true" />
            </p>
            <p>
              <ModalStudyImage
                className="img-fluid shadow-[var(--shadow-bs-lg)]"
                src={block.desktop.src}
                alt={block.desktop.alt}
              />
            </p>
          </div>
          <div className="col-24 col-lg-6">
            <p className="lg:text-left">
              <i className="fa-thin fa-mobile fa-2x" aria-hidden="true" />
            </p>
            <p className="text-center">
              <ModalStudyImage
                className="img-fluid shadow-[var(--shadow-bs-lg)]"
                src={block.mobile.src}
                alt={block.mobile.alt}
              />
            </p>
          </div>
        </div>
      )
    case 'image-row':
      return (
        <div className="row mb-6 justify-center">
          {block.images.map((img, i) => (
            <Fragment key={img.src}>
              {i > 0 && block.mobileDivider && (
                <div className="col-24 py-12 block lg:hidden">
                  <hr className="solid-center" />
                </div>
              )}
              <div className={`col-24 col-lg-${block.cols[i] ?? 12}`}>
                <p>
                  <ModalStudyImage className="img-fluid shadow-[var(--shadow-bs-lg)]" src={img.src} alt={img.alt} />
                </p>
              </div>
            </Fragment>
          ))}
        </div>
      )
    case 'metric-grid':
      return (
        <section className="modal-data-panel">
          <h4>{block.heading}</h4>
          <hr className="solid-center rule-heading" />
          <div className="modal-data-grid">
            <div className="modal-metric-grid">
              {block.metrics.map((metric, index) => (
                <MetricStat key={metric.label} metric={metric} index={index} />
              ))}
            </div>
            <div className="modal-value-card modal-prism-surface" data-prism-tone="sage">
              <h5>{block.valueCreated.heading}</h5>
              <hr className="solid-center modal-value-rule" />
              <ul>
                {block.valueCreated.items.map((item) => (
                  <li key={item}><i className="fa-thin fa-chevron-right" aria-hidden="true" /> <span>{item}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )
    case 'progress-diagram':
      return <ProgressDiagram block={block} />
    case 'split-row':
      return <SplitRow block={block} />
    case 'icon-grid':
      return (
        <div
          className={cn(
            'row text-center modal-icon-grid',
            `row-cols-${block.cols ?? 2}`,
            block.colsLg && `row-cols-lg-${block.colsLg}`
          )}
        >
          {block.items.map((item) =>
            item.image ? (
              <div key={item.title} className="col mb-4">
                <p>
                  <img
                    loading="lazy"
                    className="img-fluid rounded-full shadow-[var(--shadow-bs-lg)]"
                    src={item.image.src}
                    alt={item.image.alt}
                  />
                </p>
                <h5>{item.title}</h5>
              </div>
            ) : (
              <div key={item.title} className="col mb-4">
                <div className="card modal-prism-surface">
                  <div className="card-body">
                    <p className="mb-1">
                      <i className={`${item.icon} fa-2x`} aria-hidden="true" />
                    </p>
                    <p className="card-title font-brand m-0">{item.title}</p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )
    case 'contributions':
      return null // only meaningful at renderMedia's top level; intercepted there
  }
}

/**
 * Legacy two-column image+narrative row (modal-hydra.html's "The Problem"/
 * "Why Hydra?" rows, modal-product.html's alternating "Iteration N" rows).
 * Children stack directly in their col-lg-N via BlockContent — no nested
 * full-width row per child, matching how legacy places bare <p>/<h4>/<img>
 * elements straight inside the column.
 */
const SPLIT_ROW_V_ALIGN = {
  top: 'items-start',
  center: 'items-center',
  bottom: 'items-end'
} as const

const SPLIT_ROW_SELF_ALIGN = {
  top: 'self-start',
  center: 'self-center',
  bottom: 'self-end'
} as const

const SPLIT_ROW_H_ALIGN = {
  start: 'justify-start',
  center: 'justify-center',
  between: 'justify-between',
  end: 'justify-end'
} as const

// Tailwind's JIT scanner needs literal class strings per breakpoint — a
// template-literal `${bp}:hidden` never appears verbatim in source, so it
// wouldn't get generated.
const SPLIT_ROW_REVERSE_CLASS = { md: 'md:flex-row-reverse', lg: 'lg:flex-row-reverse' } as const
const SPLIT_ROW_DIVIDER_HIDDEN_CLASS = { md: 'md:hidden', lg: 'lg:hidden' } as const
function SplitRow({ block }: { block: SplitRowBlock }) {
  const bp = block.breakpoint ?? 'lg'
  // One section gap belongs to the row, not each card or artwork column.
  const startsSection = [...block.left, ...block.right].some((c) => c.type === 'heading')
  return (
    <div
      className={cn(
        'row mb-6 modal-media-split',
        startsSection && 'modal-media-split-section',
        SPLIT_ROW_V_ALIGN[block.vAlign ?? 'top'],
        SPLIT_ROW_H_ALIGN[block.hAlign ?? 'start'],
        block.reverse && SPLIT_ROW_REVERSE_CLASS[bp]
      )}
    >
      <div
        className={cn(
          `col-24 col-${bp}-${block.leftSpan ?? 12}`,
          block.leftSpanXl && `col-xl-${block.leftSpanXl}`,
          block.leftSelfAlign && SPLIT_ROW_SELF_ALIGN[block.leftSelfAlign]
        )}
      >
        <SplitColumn blocks={block.left} surface={block.leftSurface} />
      </div>
      {/* Legacy's mobile-only divider between stacked columns (`col-24 py-5
          d-block d-lg-none` + hr) before the row's breakpoint turns it
          side-by-side — most legacy rows don't have one, so this is opt-in. */}
      {block.mobileDivider && (
        <div className={cn('col-24 py-12 block', SPLIT_ROW_DIVIDER_HIDDEN_CLASS[bp])}>
          <hr className="solid-center" />
        </div>
      )}
      <div
        className={cn(
          `col-24 col-${bp}-${block.rightSpan ?? 12}`,
          block.rightSpanXl && `col-xl-${block.rightSpanXl}`,
          block.rightSelfAlign && SPLIT_ROW_SELF_ALIGN[block.rightSelfAlign]
        )}
      >
        <SplitColumn blocks={block.right} surface={block.rightSurface} />
      </div>
    </div>
  )
}

function SplitColumn({ blocks, surface = false }: { blocks: ProjectMedia[]; surface?: boolean }) {
  const content = blocks.map((child, i) => <BlockContent key={i} block={child} />)
  return surface ? (
    <div className={cn('modal-prism-surface modal-narrative-card', blocks.every((child) => child.type === 'text') && 'modal-narrative-summary')}>
      {content}
    </div>
  ) : <>{content}</>
}

/**
 * Legacy nested .progress/.progress-bar hierarchy diagrams. Two shapes,
 * one type: hydra's flat col-N rows of striped bars (modal-hydra.html
 * 185-268) and dentalplans' striped band containers holding row-cols-lg-5
 * grids of icon cells, band 1 nesting a "Brand Theme" sub-bar per cell
 * (modal-product.html 169-414). Spacing follows the legacy Bootstrap
 * classes (band p-4→p-6, cell strong py-4/py-5→py-6/py-12, sub py-2).
 */
function ProgressDiagram({ block }: { block: ProgressDiagramBlock }) {
  return (
    <>
      {block.heading && (
        <div className="row">
          <div className="col-24 mt-12">
            <h4>{block.heading}</h4>
            <hr className="solid-center" />
          </div>
        </div>
      )}
      {block.rows?.map((row, i) => (
        <div key={i} className="row text-center mb-6">
          {row.cells.map((cell, j) => (
            <div key={j} className={(cell.span && COL_SPAN[cell.span]) || 'col'}>
              <ProgressBarCell cell={cell} />
            </div>
          ))}
        </div>
      ))}
      {block.bands?.map((band) => (
        <ProgressBandSection key={band.heading} band={band} />
      ))}
    </>
  )
}

function ProgressBandSection({ band }: { band: ProgressBand }) {
  const isCore = band.heading === 'Core Framework'
  return (
    <div className={cn('row text-center mb-6 modal-progress-band', isCore && 'modal-progress-band-core')}>
      <div className="col">
        <div className="progress h-full modal-progress-frame">
          <div className={cn('progress-bar progress-bar-striped w-full p-6 modal-progress-band-surface', BG_SHADE[band.bg])}>
            <h3 className={cn('mb-4 modal-progress-band-heading', band.textColor && TEXT_SHADE[band.textColor])}>
              {band.icon && (
                <>
                  <i className={band.icon} aria-hidden="true" />
                  <br />
                </>
              )}
              {band.heading}
            </h3>
            {band.rows.map((row, i) => (
              <div
                key={i}
                className={cn(
                  'row text-center mb-6 row-cols-1 row-cols-md-2 g-3',
                  typeof row.cols === 'number' && ROW_COLS_LG[row.cols]
                )}
              >
                {row.cells.map((cell, j) => (
                  <div key={j} className="col">
                    <ProgressBarCell cell={cell} inBand />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProgressBarCell({ cell, inBand = false }: { cell: ProgressCell; inBand?: boolean }) {
  const striped = cell.striped ?? true
  return (
    <div className="progress h-full modal-progress-frame" data-motion-root={cell.animated || undefined}>
      <div
        className={cn(
          'progress-bar w-full modal-progress-cell',
          striped && 'progress-bar-striped',
          cell.animated && 'progress-bar-animated',
          BG_SHADE[cell.bg],
          cell.textColor && TEXT_SHADE[cell.textColor],
          // band grid cells carry shadow-lg; a cell with a nested sub-bar is
          // the unshadowed p-3 brand box (its sub carries the shadow instead)
          cell.sub ? 'p-4' : inBand && 'shadow-[var(--shadow-bs-lg)]'
        )}
      >
        {cell.sub ? (
          <>
            <p>
              <strong>
                {cell.icon && (
                  <>
                    <i className={`${projectIcon(cell.icon)} modal-progress-cell-icon`} aria-hidden="true" /> <br />
                  </>
                )}
                {cell.label}
              </strong>
            </p>
            <div className="progress h-full modal-progress-frame">
              <div
                className={cn(
                  'progress-bar w-full shadow-[var(--shadow-bs-lg)] py-2',
                  BG_SHADE[cell.sub.bg],
                  cell.sub.textColor && TEXT_SHADE[cell.sub.textColor]
                )}
              >
                <strong className="font-bold">
                  {cell.sub.icon && <i className={`${cell.sub.icon} modal-progress-sub-icon`} aria-hidden="true" />}{' '}
                  {cell.sub.label}
                </strong>
              </div>
            </div>
          </>
        ) : (
          <strong className={cn('font-bold', cell.padY === 5 ? 'py-12' : 'py-6')}>
            {cell.icon && (
              <>
                <i className={`${projectIcon(cell.icon)} modal-progress-cell-icon`} aria-hidden="true" />
                <br />
              </>
            )}
            {cell.label}
          </strong>
        )}
      </div>
    </div>
  )
}

/**
 * roadmap's list-group-numbered (`.list-group-item` + per-item `bg-*-light/25`)
 * vs reveal/wrong's plain `<ul>` bullets — same StyledListBlock shape, chosen
 * by whether the data asks for numbering/shadow/a per-item bg at all.
 */
function StyledListContent({ block }: { block: StyledListBlock }) {
  const rich = block.numbered || block.shadow || block.items.some((item) => item.bg)

  if (!rich) {
    return (
      <ul className="modal-info-card-grid">
        {block.items.map((item, i) => (
          <li key={i} className="modal-info-card modal-prism-surface">
            <span className="modal-info-card-icon" aria-hidden="true">
              <i className={item.icon ?? 'fa-thin fa-circle-info'} />
            </span>
            <span>
              {item.label && <strong>{item.label} </strong>}
              {item.body}
            </span>
          </li>
        ))}
      </ul>
    )
  }

  const ListTag = block.numbered ? 'ol' : 'ul'
  return (
    <ListTag
      className={cn(
        'list-group modal-prism-list',
        block.numbered && 'list-group-numbered'
      )}
    >
      {block.items.map((item, i) => (
        <li
          key={i}
          className="list-group-item modal-prism-list-item modal-prism-surface"
        >
          <div>
            {item.label && <div className="font-bold">{item.label}</div>}
            {item.body}
            {item.subItems && (
              <ul>
                {item.subItems.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ListTag>
  )
}

function CardContent({ block }: { block: CardBlock }) {
  return (
    <div className="card modal-prism-card modal-prism-surface">
      <div className="card-header">{block.header}</div>
      <div className="card-body">
        {block.rows.map((row) => (
          <div key={row.label}>
            <p className="mb-0">
              <strong>{row.label}</strong>
            </p>
            <p>{row.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const METRIC_TONES = ['gold', 'sage', 'plum', 'slate'] as const
const METRIC_ICONS = ['fa-chart-line', 'fa-chart-pie', 'fa-users', 'fa-stopwatch'] as const

function MetricStat({ metric, index }: { metric: ProjectMetric; index: number }) {
  return (
    <div className="modal-metric-card modal-prism-surface" data-prism-tone={METRIC_TONES[index % METRIC_TONES.length]}>
      <i className={`modal-metric-icon fa-thin ${METRIC_ICONS[index % METRIC_ICONS.length]}`} aria-hidden="true" />
      <h4 className="result">{metric.value}</h4>
      <p className="result-label">{metric.label}</p>
    </div>
  )
}

function ModalContent({ project }: { project: Project }) {
  const featured = true
  const originalFeatured = ORIGINAL_FEATURED_IDS.has(project.id)
  return (
    <>
      <div
        className={cn('modal-intro', featured && `modal-featured-hero featured-work-card featured-work-card-${project.id}`)}
        data-motion-root={featured || undefined}
      >
        {(project.brief.image || project.brief.images) && (
          <div className="modal-intro-art">
            {originalFeatured ? (
              <div className="modal-project-art" aria-hidden="true">
                <div className="featured-work-art">
                  <span className="featured-work-anchor"><FeaturedAnchor projectId={project.id} /></span>
                </div>
              </div>
            ) : (project.id === 'reveal' || project.id === 'viva' || project.heroBrandImage) && (project.heroBrandImage || project.brief.image) ? (
              <div className="modal-project-art modal-project-art-brand" aria-hidden="true">
                <img src={(project.heroBrandImage ?? project.brief.image)!.src} alt="" />
              </div>
            ) : project.thumb ? (
              <div className="modal-project-art modal-project-art-photo" aria-hidden="true" />
            ) : (
              <div className="modal-project-art modal-project-art-icon" aria-hidden="true">
                <span className="modal-project-icon-anchor">
                  <i className={project.id === 'workshops' ? 'fa-thin fa-lightbulb' : project.icon ?? 'fa-thin fa-star'} />
                </span>
              </div>
            )}
          </div>
        )}
        <div className="modal-intro-copy">
          {project.brief.paragraphs.length > 0 && (
            <>
              <h3>{project.briefHeading ?? 'Project Brief:'}</h3>
              <hr className="solid-center" />
              {project.brief.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>
                  {project.briefLabels?.includes(p) ? <strong>{withInlineLinks(p)}</strong> : withInlineLinks(p)}
                </p>
              ))}
            </>
          )}

          {project.heroMedia && (
            <div className="modal-intro-support">
              {renderMedia(project.heroMedia, project.contributions)}
            </div>
          )}

          {!project.inlineContributions && <ContributionsSection contributions={project.contributions} />}

        </div>
      </div>

      {featured ? (
        <div className="modal-study-content">
          {project.heroCards && (
            <div className={`modal-hero-cards featured-work-card-${project.id}`}>
              <div className="modal-section-heading">
                <span><i className={project.heroCardsIcon ?? 'fa-thin fa-lightbulb-on'} aria-hidden="true" /></span>
                <h4>{project.heroCardsHeading ?? 'Highlights'}</h4>
              </div>
              <hr className="solid-center rule-heading" />
              <StyledListContent block={{ type: 'styled-list', items: project.heroCards }} />
            </div>
          )}
          <BriefFollowup project={project} />
          {renderMedia(project.media, project.contributions)}
        </div>
      ) : renderMedia(project.media, project.contributions)}
    </>
  )
}

/**
 * Legacy pairs a styled-list and a card side by side in col-md-12 columns
 * (roadmap: "Structure and Components" list beside a "Project Card:"
 * example) — each preceded by its own label. Detect that specific
 * text/styled-list/text/card run and render it as one two-column row;
 * everything else renders as its own full-width MediaBlock, unchanged.
 */
function renderMedia(media: ProjectMedia[], contributions: ProjectBadge[]) {
  const nodes: ReactNode[] = []
  for (let i = 0; i < media.length; i++) {
    const [b0, b1, b2, b3] = [media[i], media[i + 1], media[i + 2], media[i + 3]]
    if (b0.type === 'heading' && b0.icon) {
      let end = i + 1
      while (end < media.length && !['heading', 'divider', 'contributions', 'call-center-states'].includes(media[end].type)) end++
      nodes.push(
        <section className="modal-content-section" key={i}>
          <BlockContent block={b0} />
          <div className="modal-section-content">{renderMedia(media.slice(i + 1, end), contributions)}</div>
        </section>
      )
      i = end - 1
      continue
    }
    if (b0.type === 'contributions') {
      nodes.push(
        <div className="row" key={i}>
          <div className="col-24">
            <ContributionsSection contributions={contributions} />
          </div>
        </div>
      )
      continue
    }
    if (b0.type === 'text' && b1?.type === 'styled-list' && b2?.type === 'text' && b3?.type === 'card') {
      nodes.push(
        <details className="modal-reference" key={i}>
          <summary>Roadmap structure</summary>
          <div className="row">
          <div className="col-24 col-md-12">
            <p>{b0.text}</p>
            <hr className="solid-center" />
            <StyledListContent block={b1} />
          </div>
          <div className="col-24 col-md-12">
            <p>{b2.text}</p>
            <hr className="solid-center" />
            <CardContent block={b3} />
          </div>
          </div>
        </details>
      )
      i += 3
      continue
    }
    nodes.push(<MediaBlock key={i} block={b0} />)
  }
  return nodes
}
