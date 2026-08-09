// Auto-ported from the legacy modal HTML files (components/modal-*.html).
// Adding a project: add ONE object here (+ its images under /images).
// Removing a project: flip `visible` to false — data is retained.

export interface ProjectImage {
  src: string
  alt: string
}

export interface ProjectMetric {
  value: string
  direction: 'up' | 'down'
  label: string
}

// Mirrors the six --color-* brand tokens in app/globals.css (prime/second/
// third/fourth/fifth/pop), each with a -light/-dark variant.
export type BrandToken = 'prime' | 'second' | 'third' | 'fourth' | 'fifth' | 'pop'

export interface StyledListItem {
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

export type ProjectMedia =
  | {
      type: 'heading'
      text: string
      level?: 2 | 3 | 4 | 5
      icon?: string
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
  | { type: 'contributions' } // zero-config marker: renders project.contributions inline in media[]

export interface ProjectBadge {
  icon: string // FA Pro icon classes
  label: string
}

export interface Project {
  id: string // stable slug, used by the modal
  title: string // section/card title (and thumb label)
  modalTitle?: string // legacy modal header title when it differs
  section: 'work' | 'visual-design'
  display: 'feature' | 'thumb' // editorial row vs thinking-thumb button
  visible: boolean // false = removed from render, data retained
  order: number
  subtitle?: string // feature-card strapline (p.h5)
  summary: string // feature-card summary
  icon?: string // FA icon for work thumbs
  thumb?: ProjectImage // visual-design thumb background
  cardImage?: ProjectImage // feature-card image
  brief: { image?: ProjectImage; paragraphs: string[] }
  briefHeading?: string // legacy's custom h3 next to the brief image, default 'Project Brief:'
  contributions: ProjectBadge[]
  // true when legacy interleaves the Contributions badges among the modal's
  // custom prose (reveal) rather than right after the brief — skips the
  // fixed post-brief slot so a `{ type: 'contributions' }` media block can
  // render them at the correct position instead.
  inlineContributions?: boolean
  technologies: ProjectBadge[]
  media: ProjectMedia[] // preserves the legacy modal section order
}

export const projects: Project[] = [
  {
    id: 'webmd',
    section: 'work',
    display: 'feature',
    order: 1,
    title: 'WebMD',
    subtitle: 'eCommerce Website',
    cardImage: { src: '/images/work/WebMD-HM.png', alt: 'WebMD eCommerce website' },
    summary: "Internet Brands wanted to open up new opportunities for growth across their portfolio. One of these efforts was combining the strength of WebMD's brand and DentalPlans product.",
    visible: true,
    brief: {
      image: { src: '/images/work/webmd-modal/brief-2.png', alt: '' },
      paragraphs: [
        "Internet Brands wanted to open up new opportunities for growth across their portfolio. One of these efforts was combining the strength of WebMD's brand and DentalPlans product with a new eCommerce website. The challenge: we had less than eight weeks to plan and launch. We did it in six!"
      ]
    },
    contributions: [
      { icon: 'fa-regular fa-lightbulb-on', label: 'Creative Lead' },
      { icon: 'fa-regular fa-pencil-ruler', label: 'UX/UI Design' },
      { icon: 'fa-regular fa-laptop-code', label: 'Front-end Dev' },
      { icon: 'fa-regular fa-ruler-triangle', label: 'Wireframes' },
      { icon: 'fa-regular fa-clipboard-list-check', label: 'Project Lead' },
      { icon: 'fa-regular fa-phone-laptop', label: 'Device Testing' },
      { icon: 'fa-regular fa-user-chart', label: 'User Testing' },
      { icon: 'fa-regular fa-vial', label: 'A/B Testing' }
    ],
    technologies: [
      { icon: 'fa-regular fa-drafting-compass', label: 'Adobe Suite' },
      { icon: 'fa-brands fa-wordpress-simple', label: 'WordPress' },
      { icon: 'fa-brands fa-bootstrap', label: 'Bootstrap' },
      { icon: 'fa-regular fa-code', label: 'HTML' },
      { icon: 'fa-regular fa-brackets-curly', label: 'CSS/LESS' },
      { icon: 'fa-brands fa-git-alt', label: 'GIT' }
    ],
    media: [
      { type: 'heading', text: 'Homepage' },
      {
        type: 'image-pair',
        desktop: {
          src: '/images/work/webmd-modal/home-dt.png',
          alt: 'WebMD Homepage Desktop by Jacob Medley'
        },
        mobile: {
          src: '/images/work/webmd-modal/home-mb.png',
          alt: 'WebMD Homepage Mobile  by Jacob Medley'
        }
      },
      { type: 'heading', text: 'Plan Search Results' },
      {
        type: 'image-pair',
        desktop: {
          src: '/images/work/webmd-modal/plan-search-dt.png',
          alt: 'WebMD Homepage Desktop by Jacob Medley'
        },
        mobile: {
          src: '/images/work/webmd-modal/plan-search-mb.png',
          alt: 'WebMD Homepage Mobile  by Jacob Medley'
        }
      },
      { type: 'heading', text: 'Plan Compare' },
      {
        type: 'image-pair',
        desktop: {
          src: '/images/work/webmd-modal/plan-compare-dt.png',
          alt: 'WebMD Homepage Desktop by Jacob Medley'
        },
        mobile: {
          src: '/images/work/webmd-modal/plan-compare-mb.png',
          alt: 'WebMD Homepage Mobile  by Jacob Medley'
        }
      },
      { type: 'heading', text: 'Plan Details' },
      {
        type: 'image-pair',
        desktop: {
          src: '/images/work/webmd-modal/plan-details-dt.png',
          alt: 'WebMD Homepage Desktop by Jacob Medley'
        },
        mobile: {
          src: '/images/work/webmd-modal/plan-details-mb.png',
          alt: 'WebMD Homepage Mobile  by Jacob Medley'
        }
      },
      { type: 'heading', text: 'Dentist Search Results' },
      {
        type: 'image-pair',
        desktop: {
          src: '/images/work/webmd-modal/dentist-search-dt.png',
          alt: 'WebMD Homepage Desktop by Jacob Medley'
        },
        mobile: {
          src: '/images/work/webmd-modal/dentist-search-mb.png',
          alt: 'WebMD Homepage Mobile  by Jacob Medley'
        }
      },
      { type: 'heading', text: 'Dentist Details' },
      {
        type: 'image-pair',
        desktop: {
          src: '/images/work/webmd-modal/dentist-profile-dt.png',
          alt: 'WebMD Homepage Desktop by Jacob Medley'
        },
        mobile: {
          src: '/images/work/webmd-modal/dentist-profile-mb.png',
          alt: 'WebMD Homepage Mobile  by Jacob Medley'
        }
      },
      { type: 'heading', text: 'Cart' },
      {
        type: 'image-pair',
        desktop: {
          src: '/images/work/webmd-modal/cart-dt.png',
          alt: 'WebMD Homepage Desktop by Jacob Medley'
        },
        mobile: {
          src: '/images/work/webmd-modal/cart-mb.png',
          alt: 'WebMD Homepage Mobile  by Jacob Medley'
        }
      }
    ]
  },
  {
    id: 'dentalplans',
    section: 'work',
    display: 'feature',
    order: 2,
    title: 'DentalPlans.com',
    subtitle: 'Product Framework and Design System',
    cardImage: {
      src: '/images/work/dpprod-modal/dpprod-hm.png',
      alt: 'DentalPlans product framework'
    },
    summary: "I led the design and front-end development of product-focused sites for DentalPlans.com. Over the course of a year, what started as a tiny product site initiative evolved into a core component of DentalPlans' business. This initiative developed into a framework for rapidly designing and launching product eCommerce websites for Cigna, Aetna, WebMD, and Lower My Dental Bills (LMDB).",
    modalTitle: 'Product Framework and Design System',
    visible: true,
    brief: {
      image: { src: '/images/work/dpprod-modal/brief.png', alt: '' },
      paragraphs: [
        "DentalPlans.com, a marketplace for dental savings and insurance plans, identified an opportunity to create brand-focused product sites for larger partners. These sites would highlight specific brands, cater to customers’ preferences, and optimize sales and conversions by crafting individualized brand experiences.",
        'This case study highlights how a small, lean team transformed an idea for a single product-focused site into a robust framework supporting rapid product site deployment, a multi-brand design system, and microservices that drive significant business results.'
      ]
    },
    contributions: [
      { icon: 'fa-regular fa-boxes-stacked', label: 'Product Owner' },
      { icon: 'fa-regular fa-solar-system', label: 'System Design' },
      { icon: 'fa-regular fa-pencil-ruler', label: 'UX/UI Design' },
      { icon: 'fa-regular fa-laptop-code', label: 'Front-end Dev' }
    ],
    technologies: [
      { icon: 'fa-regular fa-drafting-compass', label: 'Adobe Suite' },
      { icon: 'fa-brands fa-wordpress-simple', label: 'WordPress' },
      { icon: 'fa-brands fa-bootstrap', label: 'Bootstrap' },
      { icon: 'fa-regular fa-code', label: 'HTML' },
      { icon: 'fa-regular fa-brackets-curly', label: 'CSS/LESS' },
      { icon: 'fa-regular fa-elephant', label: 'PHP' },
      { icon: 'fa-regular fa-gear-code', label: 'DevOps Pipelines' },
      { icon: 'fa-brands fa-git-alt', label: 'GIT' },
      { icon: 'fa-regular fa-webhook', label: 'APIs' }
    ],
    media: [
      {
        type: 'metric-grid',
        heading: 'Business Results — DentalPlans.com Partner Platform, 2015–2021',
        metrics: [
          { value: '47%', direction: 'up', label: 'New Revenue' },
          { value: '20%', direction: 'up', label: 'Company Revenue' },
          { value: '27%', direction: 'up', label: 'Lead Generation' },
          { value: '66%', direction: 'down', label: 'Reduced Project Timelines' }
        ],
        valueCreated: {
          heading: 'Value Created',
          items: [
            'Large-scale efforts by a small, lean team',
            'Scalable Product Features',
            'Rapid launch and learn efforts and conversion rate optimization',
            'Proprietary platform and systems owned by the company'
          ]
        }
      },
      {
        type: 'progress-diagram',
        heading: 'The System Framework',
        bands: [
          {
            heading: 'Individual Product Sites',
            icon: 'fa-sharp fa-regular fa-box',
            bg: 'dark-subtle',
            textColor: 'black',
            rows: [
              {
                cols: 5,
                cells: [
                  {
                    label: 'Cigna',
                    icon: 'fa-light fa-box',
                    bg: 'second',
                    striped: false,
                    sub: {
                      icon: 'fa-regular fa-palette',
                      label: 'Brand Theme',
                      bg: 'second-light',
                      textColor: 'second-dark'
                    }
                  },
                  {
                    label: 'Aetna',
                    icon: 'fa-light fa-box',
                    bg: 'prime',
                    striped: false,
                    sub: {
                      icon: 'fa-regular fa-palette',
                      label: 'Brand Theme',
                      bg: 'prime-light',
                      textColor: 'prime-dark'
                    }
                  },
                  {
                    label: 'WebMD',
                    icon: 'fa-light fa-box',
                    bg: 'third',
                    striped: false,
                    sub: {
                      icon: 'fa-regular fa-palette',
                      label: 'Brand Theme',
                      bg: 'third-light',
                      textColor: 'third-dark'
                    }
                  },
                  {
                    label: 'LMDB',
                    icon: 'fa-light fa-box',
                    bg: 'fourth',
                    striped: false,
                    sub: {
                      icon: 'fa-regular fa-palette',
                      label: 'Brand Theme',
                      bg: 'fourth-light',
                      textColor: 'fourth-dark'
                    }
                  },
                  {
                    label: 'Documentation',
                    icon: 'fa-light fa-box',
                    bg: 'fifth',
                    striped: false,
                    sub: {
                      icon: 'fa-regular fa-palette',
                      label: 'Brand Theme',
                      bg: 'fifth-light',
                      textColor: 'fifth-dark'
                    }
                  }
                ]
              }
            ]
          },
          {
            heading: 'Core Framework',
            icon: 'fa-sharp fa-regular fa-boxes-stacked',
            bg: 'fifth-dark',
            textColor: 'white',
            rows: [
              {
                cols: 5,
                cells: [
                  { label: 'API Integration', icon: 'fa-regular fa-webhook', bg: 'fifth-light', textColor: 'fifth-dark', striped: false },
                  { label: 'Component Libraries', icon: 'fa-regular fa-square-code', bg: 'fifth-light', textColor: 'fifth-dark', striped: false },
                  { label: 'Pattern Library', icon: 'fa-regular fa-layer-group', bg: 'fifth-light', textColor: 'fifth-dark', striped: false },
                  { label: 'CMS', icon: 'fa-brands fa-wordpress-simple', bg: 'fifth-light', textColor: 'fifth-dark', striped: false },
                  { label: 'Pipelines', icon: 'fa-regular fa-gear-code', bg: 'fifth-light', textColor: 'fifth-dark', striped: false }
                ]
              }
            ]
          },
          {
            heading: 'Microservices',
            icon: 'fa-regular fa-webhook',
            bg: 'fifth-light',
            textColor: 'fifth-dark',
            rows: [
              {
                cols: 5,
                cells: [
                  { label: 'Plan Details', icon: 'fa-regular fa-webhook', bg: 'fifth', striped: false },
                  { label: 'Dentist Search', icon: 'fa-regular fa-webhook', bg: 'fifth', striped: false },
                  { label: 'Lead Create', icon: 'fa-regular fa-webhook', bg: 'fifth', striped: false },
                  { label: 'Call Center Status', icon: 'fa-sharp fa-regular fa-headset', bg: 'fifth', striped: false },
                  { label: 'Google Maps (API)', icon: 'fa-regular fa-webhook', bg: 'fifth', striped: false }
                ]
              }
            ]
          }
        ]
      },
      { type: 'divider' },
      {
        type: 'split-row',
        left: [{ type: 'image', src: '/images/work/dpprod-modal/rocket.png', alt: '', shape: 'circle', bordered: true }],
        leftSpanXl: 10,
        rightSpanXl: 14,
        rightSelfAlign: 'center',
        right: [
          { type: 'heading', text: 'Key Features', level: 4 },
          {
            type: 'list',
            items: [
              'Product Design Framework: Enabled updates, testing, and conversion rate optimization at scale.',
              'Multi-Brand Design System: One-to-one design and development architecture, ensuring rapid prototyping with minimal variance between design and code.',
              'Microservices and APIs: Provided product information, dentist search, and shopping cart functionalities.',
              'Sales and Promotional Management: Scheduling, versioning, and expiry handling for offers across every partner site.',
              'Robust Marketing and Campaign Tracking: Included PPC, affiliate, and organic tracking.',
              'Knowledge Base and Documentation: Supported designers and developers with comprehensive resources.',
              'DevOps Pipelines: Facilitated global system updates and individual feature deployments across all sites or single sites.'
            ]
          }
        ]
      },
      { type: 'heading', text: 'The Journey', level: 2, icon: 'fa-light fa-map-location-dot', sectionDivider: true },
      {
        type: 'split-row',
        reverse: true,
        left: [{ type: 'image', src: '/images/work/dpprod-modal/mvp-one.png', alt: '', shape: 'circle', widthPct: 75, bordered: true }],
        leftSpanXl: 10,
        rightSpanXl: 14,
        rightSelfAlign: 'center',
        right: [
          { type: 'heading', text: 'Iteration One: Initial Launch and Learnings', level: 4 },
          {
            type: 'text',
            text: 'With limited resources and a busy engineering team, the marketing and design team had to take the lead. Our SVP of Marketing, Bill Chase, asked, "You know WordPress, right? How fast can you stand up a website?"'
          },
          { type: 'heading', text: 'Plan:', level: 4 },
          {
            type: 'text',
            text: 'We adopted an iterative approach, focusing on speed to market while minimizing engineering involvement. We designed a simple product flow for a single plan product launch to gauge customer response. Engineering created a service to pass products into our shopping cart system, with plans to expand capabilities for a white-label eCommerce platform.'
          },
          {
            type: 'text',
            text: 'I built a Bootstrap-based WordPress theme covering the home, contact, about, and product detail pages, plus add-to-cart functionality. Future updates were anticipated, allowing the theme to adapt to different products and pass information to the shopping cart.'
          },
          { type: 'heading', text: 'Results:', level: 4 },
          {
            type: 'text',
            text: 'The launch showed moderately higher conversion rates and a lower cost per acquisition (CPA) compared to our core site. This proved the viability of partnering with plan providers and focusing on customer loyalty and intent, prompting leadership to launch a second site.'
          }
        ]
      },
      { type: 'divider' },
      {
        type: 'split-row',
        left: [{ type: 'image', src: '/images/work/dpprod-modal/mvp-two.png', alt: '', shape: 'circle', widthPct: 75, bordered: true }],
        leftSpanXl: 10,
        rightSpanXl: 14,
        rightSelfAlign: 'center',
        right: [
          { type: 'heading', text: 'Iteration Two: Scaling and Optimization', level: 4 },
          {
            type: 'text',
            text: 'With the success of the first site, we faced new challenges. The second site needed dynamic content and a seamless brand experience from the initial interaction to the shopping cart. We started two new projects: a full white-label shopping cart with microservices for product information and a comprehensive A/B testing and conversion rate optimization initiative.'
          },
          { type: 'heading', text: 'Results:', level: 4 },
          {
            type: 'text',
            text: 'The second site launched with similar results, providing a solid foundation for future features. We quickly iterated and tested live, planning for future enhancements. The componentized code and design system allowed easy updates and testing, from landing pages to entire user flows.'
          }
        ]
      },
      { type: 'divider' },
      {
        type: 'split-row',
        reverse: true,
        left: [{ type: 'image', src: '/images/work/dpprod-modal/mvp-three.png', alt: '', shape: 'circle', widthPct: 75, bordered: true }],
        leftSpanXl: 10,
        rightSpanXl: 14,
        rightSelfAlign: 'center',
        right: [
          { type: 'heading', text: 'Iteration Three: Integrating Learnings and Microservices', level: 4 },
          {
            type: 'text',
            text: "We focused on integrating all learnings and finalizing microservices into the framework. This allowed scalable product data and information updates across all sites. The design system's pattern and component libraries ensured seamless updates and integration with microservices."
          },
          { type: 'heading', text: 'Results:', level: 4 },
          {
            type: 'text',
            text: 'We aggressively created landing pages, developed a content strategy for organic growth, and focused on lead generation and conversion rate optimization.'
          }
        ]
      },
      { type: 'divider' },
      {
        type: 'split-row',
        left: [{ type: 'image', src: '/images/work/dpprod-modal/mvp-four.png', alt: '', shape: 'circle', widthPct: 75, bordered: true }],
        leftSpanXl: 10,
        rightSpanXl: 14,
        rightSelfAlign: 'center',
        right: [
          { type: 'heading', text: 'Iteration Four: Dentist Search Feature', level: 4 },
          {
            type: 'text',
            text: 'The final phase involved designing and coding the UX and UI for a dentist search feature. Leveraging our pattern and component libraries, we expedited the development process.'
          },
          { type: 'heading', text: 'Results:', level: 4 },
          {
            type: 'text',
            text: 'The dentist search feature was integrated smoothly, further enhancing the user experience and solidifying our scalable, efficient development framework.'
          }
        ]
      }
    ]
  },
  {
    id: 'bumblebeemd',
    section: 'work',
    display: 'feature',
    order: 3,
    title: 'BumblebeeMD',
    subtitle: 'Brand and Product Development',
    cardImage: { src: '/images/work/BMD-HM.png', alt: 'BumblebeeMD brand' },
    summary: 'I had the privilege to partner with a brilliant brand manager, Tiffany Tibbets, on this project. We worked with executive stakeholders to bring this brand to life. Our goal was to invent a fun and family-focused brand.',
    modalTitle: 'BumblebeeMD',
    visible: true,
    brief: {
      image: { src: '/images/work/bmd-modal/brief.png', alt: '' },
      paragraphs: [
        'I was the creative lead and responsible for the primary concept. We worked with a brand agency to develop the colors and illustrations. I took the final brand elements and incorporated them into the UI design of the site.'
      ]
    },
    contributions: [
      { icon: 'fa-regular fa-lightbulb-on', label: 'Creative Lead' },
      { icon: 'fa-regular fa-pencil-ruler', label: 'UX/UI Design' },
      { icon: 'fa-regular fa-laptop-code', label: 'Front-end Dev' },
      { icon: 'fa-regular fa-ruler-triangle', label: 'Wireframes' },
      { icon: 'fa-regular fa-clipboard-list-check', label: 'Project Lead' },
      { icon: 'fa-regular fa-phone-laptop', label: 'Device Testing' },
      { icon: 'fa-regular fa-user-chart', label: 'User Testing' }
    ],
    technologies: [
      { icon: 'fa-regular fa-drafting-compass', label: 'Adobe Suite' },
      { icon: 'fa-brands fa-wordpress-simple', label: 'WordPress' },
      { icon: 'fa-brands fa-bootstrap', label: 'Bootstrap' },
      { icon: 'fa-regular fa-code', label: 'HTML' },
      { icon: 'fa-regular fa-brackets-curly', label: 'CSS/LESS' },
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
        desktop: { src: '/images/work/bmd-modal/home-wf-dt.png', alt: '' },
        mobile: { src: '/images/work/bmd-modal/home-wf-mb.png', alt: '' }
      }
    ]
  },
  {
    id: 'hydra',
    section: 'work',
    display: 'feature',
    order: 4,
    title: 'Hydra',
    subtitle: 'The Making of a Design System',
    cardImage: { src: '/images/work/hydra/hydra-hm.png', alt: 'Hydra design system' },
    summary: "I championed and implemented the Hydra design system, a large-scale project that unified the customer experience across the company's products and streamlined the design and engineering processes.",
    modalTitle: 'Hydra Design System',
    visible: true,
    brief: {
      image: { src: '/images/work/hydra/brief.png', alt: '' },
      paragraphs: [
        "I championed and implemented the Hydra design system, a large-scale project that unified the customer experience across the company's products and streamlined the design and engineering processes.",
        'Executing the project spanned multiple departments. I presented the issues and plan of action to the SVP of Marketing and the CTO, gaining executive sponsorship and support.'
      ]
    },
    contributions: [
      { icon: 'fa-regular fa-clipboard-list-check', label: 'Project Lead' },
      { icon: 'fa-regular fa-magnifying-glass-chart', label: 'Analysis' },
      { icon: 'fa-regular fa-solar-system', label: 'System Design' },
      { icon: 'fa-regular fa-laptop-code', label: 'System Dev' },
      { icon: 'fa-regular fa-phone-laptop', label: 'Device Testing' }
    ],
    technologies: [
      { icon: 'fa-regular fa-drafting-compass', label: 'Adobe Suite' },
      { icon: 'fa-regular fa-code', label: 'HTML' },
      { icon: 'fa-regular fa-brackets-curly', label: 'CSS/SASS' },
      { icon: 'fa-brands fa-git-alt', label: 'GIT' }
    ],
    media: [
      { type: 'heading', text: 'The Problem' },
      {
        type: 'split-row',
        left: [
          { type: 'heading', text: 'The user experience was fragmented.' },
          {
            type: 'text',
            text: 'Each phase was on a different tech stack and off-brand to boot. There were eight variants of buttons. It got worse from there. Identical components that did the same thing looked different throughout. Error messaging was created ad hoc for each element, with various visual treatments and copy. To add a layer of complexity, it had to support multiple sub-brands.'
          },
          {
            type: 'text',
            text: 'The fragmentation created confusion and unneeded friction for the user. The uncontrolled variety of UI elements created design and technical debt.'
          }
        ],
        right: [
          {
            type: 'image',
            src: '/images/work/hydra/ui-rag.png',
            alt: 'Eight inconsistent button treatments across products',
            caption: 'UX/UI Fragmentation — Button Treatments',
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
            caption: 'UX/UI Fragmentation — Error and Input Treatments (1 of 2)',
            flush: true
          }
        ],
        right: [
          {
            type: 'image',
            src: '/images/work/hydra/error-02.png',
            alt: 'Inconsistent error message and input field treatments, second set',
            caption: 'UX/UI Fragmentation — Error and Input Treatments (2 of 2)',
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
            text: 'I created a single source of truth for the UX/UI across our products. I streamlined the UI and created a design system that would be tech agnostic and support multiple brands. I established a vocabulary around the design system that would make sense to UI developers and engineers.'
          },
          {
            type: 'text',
            text: 'I engineered the design system in a way that only affected the front-end markup. This enabled us to avoid costly back-end updates, leaving the functional code behind the front end untouched.'
          },
          {
            type: 'text',
            text: 'The sub-brand issues were solved by having all attributes set to variables. The variables allowed for a unique brand look, color, fonts, and UI treatment without changing the core. The design system could be independently updated and consumed across any application or digital product.'
          }
        ],
        right: [
          { type: 'text', text: 'Nomenclature' },
          {
            type: 'icon-grid',
            items: [
              { icon: 'fa-regular fa-image', title: 'Elements' },
              { icon: 'fa-regular fa-toggle-on', title: 'Controls' },
              { icon: 'fa-regular fa-sliders', title: 'Components' },
              { icon: 'fa-light fa-sidebar', title: 'Modules' },
              { icon: 'fa-regular fa-table-layout', title: 'Templates' },
              { icon: 'fa-regular fa-browsers', title: 'Pages' }
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
        left: [{ type: 'image', src: '/images/work/hydra/why.jpg', alt: "Big'ol Hydra", shape: 'circle' }],
        right: [
          {
            type: 'text',
            text: 'Good question! Hydra was a mythical beast that had many heads and one body. The design system had a core body of design patterns that branched out to many systems and brands. 🙂'
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
    order: 5,
    title: 'One Park Financial',
    subtitle: 'Redesign Corporate Website',
    cardImage: {
      src: '/images/work/opf-modal/brief.png',
      alt: 'One Park Financial corporate website'
    },
    summary: 'I partnered with the CEO and SVP of Marketing at One Park Financial to redesign its corporate website and lead flow.',
    visible: true,
    brief: {
      image: { src: '/images/work/opf-modal/brief-2.png', alt: '' },
      paragraphs: [
        'I partnered with the CEO and SVP of Marketing at One Park Financial to redesign its corporate website and lead flow. This project was part of a more extensive implementation of the Hydra Design System.',
        'I analyzed how visitors moved through the existing site before making design decisions. Google Analytics showed which devices dominated and how each performed for lead conversion and engagement. Heat maps and scroll maps showed which UI elements and content people engaged with — and which they scrolled straight past.'
      ]
    },
    contributions: [
      { icon: 'fa-regular fa-lightbulb-on', label: 'Creative Lead' },
      { icon: 'fa-regular fa-pencil-ruler', label: 'UX/UI Design' },
      { icon: 'fa-regular fa-ruler-triangle', label: 'Wireframes' },
      { icon: 'fa-regular fa-laptop-code', label: 'Front-end Dev' },
      { icon: 'fa-regular fa-phone-laptop', label: 'Device Testing' },
      { icon: 'fa-regular fa-magnifying-glass-chart', label: 'User Research' }
    ],
    technologies: [
      { icon: 'fa-regular fa-drafting-compass', label: 'Adobe Suite' },
      { icon: 'fa-brands fa-laravel', label: 'Laravel & Statamic' },
      { icon: 'fa-brands fa-bootstrap', label: 'Bootstrap' },
      { icon: 'fa-regular fa-code', label: 'HTML' },
      { icon: 'fa-regular fa-brackets-curly', label: 'CSS/LESS' },
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
          alt: 'WebMD Homepage Desktop by Jacob Medley'
        },
        mobile: {
          src: '/images/work/opf-modal/home-mb.png',
          alt: 'WebMD Homepage Mobile  by Jacob Medley'
        }
      }
    ]
  },
  {
    id: 'split-test',
    section: 'work',
    display: 'thumb',
    order: 6,
    title: 'A/B Testing',
    icon: 'fa-light fa-vial',
    visible: true,
    summary: '',
    brief: { image: { src: '/images/work/split01-modal/thumb.png', alt: '' }, paragraphs: [] },
    contributions: [],
    technologies: [],
    media: [
      { type: 'heading', text: 'Never Stop Testing!' },
      {
        type: 'text',
        text: 'A/B split testing allows you to make data-driven decisions about changes to your website, instead of relying on guesswork or assumptions. For example, you can test different headlines, images, call-to-action (CTA) buttons, and layouts to see which combination generates the most clicks or conversions. By identifying the most effective elements on your site, you can make targeted improvements that result in better user experiences, higher engagement, and increased revenue.'
      },
      {
        type: 'text',
        text: "Overall, A/B split testing can help you optimize your website for your users' needs and preferences, leading to increased traffic, conversions, and revenue. It's a cost-effective way to make data-driven decisions that will benefit your business in the long run."
      },
      {
        type: 'text',
        text: 'I partnered with the talented product marketing manager, J.R. Hernandez, on the following projects.'
      },
      {
        type: 'split-row',
        reverse: true,
        left: [{ type: 'image', src: '/images/work/split01-modal/web-md-thumb.png', alt: '', shape: 'circle' }],
        right: [
          { type: 'heading', text: 'WebMD Demographic Test' },
          {
            type: 'text',
            text: 'Hypothesis: WebMD would attract a different demographic than DentalPlans.com, which leans heavily toward seniors. By showing a younger demographic, we would resonate better with customers.'
          }
        ],
        leftSpan: 12,
        rightSpan: 12,
        leftSpanXl: 8,
        rightSpanXl: 10,
        hAlign: 'center'
      },
      {
        type: 'split-row',
        left: [
          { type: 'heading', text: 'Control' },
          { type: 'image', src: '/images/work/webmd-modal/control.png', alt: 'WebMD homepage, control variant' }
        ],
        right: [
          { type: 'heading', text: 'V1 Winner +14.9%' },
          { type: 'image', src: '/images/work/webmd-modal/winner.png', alt: 'WebMD homepage, winning variant V1' }
        ],
        leftSpan: 12,
        rightSpan: 12
      },
      {
        type: 'split-row',
        left: [
          { type: 'heading', text: 'V2 -2.5%' },
          { type: 'image', src: '/images/work/webmd-modal/v2.png', alt: 'WebMD homepage, variant V2' }
        ],
        right: [
          { type: 'heading', text: 'V3 -35.1%' },
          { type: 'image', src: '/images/work/webmd-modal/v3.png', alt: 'WebMD homepage, variant V3' }
        ],
        leftSpan: 12,
        rightSpan: 12
      },
      {
        type: 'split-row',
        left: [{ type: 'image', src: '/images/work/split01-modal/sc-thumb.png', alt: '', shape: 'circle' }],
        right: [
          { type: 'heading', text: 'Savings Calculator' },
          {
            type: 'text',
            text: 'Hypothesis: Providing customers more information on the product and using a niche celebrity would increase performance. The additional content would also improve organic rankings over time.'
          }
        ],
        leftSpan: 12,
        rightSpan: 12,
        leftSpanXl: 8,
        rightSpanXl: 10,
        hAlign: 'center'
      },
      {
        type: 'split-row',
        left: [
          { type: 'heading', text: 'Control' },
          { type: 'image', src: '/images/work/split01-modal/sc-control.png', alt: 'Savings calculator landing page, control variant' }
        ],
        right: [
          { type: 'heading', text: 'V1 Winner +24.2%' },
          { type: 'image', src: '/images/work/split01-modal/sc-winner.png', alt: 'Savings calculator landing page, winning variant V1' }
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
    order: 7,
    title: 'Call Center XD',
    icon: 'fa-light fa-headset',
    modalTitle: 'Call Center XD',
    visible: true,
    summary: 'This is a personal initiative of mine at DentalPlans.com. I identified two issues with the customer experience calling in from our online initiatives. One, after-hours call center customers experienced a “dead end”. Two, we had a high abandonment rate when the call center was open. I talked to the executive stakeholder for the call center about the reasons behind the current process and researched the API capabilities of our call center platform. I partnered with our engineers and the business intelligence team to build a call center health API that let us update the online experience in real time based on availability.',
    brief: {
      image: { src: '/images/work/ccux-modal/flow.png', alt: '' },
      paragraphs: [
        'This is a personal initiative of mine at DentalPlans.com. I identified two issues with the customer experience calling in from our online initiatives. One, after-hours call center customers experienced a “dead end”. Two, we had a high abandonment rate when the call center was open. I talked to the executive stakeholder for the call center about the reasons behind the current process and researched the API capabilities of our call center platform. I partnered with our engineers and the business intelligence team to build a call center health API that let us update the online experience in real time based on availability.'
      ]
    },
    contributions: [ { icon: 'fa-regular fa-clipboard-list-check', label: 'Project Lead' } ],
    technologies: [
      {
        icon: 'fa-regular fa-project-diagram',
        label: 'API'
      },
      { icon: 'fa-regular fa-drafting-compass', label: 'Adobe Target' }
    ],
    media: [
      { type: 'heading', text: 'Messaging and State Change' },
      {
        type: 'text',
        text: 'Our API checked the status of the call center every five minutes and updated the messaging with visual indicators on the website. We logged the status changes and calls for tracking. We had a unique promotional code that would only appear when the call center was not available.'
      },
      { type: 'text', text: 'Call Center Status: Green' },
      {
        type: 'image-row',
        images: [
          {
            src: '/images/work/ccux-modal/dt-header-green.png',
            alt: 'Call center customer experience by Jacob Medley'
          },
          {
            src: '/images/work/ccux-modal/mb-header-green.png',
            alt: 'Call center customer experience by Jacob Medley'
          }
        ],
        cols: [ 15, 9 ]
      },
      { type: 'text', text: 'Call Center Status: Closed' },
      {
        type: 'image-row',
        images: [
          {
            src: '/images/work/ccux-modal/dt-header-closed.png',
            alt: 'Call center customer experience by Jacob Medley'
          },
          {
            src: '/images/work/ccux-modal/mb-header-busy.png',
            alt: 'Call center customer experience by Jacob Medley'
          }
        ],
        cols: [ 15, 9 ]
      },
      { type: 'text', text: 'Call Center Status: Busy' },
      {
        type: 'image-row',
        images: [
          {
            src: '/images/work/ccux-modal/dt-header-busy.png',
            alt: 'Call center customer experience by Jacob Medley'
          },
          {
            src: '/images/work/ccux-modal/mb-header-busy.png',
            alt: 'Call center customer experience by Jacob Medley'
          }
        ],
        cols: [ 15, 9 ]
      }
    ]
  },
  {
    id: 'marketing-auto',
    section: 'work',
    display: 'thumb',
    order: 8,
    title: 'Data-Driven Personalization',
    icon: 'fa-light fa-bullseye-arrow',
    modalTitle: 'Data-Driven Personalization',
    visible: true,
    summary: 'I was the lead designer and developer of a cross-departmental task force responsible for launching a new data-driven marketing campaign. The initial marketing campaign had to accommodate several touchpoints, multiple brands with dissimilar looks, various personalized data based on the audience receiving it, as well as incentives that changed by touchpoint.',
    brief: {
      image: { src: '/images/work/ma-modal/automation.gif', alt: '' },
      paragraphs: [
        'I was the lead designer and developer of a cross-departmental task force responsible for launching a new data-driven marketing campaign. The initial marketing campaign had to accommodate several touchpoints, multiple brands with dissimilar looks, various personalized data based on the audience receiving it, as well as incentives that changed by touchpoint.'
      ]
    },
    contributions: [
      { icon: 'fa-regular fa-lightbulb-on', label: 'Creative Lead' },
      { icon: 'fa-regular fa-pencil-ruler', label: 'UX/UI Design' },
      { icon: 'fa-regular fa-laptop-code', label: 'Front-end Dev' },
      { icon: 'fa-light fa-phone-laptop', label: 'Responsive Design' },
      { icon: 'fa-regular fa-clipboard-list-check', label: 'Project Lead' },
      { icon: 'fa-light fa-solar-system', label: 'Integration Strategy' }
    ],
    technologies: [
      { icon: 'fa-regular fa-drafting-compass', label: 'Adobe Suite' },
      { icon: 'fa-regular fa-drafting-compass', label: 'Adobe Scene 7' },
      { icon: 'fa-regular fa-drafting-compass', label: 'Aprimo' },
      { icon: 'fa-regular fa-code', label: 'HTML' },
      { icon: 'fa-regular fa-brackets-curly', label: 'CSS' },
      { icon: 'fa-regular fa-brackets-curly', label: 'JS' }
    ],
    media: [
      { type: 'heading', text: 'Results' },
      {
        type: 'text',
        text: 'I worked with stakeholders from the marketing, business analysis, and data teams to engineer and design a dynamic campaign using the new platform. I optimized the campaign to leverage the system, which reduced the workload on campaign managers by 92% while meeting every KPI the business had set.'
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
    order: 9,
    title: 'Team Workshops',
    icon: 'fa-light fa-screen-users',
    visible: true,
    summary: '',
    brief: {
      image: { src: '/images/work/workshop/ideas.jpg', alt: '' },
      paragraphs: [
        'I have successfully led and facilitated numerous design workshops, both on-site and remotely. These interactive sessions addressed a wide range of challenges, engaging diverse groups comprising various personalities and disciplines. Employing a flexible approach, I utilized methodologies like the double-diamond design process and modified design sprints. This approach was instrumental in uniting divergent teams, fostering collaborative problem-solving, and aligning them around central issues. The workshops spanned creative brainstorming, UX/UI strategy, conversion rate optimization (CRO), and user testing strategy, effectively driving innovation and strategic thinking.',
        'With the right team, anything is possible. Anything!'
      ]
    },
    briefHeading: 'Solving the Right Problems',
    contributions: [{ icon: 'fa-regular fa-lightbulb-on', label: 'Facilitator' }],
    technologies: [
      { icon: 'fa-regular fa-chalkboard', label: 'Whiteboard' },
      { icon: 'fa-regular fa-marker', label: 'Dry Erase Markers' },
      { icon: 'fa-regular fa-notes', label: 'Post-it Notes' },
      { icon: 'fa-regular fa-brain', label: 'Brains' }
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
    order: 10,
    title: 'UX Roadmaps',
    icon: 'fa-light fa-mouse-field',
    visible: true,
    summary: '',
    brief: {
      image: { src: '/images/work/roadmap/rm.jpg', alt: '' },
      paragraphs: [
        "A UX Roadmap allows you to communicate a UX team's work and the problems they plan to tackle. It is a living, breathing document that helps align and prioritize projects.",
        'I built the 2022 UX Roadmap for One Park Financial using the framework detailed under “Example UX Roadmap.”',
        'I am a strong planner and lean hard into planning the work and working the plan. To quote Robert Burns - "The best-laid schemes of mice and men often go awry," so be ready to pivot.'
      ]
    },
    briefHeading: 'Are we there yet?',
    contributions: [{ icon: 'fa-regular fa-mouse-field', label: 'Roadmap Planning' }],
    technologies: [{ icon: 'fa-regular fa-chalkboard', label: 'Lucidchart' }],
    media: [
      { type: 'heading', text: 'Example UX Roadmap — obfuscated for client protection' },
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
            body: 'Objectives and potential outcomes that will be achieved upon completion. Success metrics for the work.'
          },
          { label: 'Team:', body: 'Who is involved.' }
        ]
      },
      { type: 'text', text: 'Obfuscated Lucidchart' },
      { type: 'image', src: '/images/work/roadmap/l-chart.jpg', alt: 'Lucid Chart', flush: true }
    ]
  },
  {
    id: 'personas',
    section: 'work',
    display: 'thumb',
    order: 11,
    title: 'Personas',
    icon: 'fa-light fa-masks-theater',
    visible: true,
    summary: '',
    brief: {
      image: { src: '/../images/work/kitchen-sink/persona-one.webp', alt: '' },
      paragraphs: [
        'At DentalPlans, I collaborated with the business intelligence team and the product marketing manager on persona development projects. Our goal was to create detailed and actionable personas to guide our product and marketing strategies. One standout example was "Frugal Francine," a persona representing cost-conscious consumers who seek maximum value for their money.'
      ]
    },
    briefHeading: 'What Frugal Francine Taught Us',
    contributions: [
      { icon: 'fa-regular fa-clipboard-list-check', label: 'Co-Project Lead' },
      { icon: 'fa-regular fa-fill-drip', label: 'Visual Design' }
    ],
    technologies: [{ icon: 'fa-regular fa-drafting-compass', label: 'Adobe Suite' }],
    media: [
      { type: 'heading', text: 'Example Persona' },
      {
        type: 'image',
        src: '/images/work/kitchen-sink/Persona-Cards.png',
        alt: 'Content Strategy'
      }
    ]
  },
  {
    id: 'reveal',
    section: 'visual-design',
    display: 'thumb',
    order: 1,
    title: 'Reveal',
    thumb: { src: '/images/work/kitchen-sink/btn-reveal.png', alt: 'Reveal Aligners campaign' },
    modalTitle: 'Reveal Aligners',
    visible: true,
    summary: 'In a creative collaboration for Reveal Clear Aligners, our team set out to highlight the superiority and clarity of our product over the competition. I adopted a fun and edgy tone for both the copy and visuals to ensure the campaign stood out for my creatives.',
    brief: {
      image: { src: '/images/work/kitchen-sink/reveal-cover.jpg', alt: '' },
      paragraphs: [
        'In a creative collaboration for Reveal Clear Aligners, our team set out to highlight the superiority and clarity of our product over the competition. I adopted a fun and edgy tone for both the copy and visuals to ensure the campaign stood out for my creatives.'
      ]
    },
    contributions: [
      { icon: 'fa-regular fa-lightbulb-on', label: 'Creative Concepting' },
      { icon: 'fa-regular fa-handshake', label: 'Collaboration' },
      { icon: 'fa-regular fa-fill-drip', label: 'Visual Design' }
    ],
    inlineContributions: true,
    technologies: [],
    media: [
      { type: 'text', text: 'Conceptual and Visual Contributions:' },
      {
        type: 'styled-list',
        items: [
          {
            label: "Yup, It's That Clear:",
            body: 'This concept emphasized the transparency and subtlety of the aligners.'
          },
          {
            label: "So Clear, Like It's Not Even There:",
            body: 'Aimed to convey the near-invisibility of the product, making it blend seamlessly.'
          }
        ]
      },
      { type: 'text', text: 'Visual Contributions:' },
      {
        type: 'styled-list',
        items: [
          {
            label: 'The Difference Is Clear:',
            body: 'This concept, developed by Rick Hoyle, provided a strong comparative angle, further driving home our message of clarity.'
          },
          {
            label: 'OMG, Your Aligner Is Showing:',
            body: 'Played on the human emotion of being embarrassed to have an aligner that is visible, highlighting how the aligners are practically undetectable.'
          }
        ]
      },
      {
        type: 'text',
        text: 'Working together, we ensured that each concept seamlessly fit within the overarching theme of the campaign. Our combined efforts brought a cohesive and impactful message to life, demonstrating that the choice of Reveal Clear Aligners was indeed clear.'
      },
      { type: 'contributions' },
      { type: 'heading', text: 'Concepts' },
      {
        type: 'image-row',
        images: [
          {
            src: '/images/work/kitchen-sink/reveal-clear-01.jpg',
            alt: 'Viva Medicare Logo Design by Jacob Medley'
          },
          {
            src: '/images/work/kitchen-sink/reveal-clear-02.jpg',
            alt: 'Viva Medicare Logo Design by Jacob Medley'
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
            alt: 'Viva Medicare Logo Design by Jacob Medley'
          },
          {
            src: '/images/work/kitchen-sink/reveal-cost-01.jpg',
            alt: 'Viva Medicare Logo Design by Jacob Medley'
          }
        ],
        cols: [ 12, 12 ],
        mobileDivider: true
      }
    ]
  },
  {
    id: 'viva',
    section: 'visual-design',
    display: 'thumb',
    order: 2,
    title: 'Viva',
    thumb: { src: '/images/work/kitchen-sink/btn-viva.png', alt: 'Viva Medicare brand' },
    modalTitle: 'Viva Medicare',
    visible: true,
    summary: 'I developed a brand for Medicare and Medicare Supplement plans, grounded in our product and customer research. Working with executive leadership and a cross-functional team, I ran the concept through several rounds of branding exercises.',
    brief: {
      image: { src: '/images/work/viva-modal/brief.png', alt: '' },
      paragraphs: [
        'I developed a brand for Medicare and Medicare Supplement plans, grounded in our product and customer research. Working with executive leadership and a cross-functional team, I ran the concept through several rounds of branding exercises.',
        'Every mark, palette, and UI treatment shown here is my own work. These are my favorite variations produced for the project.'
      ]
    },
    contributions: [
      { icon: 'fa-regular fa-lightbulb-on', label: 'Creative Concepting' },
      { icon: 'fa-regular fa-handshake', label: 'Collaboration' },
      { icon: 'fa-regular fa-fill-drip', label: 'Visual Design' }
    ],
    technologies: [],
    media: [
      { type: 'heading', text: 'Logo Design' },
      {
        type: 'split-row',
        left: [
          { type: 'image', src: '/images/work/viva-modal/logo-design-stack.png', alt: 'Viva Medicare Logo Design by Jacob Medley', flush: true }
        ],
        right: [
          { type: 'image', src: '/images/work/viva-modal/logo-design-inline.png', alt: 'Viva Medicare Logo Design by Jacob Medley', flush: true }
        ],
        leftSpan: 12,
        rightSpan: 12
      },
      { type: 'heading', text: 'Color Study' },
      {
        type: 'image',
        src: '/images/work/viva-modal/colors.png',
        alt: 'Color Study for Viva Medicare by Jacob Medley',
        flush: true
      },
      { type: 'heading', text: 'Visual Style and Tone' },
      {
        type: 'image',
        src: '/images/work/viva-modal/vs-1.png',
        alt: 'Viva Medicare Visual Style and Tone by Jacob Medley'
      },
      {
        type: 'image-row',
        images: [
          {
            src: '/images/work/viva-modal/vs-2.png',
            alt: 'Viva Medicare Visual Style and Tone by Jacob Medley'
          },
          {
            src: '/images/work/viva-modal/vs-3.png',
            alt: 'Viva Medicare Visual Style and Tone by Jacob Medley'
          }
        ],
        cols: [ 12, 12 ]
      },
      { type: 'heading', text: 'Homepage Hero Concepts' },
      {
        type: 'image',
        src: '/images/work/viva-modal/hero-1.png',
        alt: 'Viva Medicare Hero Concepts by Jacob Medley'
      },
      {
        type: 'image',
        src: '/images/work/viva-modal/hero-2.png',
        alt: 'Viva Medicare Hero Concepts by Jacob Medley'
      },
      { type: 'heading', text: 'UI Components & Style' },
      { type: 'heading', text: 'Buttons' },
      {
        type: 'image',
        src: '/images/work/viva-modal/buttons.png',
        alt: 'Viva Medicare Button Concepts by Jacob Medley',
        flush: true
      },
      { type: 'heading', text: 'Inputs' },
      {
        type: 'image',
        src: '/images/work/viva-modal/inputs.png',
        alt: 'Viva Medicare Input Concepts by Jacob Medley',
        flush: true
      },
      { type: 'heading', text: 'Navigation' },
      {
        type: 'image',
        src: '/images/work/viva-modal/nav.png',
        alt: 'Viva Medicare - Navigation Concepts by Jacob Medley',
        flush: true
      }
    ]
  },
  {
    id: 'wrong',
    section: 'visual-design',
    display: 'thumb',
    order: 3,
    title: 'Wrong',
    thumb: { src: '/images/work/kitchen-sink/btn-wrong.png', alt: 'The Wrong campaign' },
    modalTitle: 'The Wrong Campaign',
    visible: true,
    summary: 'The "WRONG" marketing campaign aimed to promote dental savings plans to people searching for crowns, fillings, and root canals — the highest-volume search terms in our category. Recognizing that customers often feel dental care costs are prohibitively high, we needed to swiftly communicate that dental savings plans offer substantial cost reductions and several key advantages over traditional dental insurance.',
    brief: {
      image: { src: '/images/work/kitchen-sink/wrong-cover.jpg', alt: '' },
      paragraphs: [
        'The "WRONG" marketing campaign aimed to promote dental savings plans to people searching for crowns, fillings, and root canals — the highest-volume search terms in our category. Recognizing that customers often feel dental care costs are prohibitively high, we needed to swiftly communicate that dental savings plans offer substantial cost reductions and several key advantages over traditional dental insurance.',
        'Campaign Concept:',
        'The core message was that with a dental savings plan, the costs for these procedures are not out-of-reach, contrary to common perceptions. The concept was encapsulated in the idea that the customer was "WRONG" to think dental care was unaffordable.'
      ]
    },
    contributions: [
      { icon: 'fa-regular fa-lightbulb-on', label: 'Creative Lead' },
      { icon: 'fa-regular fa-handshake', label: 'Collaboration' },
      { icon: 'fa-regular fa-fill-drip', label: 'Visual Design' }
    ],
    technologies: [],
    media: [
      { type: 'text', text: 'Visual and Messaging Strategy:' },
      {
        type: 'styled-list',
        items: [
          {
            label: 'Visual Approach:',
            body: 'We aimed for a visually striking look, using bold and aggressive headlines.'
          },
          {
            label: 'Inclusivity:',
            body: 'Ensured the campaign was diverse and inclusive, representing various age groups and ethnic backgrounds.'
          },
          {
            label: 'Execution:',
            body: 'Below is the final landing page and hero variants used for conversion rate optimization.'
          }
        ]
      },
      { type: 'heading', text: 'Hero Variants for Testing' },
      {
        type: 'image-row',
        images: [
          {
            src: '/images/work/kitchen-sink/wrong-hero-hip-lady.jpg',
            alt: 'Viva Medicare Logo Design by Jacob Medley'
          },
          {
            src: '/images/work/kitchen-sink/wrong-hero-hip-senior.jpg',
            alt: 'Viva Medicare Logo Design by Jacob Medley'
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
            alt: 'Viva Medicare Logo Design by Jacob Medley'
          },
          {
            src: '/images/work/kitchen-sink/wrong-hero-family.jpg',
            alt: 'Viva Medicare Logo Design by Jacob Medley'
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
            alt: 'Viva Medicare Logo Design by Jacob Medley'
          },
          {
            src: '/images/work/kitchen-sink/wrong-hero-senior-couple.jpg',
            alt: 'Viva Medicare Logo Design by Jacob Medley'
          }
        ],
        cols: [ 12, 12 ],
        mobileDivider: true
      },
      { type: 'heading', text: 'Full Landing Page' },
      {
        type: 'image',
        src: '/images/work/kitchen-sink/wrong-full-lp.jpg',
        alt: 'Viva Medicare Logo Design by Jacob Medley'
      }
    ]
  }
]
