import aiStudy from '@/docs/ai-chat-study.json'

// Auto-ported from the legacy modal HTML files (components/modal-*.html).
// Adding a project: add ONE object here (+ its images under /images).
// Removing a project: flip `visible` to false — data is retained.

export interface ProjectImage {
  src: string
  alt: string
}

export interface ProjectMetric {
  value: string
  direction?: 'up' | 'down'
  label: string
}

// Mirrors the six --color-* brand tokens in app/globals.css (prime/second/
// third/fourth/fifth/pop), each with a -light/-dark variant.
export type BrandToken = 'prime' | 'second' | 'third' | 'fourth' | 'fifth' | 'pop'

export interface StyledListItem {
  icon?: string
  label?: string
  body?: string
  bg?: BrandToken // per-item tint at 25% opacity; omit for a plain item
  subItems?: string[]
}

export interface StyledListBlock {
  type: 'styled-list'
  columns?: 3
  numbered?: boolean // list-group-numbered (roadmap) vs plain <ul> (reveal/wrong)
  shadow?: boolean // shadow-lg
  items: StyledListItem[]
}

export interface CardBlock {
  type: 'card'
  shadow?: boolean // shadow-lg
  header: string // card-header text
  rows: { label: string; body: string }[] // card-body label/text pairs
}

// Shade-qualified brand token for the progress diagrams. 'dark-subtle' is
// Bootstrap's gray (#ced4da, dentalplans band 1 container), black/white are
// the band-heading text colors — none of the three are brand tokens.
export type BrandShade =
  | BrandToken
  | `${BrandToken}-light`
  | `${BrandToken}-dark`
  | 'dark-subtle'
  | 'black'
  | 'white'

export interface ProgressCell {
  label: string
  bg: BrandShade
  textColor?: BrandShade // legacy text-fifth-dark etc.; omit = progress-bar default #fff
  icon?: string // FA Pro class, rendered above the label at fa-xl
  span?: number // 1–24 legacy col-N width; omit inside row-cols band grids
  striped?: boolean // default true (hydra); band grid cells are plain
  animated?: boolean // hydra's top "Consistent UX/UI" bar only
  padY?: 4 | 5 // legacy py-4 (default) / py-5; ignored when sub is set (p-3 box)
  // Nested child bar (dentalplans band 1: brand box → "Brand Theme").
  sub?: { icon?: string; label: string; bg: BrandShade; textColor?: BrandShade }
}

export interface ProgressRow {
  cells: ProgressCell[]
  cols?: 'auto' | number // row-cols-lg-N band grid; omit when cells carry spans
}

// dentalplans only: a striped full-width container bar with its own
// heading + icon, wrapping one or more grid rows of cells.
export interface ProgressBand {
  heading: string
  icon?: string
  bg: BrandShade
  textColor?: BrandShade
  rows: ProgressRow[]
}

export interface ProgressDiagramBlock {
  type: 'progress-diagram'
  heading?: string // "The System Framework" + hr solid-center
  showRule?: boolean // defaults true; false when a nearby composition already supplies the separation
  rows?: ProgressRow[] // flat variant (hydra)
  bands?: ProgressBand[] // banded variant (dentalplans) — exactly one of rows|bands
}

// Legacy two-column row (e.g. modal-hydra.html's "The Problem"/"Why Hydra?"
// rows, modal-product.html's alternating "Iteration N" rows): an image
// column beside a heading/paragraph column, sometimes reversed so the image
// sits on the right (flex-lg-row-reverse). Recurses into ProjectMedia so
// either side can hold more than one block without its own nested full-width
// row.
export interface SplitRowBlock {
  type: 'split-row'
  layout?: 'platform-overview' | 'product-iteration' | 'hydra-why'
  left: ProjectMedia[]
  right: ProjectMedia[]
  reverse?: boolean // maps legacy flex-lg-row-reverse (image sits right)
  leftSpan?: number // Bootstrap col-{breakpoint}-N, default 12
  rightSpan?: number // default 12
  leftSpanXl?: number // legacy col-xl-N, omit for no xl override
  rightSpanXl?: number // legacy col-xl-N, omit for no xl override
  breakpoint?: 'md' | 'lg' // legacy col-md-N vs col-lg-N, default 'lg'
  vAlign?: 'top' | 'center' | 'bottom' // legacy align-items-*, default 'top'
  hAlign?: 'start' | 'center' | 'between' | 'end' // legacy justify-content-*, default 'start'
  leftSelfAlign?: 'top' | 'center' | 'bottom' // legacy per-column align-self-*, overrides vAlign for left only
  rightSelfAlign?: 'top' | 'center' | 'bottom' // legacy per-column align-self-*, overrides vAlign for right only
  leftSurface?: boolean // opt-in reading card; prose columns are flat by default
  rightSurface?: boolean // opt-in reading card; prose columns are flat by default
  surface?: boolean // one shared surface around both columns
  mobileDivider?: boolean // legacy `col-24 py-5 d-block d-lg-none` hr between stacked columns, default false — most legacy rows have none
}

// Repeated icon+title tiles (hydra's Nomenclature grid: Elements/Controls/
// Components/Modules/Templates/Pages) — legacy's row-cols-2 grid of .card
// markup. Distinct from CardBlock (a single header+rows mockup card).
// Items carry exactly one of icon/image: `icon` renders the existing FA
// .card tile (hydra); `image` renders a plain circular photo + <h5> below
// it, matching legacy's photo-grid markup (workshops) — no .card wrapper.
export interface IconGridBlock {
  type: 'icon-grid'
  items: { icon?: string; image?: { src: string; alt: string }; title: string }[]
  cols?: number // row-cols-N, default 2
  colsLg?: number // row-cols-lg-N, optional
}

export type SupportingArtKind =
  | 'dental-platform'
  | 'dental-mvp-one'
  | 'dental-mvp-two'
  | 'dental-mvp-three'
  | 'dental-mvp-four'
  | 'hydra'
  | 'call-center'

export interface SupportingArtBlock {
  type: 'supporting-art'
  kind: SupportingArtKind
  alt: string
}

export type ProjectMedia =
  | {
      type: 'heading'
      text: string
      level?: 2 | 3 | 4 | 5
      icon?: string
      treatment?: 'section' | 'subsection'
      showRule?: boolean
      // legacy's `hr.my-5 -> icon -> h2 -> hr.my-5` section-break pattern
      // (col gets text-center, leading hr added, trailing hr gets my-12,
      // the usual mt-12 dropped since the leading hr supplies the gap)
      sectionDivider?: boolean
    }
  | { type: 'text'; text: string; variant?: 'note' }
  | { type: 'list'; items: string[] }
  | {
      type: 'image'
      src: string
      alt: string
      span?: number
      caption?: string
      shape?: 'rounded' | 'circle'
      flush?: boolean // true: no shadow, no rounding (raw) — baked-in-chrome UI screenshots
      widthPct?: 25 | 50 | 75 | 100 // legacy w-25/w-50/w-75/w-100, default 100
      bordered?: boolean // legacy `border border-light` -> border-white (see brief image)
    }
  | { type: 'image-pair'; desktop: ProjectImage; mobile: ProjectImage }
  | { type: 'image-row'; images: ProjectImage[]; cols: number[]; mobileDivider?: boolean } // default false, see SplitRowBlock.mobileDivider
  | { type: 'divider' } // legacy standalone `col-24.my-5 > hr.solid-center` row
  | {
      type: 'metric-grid'
      heading: string
      metrics: ProjectMetric[]
      valueCreated: { heading: string; items: string[] }
    }
  | StyledListBlock
  | CardBlock
  | ProgressDiagramBlock
  | SplitRowBlock
  | IconGridBlock
  | SupportingArtBlock
  | { type: 'call-center-states' }
  | { type: 'contributions' } // zero-config marker: renders project.contributions inline in media[]

export interface ProjectBadge {
  icon: string // FA Pro icon classes
  label: string
}

export type PortfolioDiscipline =
  | 'Product'
  | 'Systems'
  | 'UX Research'
  | 'Leadership'
  | 'Visual'
  | 'Brand'
  | 'Conversion Optimization'

export interface Project {
  id: string // stable slug, used by the modal
  title: string // section/card title (and thumb label)
  modalTitle?: string // legacy modal header title when it differs
  section: 'work' | 'visual-design'
  display: 'feature' | 'thumb' // editorial row vs thinking-thumb button
  disciplines: [PortfolioDiscipline, PortfolioDiscipline?]
  visible: boolean // false = removed from render, data retained
  order: number
  caseStudyTheme?: string // canonical editorial theme for featured case studies
  subtitle?: string // feature-card headline
  summary: string // feature-card summary
  introduction?: string[]
  role?: string
  collaboration?: string
  icon?: string // FA icon for work thumbs
  thumb?: ProjectImage // visual-design thumb background
  cardImage?: ProjectImage // feature-card image
  heroBrandImage?: ProjectImage // brand asset used by a modal hero instead of the thumbnail
  brief: { image?: ProjectImage; images?: ProjectImage[]; paragraphs: string[] }
  briefHeading?: string // legacy's custom h3 next to the brief image, default 'Project Brief:'
  briefLabels?: string[] // brief paragraphs rendered as standalone emphasized labels
  // Legacy ships two intro-row shapes. 'wide' (default) = plain `.row` with
  // image col-xl-10 / text col-xl-14. 'narrow' = `.row.justify-content-center`
  // with image col-24 col-xl-8 / text col-xl-10. Legacy used col-20 at the base
  // width here, but its own split-row circles are col-24 — that step-down was a
  // legacy inconsistency, not intent, so the base is normalized to col-24.
  briefVariant?: 'wide' | 'narrow'
  contributions: ProjectBadge[]
  // true when legacy interleaves the Contributions badges among the modal's
  // custom prose (reveal) rather than right after the brief — skips the
  // fixed post-brief slot so a `{ type: 'contributions' }` media block can
  // render them at the correct position instead.
  inlineContributions?: boolean
  heroMedia?: ProjectMedia[] // supporting prose/lists that belong inside the hero copy panel
  heroCards?: StyledListItem[] // full-width concept/information cards in the top hero
  heroCardsHeading?: string
  heroCardsIcon?: string
  media: ProjectMedia[] // preserves the legacy modal section order
}

export const projects: Project[] = [
  {
    id: 'ai-chat', section: 'work', display: 'feature', visible: true, order: 6,
    disciplines: ['Product', 'UX Research'], title: aiStudy.identity,
    modalTitle: aiStudy.title, subtitle: aiStudy.title, summary: aiStudy.summary,
    caseStudyTheme: aiStudy.theme, icon: 'fa-thin fa-brain',
    briefHeading: aiStudy.title, brief: { paragraphs: [aiStudy.heroSummary] },
    contributions: [{ icon: 'fa-thin fa-cube', label: 'Product' }, { icon: 'fa-thin fa-brain', label: 'UX Research' }],
    media: [],
  },
  {
    id: 'webmd',
    section: 'work',
    display: 'feature',
    disciplines: ['Product', 'Conversion Optimization'],
    order: 1,
    caseStudyTheme: 'Speed to Market',
    title: 'WebMD',
    subtitle: 'Trust Meets Commerce',
    cardImage: { src: '/images/work/WebMD-HM.png', alt: 'WebMD eCommerce website' },
    summary: "WebMD had the audience. DentalPlans had the plans. I joined them in one path from health research to checkout.",
    visible: true,
    briefHeading: 'From Campaign to Commerce',
    brief: {
      "image": {
        "src": "/images/work/webmd-modal/brief-2.png",
        "alt": ""
      },
      "paragraphs": [
        "When WebMD and DentalPlans.com became part of Internet Brands, we had a new route to customers. People were already visiting WebMD to understand a health or dental concern. We could connect a relevant dental need with a way to act on it."
      ]
    },
    introduction: [
      "This strategy put a dental savings experience in that path. People could move from researching care to comparing plans, finding a dentist, and purchasing."
    ],
    role: "Product design, UX strategy, prototyping and front-end implementation",
    contributions: [
      {
        "icon": "fa-thin fa-pen-ruler",
        "label": "Product Design"
      },
      {
        "icon": "fa-thin fa-lightbulb",
        "label": "UX Strategy"
      },
      {
        "icon": "fa-thin fa-ruler-triangle",
        "label": "Prototyping"
      },
      {
        "icon": "fa-thin fa-user-check",
        "label": "Front-end / Implementation"
      }
    ],
    media: [
      {
        "type": "heading",
        "text": "The Strategy",
        "level": 3,
        "icon": "fa-thin fa-lightbulb"
      },
      {
        "type": "text",
        "text": "The entry point mattered. A person researching a dental need had a different question from someone already choosing a plan. I shaped the journey around the decision they were ready to make."
      },
      {
        "type": "styled-list",
        "items": [
          {
            "icon": "fa-thin fa-magnifying-glass",
            "label": "Intent",
            "body": "Start with people already researching a relevant dental need."
          },
          {
            "icon": "fa-thin fa-lightbulb",
            "label": "Relevance",
            "body": "Introduce DentalPlans as a solution when it matched what the customer was trying to accomplish."
          },
          {
            "icon": "fa-thin fa-cart-shopping",
            "label": "Commerce",
            "body": "Create a clear path from learning to comparing plans, finding a dentist, and purchasing."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Recognize Intent",
        "level": 3,
        "icon": "fa-thin fa-magnifying-glass"
      },
      {
        "type": "text",
        "text": "The homepage introduced dental savings and gave visitors a way to start looking. It needed to answer a basic question before asking for a purchase: is this relevant to the care I need?"
      },
      {
        "type": "image-pair",
        "desktop": {
          "src": "/images/work/webmd-modal/home-dt.png",
          "alt": "WebMD dental savings homepage, desktop"
        },
        "mobile": {
          "src": "/images/work/webmd-modal/home-mb.png",
          "alt": "WebMD dental savings homepage, mobile"
        }
      },
      {
        "type": "heading",
        "text": "Support the Decision",
        "level": 3,
        "icon": "fa-thin fa-list-check"
      },
      {
        "type": "text",
        "text": "Choosing a plan meant answering more than a pricing question. Customers also needed to know which dentists participated."
      },
      {
        "type": "text",
        "text": "Plan search, comparison, and detail pages let people examine their options. Dentist search kept the provider question inside the same journey."
      },
      {
        "type": "heading",
        "text": "Plan Search Results",
        "level": 4
      },
      {
        "type": "image-pair",
        "desktop": {
          "src": "/images/work/webmd-modal/plan-search-dt.png",
          "alt": "WebMD plan search results, desktop"
        },
        "mobile": {
          "src": "/images/work/webmd-modal/plan-search-mb.png",
          "alt": "WebMD plan search results, mobile"
        }
      },
      {
        "type": "heading",
        "text": "Plan Compare",
        "level": 4
      },
      {
        "type": "image-pair",
        "desktop": {
          "src": "/images/work/webmd-modal/plan-compare-dt.png",
          "alt": "WebMD plan comparison view, desktop"
        },
        "mobile": {
          "src": "/images/work/webmd-modal/plan-compare-mb.png",
          "alt": "WebMD plan comparison view, mobile"
        }
      },
      {
        "type": "heading",
        "text": "Plan Details",
        "level": 4
      },
      {
        "type": "image-pair",
        "desktop": {
          "src": "/images/work/webmd-modal/plan-details-dt.png",
          "alt": "WebMD plan details page, desktop"
        },
        "mobile": {
          "src": "/images/work/webmd-modal/plan-details-mb.png",
          "alt": "WebMD plan details page, mobile"
        }
      },
      {
        "type": "heading",
        "text": "Dentist Search Results",
        "level": 4
      },
      {
        "type": "image-pair",
        "desktop": {
          "src": "/images/work/webmd-modal/dentist-search-dt.png",
          "alt": "WebMD dentist search results, desktop"
        },
        "mobile": {
          "src": "/images/work/webmd-modal/dentist-search-mb.png",
          "alt": "WebMD dentist search results, mobile"
        }
      },
      {
        "type": "heading",
        "text": "Move to Action",
        "level": 3,
        "icon": "fa-thin fa-cart-shopping"
      },
      {
        "type": "text",
        "text": "The dentist profile gave people a specific provider to review. Cart and checkout then took the selected plan through purchase."
      },
      {
        "type": "heading",
        "text": "Dentist Details",
        "level": 4
      },
      {
        "type": "image-pair",
        "desktop": {
          "src": "/images/work/webmd-modal/dentist-profile-dt.png",
          "alt": "WebMD dentist profile page, desktop"
        },
        "mobile": {
          "src": "/images/work/webmd-modal/dentist-profile-mb.png",
          "alt": "WebMD dentist profile page, mobile"
        }
      },
      {
        "type": "heading",
        "text": "Cart",
        "level": 4
      },
      {
        "type": "image-pair",
        "desktop": {
          "src": "/images/work/webmd-modal/cart-dt.png",
          "alt": "WebMD shopping cart and checkout, desktop"
        },
        "mobile": {
          "src": "/images/work/webmd-modal/cart-mb.png",
          "alt": "WebMD shopping cart and checkout, mobile"
        }
      },
      {
        "type": "heading",
        "text": "From design to revenue",
        "level": 3,
        "icon": "fa-thin fa-chart-line"
      },
      {
        "type": "text",
        "text": "I wireframed and designed the site in two weeks. It was complete and live when the Director of Online Marketing returned."
      },
      {
        "type": "text",
        "text": "The following two weeks covered campaign wrap-up and launch work with the Director of Online Marketing and SVP of Marketing. The site generated revenue from day one."
      }
    ]
  },
  {
    id: 'dentalplans',
    section: 'work',
    display: 'feature',
    disciplines: ['Systems', 'Product'],
    order: 2,
    caseStudyTheme: 'Building for Scale',
    title: 'DentalPlans.com',
    subtitle: "This is how you scale",
    cardImage: {
      src: '/images/work/dpprod-modal/dpprod-hm.png',
      alt: 'DentalPlans product framework'
    },
    summary: "One storefront became five branded properties. A shared platform cut launch time from six weeks to two.",
    modalTitle: 'Product Framework and Design System',
    visible: true,
    briefHeading: 'How Fast Can You Stand Up a Website?',
    brief: {
      "image": {
        "src": "/images/work/dpprod-modal/brief.png",
        "alt": ""
      },
      "paragraphs": [
        "It started with a small request: “You know WordPress, right? How fast can you stand up a website?”"
      ]
    },
    introduction: [
      "The first storefront tested whether customers would buy through a focused brand experience. They did. More sites were now on the table, along with every manual update the first one needed.",
      "I owned the roadmap for the shared commerce framework that followed. Each release removed a piece of repeated work and left a capability the next property could use."
    ],
    role: "Product ownership, UX/UI design and front-end development",
    collaboration: "Engineering",
    contributions: [
      { icon: 'fa-thin fa-boxes-stacked', label: 'Product Ownership' },
      { icon: 'fa-thin fa-layer-group', label: 'Design Systems' },
      { icon: 'fa-thin fa-pen-ruler', label: 'UX & UI Design' },
      { icon: 'fa-thin fa-laptop-code', label: 'Front-end Development' },
    ],
    media: [
      {
        "type": "metric-grid",
        "heading": "What the properties produced",
        "metrics": [
          {
            "value": "47%",
            "label": "of company revenue growth"
          },
          {
            "value": "20%",
            "label": "of overall company revenue"
          },
          {
            "value": "27%",
            "label": "of total company lead capture"
          },
          {
            "value": "6 to 2",
            "label": "weeks to launch a property",
            "direction": "down"
          }
        ],
        "valueCreated": {
          "heading": "What changed",
          "items": [
            "Five branded properties shared the framework.",
            "Each brand kept its own identity.",
            "Product information and promotions could be reused.",
            "The company owned the custom platform."
          ]
        }
      },
      {
        "type": "text",
        "text": "Finance attributed the revenue and lead-capture shares to the properties in one measured year. The 47% is a share of that year’s revenue-growth increment. Launch time is per property.",
        "variant": "note"
      },
      {
        "type": "progress-diagram",
        "heading": "How the platform fit together",
        "bands": [
          {
            "heading": "Partner storefront examples",
            "icon": "fa-thin fa-box",
            "bg": "dark-subtle",
            "textColor": "black",
            "rows": [
              {
                "cols": 4,
                "cells": [
                  {
                    "label": "Cigna",
                    "icon": "fa-thin fa-box",
                    "bg": "second",
                    "striped": false,
                    "sub": {
                      "icon": "fa-thin fa-palette",
                      "label": "Brand Theme",
                      "bg": "second-light",
                      "textColor": "second-dark"
                    }
                  },
                  {
                    "label": "Aetna",
                    "icon": "fa-thin fa-box",
                    "bg": "prime",
                    "striped": false,
                    "sub": {
                      "icon": "fa-thin fa-palette",
                      "label": "Brand Theme",
                      "bg": "prime-light",
                      "textColor": "prime-dark"
                    }
                  },
                  {
                    "label": "WebMD",
                    "icon": "fa-thin fa-box",
                    "bg": "third",
                    "striped": false,
                    "sub": {
                      "icon": "fa-thin fa-palette",
                      "label": "Brand Theme",
                      "bg": "third-light",
                      "textColor": "third-dark"
                    }
                  },
                  {
                    "label": "Partner storefront",
                    "icon": "fa-thin fa-box",
                    "bg": "fourth",
                    "striped": false,
                    "sub": {
                      "icon": "fa-thin fa-palette",
                      "label": "Brand Theme",
                      "bg": "fourth-light",
                      "textColor": "fourth-dark"
                    }
                  }
                ]
              }
            ]
          },
          {
            "heading": "Core Framework",
            "icon": "fa-thin fa-boxes-stacked",
            "bg": "fifth-dark",
            "textColor": "white",
            "rows": [
              {
                "cols": 3,
                "cells": [
                  {
                    "label": "API Integration",
                    "icon": "fa-thin fa-webhook",
                    "bg": "fifth-light",
                    "textColor": "fifth-dark",
                    "striped": false
                  },
                  {
                    "label": "Component Libraries",
                    "icon": "fa-thin fa-square-code",
                    "bg": "fifth-light",
                    "textColor": "fifth-dark",
                    "striped": false
                  },
                  {
                    "label": "Pattern Library",
                    "icon": "fa-thin fa-layer-group",
                    "bg": "fifth-light",
                    "textColor": "fifth-dark",
                    "striped": false
                  },
                  {
                    "label": "CMS",
                    "icon": "fa-brands fa-wordpress-simple",
                    "bg": "fifth-light",
                    "textColor": "fifth-dark",
                    "striped": false
                  },
                  {
                    "label": "Pipelines",
                    "icon": "fa-thin fa-gear-code",
                    "bg": "fifth-light",
                    "textColor": "fifth-dark",
                    "striped": false
                  },
                  {
                    "label": "Documentation",
                    "icon": "fa-thin fa-book",
                    "bg": "fifth-light",
                    "textColor": "fifth-dark",
                    "striped": false
                  }
                ]
              }
            ]
          },
          {
            "heading": "Microservices",
            "icon": "fa-thin fa-webhook",
            "bg": "fifth-light",
            "textColor": "fifth-dark",
            "rows": [
              {
                "cols": 5,
                "cells": [
                  {
                    "label": "Plan Details",
                    "icon": "fa-thin fa-webhook",
                    "bg": "fifth",
                    "striped": false
                  },
                  {
                    "label": "Dentist Search",
                    "icon": "fa-thin fa-webhook",
                    "bg": "fifth",
                    "striped": false
                  },
                  {
                    "label": "Lead Create",
                    "icon": "fa-thin fa-webhook",
                    "bg": "fifth",
                    "striped": false
                  },
                  {
                    "label": "Call Center Status",
                    "icon": "fa-thin fa-headset",
                    "bg": "fifth",
                    "striped": false
                  },
                  {
                    "label": "Google Maps (API)",
                    "icon": "fa-thin fa-webhook",
                    "bg": "fifth",
                    "striped": false
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "split-row",
        "layout": "platform-overview",
        "surface": true,
        "left": [
          {
            "type": "supporting-art",
            "kind": "dental-platform",
            "alt": "Shared ecommerce platform: plan data, dentist data, search and APIs, microservices, promotions, and deployment."
          }
        ],
        "leftSpanXl": 10,
        "rightSpanXl": 14,
        "rightSelfAlign": "center",
        "rightSurface": true,
        "right": [
          {
            "type": "heading",
            "text": "Work the next site could reuse",
            "level": 3
          },
          {
            "type": "list",
            "items": [
              "Shared interface patterns and components",
              "Brand identity kept separate from the application",
              "Product information, dentist search, and cart services",
              "Scheduled offers and expiry",
              "Source attribution across acquisition channels",
              "Documentation for designers and developers",
              "Deployment for one property or all of them"
            ]
          }
        ]
      },
      {
        "type": "split-row",
        "reverse": true,
        "layout": "product-iteration",
        "left": [
          {
            "type": "supporting-art",
            "kind": "dental-mvp-one",
            "alt": "Initial MVP joining a WordPress storefront with manually added plans, a Bootstrap interface, and cart."
          }
        ],
        "leftSpanXl": 10,
        "rightSpanXl": 14,
        "rightSelfAlign": "center",
        "right": [
          {
            "type": "heading",
            "text": "Start with one storefront",
            "level": 3
          },
          {
            "type": "text",
            "text": "We began with a single-product flow. Engineering built the service that passed the product into the existing cart. I designed the storefront with room for other products and brands."
          },
          {
            "type": "text",
            "text": "The first site sold, and leadership asked for a second. That gave the next release a reason to exist."
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "split-row",
        "layout": "product-iteration",
        "left": [
          {
            "type": "supporting-art",
            "kind": "dental-mvp-two",
            "alt": "Iteration two adding multi-brand storefronts, shared plan data, and a shared cart to the MVP platform."
          }
        ],
        "leftSpanXl": 10,
        "rightSpanXl": 14,
        "rightSelfAlign": "center",
        "right": [
          {
            "type": "heading",
            "text": "Carry the brand through checkout",
            "level": 3
          },
          {
            "type": "text",
            "text": "The second site needed its identity to continue into the cart. We added a cart that could take each brand’s treatment and services for shared product information."
          },
          {
            "type": "text",
            "text": "Common components could be used in landing pages and purchase flows. Testing a variant no longer meant rebuilding every part of it."
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "split-row",
        "reverse": true,
        "layout": "product-iteration",
        "left": [
          {
            "type": "supporting-art",
            "kind": "dental-mvp-three",
            "alt": "Iteration three adding shared patterns, components, microservices, and properties to a platform now serving five brands."
          }
        ],
        "leftSpanXl": 10,
        "rightSpanXl": 14,
        "rightSelfAlign": "center",
        "right": [
          {
            "type": "heading",
            "text": "Let every property inherit the update",
            "level": 3
          },
          {
            "type": "text",
            "text": "Product information moved into shared services. When engineering added or changed data, every property could use it. The interfaces used common patterns to present it."
          },
          {
            "type": "text",
            "text": "Acquisition work continued alongside the platform: landing pages, content for organic search, and tests across the purchase flow."
          }
        ]
      },
      {
        "type": "divider"
      },
      {
        "type": "split-row",
        "layout": "product-iteration",
        "left": [
          {
            "type": "supporting-art",
            "kind": "dental-mvp-four",
            "alt": "Iteration four adding ZIP search, results, and dentist profiles to the five-brand platform built in the first three releases."
          }
        ],
        "leftSpanXl": 10,
        "rightSpanXl": 14,
        "rightSelfAlign": "center",
        "right": [
          {
            "type": "heading",
            "text": "Add dentist search without starting over",
            "level": 3
          },
          {
            "type": "text",
            "text": "I designed and built the dentist-search interface from the existing patterns and components. The platform could take another customer task without needing another set of interface conventions."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Who built what",
        "level": 3
      },
      {
        "type": "text",
        "text": "A part-time engineer and I built and maintained the core framework and its enhancements. Other designers launched the branded properties. Internal engineering built the microservices and APIs the framework connected to."
      }
    ]
  },
  {
    id: 'bumblebeemd',
    section: 'work',
    display: 'feature',
    disciplines: ['Systems', 'Brand'],
    order: 3,
    caseStudyTheme: 'Reuse by Design',
    title: 'BumblebeeMD',
    subtitle: "Avoiding a sticky situation",
    cardImage: { src: '/images/work/BMD-HM.png', alt: 'BumblebeeMD brand' },
    summary: "A shared commerce platform gave us more room to shape BumblebeeMD’s brand and experience.",
    modalTitle: 'BumblebeeMD',
    visible: true,
    briefHeading: 'The Platform Got Out of the Way',
    brief: {
      "image": {
        "src": "/images/work/bmd-modal/brief.png",
        "alt": ""
      },
      "paragraphs": [
        "BumblebeeMD needed to feel like its own digital health brand. Reusing the platform did not settle the visual decisions."
      ]
    },
    introduction: [
      "We worked through the homepage, content pages, and the smaller interface details, including buttons, inputs, and icons. Shared commerce patterns gave that work a foundation."
    ],
    role: "Product design, prototyping and design leadership",
    contributions: [
      {
        "icon": "fa-thin fa-pen-ruler",
        "label": "Product Design"
      },
      {
        "icon": "fa-thin fa-lightbulb",
        "label": "Design Leadership"
      },
      {
        "icon": "fa-thin fa-ruler-triangle",
        "label": "Prototyping"
      }
    ],
    media: [
      {
        "type": "heading",
        "text": "The first impression",
        "level": 3
      },
      {
        "type": "text",
        "text": "The homepage brought the brand into the customer’s first view of the product. Layout, imagery, and the interface treatment needed to work together on desktop and mobile."
      },
      {
        "type": "split-row",
        "left": [
          {
            "type": "image",
            "src": "/images/work/bmd-modal/home-dt.png",
            "alt": "BumblebeeMD homepage, desktop"
          },
          {
            "type": "image",
            "src": "/images/work/bmd-modal/gran-ma-w.png",
            "alt": "BumblebeeMD homepage lifestyle photography",
            "flush": true
          }
        ],
        "right": [
          {
            "type": "image",
            "src": "/images/work/bmd-modal/home-mb.png",
            "alt": "BumblebeeMD Homepage Mobile"
          }
        ],
        "leftSpan": 18,
        "rightSpan": 6
      },
      {
        "type": "heading",
        "text": "A brand beyond the homepage",
        "level": 3
      },
      {
        "type": "text",
        "text": "Content pages needed the same attention. The brand had to remain recognizable as people moved further into the experience."
      },
      {
        "type": "split-row",
        "left": [
          {
            "type": "image",
            "src": "/images/work/bmd-modal/content-dt.png",
            "alt": "BumblebeeMD content page, desktop"
          },
          {
            "type": "image",
            "src": "/images/work/bmd-modal/family.png",
            "alt": "BumblebeeMD family lifestyle photography",
            "flush": true
          }
        ],
        "right": [
          {
            "type": "image",
            "src": "/images/work/bmd-modal/content-mb.png",
            "alt": "BumblebeeMD content page, mobile"
          }
        ],
        "leftSpan": 18,
        "rightSpan": 6
      },
      {
        "type": "heading",
        "text": "The details people use",
        "level": 3
      },
      {
        "type": "text",
        "text": "Buttons, inputs, and icons carried the visual language into the working interface. These were the parts people would meet repeatedly."
      },
      {
        "type": "split-row",
        "left": [
          {
            "type": "heading",
            "text": "Buttons"
          },
          {
            "type": "image",
            "src": "/images/work/bmd-modal/buttons.png",
            "alt": "BumblebeeMD button component styles",
            "flush": true
          }
        ],
        "right": [
          {
            "type": "heading",
            "text": "Inputs"
          },
          {
            "type": "image",
            "src": "/images/work/bmd-modal/inputs.png",
            "alt": "BumblebeeMD form input component styles",
            "flush": true
          }
        ],
        "leftSpan": 12,
        "rightSpan": 12
      },
      {
        "type": "heading",
        "text": "Icons"
      },
      {
        "type": "split-row",
        "left": [
          {
            "type": "image",
            "src": "/images/work/bmd-modal/icons-01.png",
            "alt": "BumblebeeMD icon designs, first sheet",
            "flush": true
          }
        ],
        "right": [
          {
            "type": "image",
            "src": "/images/work/bmd-modal/icons-02.png",
            "alt": "BumblebeeMD icon designs, second sheet",
            "flush": true
          }
        ],
        "leftSpan": 12,
        "rightSpan": 12
      },
      {
        "type": "heading",
        "text": "Image Treatments"
      },
      {
        "type": "image",
        "src": "/images/work/bmd-modal/images.png",
        "alt": "BumblebeeMD image treatments",
        "flush": true
      },
      {
        "type": "heading",
        "text": "\"Buy Box\" Treatments"
      },
      {
        "type": "image",
        "src": "/images/work/bmd-modal/buy-box.png",
        "alt": "BumblebeeMD plan-selection boxes",
        "flush": true
      },
      {
        "type": "heading",
        "text": "Wireframes"
      },
      {
        "type": "image-pair",
        "desktop": {
          "src": "/images/work/bmd-modal/home-wf-dt.png",
          "alt": "BumblebeeMD homepage wireframe, desktop"
        },
        "mobile": {
          "src": "/images/work/bmd-modal/home-wf-mb.png",
          "alt": "BumblebeeMD homepage wireframe, mobile"
        }
      }
    ]
  },
  {
    id: 'hydra',
    section: 'work',
    display: 'feature',
    disciplines: ['Systems', 'Product'],
    order: 4,
    caseStudyTheme: 'A Shared Language',
    title: 'Hydra',
    subtitle: 'Failure to Communicate',
    cardImage: { src: '/images/work/hydra/hydra-hm.png', alt: 'Hydra design system' },
    summary: "One interface. Several interpretations. I built a shared vocabulary and reusable components for product, marketing and engineering.",
    modalTitle: 'Hydra Design System',
    visible: true,
    briefHeading: 'Three Teams. One Vocabulary.',
    brief: {
      "image": {
        "src": "/images/work/hydra/brief.png",
        "alt": ""
      },
      "paragraphs": [
        "The adoption constraint mattered. A shared interface could not depend on replacing the applications underneath it."
      ]
    },
    introduction: [
      "I secured executive backing for Hydra and kept the changes in the front end. Product, marketing, and engineering could work from the same patterns across brands and back-end codebases."
    ],
    role: "Design system leadership, systems analysis and UI engineering",
    collaboration: "Product, marketing and engineering",
    contributions: [
      { icon: 'fa-thin fa-layer-group', label: 'Design Systems' },
      { icon: 'fa-thin fa-lightbulb', label: 'Design Leadership' },
      { icon: 'fa-thin fa-magnifying-glass-chart', label: 'Systems Analysis' },
      { icon: 'fa-thin fa-laptop-code', label: 'UI Engineering' },
    ],
    media: [
      {
        "type": "split-row",
        "left": [
          {
            "type": "heading",
            "text": "Eight ways to draw a button",
            "level": 3
          },
          {
            "type": "text",
            "text": "There were eight button treatments across the product. Error messages had their own variations in copy and presentation. The same action could look different from one part of the experience to the next."
          },
          {
            "type": "text",
            "text": "Every variant became another thing to design, build, and maintain."
          }
        ],
        "right": [
          {
            "type": "image",
            "src": "/images/work/hydra/ui-rag.png",
            "alt": "Eight inconsistent button treatments across products",
            "caption": "UX/UI Fragmentation: Button Treatments",
            "flush": true
          }
        ],
        "leftSpan": 14,
        "rightSpan": 10,
        "vAlign": "center"
      },
      {
        "type": "split-row",
        "left": [
          {
            "type": "image",
            "src": "/images/work/hydra/error-01.png",
            "alt": "Inconsistent error message and input field treatments, first set",
            "caption": "UX/UI Fragmentation: Error and Input Treatments (1 of 2)",
            "flush": true
          }
        ],
        "right": [
          {
            "type": "image",
            "src": "/images/work/hydra/error-02.png",
            "alt": "Inconsistent error message and input field treatments, second set",
            "caption": "UX/UI Fragmentation: Error and Input Treatments (2 of 2)",
            "flush": true
          }
        ],
        "leftSpan": 12,
        "rightSpan": 12,
        "breakpoint": "md"
      },
      {
        "type": "split-row",
        "left": [
          {
            "type": "heading",
            "text": "Give the components names people can share",
            "level": 3
          },
          {
            "type": "text",
            "text": "I defined the interface patterns and a vocabulary designers and engineers could both use. Elements, controls, components, modules, templates, and pages described how the system fit together."
          }
        ],
        "right": [
          {
            "type": "text",
            "text": "Nomenclature"
          },
          {
            "type": "icon-grid",
            "items": [
              {
                "icon": "fa-thin fa-image",
                "title": "Elements"
              },
              {
                "icon": "fa-thin fa-toggle-on",
                "title": "Controls"
              },
              {
                "icon": "fa-thin fa-sliders",
                "title": "Components"
              },
              {
                "icon": "fa-thin fa-sidebar",
                "title": "Modules"
              },
              {
                "icon": "fa-thin fa-table-layout",
                "title": "Templates"
              },
              {
                "icon": "fa-thin fa-browsers",
                "title": "Pages"
              }
            ]
          }
        ],
        "leftSpan": 12,
        "rightSpan": 12,
        "leftSpanXl": 11,
        "rightSpanXl": 11,
        "vAlign": "center",
        "hAlign": "center"
      },
      {
        "type": "heading",
        "text": "Keep the applications, share the interface",
        "level": 3
      },
      {
        "type": "text",
        "text": "The changes stayed in the front-end markup. Applications could adopt the interface without replacing their functional back-end code."
      },
      {
        "type": "text",
        "text": "Variables controlled color, type, and treatment for each brand. Core patterns stayed shared, and applications could take design-system updates independently."
      },
      {
        "type": "progress-diagram",
        "heading": "The System Framework",
        "rows": [
          {
            "cells": [
              {
                "label": "Consistent UX/UI",
                "bg": "third",
                "animated": true,
                "span": 24
              }
            ]
          },
          {
            "cells": [
              {
                "label": "App One",
                "bg": "prime",
                "span": 6
              },
              {
                "label": "App Two",
                "bg": "prime",
                "span": 6
              },
              {
                "label": "Main Website",
                "bg": "prime",
                "span": 6
              },
              {
                "label": "Sub Website",
                "bg": "second",
                "span": 6
              }
            ]
          },
          {
            "cells": [
              {
                "label": "Main Brand",
                "bg": "prime",
                "span": 18
              },
              {
                "label": "Sub Brand",
                "bg": "second",
                "span": 6
              }
            ]
          },
          {
            "cells": [
              {
                "label": "Design System",
                "bg": "fourth-light",
                "span": 24
              }
            ]
          },
          {
            "cells": [
              {
                "label": "C#",
                "bg": "fourth",
                "span": 12,
                "padY": 5
              },
              {
                "label": "PHP",
                "bg": "fourth-dark",
                "span": 12,
                "padY": 5
              }
            ]
          }
        ]
      },
      {
        "type": "heading",
        "text": "UI Elements"
      },
      {
        "type": "split-row",
        "left": [
          {
            "type": "image",
            "src": "/images/work/hydra/hydra-ui-01.png",
            "alt": "Hydra interface elements, first sheet",
            "flush": true
          }
        ],
        "right": [
          {
            "type": "image",
            "src": "/images/work/hydra/hydra-ui-02.png",
            "alt": "Hydra interface elements, second sheet",
            "flush": true
          }
        ],
        "leftSpan": 12,
        "rightSpan": 12
      },
      {
        "type": "heading",
        "text": "What the system left behind",
        "level": 3
      },
      {
        "type": "text",
        "text": "Work that had taken two sprints could land in one. The product later ran for about a year without a dedicated design resource."
      },
      {
        "type": "heading",
        "text": "Why Hydra?"
      },
      {
        "type": "split-row",
        "left": [
          {
            "type": "supporting-art",
            "kind": "hydra",
            "alt": "Hydra connecting shared interface patterns and components across brands and technology stacks."
          }
        ],
        "right": [
          {
            "type": "text",
            "text": "Hydra had many heads and one body. The shared patterns served several products and brands."
          }
        ],
        "leftSpan": 8,
        "rightSpan": 16,
        "layout": "hydra-why",
        "surface": true,
        "vAlign": "center",
        "hAlign": "center"
      }
    ]
  },
  {
    id: 'opfred',
    section: 'work',
    display: 'feature',
    disciplines: ['Product', 'UX Research'],
    order: 5,
    caseStudyTheme: 'Behavior Into Decisions',
    title: 'One Park Financial',
    subtitle: "Reading the tea leaves",
    cardImage: {
      src: '/images/work/opf-modal/brief.png',
      alt: 'One Park Financial corporate website'
    },
    summary: "Visitor behavior, heat maps and scroll maps shaped a website built to help customers take the next step.",
    visible: true,
    briefHeading: 'The Funnel Was Talking',
    brief: {
      "image": {
        "src": "/images/work/opf-modal/brief-2.png",
        "alt": ""
      },
      "paragraphs": [
        "The work extended beyond the corporate website. I owned the design process and usability-testing practice, and worked across paid search, organic search, and affiliate channels on conversion strategy."
      ]
    },
    introduction: [
      "The redesign brought that work into the website and lead flow. Hydra supplied the interface patterns.",
      "The brand promised a partner invested in helping the customer grow. I wanted that promise to show up in the language, the explanation of the service and the next action."
    ],
    role: "Product design, user research, prototyping and design leadership",
    contributions: [
      { icon: 'fa-thin fa-pen-ruler', label: 'Product Design' },
      { icon: 'fa-thin fa-magnifying-glass-chart', label: 'User Research' },
      { icon: 'fa-thin fa-ruler-triangle', label: 'Prototyping' },
      { icon: 'fa-thin fa-lightbulb', label: 'Design Leadership' },
    ],
    media: [
      {
        "type": "heading",
        "text": "Examine the entry point",
        "level": 3
      },
      {
        "type": "styled-list",
        "columns": 3,
        "items": [
          {
            "icon": "fa-thin fa-magnifying-glass-chart",
            "label": "Find where to look",
            "body": "I used visitor behavior and device performance to decide where to investigate. The website and lead flow gave me a connected view of the customer’s next step."
          },
          {
            "icon": "fa-thin fa-eye",
            "label": "Evaluate the page",
            "body": "I used a heuristic evaluation to review hierarchy, language and the path to action. Heat maps and scroll maps helped me examine what people clicked and how far they moved through the page."
          },
          {
            "icon": "fa-thin fa-arrow-pointer",
            "label": "Design for a quick read",
            "body": "I worked on the layout for clicking, scrolling and skimming. Shorter copy, visual groupings and clearer actions gave each section a job."
          }
        ]
      },
      {
        "type": "split-row",
        "left": [
          {
            "type": "text",
            "text": "Before"
          },
          {
            "type": "image",
            "src": "/images/work/opf-modal/brief-befor.png",
            "alt": "One Park Financial homepage, before redesign"
          }
        ],
        "right": [
          {
            "type": "text",
            "text": "After"
          },
          {
            "type": "image",
            "src": "/images/work/opf-modal/brief.png",
            "alt": "One Park Financial homepage, after redesign"
          }
        ],
        "leftSpan": 12,
        "rightSpan": 12,
        "breakpoint": "md"
      },
      {
        "type": "styled-list",
        "columns": 3,
        "items": [
          {
            "icon": "fa-thin fa-arrow-pointer",
            "label": "Make the action stand out",
            "body": "The original homepage already offered funding. The revision gave the main action a larger, rounded blue button against the green hero and made the phone number a separate header control."
          },
          {
            "icon": "fa-thin fa-table-columns",
            "label": "Give benefits room",
            "body": "The three benefits kept their icons but moved into separated cards with more space. Sentence-case labels replaced the all-capital treatment, and the funding promise remained near the action."
          },
          {
            "icon": "fa-thin fa-shield-check",
            "label": "Keep reassurance close",
            "body": "Both versions placed trust marks near the funding message. The redesign carried those signals into the new hero, alongside the action and benefit cards."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Explain the service",
        "level": 3
      },
      {
        "type": "text",
        "text": "The How It Works and About Us pages were part of the same experience. I reviewed them alongside the homepage and lead flow."
      },
      {
        "type": "heading",
        "text": "How It Works"
      },
      {
        "type": "split-row",
        "left": [
          {
            "type": "text",
            "text": "Before"
          },
          {
            "type": "image",
            "src": "/images/work/opf-modal/hiw-before.png",
            "alt": "One Park Financial How It Works page, before redesign"
          }
        ],
        "right": [
          {
            "type": "text",
            "text": "After"
          },
          {
            "type": "image",
            "src": "/images/work/opf-modal/hiw.png",
            "alt": "One Park Financial How It Works page, after redesign"
          }
        ],
        "leftSpan": 12,
        "rightSpan": 12
      },
      {
        "type": "heading",
        "text": "About Us"
      },
      {
        "type": "split-row",
        "left": [
          {
            "type": "text",
            "text": "Before"
          },
          {
            "type": "image",
            "src": "/images/work/opf-modal/about-us-before.png",
            "alt": "One Park Financial About Us page, before redesign"
          }
        ],
        "right": [
          {
            "type": "text",
            "text": "After"
          },
          {
            "type": "image",
            "src": "/images/work/opf-modal/about.png",
            "alt": "One Park Financial About Us page, after redesign"
          }
        ],
        "leftSpan": 12,
        "rightSpan": 12
      },
      {
        "type": "heading",
        "text": "Carry the experience into the next step",
        "level": 3
      },
      {
        "type": "text",
        "text": "The process module and responsive homepage show how the design was applied across the website. The shared system behind those interfaces is covered in the Hydra case study."
      },
      {
        "type": "heading",
        "text": "Module: Our Process"
      },
      {
        "type": "split-row",
        "left": [
          {
            "type": "text",
            "text": "Before"
          },
          {
            "type": "image",
            "src": "/images/work/opf-modal/mod-proc-before.png",
            "alt": "One Park Financial Our Process module, before redesign"
          }
        ],
        "right": [
          {
            "type": "text",
            "text": "After"
          },
          {
            "type": "image",
            "src": "/images/work/opf-modal/mod-proc-after.png",
            "alt": "One Park Financial Our Process module, after redesign"
          }
        ],
        "leftSpan": 12,
        "rightSpan": 12
      },
      {
        "type": "styled-list",
        "columns": 3,
        "items": [
          {
            "icon": "fa-thin fa-comments",
            "label": "Speak to the customer",
            "body": "“The One Park Advantage. Our Process” became “The One Park Process is Your Advantage.” The heading connected the service to the customer’s benefit and the brand’s promise of partnership."
          },
          {
            "icon": "fa-thin fa-diagram-project",
            "label": "Show the work ahead",
            "body": "Long paragraphs and plain text cards gave way to short labels, icons and a visible sequence. Two contrasting panels showed four steps beside a longer eight-step path, giving readers a comparison they could scan."
          },
          {
            "icon": "fa-thin fa-arrow-right",
            "label": "Finish with an action",
            "body": "The old process module ended in another paragraph. The revised section put “Get Funded” directly below the explanation, giving an interested reader a next step."
          }
        ]
      },
      {
        "type": "text",
        "variant": "note",
        "text": "These screenshots document changes in language, hierarchy and the path to action. No conversion result is attributed to this comparison."
      },
      {
        "type": "heading",
        "text": "Full Homepage"
      },
      {
        "type": "image-pair",
        "desktop": {
          "src": "/images/work/opf-modal/home-dt.png",
          "alt": "One Park Financial full homepage, desktop"
        },
        "mobile": {
          "src": "/images/work/opf-modal/home-mb.png",
          "alt": "One Park Financial full homepage, mobile"
        }
      }
    ]
  },
  {
    id: 'split-test',
    section: 'work',
    display: 'thumb',
    disciplines: ['Conversion Optimization', 'Product'],
    order: 6,
    title: "Testing the experience",
    icon: 'fa-thin fa-vial',
    visible: true,
    summary: '',
    briefHeading: "What we tested, and why",
    briefVariant: 'narrow',
    brief: {
      "images": [
        {
          "src": "/images/work/webmd-modal/control.png",
          "alt": "WebMD homepage control"
        },
        {
          "src": "/images/work/webmd-modal/winner.png",
          "alt": "WebMD homepage, variant V1"
        }
      ],
      "paragraphs": [
        "Product marketing owned the hypotheses and traffic. I designed and built the variants, then interpreted the results."
      ]
    },
    introduction: [
      "The examples here show the questions we tested and the designs we put in front of customers."
    ],
    role: "Variant design, implementation and results analysis",
    collaboration: "Product marketing owned hypotheses and traffic.",
    contributions: [
      { icon: 'fa-thin fa-flask', label: 'Experimentation' },
      { icon: 'fa-thin fa-chess', label: 'UX Strategy' },
      { icon: 'fa-thin fa-chart-mixed', label: 'Data Analysis' },
      { icon: 'fa-thin fa-code', label: 'Implementation' },
    ],
    media: [
      {
        "type": "split-row",
        "reverse": true,
        "left": [
          {
            "type": "image",
            "src": "/images/work/split01-modal/web-md-thumb.png",
            "alt": "",
            "shape": "circle",
            "bordered": true
          }
        ],
        "right": [
          {
            "type": "heading",
            "text": "WebMD imagery",
            "level": 3
          },
          {
            "type": "text",
            "text": "The hypothesis was that imagery featuring younger adults might fit the WebMD audience better than the imagery used on the core DentalPlans site."
          }
        ],
        "leftSpan": 12,
        "rightSpan": 12,
        "leftSpanXl": 8,
        "rightSpanXl": 10,
        "hAlign": "center",
        "vAlign": "center"
      },
      {
        "type": "split-row",
        "left": [
          {
            "type": "heading",
            "text": "Control"
          },
          {
            "type": "image",
            "src": "/images/work/webmd-modal/control.png",
            "alt": "WebMD homepage, control variant"
          }
        ],
        "right": [
          {
            "type": "heading",
            "text": "Variant 1"
          },
          {
            "type": "image",
            "src": "/images/work/webmd-modal/winner.png",
            "alt": "WebMD homepage, variant V1"
          }
        ],
        "leftSpan": 12,
        "rightSpan": 12
      },
      {
        "type": "split-row",
        "left": [
          {
            "type": "heading",
            "text": "Variant 2"
          },
          {
            "type": "image",
            "src": "/images/work/webmd-modal/v2.png",
            "alt": "WebMD homepage, variant V2"
          }
        ],
        "right": [
          {
            "type": "heading",
            "text": "Variant 3"
          },
          {
            "type": "image",
            "src": "/images/work/webmd-modal/v3.png",
            "alt": "WebMD homepage, variant V3"
          }
        ],
        "leftSpan": 12,
        "rightSpan": 12
      },
      {
        "type": "split-row",
        "left": [
          {
            "type": "image",
            "src": "/images/work/split01-modal/sc-thumb.png",
            "alt": "",
            "shape": "circle",
            "bordered": true
          }
        ],
        "right": [
          {
            "type": "heading",
            "text": "Savings calculator",
            "level": 3
          },
          {
            "type": "text",
            "text": "This test examined whether additional product information and a recognizable spokesperson might change customer response."
          }
        ],
        "leftSpan": 12,
        "rightSpan": 12,
        "leftSpanXl": 8,
        "rightSpanXl": 10,
        "hAlign": "center",
        "vAlign": "center"
      },
      {
        "type": "split-row",
        "left": [
          {
            "type": "heading",
            "text": "Control"
          },
          {
            "type": "image",
            "src": "/images/work/split01-modal/sc-control.png",
            "alt": "Savings calculator landing page, control variant"
          }
        ],
        "right": [
          {
            "type": "heading",
            "text": "Variant 1"
          },
          {
            "type": "image",
            "src": "/images/work/split01-modal/sc-winner.png",
            "alt": "Savings calculator landing page, variant V1"
          }
        ],
        "leftSpan": 12,
        "rightSpan": 12
      }
    ]
  },
  {
    id: 'call-center-ux',
    section: 'work',
    display: 'thumb',
    disciplines: ['Product'],
    order: 7,
    title: "When nobody can take the call",
    icon: 'fa-thin fa-headset',
    modalTitle: "When nobody can take the call",
    visible: true,
    summary: "I connected the website’s call invitation to call-center availability, working with the service leader, engineering, and business intelligence on the status feed.",
    briefHeading: "A phone number is a promise",
    brief: {
      "image": {
        "src": "/images/work/ccux-modal/flow.png",
        "alt": "Call center availability API flow diagram"
      },
      "paragraphs": [
        "Customers were being asked to call when nobody could answer. I raised the gap with the call-center leader and researched the platform’s API."
      ]
    },
    introduction: [
      "I worked with engineering and business intelligence on a status feed. The website could then change its message and offer when phone support was unavailable."
    ],
    role: "Project leadership and API research",
    collaboration: "Call-center leadership, engineering and business intelligence",
    contributions: [
      { icon: 'fa-thin fa-clipboard-list-check', label: 'Project Leadership' },
    ],
    media: [
      {
        "type": "heading",
        "text": "Make the message match availability",
        "level": 3,
        "icon": "fa-thin fa-message-lines"
      },
      {
        "type": "text",
        "text": "The feed checked call-center status every five minutes. The website changed its messaging and visual indicators, and we logged status changes and calls."
      },
      {
        "type": "text",
        "text": "A promotional code appeared only when the call center was unavailable."
      },
      {
        "type": "call-center-states"
      }
    ]
  },
  {
    id: 'marketing-auto',
    section: 'work',
    display: 'thumb',
    disciplines: ['Product'],
    order: 8,
    title: "One campaign, several audiences",
    icon: 'fa-thin fa-bullseye-arrow',
    modalTitle: "One campaign, several audiences",
    visible: true,
    summary: "I led the design and development of a campaign whose content and incentives changed by audience and campaign stage.",
    briefHeading: "Content that followed the customer",
    brief: {
      "image": {
        "src": "/images/work/ma-modal/automation.gif",
        "alt": "Animated walkthrough of the marketing automation workflow"
      },
      "paragraphs": [
        "A campaign spanning several brands needed different content for different audiences and stages. I led its design and development across the touchpoints."
      ]
    },
    introduction: [
      "The work connected marketing, business analysis, and data teams around shared data and reusable content."
    ],
    role: "Design and development lead",
    collaboration: "Marketing, business analysis and data teams",
    contributions: [
      { icon: 'fa-thin fa-pen-ruler', label: 'UX & UI Design' },
      { icon: 'fa-thin fa-phone-laptop', label: 'Responsive Design' },
      { icon: 'fa-thin fa-lightbulb', label: 'Design Leadership' },
      { icon: 'fa-thin fa-solar-system', label: 'Integration Strategy' },
    ],
    media: [
      {
        "type": "heading",
        "text": "Give campaign managers control",
        "level": 3
      },
      {
        "type": "text",
        "text": "Content and incentives changed by audience and by where the customer was in the campaign. Campaign managers could manage those variants through the system."
      },
      {
        "type": "split-row",
        "left": [
          {
            "type": "heading",
            "text": "Before"
          },
          {
            "type": "image",
            "src": "/images/work/ma-modal/ma-36.png",
            "alt": "Personalized campaign email, before optimization",
            "flush": true
          }
        ],
        "right": [
          {
            "type": "heading",
            "text": "After"
          },
          {
            "type": "image",
            "src": "/images/work/ma-modal/ma-3b.png",
            "alt": "Personalized campaign email, after optimization",
            "flush": true
          }
        ],
        "leftSpan": 12,
        "rightSpan": 12,
        "leftSpanXl": 8,
        "rightSpanXl": 8,
        "hAlign": "center"
      }
    ]
  },
  {
    id: 'workshops',
    section: 'work',
    display: 'thumb',
    disciplines: ['Leadership'],
    order: 9,
    title: "Getting teams to a shared decision",
    icon: 'fa-thin fa-screen-users',
    visible: true,
    summary: '',
    brief: {
      "image": {
        "src": "/images/work/workshop/ideas.jpg",
        "alt": "Workshop wall covered in sticky notes from a brainstorming session"
      },
      "paragraphs": [
        "I start with the decision the group needs to make. Then I design the session around the people who can make it."
      ]
    },
    briefHeading: "Design the decision before the session",
    introduction: [
      "The work has included customer journeys, product direction, and conversion-testing plans. I prepare the activities and materials so the group leaves with something the team can use afterward."
    ],
    role: "Workshop design and facilitation",
    contributions: [
      { icon: 'fa-thin fa-lightbulb', label: 'Workshop Facilitation' },
    ],
    media: [
      {
        "type": "heading",
        "text": "Workshops in practice",
        "level": 3
      },
      {
        "type": "icon-grid",
        "items": [
          {
            "image": {
              "src": "/images/work/workshop/cover.jpg",
              "alt": "Creative brainstorming"
            },
            "title": "Creative brainstorming"
          },
          {
            "image": {
              "src": "/images/work/workshop/cover-02.jpg",
              "alt": "UX/UI strategy"
            },
            "title": "UX/UI strategy"
          },
          {
            "image": {
              "src": "/images/work/workshop/planning.jpg",
              "alt": "Conversion-testing strategy"
            },
            "title": "Conversion-testing strategy"
          }
        ],
        "cols": 1,
        "colsLg": 3
      }
    ]
  },
  {
    id: 'roadmap',
    section: 'work',
    display: 'thumb',
    disciplines: ['Product', 'Leadership'],
    order: 10,
    title: "Choosing what comes next",
    icon: 'fa-thin fa-mouse-field',
    visible: true,
    summary: '',
    brief: {
      "image": {
        "src": "/images/work/roadmap/rm.jpg",
        "alt": "UX roadmap example with project details obscured"
      },
      "paragraphs": [
        "I use a roadmap to make the next decision visible: who needs the work, what problem it solves, and what has to happen before it can start."
      ]
    },
    briefHeading: 'Are we there yet?',
    introduction: [
      "The example shows the structure I used for a UX roadmap at One Park Financial. Project details are obscured.",
      "The plan has to survive new information. Visible dependencies make it possible to change the sequence when the scope changes."
    ],
    role: "UX roadmap planning",
    contributions: [
      { icon: 'fa-thin fa-map', label: 'UX Roadmapping' },
    ],
    media: [
      {
        "type": "text",
        "text": "What the roadmap needs to say"
      },
      {
        "type": "styled-list",
        "numbered": true,
        "shadow": true,
        "items": [
          {
            "label": "Title",
            "bg": "prime",
            "body": "Name the work and its purpose."
          },
          {
            "label": "Owner",
            "bg": "second",
            "body": "Identify who maintains the roadmap and answers questions about it."
          },
          {
            "label": "Goal",
            "bg": "third",
            "body": "State the business or customer outcome the work is intended to change."
          },
          {
            "label": "Sequence",
            "bg": "fourth",
            "body": "Use Now, Next, and Later to show priority. These are not delivery dates."
          },
          {
            "label": "Initiatives",
            "bg": "pop",
            "subItems": [
              "Project name",
              "Who needs the work",
              "The need",
              "Business objective",
              "Dependencies"
            ]
          }
        ]
      },
      {
        "type": "text",
        "text": "A project on the roadmap"
      },
      {
        "type": "card",
        "shadow": true,
        "header": "Project Title",
        "rows": [
          {
            "label": "Who needs it",
            "body": "Name the people who will use or benefit from the work."
          },
          {
            "label": "Need",
            "body": "State the problem the project must solve."
          },
          {
            "label": "Business objective",
            "body": "Describe the intended outcome and how the team will judge it."
          },
          {
            "label": "Owners and dependencies",
            "body": "Name who is responsible and whose work must happen first."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Roadmap example",
        "level": 3
      },
      {
        "type": "text",
        "text": "Project details are obscured."
      },
      {
        "type": "image",
        "src": "/images/work/roadmap/l-chart.jpg",
        "alt": "UX roadmap example with project details obscured",
        "flush": true
      }
    ]
  },
  {
    id: 'personas',
    section: 'work',
    display: 'thumb',
    disciplines: ['UX Research', 'Product'],
    order: 11,
    title: "Understanding the people buying the product",
    icon: 'fa-thin fa-masks-theater',
    visible: true,
    summary: '',
    brief: {
      "image": {
        "src": "/images/work/kitchen-sink/Persona-Cards.png",
        "alt": "Frugal Francine persona card with demographics, motivations, preferences, channels, and reasons to buy."
      },
      "paragraphs": [
        "I worked with business intelligence and product marketing on persona materials for the DentalPlans audience. Frugal Francine represented customers weighing dental-plan choices around cost and value."
      ]
    },
    briefHeading: "A cost-conscious customer persona",
    introduction: [
      "The card brought demographics, motivations, preferences, channels, and reasons to buy into one reference for the team."
    ],
    role: "Persona development and visual design",
    collaboration: "Business intelligence and product marketing",
    contributions: [
      {
        "icon": "fa-thin fa-handshake",
        "label": "Persona Collaboration"
      },
      {
        "icon": "fa-thin fa-fill-drip",
        "label": "Visual Design"
      }
    ],
    media: []
  },
  {
    id: 'reveal',
    section: 'work',
    display: 'thumb',
    disciplines: ['Brand', 'Visual'],
    order: 12,
    title: "The Choice Is Clear",
    thumb: { src: '/images/work/kitchen-sink/reveal-cover.png', alt: 'Reveal Aligners campaign, The choice is clear' },
    modalTitle: 'Reveal Aligners',
    visible: true,
    summary: "I developed copy and visual concepts for Reveal Clear Aligners around the idea of clarity.",
    briefHeading: "Clarity as a creative idea",
    brief: {
      "image": {
        "src": "/images/work/kitchen-sink/reveal-cover.jpg",
        "alt": ""
      },
      "paragraphs": [
        "For Reveal Clear Aligners, I developed copy and visual concepts around clarity. Each execution needed to make sense on its own while belonging to the same campaign."
      ]
    },
    introduction: [
      "The examples trace the same campaign idea across copy and visual executions."
    ],
    role: "Copy, concept development and visual design",
    contributions: [
      { icon: 'fa-thin fa-lightbulb', label: 'Concept Development' },
      { icon: 'fa-thin fa-handshake', label: 'Collaboration' },
      { icon: 'fa-thin fa-fill-drip', label: 'Visual Design' },
    ],
    inlineContributions: true,
    heroCardsHeading: "Three expressions of clarity",
    heroCardsIcon: 'fa-thin fa-brain',
    heroCards: [
      {
        "icon": "fa-thin fa-lightbulb-on",
        "label": "Yup, It's That Clear:",
        "body": "State the idea with plain confidence."
      },
      {
        "icon": "fa-thin fa-lightbulb-on",
        "label": "So Clear, Like It's Not Even There:",
        "body": "Play with how little the aligner is meant to be noticed."
      },
      {
        "icon": "fa-thin fa-lightbulb-on",
        "label": "OMG, Your Aligner Is Showing:",
        "body": "Use visibility as the provocation."
      }
    ],
    heroMedia: [
      {
        "type": "contributions"
      }
    ],
    media: [
      {
        "type": "heading",
        "text": "The concept in the work",
        "level": 4,
        "icon": "fa-thin fa-fill-drip",
        "treatment": "section"
      },
      {
        "type": "image-row",
        "images": [
          {
            "src": "/images/work/kitchen-sink/reveal-clear-01.jpg",
            "alt": "Reveal Clear Aligners campaign concept, clarity theme, first execution"
          },
          {
            "src": "/images/work/kitchen-sink/reveal-clear-02.jpg",
            "alt": "Reveal Clear Aligners campaign concept, clarity theme, second execution"
          }
        ],
        "cols": [
          12,
          12
        ],
        "mobileDivider": true
      },
      {
        "type": "image-row",
        "images": [
          {
            "src": "/images/work/kitchen-sink/reveal-omg-01.jpg",
            "alt": "Reveal Clear Aligners campaign concept, OMG Your Aligner Is Showing"
          }
        ],
        "cols": [
          12
        ],
        "mobileDivider": true
      }
    ]
  },
  {
    id: 'viva',
    section: 'work',
    display: 'thumb',
    disciplines: ['Brand', 'Visual'],
    order: 13,
    title: "Viva Medicare",
    thumb: { src: '/images/work/viva-modal/vs-3.png', alt: 'Viva Medicare brand campaign concept' },
    modalTitle: 'Viva Medicare',
    visible: true,
    summary: "I developed the Viva Medicare brand through research and cross-functional branding exercises. These examples show my visual explorations.",
    briefHeading: "A brand taking shape",
    brief: {
      "image": {
        "src": "/images/work/viva-modal/brief.png",
        "alt": ""
      },
      "paragraphs": [
        "I developed a brand for Medicare and Medicare Supplement plans, working from product and customer research. Executive leadership and a cross-functional team took part in the branding exercises."
      ]
    },
    introduction: [
      "The marks, palettes, and interface treatments shown here are my work. They document the directions explored for the brand."
    ],
    role: "Brand research, concept development and visual design",
    collaboration: "Executive leadership and a cross-functional team",
    contributions: [
      { icon: 'fa-thin fa-lightbulb', label: 'Concept Development' },
      { icon: 'fa-thin fa-handshake', label: 'Collaboration' },
      { icon: 'fa-thin fa-fill-drip', label: 'Visual Design' },
    ],
    media: [
      {
        "type": "heading",
        "text": "The mark",
        "level": 3
      },
      {
        "type": "split-row",
        "left": [
          {
            "type": "image",
            "src": "/images/work/viva-modal/logo-design-stack.png",
            "alt": "Viva Medicare logo, stacked lockup",
            "flush": true
          }
        ],
        "right": [
          {
            "type": "image",
            "src": "/images/work/viva-modal/logo-design-inline.png",
            "alt": "Viva Medicare logo, inline lockup",
            "flush": true
          }
        ],
        "leftSpan": 12,
        "rightSpan": 12,
        "vAlign": "center"
      },
      {
        "type": "heading",
        "text": "Color and visual direction",
        "level": 3
      },
      {
        "type": "image",
        "src": "/images/work/viva-modal/colors.png",
        "alt": "Viva Medicare color study",
        "flush": true
      },
      {
        "type": "image",
        "src": "/images/work/viva-modal/vs-1.png",
        "alt": "Viva Medicare visual style exploration, option one"
      },
      {
        "type": "image-row",
        "images": [
          {
            "src": "/images/work/viva-modal/vs-2.png",
            "alt": "Viva Medicare visual style exploration, option two"
          },
          {
            "src": "/images/work/viva-modal/vs-3.png",
            "alt": "Viva Medicare visual style exploration, option three"
          }
        ],
        "cols": [
          12,
          12
        ]
      },
      {
        "type": "heading",
        "text": "The brand in the interface",
        "level": 3
      },
      {
        "type": "image",
        "src": "/images/work/viva-modal/hero-1.png",
        "alt": "Viva Medicare hero concept, option one"
      },
      {
        "type": "image",
        "src": "/images/work/viva-modal/hero-2.png",
        "alt": "Viva Medicare hero concept, option two"
      },
      {
        "type": "heading",
        "text": "UI Components & Style"
      },
      {
        "type": "heading",
        "text": "Buttons"
      },
      {
        "type": "image",
        "src": "/images/work/viva-modal/buttons.png",
        "alt": "Viva Medicare button styles",
        "flush": true
      },
      {
        "type": "heading",
        "text": "Inputs"
      },
      {
        "type": "image",
        "src": "/images/work/viva-modal/inputs.png",
        "alt": "Viva Medicare form input styles",
        "flush": true
      },
      {
        "type": "heading",
        "text": "Navigation"
      },
      {
        "type": "image",
        "src": "/images/work/viva-modal/nav.png",
        "alt": "Viva Medicare navigation design",
        "flush": true
      }
    ]
  },
  {
    id: 'wrong',
    section: 'work',
    display: 'thumb',
    disciplines: ['Brand', 'Visual'],
    order: 14,
    title: "The Wrong Campaign",
    thumb: { src: '/images/work/kitchen-sink/wrong-cover.jpg', alt: 'The Wrong campaign portrait' },
    heroBrandImage: { src: '/assets/featured/dentalplans-icon.svg', alt: 'DentalPlans.com' },
    modalTitle: 'The Wrong Campaign',
    visible: true,
    summary: "A campaign concept for people researching dental care and worrying about cost.",
    briefHeading: "Challenge the assumption, keep the person",
    brief: {
      "image": {
        "src": "/images/work/kitchen-sink/wrong-cover.jpg",
        "alt": ""
      },
      "paragraphs": [
        "The campaign addressed people researching crowns, fillings, and root canals who were concerned about cost. Its job was to introduce dental savings plans as another option."
      ]
    },
    introduction: [
      "“Wrong” was the creative device. The design question was whether a blunt challenge could earn attention without making the person feel blamed."
    ],
    role: "Design leadership and visual design",
    contributions: [
      { icon: 'fa-thin fa-lightbulb', label: 'Design Leadership' },
      { icon: 'fa-thin fa-handshake', label: 'Collaboration' },
      { icon: 'fa-thin fa-fill-drip', label: 'Visual Design' },
    ],
    media: [
      {
        "type": "heading",
        "text": "The idea in the work",
        "level": 3
      },
      {
        "type": "text",
        "text": "Headlines carried the challenge. The visual variants included different ages and family situations. The landing page and hero versions were prepared for conversion testing."
      },
      {
        "type": "heading",
        "text": "Hero Variants for Testing"
      },
      {
        "type": "image-row",
        "images": [
          {
            "src": "/images/work/kitchen-sink/wrong-hero-hip-lady.jpg",
            "alt": "Wrong campaign hero, younger woman"
          },
          {
            "src": "/images/work/kitchen-sink/wrong-hero-hip-senior.jpg",
            "alt": "Wrong campaign hero, active senior man"
          }
        ],
        "cols": [
          12,
          12
        ],
        "mobileDivider": true
      },
      {
        "type": "image-row",
        "images": [
          {
            "src": "/images/work/kitchen-sink/wrong-hero-kid.jpg",
            "alt": "Wrong campaign hero, child"
          },
          {
            "src": "/images/work/kitchen-sink/wrong-hero-family.jpg",
            "alt": "Wrong campaign hero, family"
          }
        ],
        "cols": [
          12,
          12
        ],
        "mobileDivider": true
      },
      {
        "type": "image-row",
        "images": [
          {
            "src": "/images/work/kitchen-sink/wrong-hero-senior-single.jpg",
            "alt": "Wrong campaign hero, senior woman"
          },
          {
            "src": "/images/work/kitchen-sink/wrong-hero-senior-couple.jpg",
            "alt": "Wrong campaign hero, senior couple"
          }
        ],
        "cols": [
          12,
          12
        ],
        "mobileDivider": true
      },
      {
        "type": "heading",
        "text": "Full Landing Page"
      },
      {
        "type": "image",
        "src": "/images/work/kitchen-sink/wrong-full-lp.jpg",
        "alt": "Wrong campaign full landing page"
      }
    ]
  }
]
