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
      treatment?: 'section'
      // legacy's `hr.my-5 -> icon -> h2 -> hr.my-5` section-break pattern
      // (col gets text-center, leading hr added, trailing hr gets my-12,
      // the usual mt-12 dropped since the leading hr supplies the gap)
      sectionDivider?: boolean
    }
  | { type: 'text'; text: string }
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
  subtitle?: string // feature-card strapline (p.h5)
  summary: string // feature-card summary
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
  technologies: ProjectBadge[]
  heroMedia?: ProjectMedia[] // supporting prose/lists that belong inside the hero copy panel
  heroCards?: StyledListItem[] // full-width concept/information cards in the top hero
  heroCardsHeading?: string
  heroCardsIcon?: string
  media: ProjectMedia[] // preserves the legacy modal section order
}

export const projects: Project[] = [
  {
    id: 'webmd',
    section: 'work',
    display: 'feature',
    disciplines: ['Product', 'Conversion Optimization'],
    order: 1,
    title: 'WebMD',
    subtitle: "From plan search to checkout",
    cardImage: { src: '/images/work/WebMD-HM.png', alt: 'WebMD eCommerce website' },
    summary: "I led design and front-end development for a branded experience where people could find, compare, and buy dental savings plans.",
    visible: true,
    brief: {
      image: { src: '/images/work/webmd-modal/brief-2.png', alt: '' },
      paragraphs: [
        "WebMD’s brand and DentalPlans’ products needed one commerce experience. We had less than eight weeks to plan and launch. I led UX/UI design and front-end development across plan search, comparison, cart, and checkout. We launched in six weeks."
      ]
    },
    contributions: [
      { icon: 'fa-thin fa-pen-ruler', label: 'Product Design' },
      { icon: 'fa-thin fa-lightbulb', label: 'Design Leadership' },
      { icon: 'fa-thin fa-ruler-triangle', label: 'Prototyping' },
      { icon: 'fa-thin fa-user-check', label: 'Usability Testing' },
    ],
    technologies: [
      { icon: 'fa-thin fa-drafting-compass', label: 'Adobe Suite' },
      { icon: 'fa-brands fa-wordpress-simple', label: 'WordPress' },
      { icon: 'fa-brands fa-bootstrap', label: 'Bootstrap' },
      { icon: 'fa-thin fa-code', label: 'HTML' },
      { icon: 'fa-thin fa-brackets-curly', label: 'CSS/LESS' },
      { icon: 'fa-brands fa-git-alt', label: 'GIT' }
    ],
    media: [
      { type: 'heading', text: 'Homepage' },
      {
        type: 'image-pair',
        desktop: {
          src: '/images/work/webmd-modal/home-dt.png',
          alt: 'WebMD dental savings homepage, desktop'
        },
        mobile: {
          src: '/images/work/webmd-modal/home-mb.png',
          alt: 'WebMD dental savings homepage, mobile'
        }
      },
      { type: 'heading', text: 'Plan Search Results' },
      {
        type: 'image-pair',
        desktop: {
          src: '/images/work/webmd-modal/plan-search-dt.png',
          alt: 'WebMD plan search results, desktop'
        },
        mobile: {
          src: '/images/work/webmd-modal/plan-search-mb.png',
          alt: 'WebMD plan search results, mobile'
        }
      },
      { type: 'heading', text: 'Plan Compare' },
      {
        type: 'image-pair',
        desktop: {
          src: '/images/work/webmd-modal/plan-compare-dt.png',
          alt: 'WebMD plan comparison view, desktop'
        },
        mobile: {
          src: '/images/work/webmd-modal/plan-compare-mb.png',
          alt: 'WebMD plan comparison view, mobile'
        }
      },
      { type: 'heading', text: 'Plan Details' },
      {
        type: 'image-pair',
        desktop: {
          src: '/images/work/webmd-modal/plan-details-dt.png',
          alt: 'WebMD plan details page, desktop'
        },
        mobile: {
          src: '/images/work/webmd-modal/plan-details-mb.png',
          alt: 'WebMD plan details page, mobile'
        }
      },
      { type: 'heading', text: 'Dentist Search Results' },
      {
        type: 'image-pair',
        desktop: {
          src: '/images/work/webmd-modal/dentist-search-dt.png',
          alt: 'WebMD dentist search results, desktop'
        },
        mobile: {
          src: '/images/work/webmd-modal/dentist-search-mb.png',
          alt: 'WebMD dentist search results, mobile'
        }
      },
      { type: 'heading', text: 'Dentist Details' },
      {
        type: 'image-pair',
        desktop: {
          src: '/images/work/webmd-modal/dentist-profile-dt.png',
          alt: 'WebMD dentist profile page, desktop'
        },
        mobile: {
          src: '/images/work/webmd-modal/dentist-profile-mb.png',
          alt: 'WebMD dentist profile page, mobile'
        }
      },
      { type: 'heading', text: 'Cart' },
      {
        type: 'image-pair',
        desktop: {
          src: '/images/work/webmd-modal/cart-dt.png',
          alt: 'WebMD shopping cart and checkout, desktop'
        },
        mobile: {
          src: '/images/work/webmd-modal/cart-mb.png',
          alt: 'WebMD shopping cart and checkout, mobile'
        }
      }
    ]
  },
  {
    id: 'dentalplans',
    section: 'work',
    display: 'feature',
    disciplines: ['Systems', 'Product'],
    order: 2,
    title: 'DentalPlans.com',
    subtitle: "One platform. Five branded businesses.",
    cardImage: {
      src: '/images/work/dpprod-modal/dpprod-hm.png',
      alt: 'DentalPlans product framework'
    },
    summary: "I built the shared commerce platform behind five branded sites with a part-time engineer. Launching a property went from six weeks to two.",
    modalTitle: 'Product Framework and Design System',
    visible: true,
    brief: {
      image: { src: '/images/work/dpprod-modal/brief.png', alt: '' },
      paragraphs: [
        "DentalPlans.com wanted dedicated storefronts for product partners. The first site tested whether customers would buy through a focused brand experience. Once it sold, the next question was how to add brands without copying the manual work.",
        "I led product design and front-end development for the platform that followed. Each release replaced repeated work with a capability the next site could use. I built and maintained it with a part-time engineer."
      ]
    },
    contributions: [
      { icon: 'fa-thin fa-boxes-stacked', label: 'Product Ownership' },
      { icon: 'fa-thin fa-layer-group', label: 'Design Systems' },
      { icon: 'fa-thin fa-pen-ruler', label: 'UX & UI Design' },
      { icon: 'fa-thin fa-laptop-code', label: 'Front-end Development' },
    ],
    technologies: [
      { icon: 'fa-thin fa-drafting-compass', label: 'Adobe Suite' },
      { icon: 'fa-brands fa-wordpress-simple', label: 'WordPress' },
      { icon: 'fa-brands fa-bootstrap', label: 'Bootstrap' },
      { icon: 'fa-thin fa-code', label: 'HTML' },
      { icon: 'fa-thin fa-brackets-curly', label: 'CSS/LESS' },
      { icon: 'fa-thin fa-elephant', label: 'PHP' },
      { icon: 'fa-thin fa-gear-code', label: 'DevOps Pipelines' },
      { icon: 'fa-brands fa-git-alt', label: 'GIT' },
      { icon: 'fa-thin fa-webhook', label: 'APIs' }
    ],
    media: [
      {
        type: 'metric-grid',
        heading: "Finance-attributed shares from one measured year; launch time per property",
        metrics: [
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
        valueCreated: {
          heading: 'Value Created',
          items: [
  "Five properties on one platform",
  "Two people built and maintained the platform",
  "Four experience designers covered the properties",
  "The company owned the custom platform"
]
        }
      },
      {
        type: 'progress-diagram',
        heading: 'The System Framework',
        bands: [
          {
            heading: 'Partner storefront examples',
            icon: 'fa-thin fa-box',
            bg: 'dark-subtle',
            textColor: 'black',
            rows: [
              {
                cols: 4,
                cells: [
                  {
                    label: 'Cigna',
                    icon: 'fa-thin fa-box',
                    bg: 'second',
                    striped: false,
                    sub: {
                      icon: 'fa-thin fa-palette',
                      label: 'Brand Theme',
                      bg: 'second-light',
                      textColor: 'second-dark'
                    }
                  },
                  {
                    label: 'Aetna',
                    icon: 'fa-thin fa-box',
                    bg: 'prime',
                    striped: false,
                    sub: {
                      icon: 'fa-thin fa-palette',
                      label: 'Brand Theme',
                      bg: 'prime-light',
                      textColor: 'prime-dark'
                    }
                  },
                  {
                    label: 'WebMD',
                    icon: 'fa-thin fa-box',
                    bg: 'third',
                    striped: false,
                    sub: {
                      icon: 'fa-thin fa-palette',
                      label: 'Brand Theme',
                      bg: 'third-light',
                      textColor: 'third-dark'
                    }
                  },
                  {
                    label: "Partner storefront",
                    icon: 'fa-thin fa-box',
                    bg: 'fourth',
                    striped: false,
                    sub: {
                      icon: 'fa-thin fa-palette',
                      label: 'Brand Theme',
                      bg: 'fourth-light',
                      textColor: 'fourth-dark'
                    }
                  }
                ]
              }
            ]
          },
          {
            heading: 'Core Framework',
            icon: 'fa-thin fa-boxes-stacked',
            bg: 'fifth-dark',
            textColor: 'white',
            rows: [
              {
                cols: 5,
                cells: [
                  { label: 'API Integration', icon: 'fa-thin fa-webhook', bg: 'fifth-light', textColor: 'fifth-dark', striped: false },
                  { label: 'Component Libraries', icon: 'fa-thin fa-square-code', bg: 'fifth-light', textColor: 'fifth-dark', striped: false },
                  { label: 'Pattern Library', icon: 'fa-thin fa-layer-group', bg: 'fifth-light', textColor: 'fifth-dark', striped: false },
                  { label: 'CMS', icon: 'fa-brands fa-wordpress-simple', bg: 'fifth-light', textColor: 'fifth-dark', striped: false },
                  { label: 'Pipelines', icon: 'fa-thin fa-gear-code', bg: 'fifth-light', textColor: 'fifth-dark', striped: false },
                  { label: 'Documentation', icon: 'fa-thin fa-book', bg: 'fifth-light', textColor: 'fifth-dark', striped: false }
                ]
              }
            ]
          },
          {
            heading: 'Microservices',
            icon: 'fa-thin fa-webhook',
            bg: 'fifth-light',
            textColor: 'fifth-dark',
            rows: [
              {
                cols: 5,
                cells: [
                  { label: 'Plan Details', icon: 'fa-thin fa-webhook', bg: 'fifth', striped: false },
                  { label: 'Dentist Search', icon: 'fa-thin fa-webhook', bg: 'fifth', striped: false },
                  { label: 'Lead Create', icon: 'fa-thin fa-webhook', bg: 'fifth', striped: false },
                  { label: 'Call Center Status', icon: 'fa-thin fa-headset', bg: 'fifth', striped: false },
                  { label: 'Google Maps (API)', icon: 'fa-thin fa-webhook', bg: 'fifth', striped: false }
                ]
              }
            ]
          }
        ]
      },
      { type: 'divider' },
      {
        type: 'split-row',
        left: [{ type: 'supporting-art', kind: 'dental-platform', alt: 'Shared ecommerce platform connecting product data, search and APIs, promotions, and deployment.' }],
        leftSpanXl: 10,
        rightSpanXl: 14,
        rightSelfAlign: 'center',
        right: [
          { type: 'heading', text: 'Key Features', level: 4 },
          {
            type: 'list',
            items: [
  "Shared design patterns and front-end components for updates and testing across properties.",
  "Brand settings separated identity from the application.",
  "Services supplied product information, dentist search, and cart functions.",
  "Scheduled promotions handled offer versions and expiry.",
  "Source tracking covered paid search, affiliates, and organic traffic.",
  "Documentation supported designers and developers.",
  "Deployment could target one property or all of them."
]
          }
        ]
      },
      { type: 'heading', text: 'The Journey', level: 2, icon: 'fa-thin fa-map-location-dot', sectionDivider: true },
      {
        type: 'split-row',
        reverse: true,
        left: [{ type: 'supporting-art', kind: 'dental-mvp-one', alt: 'First MVP joining a WordPress storefront, Bootstrap interface, product details, and cart.' }],
        leftSpanXl: 10,
        rightSpanXl: 14,
        rightSelfAlign: 'center',
        right: [
          { type: 'heading', text: 'Iteration One: Initial Launch and Learnings', level: 4 },
          {
            type: 'text',
            text: 'With limited resources and a busy engineering team, the marketing and design team had to take the lead. Our SVP of Marketing asked, "You know WordPress, right? How fast can you stand up a website?"'
          },
          { type: 'heading', text: 'Plan:', level: 4 },
          {
            type: 'text',
            text: "We started with a single-product flow to test customer response. Engineering built the service that passed the product into the existing cart. I designed the storefront so later versions could support other products and brands."
          },
          {
            type: 'text',
            text: 'I built a Bootstrap-based WordPress theme covering the home, contact, about, and product detail pages, plus add-to-cart functionality. Future updates were anticipated, allowing the theme to adapt to different products and pass information to the shopping cart.'
          },
          { type: 'heading', text: 'Results:', level: 4 },
          {
            type: 'text',
            text: "The first storefront sold, and leadership asked for a second. That gave us a reason to invest in shared capabilities."
          }
        ]
      },
      { type: 'divider' },
      {
        type: 'split-row',
        left: [{ type: 'supporting-art', kind: 'dental-mvp-two', alt: 'Second MVP connecting two branded storefronts to shared product data and cart.' }],
        leftSpanXl: 10,
        rightSpanXl: 14,
        rightSelfAlign: 'center',
        right: [
          { type: 'heading', text: 'Iteration Two: Scaling and Optimization', level: 4 },
          {
            type: 'text',
            text: "The second site needed the brand experience to continue into the cart. We added a cart that could take each brand’s identity and services for shared product information. Testing could then cover the path from landing page through purchase."
          },
          { type: 'heading', text: 'Results:', level: 4 },
          {
            type: 'text',
            text: "The second launch gave us a shared base for later changes. The components could be reused in landing pages and purchase flows, so tests no longer required rebuilding each variant from scratch."
          }
        ]
      },
      { type: 'divider' },
      {
        type: 'split-row',
        reverse: true,
        left: [{ type: 'supporting-art', kind: 'dental-mvp-three', alt: 'Third MVP carrying shared patterns and components through microservices to multiple properties.' }],
        leftSpanXl: 10,
        rightSpanXl: 14,
        rightSelfAlign: 'center',
        right: [
          { type: 'heading', text: 'Iteration Three: Integrating Learnings and Microservices', level: 4 },
          {
            type: 'text',
            text: "We brought product information into shared services. When engineering added or changed data, every property could use it. Common patterns and components gave the interfaces a consistent way to present it."
          },
          { type: 'heading', text: 'Delivery', level: 4 },
          {
            type: 'text',
            text: 'We built landing pages, developed content for organic search, and continued testing acquisition and purchase flows.'
          }
        ]
      },
      { type: 'divider' },
      {
        type: 'split-row',
        left: [{ type: 'supporting-art', kind: 'dental-mvp-four', alt: 'Fourth MVP flow from ZIP search to results and a dentist profile.' }],
        leftSpanXl: 10,
        rightSpanXl: 14,
        rightSelfAlign: 'center',
        right: [
          { type: 'heading', text: 'Iteration Four: Dentist Search Feature', level: 4 },
          {
            type: 'text',
            text: "I designed and built the dentist-search interface using the existing patterns and components."
          },
          { type: 'heading', text: 'Results:', level: 4 },
          {
            type: 'text',
            text: "The platform gained a dentist-search flow built from the same patterns and components as the storefronts."
          }
        ]
      }
    ]
  },
  {
    id: 'bumblebeemd',
    section: 'work',
    display: 'feature',
    disciplines: ['Systems', 'Brand'],
    order: 3,
    title: 'BumblebeeMD',
    subtitle: "Room to build the brand",
    cardImage: { src: '/images/work/BMD-HM.png', alt: 'BumblebeeMD brand' },
    summary: "The shared platform gave us the parts. We could spend our time on BumblebeeMD’s identity and customer experience, then launch on the same foundation as the other brands.",
    modalTitle: 'BumblebeeMD',
    visible: true,
    brief: {
      image: { src: '/images/work/bmd-modal/brief.png', alt: '' },
      paragraphs: [
  "BumblebeeMD was a DentalPlans.com sub-brand built on the shared commerce platform. The product data, components, and purchase flow were already there.",
  "That gave us room to work on the brand: its identity, the interface, and how the experience should feel. We could carry those decisions into working pages without rebuilding the commerce underneath them."
]
    },
    contributions: [
      { icon: 'fa-thin fa-pen-ruler', label: 'Product Design' },
      { icon: 'fa-thin fa-lightbulb', label: 'Design Leadership' },
      { icon: 'fa-thin fa-ruler-triangle', label: 'Prototyping' },
      { icon: 'fa-thin fa-user-check', label: 'Usability Testing' },
    ],
    technologies: [
      { icon: 'fa-thin fa-drafting-compass', label: 'Adobe Suite' },
      { icon: 'fa-brands fa-wordpress-simple', label: 'WordPress' },
      { icon: 'fa-brands fa-bootstrap', label: 'Bootstrap' },
      { icon: 'fa-thin fa-code', label: 'HTML' },
      { icon: 'fa-thin fa-brackets-curly', label: 'CSS/LESS' },
      { icon: 'fa-brands fa-git-alt', label: 'GIT' }
    ],
    media: [
      { type: 'heading', text: 'Homepage' },
      {
        type: 'split-row',
        left: [
          { type: 'image', src: '/images/work/bmd-modal/home-dt.png', alt: 'BumblebeeMD homepage, desktop' },
          { type: 'image', src: '/images/work/bmd-modal/gran-ma-w.png', alt: 'BumblebeeMD homepage lifestyle photography', flush: true }
        ],
        right: [{ type: 'image', src: '/images/work/bmd-modal/home-mb.png', alt: 'BumblebeeMD Homepage Mobile' }],
        leftSpan: 18,
        rightSpan: 6
      },
      { type: 'heading', text: 'Content Page' },
      {
        type: 'split-row',
        left: [
          { type: 'image', src: '/images/work/bmd-modal/content-dt.png', alt: 'BumblebeeMD content page, desktop' },
          { type: 'image', src: '/images/work/bmd-modal/family.png', alt: 'BumblebeeMD family lifestyle photography', flush: true }
        ],
        right: [{ type: 'image', src: '/images/work/bmd-modal/content-mb.png', alt: 'BumblebeeMD Homepage Mobile' }],
        leftSpan: 18,
        rightSpan: 6
      },
      { type: 'heading', text: 'UI Components & Style' },
      {
        type: 'split-row',
        left: [
          { type: 'heading', text: 'Buttons' },
          { type: 'image', src: '/images/work/bmd-modal/buttons.png', alt: 'BumblebeeMD button component styles', flush: true }
        ],
        right: [
          { type: 'heading', text: 'Inputs' },
          { type: 'image', src: '/images/work/bmd-modal/inputs.png', alt: 'BumblebeeMD form input component styles', flush: true }
        ],
        leftSpan: 12,
        rightSpan: 12
      },
      { type: 'heading', text: 'Icons' },
      {
        type: 'split-row',
        left: [{ type: 'image', src: '/images/work/bmd-modal/icons-01.png', alt: 'BumblebeeMD Homepage Desktop', flush: true }],
        right: [{ type: 'image', src: '/images/work/bmd-modal/icons-02.png', alt: 'BumblebeeMD Homepage Desktop', flush: true }],
        leftSpan: 12,
        rightSpan: 12
      },
      { type: 'heading', text: 'Image Treatments' },
      {
        type: 'image',
        src: '/images/work/bmd-modal/images.png',
        alt: 'BumblebeeMD Homepage Desktop',
        flush: true
      },
      { type: 'heading', text: '"Buy Box" Treatments' },
      {
        type: 'image',
        src: '/images/work/bmd-modal/buy-box.png',
        alt: 'BumblebeeMD Homepage Desktop',
        flush: true
      },
      { type: 'heading', text: 'Wireframes' },
      {
        type: 'image-pair',
        desktop: { src: '/images/work/bmd-modal/home-wf-dt.png', alt: 'BumblebeeMD homepage wireframe, desktop' },
        mobile: { src: '/images/work/bmd-modal/home-wf-mb.png', alt: 'BumblebeeMD homepage wireframe, mobile' }
      }
    ]
  },
  {
    id: 'hydra',
    section: 'work',
    display: 'feature',
    disciplines: ['Systems', 'Product'],
    order: 4,
    title: 'Hydra',
    subtitle: "From an idea to working parts",
    cardImage: { src: '/images/work/hydra/hydra-hm.png', alt: 'Hydra design system' },
    summary: "I built a shared set of interface patterns and components across products. Teams could assemble the next experience from parts already designed and built.",
    modalTitle: 'Hydra Design System',
    visible: true,
    brief: {
      image: { src: '/images/work/hydra/brief.png', alt: '' },
      paragraphs: [
        "I built Hydra to give products on different technology stacks one design language. The work covered reusable interface patterns, front-end components, and brand settings.",
        "I showed the SVP of Marketing and the CTO where the interfaces had fragmented and proposed a shared system. Their backing gave the work a path across departments."
      ]
    },
    contributions: [
      { icon: 'fa-thin fa-layer-group', label: 'Design Systems' },
      { icon: 'fa-thin fa-lightbulb', label: 'Design Leadership' },
      { icon: 'fa-thin fa-magnifying-glass-chart', label: 'Systems Analysis' },
      { icon: 'fa-thin fa-laptop-code', label: 'UI Engineering' },
    ],
    technologies: [
      { icon: 'fa-thin fa-drafting-compass', label: 'Adobe Suite' },
      { icon: 'fa-thin fa-code', label: 'HTML' },
      { icon: 'fa-thin fa-brackets-curly', label: 'CSS/SASS' },
      { icon: 'fa-brands fa-git-alt', label: 'GIT' }
    ],
    media: [
      {
        type: 'split-row',
        left: [
          { type: 'heading', text: 'The Problem', level: 3 },
          { type: 'heading', text: 'Severe UI Fragmentation', level: 4 },
          {
            type: 'text',
            text: 'Each phase was on a different tech stack and off-brand to boot. There were eight variants of buttons. It got worse from there. Identical components that did the same thing looked different throughout. Error messaging was created ad hoc for each element, with various visual treatments and copy. To add a layer of complexity, it had to support multiple sub-brands.'
          },
          {
            type: 'text',
            text: "The same action could look different from one part of the product to the next. Teams also had more variants to design, build, and maintain."
          }
        ],
        right: [
          {
            type: 'image',
            src: '/images/work/hydra/ui-rag.png',
            alt: 'Eight inconsistent button treatments across products',
            caption: 'UX/UI Fragmentation: Button Treatments',
            flush: true
          }
        ],
        leftSpan: 14,
        rightSpan: 10,
        vAlign: 'center'
      },
      {
        type: 'split-row',
        left: [
          {
            type: 'image',
            src: '/images/work/hydra/error-01.png',
            alt: 'Inconsistent error message and input field treatments, first set',
            caption: 'UX/UI Fragmentation: Error and Input Treatments (1 of 2)',
            flush: true
          }
        ],
        right: [
          {
            type: 'image',
            src: '/images/work/hydra/error-02.png',
            alt: 'Inconsistent error message and input field treatments, second set',
            caption: 'UX/UI Fragmentation: Error and Input Treatments (2 of 2)',
            flush: true
          }
        ],
        leftSpan: 12,
        rightSpan: 12,
        breakpoint: 'md'
      },
      { type: 'heading', text: 'The Rise of Hydra' },
      {
        type: 'split-row',
        left: [
          {
            type: 'text',
            text: "I defined shared interface patterns and a vocabulary designers and engineers could both use. Brand settings let the same components take on different identities across the products."
          },
          {
            type: 'text',
            text: "I kept the changes in the front-end markup. The applications could adopt the shared interface without replacing their functional back-end code."
          },
          {
            type: 'text',
            text: "Variables controlled color, type, and interface treatment for each brand. The core patterns stayed shared, and applications could take design-system updates independently."
          }
        ],
        right: [
          { type: 'text', text: 'Nomenclature' },
          {
            type: 'icon-grid',
            items: [
              { icon: 'fa-thin fa-image', title: 'Elements' },
              { icon: 'fa-thin fa-toggle-on', title: 'Controls' },
              { icon: 'fa-thin fa-sliders', title: 'Components' },
              { icon: 'fa-thin fa-sidebar', title: 'Modules' },
              { icon: 'fa-thin fa-table-layout', title: 'Templates' },
              { icon: 'fa-thin fa-browsers', title: 'Pages' }
            ]
          }
        ],
        leftSpan: 12,
        rightSpan: 12
      },
      {
        type: 'progress-diagram',
        heading: 'The System Framework',
        rows: [
          { cells: [{ label: 'Consistent UX/UI', bg: 'third', animated: true, span: 24 }] },
          {
            cells: [
              { label: 'App One', bg: 'prime', span: 6 },
              { label: 'App Two', bg: 'prime', span: 6 },
              { label: 'Main Website', bg: 'prime', span: 6 },
              { label: 'Sub Website', bg: 'second', span: 6 }
            ]
          },
          {
            cells: [
              { label: 'Main Brand', bg: 'prime', span: 18 },
              { label: 'Sub Brand', bg: 'second', span: 6 }
            ]
          },
          { cells: [{ label: 'Design System', bg: 'fourth-light', span: 24 }] },
          {
            cells: [
              { label: 'C#', bg: 'fourth', span: 12, padY: 5 },
              { label: 'PHP', bg: 'fourth-dark', span: 12, padY: 5 }
            ]
          }
        ]
      },
      { type: 'heading', text: 'UI Elements' },
      {
        type: 'split-row',
        left: [{ type: 'image', src: '/images/work/hydra/hydra-ui-01.png', alt: "Big'ol Hydra", flush: true }],
        right: [{ type: 'image', src: '/images/work/hydra/hydra-ui-02.png', alt: "Big'ol Hydra", flush: true }],
        leftSpan: 12,
        rightSpan: 12
      },
      { type: 'heading', text: 'Why Hydra?' },
      {
        type: 'split-row',
        left: [{ type: 'supporting-art', kind: 'hydra', alt: 'Hydra connecting shared interface patterns and components across brands and technology stacks.' }],
        right: [
          {
            type: 'text',
            text: "Hydra had many heads and one body. The system’s shared patterns served several products and brands."
          }
        ],
        leftSpan: 8,
        rightSpan: 12,
        vAlign: 'center',
        hAlign: 'center'
      }
    ]
  },
  {
    id: 'opfred',
    section: 'work',
    display: 'feature',
    disciplines: ['Product', 'UX Research'],
    order: 5,
    title: 'One Park Financial',
    subtitle: "From visitor to the right next step",
    cardImage: {
      src: '/images/work/opf-modal/brief.png',
      alt: 'One Park Financial corporate website'
    },
    summary: "I led the website and lead-flow redesign. We could change the flow in hours and carry each test ID with the lead, following what changed across the customer journey.",
    visible: true,
    brief: {
      image: { src: '/images/work/opf-modal/brief-2.png', alt: '' },
      paragraphs: [
  "I led the website and lead-flow redesign with the CEO and SVP of Marketing. The work also put the Hydra design system into the corporate website.",
  "I analyzed how visitors moved through the existing site before making design decisions. Google Analytics showed which devices dominated and how each performed for lead conversion and engagement. Heat maps and scroll maps showed which UI elements and content people engaged with, and which they scrolled straight past.",
  "We could add, remove, or change steps in the lead flow in hours. Each lead carried its test ID, so we could follow a variant through the customer journey.",
  "An additional step routed applicants to the next appropriate channel: agents for higher-value leads, an online experience for lower-value leads, and willing partners for applicants outside our risk criteria."
]
    },
    contributions: [
      { icon: 'fa-thin fa-pen-ruler', label: 'Product Design' },
      { icon: 'fa-thin fa-magnifying-glass-chart', label: 'User Research' },
      { icon: 'fa-thin fa-ruler-triangle', label: 'Prototyping' },
      { icon: 'fa-thin fa-lightbulb', label: 'Design Leadership' },
    ],
    technologies: [
      { icon: 'fa-thin fa-drafting-compass', label: 'Adobe Suite' },
      { icon: 'fa-brands fa-laravel', label: 'Laravel & Statamic' },
      { icon: 'fa-brands fa-bootstrap', label: 'Bootstrap' },
      { icon: 'fa-thin fa-code', label: 'HTML' },
      { icon: 'fa-thin fa-brackets-curly', label: 'CSS/LESS' },
      { icon: 'fa-brands fa-git-alt', label: 'GIT' }
    ],
    media: [
      { type: 'heading', text: 'Homepage' },
      {
        type: 'split-row',
        left: [
          { type: 'text', text: 'Before' },
          { type: 'image', src: '/images/work/opf-modal/brief-befor.png', alt: 'One Park Financial homepage, before redesign' }
        ],
        right: [
          { type: 'text', text: 'After' },
          { type: 'image', src: '/images/work/opf-modal/brief.png', alt: 'One Park Financial homepage, after redesign' }
        ],
        leftSpan: 12,
        rightSpan: 12,
        breakpoint: 'md'
      },
      { type: 'heading', text: 'How It Works' },
      {
        type: 'split-row',
        left: [
          { type: 'text', text: 'Before' },
          { type: 'image', src: '/images/work/opf-modal/hiw-before.png', alt: 'One Park Financial How It Works page, before redesign' }
        ],
        right: [
          { type: 'text', text: 'After' },
          { type: 'image', src: '/images/work/opf-modal/hiw.png', alt: 'One Park Financial How It Works page, after redesign' }
        ],
        leftSpan: 12,
        rightSpan: 12
      },
      { type: 'heading', text: 'About Us' },
      {
        type: 'split-row',
        left: [
          { type: 'text', text: 'Before' },
          { type: 'image', src: '/images/work/opf-modal/about-us-before.png', alt: 'One Park Financial About Us page, before redesign' }
        ],
        right: [
          { type: 'text', text: 'After' },
          { type: 'image', src: '/images/work/opf-modal/about.png', alt: 'One Park Financial About Us page, after redesign' }
        ],
        leftSpan: 12,
        rightSpan: 12
      },
      { type: 'heading', text: 'Module: Our Process' },
      {
        type: 'split-row',
        left: [
          { type: 'text', text: 'Before' },
          { type: 'image', src: '/images/work/opf-modal/mod-proc-before.png', alt: 'One Park Financial Our Process module, before redesign' }
        ],
        right: [
          { type: 'text', text: 'After' },
          { type: 'image', src: '/images/work/opf-modal/mod-proc-after.png', alt: 'One Park Financial Our Process module, after redesign' }
        ],
        leftSpan: 12,
        rightSpan: 12
      },
      { type: 'heading', text: 'Full Homepage' },
      {
        type: 'image-pair',
        desktop: {
          src: '/images/work/opf-modal/home-dt.png',
          alt: 'One Park Financial full homepage, desktop'
        },
        mobile: {
          src: '/images/work/opf-modal/home-mb.png',
          alt: 'One Park Financial full homepage, mobile'
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
    title: 'A/B Testing',
    icon: 'fa-thin fa-vial',
    visible: true,
    summary: '',
    briefHeading: "What we tested, and why",
    briefVariant: 'narrow',
    brief: {
      images: [
        { src: '/images/work/webmd-modal/control.png', alt: 'WebMD homepage control' },
        { src: '/images/work/webmd-modal/winner.png', alt: 'WebMD homepage, variant V1' }
      ],
      paragraphs: [
        "Product marketing owned the hypotheses and traffic. I designed and built the variants, then interpreted the results."
      ]
    },
    contributions: [
      { icon: 'fa-thin fa-flask', label: 'Experimentation' },
      { icon: 'fa-thin fa-chess', label: 'UX Strategy' },
      { icon: 'fa-thin fa-chart-mixed', label: 'Data Analysis' },
      { icon: 'fa-thin fa-code', label: 'Implementation' },
    ],
    technologies: [
      { icon: 'fa-thin fa-bullseye-arrow', label: 'Adobe Target' },
      { icon: 'fa-brands fa-wordpress-simple', label: 'WordPress' }
    ],
    media: [
      {
        type: 'split-row',
        reverse: true,
        left: [
          {
            type: 'image',
            src: '/images/work/split01-modal/web-md-thumb.png',
            alt: '',
            shape: 'circle',
            bordered: true
          }
        ],
        right: [
          { type: 'heading', text: 'WebMD Demographic Test' },
          {
            type: 'text',
            text: "Hypothesis: imagery featuring younger adults might fit the WebMD audience better than the imagery used on the core DentalPlans site."
          }
        ],
        leftSpan: 12,
        rightSpan: 12,
        leftSpanXl: 8,
        rightSpanXl: 10,
        hAlign: 'center',
        vAlign: 'center'
      },
      {
        type: 'split-row',
        left: [
          { type: 'heading', text: 'Control' },
          { type: 'image', src: '/images/work/webmd-modal/control.png', alt: 'WebMD homepage, control variant' }
        ],
        right: [
          { type: 'heading', text: "Variant 1" },
          { type: 'image', src: '/images/work/webmd-modal/winner.png', alt: 'WebMD homepage, variant V1' }
        ],
        leftSpan: 12,
        rightSpan: 12
      },
      {
        type: 'split-row',
        left: [
          { type: 'heading', text: "Variant 2" },
          { type: 'image', src: '/images/work/webmd-modal/v2.png', alt: 'WebMD homepage, variant V2' }
        ],
        right: [
          { type: 'heading', text: "Variant 3" },
          { type: 'image', src: '/images/work/webmd-modal/v3.png', alt: 'WebMD homepage, variant V3' }
        ],
        leftSpan: 12,
        rightSpan: 12
      },
      {
        type: 'split-row',
        left: [
          {
            type: 'image',
            src: '/images/work/split01-modal/sc-thumb.png',
            alt: '',
            shape: 'circle',
            bordered: true
          }
        ],
        right: [
          { type: 'heading', text: 'Savings Calculator' },
          {
            type: 'text',
            text: "Hypothesis: additional product information and a recognizable spokesperson might change customer response."
          }
        ],
        leftSpan: 12,
        rightSpan: 12,
        leftSpanXl: 8,
        rightSpanXl: 10,
        hAlign: 'center',
        vAlign: 'center'
      },
      {
        type: 'split-row',
        left: [
          { type: 'heading', text: 'Control' },
          { type: 'image', src: '/images/work/split01-modal/sc-control.png', alt: 'Savings calculator landing page, control variant' }
        ],
        right: [
          { type: 'heading', text: "Variant 1" },
          { type: 'image', src: '/images/work/split01-modal/sc-winner.png', alt: 'Savings calculator landing page, variant V1' }
        ],
        leftSpan: 12,
        rightSpan: 12
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
    summary: "Customers were being asked to call when nobody could answer. I raised the gap with the call-center leader, researched the platform’s API, and worked with engineering and business intelligence on a status feed. The website could then change its message and offer when phone support was unavailable.",
    brief: {
      image: { src: '/images/work/ccux-modal/flow.png', alt: 'Call center availability API flow diagram' },
      paragraphs: [
        "Customers were being asked to call when nobody could answer. I raised the gap with the call-center leader, researched the platform’s API, and worked with engineering and business intelligence on a status feed. The website could then change its message and offer when phone support was unavailable."
      ]
    },
    contributions: [
      { icon: 'fa-thin fa-clipboard-list-check', label: 'Project Leadership' },
    ],
    technologies: [
      {
        icon: 'fa-thin fa-project-diagram',
        label: 'API'
      },
      { icon: 'fa-thin fa-drafting-compass', label: 'Adobe Target' }
    ],
    media: [
      { type: 'heading', text: 'Messaging and State Change', level: 4, icon: 'fa-thin fa-message-lines', treatment: 'section' },
      {
        type: 'text',
        text: 'Our API checked the status of the call center every five minutes and updated the messaging with visual indicators on the website. We logged the status changes and calls for tracking. We had a unique promotional code that would only appear when the call center was not available.'
      },
      { type: 'call-center-states' }
    ]
  },
  {
    id: 'marketing-auto',
    section: 'work',
    display: 'thumb',
    disciplines: ['Product'],
    order: 8,
    title: 'Data-Driven Personalization',
    icon: 'fa-thin fa-bullseye-arrow',
    modalTitle: 'Data-Driven Personalization',
    visible: true,
    summary: "I led design and development for a personalized marketing campaign spanning several brands and touchpoints. Content and incentives changed by audience and by where the customer was in the campaign.",
    brief: {
      image: { src: '/images/work/ma-modal/automation.gif', alt: 'Animated walkthrough of the marketing automation workflow' },
      paragraphs: [
        "I led design and development for a personalized marketing campaign spanning several brands and touchpoints. Content and incentives changed by audience and by where the customer was in the campaign."
      ]
    },
    contributions: [
      { icon: 'fa-thin fa-pen-ruler', label: 'UX & UI Design' },
      { icon: 'fa-thin fa-phone-laptop', label: 'Responsive Design' },
      { icon: 'fa-thin fa-lightbulb', label: 'Design Leadership' },
      { icon: 'fa-thin fa-solar-system', label: 'Integration Strategy' },
    ],
    technologies: [
      { icon: 'fa-thin fa-drafting-compass', label: 'Adobe Suite' },
      { icon: 'fa-thin fa-drafting-compass', label: 'Adobe Scene7' },
      { icon: 'fa-thin fa-drafting-compass', label: 'Aprimo' },
      { icon: 'fa-thin fa-code', label: 'HTML' },
      { icon: 'fa-thin fa-brackets-curly', label: 'CSS' },
      { icon: 'fa-thin fa-brackets-curly', label: 'JS' }
    ],
    media: [
      { type: 'heading', text: 'Results' },
      {
        type: 'text',
        text: "I worked with marketing, business analysis, and data teams to build the campaign around the platform’s shared data and reusable content. Campaign managers could manage variants through the system."
      },
      {
        type: 'split-row',
        left: [
          { type: 'heading', text: 'Before' },
          { type: 'image', src: '/images/work/ma-modal/ma-36.png', alt: 'Personalized campaign email, before optimization', flush: true }
        ],
        right: [
          { type: 'heading', text: 'After' },
          { type: 'image', src: '/images/work/ma-modal/ma-3b.png', alt: 'Personalized campaign email, after optimization', flush: true }
        ],
        leftSpan: 12,
        rightSpan: 12,
        leftSpanXl: 8,
        rightSpanXl: 8,
        hAlign: 'center'
      }
    ]
  },
  {
    id: 'workshops',
    section: 'work',
    display: 'thumb',
    disciplines: ['Leadership'],
    order: 9,
    title: 'Team Workshops',
    icon: 'fa-thin fa-screen-users',
    visible: true,
    summary: '',
    brief: {
      image: { src: '/images/work/workshop/ideas.jpg', alt: 'Workshop wall covered in sticky notes from a brainstorming session' },
      paragraphs: [
        "I design workshops around the decision the group needs to make. The work has included customer journeys, product direction, and conversion-testing plans, with people from different disciplines in the room. I prepare the activities and materials so the session can produce something the team can use afterward.",
      ]
    },
    briefHeading: 'Solving the Right Problems',
    contributions: [
      { icon: 'fa-thin fa-lightbulb', label: 'Workshop Facilitation' },
    ],
    technologies: [
      { icon: 'fa-thin fa-chalkboard', label: 'Whiteboard' },
      { icon: 'fa-thin fa-marker', label: 'Dry Erase Markers' },
      { icon: 'fa-thin fa-notes', label: 'Post-it Notes' },
      { icon: 'fa-thin fa-brain', label: 'Brains' }
    ],
    media: [
      { type: 'heading', text: 'Types of Workshops I’ve Facilitated' },
      {
        type: 'icon-grid',
        items: [
          {
            image: { src: '/images/work/workshop/cover.jpg', alt: 'Content Strategy' },
            title: 'Creative Brainstorming'
          },
          {
            image: { src: '/images/work/workshop/cover-02.jpg', alt: 'Content Strategy' },
            title: 'UX/UI Strategy'
          },
          {
            image: { src: '/images/work/workshop/planning.jpg', alt: 'Content Strategy' },
            title: 'CRO Testing Strategy'
          }
        ],
        cols: 1,
        colsLg: 3
      }
    ]
  },
  {
    id: 'roadmap',
    section: 'work',
    display: 'thumb',
    disciplines: ['Product', 'Leadership'],
    order: 10,
    title: 'UX Roadmaps',
    icon: 'fa-thin fa-mouse-field',
    visible: true,
    summary: '',
    brief: {
      image: { src: '/images/work/roadmap/rm.jpg', alt: 'Obfuscated UX roadmap in Lucidchart' },
      paragraphs: [
        "I use a roadmap to make the next decision visible: who needs the work, what problem it solves, and what has to happen before it can start.",
        'I built the 2022 UX Roadmap for One Park Financial using the framework detailed under “Example UX Roadmap.”',
        "The plan has to survive new information. I make the dependencies visible so a change in scope can lead to a new sequence."
      ]
    },
    briefHeading: 'Are we there yet?',
    contributions: [
      { icon: 'fa-thin fa-map', label: 'UX Roadmapping' },
    ],
    technologies: [{ icon: 'fa-thin fa-chalkboard', label: 'Lucidchart' }],
    media: [
      { type: 'heading', text: 'Example UX Roadmap: obfuscated for client protection' },
      { type: 'text', text: 'Structure and Components' },
      {
        type: 'styled-list',
        numbered: true,
        shadow: true,
        items: [
          {
            label: 'Roadmap Title:',
            body: 'A name that is memorable and resonates with the top-level goals if possible.',
            bg: 'prime'
          },
          {
            label: 'Roadmap Owner:',
            body: 'Set accountability and identify a point person for questions about the roadmap.',
            bg: 'second'
          },
          {
            label: 'High-Level Goals/Vision:',
            body: 'Larger company strategy, vision, or specific goals that the roadmap aligns to.',
            bg: 'third'
          },
          {
            label: 'Timeline:',
            body: 'Now → Next → Later (note: these are not specific dates, but what should be tackled first).',
            bg: 'fourth'
          },
          {
            label: 'Specific Projects or Initiatives:',
            bg: 'pop',
            subItems: [
              'Project Title / Number',
              'Beneficiary',
              'Need',
              'Business Objectives',
              'Team Dependencies'
            ]
          }
        ]
      },
      { type: 'text', text: 'Project Card:' },
      {
        type: 'card',
        shadow: true,
        header: 'Project Title',
        rows: [
          {
            label: 'Beneficiary:',
            body: 'The prioritized recipient(s) of the work (e.g., Merchants, Agents, Internal Stakeholders)'
          },
          { label: 'Need:', body: 'The problem that will be solved or the purpose.' },
          {
            label: 'Business Objective(s):',
            body: "The intended business outcome and how the team will judge success."
          },
          { label: 'Team:', body: 'Who is involved.' }
        ]
      },
      // Legacy kept label + hr + image in one column with mt-5 (modal-roadmap
      // .html:133-137) — a title for the chart below, not a caption for the
      // block above. `heading` restores the h3, the rule, and the lead-in.
      { type: 'heading', text: 'Obfuscated Lucidchart' },
      { type: 'image', src: '/images/work/roadmap/l-chart.jpg', alt: 'Lucid Chart', flush: true }
    ]
  },
  {
    id: 'personas',
    section: 'work',
    display: 'thumb',
    disciplines: ['UX Research', 'Product'],
    order: 11,
    title: 'Personas',
    icon: 'fa-thin fa-masks-theater',
    visible: true,
    summary: '',
    brief: {
      image: { src: '/images/work/kitchen-sink/Persona-Cards.png', alt: 'Frugal Francine persona card with demographics, motivations, preferences, channels, and reasons to buy.' },
      paragraphs: [
        "I worked with business intelligence and product marketing on personas for the DentalPlans audience. One was Frugal Francine, representing customers who weighed dental-plan choices around cost and value."
      ]
    },
    briefHeading: "A cost-conscious customer persona",
    contributions: [
      { icon: 'fa-thin fa-handshake', label: 'Project Collaboration' },
      { icon: 'fa-thin fa-fill-drip', label: 'Visual Design' },
    ],
    technologies: [{ icon: 'fa-thin fa-drafting-compass', label: 'Adobe Suite' }],
    media: []
  },
  {
    id: 'reveal',
    section: 'work',
    display: 'thumb',
    disciplines: ['Brand', 'Visual'],
    order: 12,
    title: 'Reveal',
    thumb: { src: '/images/work/kitchen-sink/reveal-cover.png', alt: 'Reveal Aligners campaign, The choice is clear' },
    modalTitle: 'Reveal Aligners',
    visible: true,
    summary: "For Reveal Clear Aligners, I developed copy and visual concepts around the idea of clarity. The examples below show the campaign directions I worked on.",
    brief: {
      image: { src: '/images/work/kitchen-sink/reveal-cover.jpg', alt: '' },
      paragraphs: [
        "For Reveal Clear Aligners, I developed copy and visual concepts around the idea of clarity. The examples below show the campaign directions I worked on."
      ]
    },
    contributions: [
      { icon: 'fa-thin fa-lightbulb', label: 'Concept Development' },
      { icon: 'fa-thin fa-handshake', label: 'Collaboration' },
      { icon: 'fa-thin fa-fill-drip', label: 'Visual Design' },
    ],
    inlineContributions: true,
    technologies: [],
    heroCardsHeading: 'The thinking behind the idea',
    heroCardsIcon: 'fa-thin fa-brain',
    heroCards: [
      {
        icon: 'fa-thin fa-lightbulb-on',
        label: "Yup, It's That Clear:",
        body: "A direct statement of the campaign’s clarity idea."
      },
      {
        icon: 'fa-thin fa-lightbulb-on',
        label: "So Clear, Like It's Not Even There:",
        body: "A playful expression of subtle appearance."
      },
      {
        icon: 'fa-thin fa-lightbulb-on',
        label: 'OMG, Your Aligner Is Showing:',
        body: "A deliberately provocative concept about visibility."
      }
    ],
    heroMedia: [
      {
        type: 'text',
        text: 'Each concept had to sit inside one overarching campaign theme while standing on its own in a paid placement. The through-line was simple: the choice of Reveal Clear Aligners was, itself, clear.'
      },
      { type: 'contributions' },
    ],
    media: [
      { type: 'heading', text: 'Visual expression of the concept', level: 4, icon: 'fa-thin fa-fill-drip', treatment: 'section' },
      {
        type: 'image-row',
        images: [
          {
            src: '/images/work/kitchen-sink/reveal-clear-01.jpg',
            alt: 'Reveal Clear Aligners campaign concept, clarity theme, first execution'
          },
          {
            src: '/images/work/kitchen-sink/reveal-clear-02.jpg',
            alt: 'Reveal Clear Aligners campaign concept, clarity theme, second execution'
          }
        ],
        cols: [ 12, 12 ],
        mobileDivider: true
      },
      {
        type: 'image-row',
        images: [
          {
            src: '/images/work/kitchen-sink/reveal-omg-01.jpg',
            alt: 'Reveal Clear Aligners campaign concept, OMG Your Aligner Is Showing'
          }
        ],
        cols: [ 12 ],
        mobileDivider: true
      }
    ]
  },
  {
    id: 'viva',
    section: 'work',
    display: 'thumb',
    disciplines: ['Brand', 'UX Research'],
    order: 13,
    title: 'Viva',
    thumb: { src: '/images/work/viva-modal/vs-3.png', alt: 'Viva Medicare brand campaign concept' },
    modalTitle: 'Viva Medicare',
    visible: true,
    summary: 'I developed a brand for Medicare and Medicare Supplement plans, grounded in our product and customer research. Working with executive leadership and a cross-functional team, I ran the concept through several rounds of branding exercises.',
    brief: {
      image: { src: '/images/work/viva-modal/brief.png', alt: '' },
      paragraphs: [
        'I developed a brand for Medicare and Medicare Supplement plans, grounded in our product and customer research. Working with executive leadership and a cross-functional team, I ran the concept through several rounds of branding exercises.',
        "The marks, palettes, and interface treatments shown here are my work. These variations show the directions explored for the brand."
      ]
    },
    contributions: [
      { icon: 'fa-thin fa-lightbulb', label: 'Concept Development' },
      { icon: 'fa-thin fa-handshake', label: 'Collaboration' },
      { icon: 'fa-thin fa-fill-drip', label: 'Visual Design' },
    ],
    technologies: [],
    media: [
      { type: 'heading', text: 'Logo Design' },
      {
        type: 'split-row',
        left: [
          { type: 'image', src: '/images/work/viva-modal/logo-design-stack.png', alt: 'Viva Medicare logo, stacked lockup', flush: true }
        ],
        right: [
          { type: 'image', src: '/images/work/viva-modal/logo-design-inline.png', alt: 'Viva Medicare logo, inline lockup', flush: true }
        ],
        leftSpan: 12,
        rightSpan: 12,
        vAlign: 'center'
      },
      { type: 'heading', text: 'Color Study' },
      {
        type: 'image',
        src: '/images/work/viva-modal/colors.png',
        alt: 'Viva Medicare color study',
        flush: true
      },
      { type: 'heading', text: 'Visual Style and Tone' },
      {
        type: 'image',
        src: '/images/work/viva-modal/vs-1.png',
        alt: 'Viva Medicare visual style exploration, option one'
      },
      {
        type: 'image-row',
        images: [
          {
            src: '/images/work/viva-modal/vs-2.png',
            alt: 'Viva Medicare visual style exploration, option two'
          },
          {
            src: '/images/work/viva-modal/vs-3.png',
            alt: 'Viva Medicare visual style exploration, option three'
          }
        ],
        cols: [ 12, 12 ]
      },
      { type: 'heading', text: 'Homepage Hero Concepts' },
      {
        type: 'image',
        src: '/images/work/viva-modal/hero-1.png',
        alt: 'Viva Medicare hero concept, option one'
      },
      {
        type: 'image',
        src: '/images/work/viva-modal/hero-2.png',
        alt: 'Viva Medicare hero concept, option two'
      },
      { type: 'heading', text: 'UI Components & Style' },
      { type: 'heading', text: 'Buttons' },
      {
        type: 'image',
        src: '/images/work/viva-modal/buttons.png',
        alt: 'Viva Medicare button styles',
        flush: true
      },
      { type: 'heading', text: 'Inputs' },
      {
        type: 'image',
        src: '/images/work/viva-modal/inputs.png',
        alt: 'Viva Medicare form input styles',
        flush: true
      },
      { type: 'heading', text: 'Navigation' },
      {
        type: 'image',
        src: '/images/work/viva-modal/nav.png',
        alt: 'Viva Medicare navigation design',
        flush: true
      }
    ]
  },
  {
    id: 'wrong',
    section: 'work',
    display: 'thumb',
    disciplines: ['Brand', 'Visual'],
    order: 14,
    title: 'Wrong',
    thumb: { src: '/images/work/kitchen-sink/wrong-cover.jpg', alt: 'The Wrong campaign portrait' },
    heroBrandImage: { src: '/assets/featured/dentalplans-icon.svg', alt: 'DentalPlans.com' },
    modalTitle: 'The Wrong Campaign',
    visible: true,
    summary: "The campaign addressed people searching for crowns, fillings, and root canals who were concerned about cost. Its task was to introduce dental savings plans as another option.",
    brief: {
      image: { src: '/images/work/kitchen-sink/wrong-cover.jpg', alt: '' },
      paragraphs: [
        "The campaign addressed people searching for crowns, fillings, and root canals who were concerned about cost. Its task was to introduce dental savings plans as another option.",
        'Campaign Concept:',
        "The campaign challenged the assumption that dental care was out of reach. “WRONG” was the creative device. The design question was whether that provocation could earn attention without making the person feel blamed."
      ]
    },
    briefLabels: ['Campaign Concept:'],
    contributions: [
      { icon: 'fa-thin fa-lightbulb', label: 'Design Leadership' },
      { icon: 'fa-thin fa-handshake', label: 'Collaboration' },
      { icon: 'fa-thin fa-fill-drip', label: 'Visual Design' },
    ],
    technologies: [],
    media: [
      { type: 'text', text: 'Visual and Messaging Strategy:' },
      {
        type: 'styled-list',
        items: [
          {
            icon: 'fa-thin fa-eye',
            label: 'Visual Approach:',
            body: "Bold headlines carried the campaign message."
          },
          {
            icon: 'fa-thin fa-people-group',
            label: 'Inclusivity:',
            body: "The visual variants showed adults of different ages and backgrounds."
          },
          {
            icon: 'fa-thin fa-flag-checkered',
            label: 'Execution:',
            body: "The landing page and hero versions below were prepared for conversion testing."
          }
        ]
      },
      { type: 'heading', text: 'Hero Variants for Testing' },
      {
        type: 'image-row',
        images: [
          {
            src: '/images/work/kitchen-sink/wrong-hero-hip-lady.jpg',
            alt: 'Wrong campaign hero, younger woman'
          },
          {
            src: '/images/work/kitchen-sink/wrong-hero-hip-senior.jpg',
            alt: 'Wrong campaign hero, active senior man'
          }
        ],
        cols: [ 12, 12 ],
        mobileDivider: true
      },
      {
        type: 'image-row',
        images: [
          {
            src: '/images/work/kitchen-sink/wrong-hero-kid.jpg',
            alt: 'Wrong campaign hero, child'
          },
          {
            src: '/images/work/kitchen-sink/wrong-hero-family.jpg',
            alt: 'Wrong campaign hero, family'
          }
        ],
        cols: [ 12, 12 ],
        mobileDivider: true
      },
      {
        type: 'image-row',
        images: [
          {
            src: '/images/work/kitchen-sink/wrong-hero-senior-single.jpg',
            alt: 'Wrong campaign hero, senior woman'
          },
          {
            src: '/images/work/kitchen-sink/wrong-hero-senior-couple.jpg',
            alt: 'Wrong campaign hero, senior couple'
          }
        ],
        cols: [ 12, 12 ],
        mobileDivider: true
      },
      { type: 'heading', text: 'Full Landing Page' },
      {
        type: 'image',
        src: '/images/work/kitchen-sink/wrong-full-lp.jpg',
        alt: 'Wrong campaign full landing page'
      }
    ]
  }
]
