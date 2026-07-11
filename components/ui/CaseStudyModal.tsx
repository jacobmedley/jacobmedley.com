'use client'

import type { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'
import {
  type Project,
  type ProjectMedia,
  type ProjectBadge,
  type ProjectMetric,
  type BrandToken,
  type StyledListBlock,
  type CardBlock,
  type BrandShade,
  type ProgressCell,
  type ProgressBand,
  type ProgressDiagramBlock,
  type SplitRowBlock
} from '@/lib/data/projects'

// Tailwind's scanner needs literal class strings, not `bg-${token}-light/25`.
const BG_LIGHT_25: Record<BrandToken, string> = {
  prime: 'bg-prime-light/25',
  second: 'bg-second-light/25',
  third: 'bg-third-light/25',
  fourth: 'bg-fourth-light/25',
  fifth: 'bg-fifth-light/25',
  pop: 'bg-pop-light/25'
}

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
const ROW_COLS_LG: Record<number, string> = { 4: 'row-cols-lg-4', 5: 'row-cols-lg-5' }

interface CaseStudyModalProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Legacy Bootstrap modal (components/modal-*.html): fullscreen dialog
 * with container-width content, blur behind the modal viewport, fade +
 * translateY(-50px) entrance, circular header close button and centered
 * footer Close button. Body renders the project's typed media blocks in
 * the original legacy section order. Styles in globals.css (.modal…).
 */
export default function CaseStudyModal({ project, open, onOpenChange }: CaseStudyModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-backdrop" />
        <Dialog.Content
          aria-describedby={undefined}
          className="modal"
          onClick={(e) => {
            // Bootstrap closes when the area outside the dialog content is clicked
            if (!(e.target as HTMLElement).closest('.modal-content')) onOpenChange(false)
          }}
        >
          <div className="modal-dialog modal-fullscreen md:py-6">
            <div className="modal-content container rounded-lg">
              <div className="modal-header">
                <Dialog.Title asChild>
                  <h2 className="modal-title">
                    {/* eslint-disable-next-line @next/next/no-img-element -- legacy brand asset */}
                    <img
                      loading="lazy"
                      src="/images/brand/SVG/jm-icon-full-brand-prime.svg"
                      alt="Jacob Medley | UX UI Designer"
                      height={58}
                      width={58}
                    />{' '}
                    {project?.modalTitle ?? project?.title}
                  </h2>
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="btn btn-prime rounded-full btn-close-modal"
                    aria-label="Close"
                  >
                    <i className="fa-sharp fa-regular fa-xmark-large" aria-hidden="true" />
                  </button>
                </Dialog.Close>
              </div>

              <div className="modal-body">
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
    <>
      {badges.map((b) => (
        <span key={b.label} className="badge-work">
          <i className={`${b.icon} text-second`} aria-hidden="true" /> {b.label}
        </span>
      ))}
    </>
  )
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
    case 'heading':
      return (
        <>
          <h5>{block.text}</h5>
          <hr className="solid-center" />
        </>
      )
    case 'text':
      return <p>{block.text}</p>
    case 'list':
      return (
        <ul className="fa-ul">
          {block.items.map((item) => (
            <li key={item} className="mb-2">
              <span className="fa-li">
                <i className="fa-regular fa-angle-right" aria-hidden="true" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      )
    case 'image':
      return block.caption ? (
        <figure className="figure">
          <img
            loading="lazy"
            className="figure-img img-fluid rounded shadow-[var(--shadow-bs-lg)]"
            src={block.src}
            alt={block.alt}
          />
          <figcaption className="figure-caption text-right">{block.caption}</figcaption>
        </figure>
      ) : (
        <p>
          <img loading="lazy" className="img-fluid shadow-[var(--shadow-bs-lg)]" src={block.src} alt={block.alt} />
        </p>
      )
    case 'styled-list':
      return <StyledListContent block={block} />
    case 'card':
      return <CardContent block={block} />
    default:
      return <MediaBlock block={block} />
  }
}

function MediaBlock({ block }: { block: ProjectMedia }) {
  switch (block.type) {
    case 'heading':
    case 'text':
    case 'list':
    case 'styled-list':
    case 'card':
      return (
        <div className="row">
          <div className="col-24">
            <BlockContent block={block} />
          </div>
        </div>
      )
    case 'image':
      return (
        <div className="row mb-6 justify-center">
          <div className={block.span ? `col-24 col-lg-${block.span}` : 'col-24'}>
            <BlockContent block={block} />
          </div>
        </div>
      )
    case 'image-pair':
      return (
        <div className="row mb-6">
          <div className="col-24 col-lg-18">
            <p className="lg:text-left">
              <i className="fa-regular fa-desktop fa-2x" aria-hidden="true" />
            </p>
            <p>
              <img
                loading="lazy"
                className="img-fluid shadow-[var(--shadow-bs-lg)]"
                src={block.desktop.src}
                alt={block.desktop.alt}
              />
            </p>
          </div>
          <div className="col-24 col-lg-6">
            <p className="lg:text-left">
              <i className="fa-regular fa-mobile fa-2x" aria-hidden="true" />
            </p>
            <p className="text-center">
              <img
                loading="lazy"
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
            <div key={img.src} className={`col-24 col-lg-${block.cols[i] ?? 12}`}>
              <p>
                <img loading="lazy" className="img-fluid shadow-[var(--shadow-bs-lg)]" src={img.src} alt={img.alt} />
              </p>
            </div>
          ))}
        </div>
      )
    case 'metric-grid':
      return (
        <div className="row">
          <div className="col-24 mt-5">
            <h4>{block.heading}</h4>
            <hr className="solid-center my-5" />
          </div>
          <div className="col-24 col-lg-16 self-center">
            <div className="row row-cols-2 text-center justify-center g-3">
              {block.metrics.map((metric) => (
                <MetricStat key={metric.label} metric={metric} />
              ))}
            </div>
          </div>
          <div className="col-24 col-lg-8 self-center">
            <h5 className="mb-3">{block.valueCreated.heading}</h5>
            <ul className="fa-ul">
              {block.valueCreated.items.map((item) => (
                <li key={item} className="mb-4">
                  <span className="fa-li">
                    <i className="fa-regular fa-angle-right" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    case 'progress-diagram':
      return <ProgressDiagram block={block} />
    case 'split-row':
      return <SplitRow block={block} />
  }
}

/**
 * Legacy two-column image+narrative row (modal-hydra.html's "The Problem"/
 * "Why Hydra?" rows, modal-product.html's alternating "Iteration N" rows).
 * Children stack directly in their col-lg-N via BlockContent — no nested
 * full-width row per child, matching how legacy places bare <p>/<h4>/<img>
 * elements straight inside the column.
 */
function SplitRow({ block }: { block: SplitRowBlock }) {
  return (
    <div className={cn('row', block.reverse && 'lg:flex-row-reverse')}>
      <div className={`col-24 col-lg-${block.leftSpan ?? 12}`}>
        {block.left.map((child, i) => (
          <BlockContent key={i} block={child} />
        ))}
      </div>
      <div className={`col-24 col-lg-${block.rightSpan ?? 12}`}>
        {block.right.map((child, i) => (
          <BlockContent key={i} block={child} />
        ))}
      </div>
    </div>
  )
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
  return (
    <div className="row text-center mb-6">
      <div className="col">
        <div className="progress h-full">
          <div className={cn('progress-bar progress-bar-striped w-full p-6', BG_SHADE[band.bg])}>
            <h3 className={cn('mb-4', band.textColor && TEXT_SHADE[band.textColor])}>
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
    <div className="progress h-full">
      <div
        className={cn(
          'progress-bar w-full',
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
                    <i className={`${cell.icon} fa-xl`} aria-hidden="true" /> <br />
                  </>
                )}
                {cell.label}
              </strong>
            </p>
            <div className="progress h-full">
              <div
                className={cn(
                  'progress-bar w-full shadow-[var(--shadow-bs-lg)] py-2',
                  BG_SHADE[cell.sub.bg],
                  cell.sub.textColor && TEXT_SHADE[cell.sub.textColor]
                )}
              >
                <strong className="font-bold">
                  {cell.sub.icon && <i className={`${cell.sub.icon} fa-xl`} aria-hidden="true" />}{' '}
                  {cell.sub.label}
                </strong>
              </div>
            </div>
          </>
        ) : (
          <strong className={cn('font-bold', cell.padY === 5 ? 'py-12' : 'py-6')}>
            {cell.icon && (
              <>
                <i className={`${cell.icon} fa-xl`} aria-hidden="true" />
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
      <ul>
        {block.items.map((item, i) => (
          <li key={i}>
            {item.label && <strong>{item.label} </strong>}
            {item.body}
          </li>
        ))}
      </ul>
    )
  }

  const ListTag = block.numbered ? 'ol' : 'ul'
  return (
    <ListTag
      className={cn(
        'list-group',
        block.numbered && 'list-group-numbered',
        block.shadow && 'shadow-[var(--shadow-bs-lg)]'
      )}
    >
      {block.items.map((item, i) => (
        <li
          key={i}
          className={cn(
            'list-group-item flex justify-between items-start',
            item.bg && BG_LIGHT_25[item.bg]
          )}
        >
          <div className="ms-2 me-auto">
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
    <div className={cn('card', block.shadow && 'shadow-[var(--shadow-bs-lg)]')}>
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

function MetricStat({ metric }: { metric: ProjectMetric }) {
  return (
    <div className="col">
      <h4 className="result mb-0 display-5 fw-bolder">
        {metric.value}
        <small>
          <i
            className={`display-3 text-third fa-regular fa-long-arrow-${metric.direction}`}
            aria-hidden="true"
          />
        </small>
      </h4>
      <p className="result-label mt-0">{metric.label}</p>
    </div>
  )
}

function ModalContent({ project }: { project: Project }) {
  return (
    <>
      {/* Intro row: circular brief image + Project Brief / Contributions / Technology */}
      <div className="row mb-6">
        {project.brief.image && (
          <div className="col-24 col-lg-12 col-xl-10 self-center text-center">
            <p>
              <img
                loading="lazy"
                className="img-fluid shadow-[var(--shadow-bs-lg)] border border-white rounded-full"
                src={project.brief.image.src}
                alt={project.brief.image.alt}
              />
            </p>
          </div>
        )}
        <div className="col-24 col-lg-12 col-xl-14 self-center">
          {project.brief.paragraphs.length > 0 && (
            <>
              <h3>Project Brief:</h3>
              <hr className="solid-center" />
              {project.brief.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </>
          )}

          {project.contributions.length > 0 && (
            <>
              <h4>Contributions:</h4>
              <hr className="solid-center" />
              <BadgeList badges={project.contributions} />
            </>
          )}

          {project.technologies.length > 0 && (
            <>
              <h4 className="mt-6">Technology:</h4>
              <hr className="solid-center" />
              <BadgeList badges={project.technologies} />
            </>
          )}
        </div>
      </div>

      {renderMedia(project.media)}
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
function renderMedia(media: ProjectMedia[]) {
  const nodes: ReactNode[] = []
  for (let i = 0; i < media.length; i++) {
    const [b0, b1, b2, b3] = [media[i], media[i + 1], media[i + 2], media[i + 3]]
    if (b0.type === 'text' && b1?.type === 'styled-list' && b2?.type === 'text' && b3?.type === 'card') {
      nodes.push(
        <div className="row" key={i}>
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
      )
      i += 3
      continue
    }
    nodes.push(<MediaBlock key={i} block={b0} />)
  }
  return nodes
}
