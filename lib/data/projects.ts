export type ProjectType = 'case-study' | 'design-module' | 'visual-design'

export interface Project {
  id: string
  title: string
  subtitle: string
  type: ProjectType
  image?: string      // modal hero image
  thumbnail?: string  // card/button background (visual-design cards; falls back to image)
  icon?: string
  summary: string
  contributions: string[]
  technologies: string[]
  problem?: string
  solution?: string
  results?: string[]
}

export const projects: Project[] = [
  // ── Case Studies ──────────────────────────────────────────────────────────
  {
    id: 'webmd',
    title: 'WebMD',
    subtitle: 'eCommerce Website',
    type: 'case-study',
    image: '/images/work/WebMD-HM.png',
    summary:
      "Internet Brands wanted to open up new opportunities for growth across their portfolio. One of these efforts was combining the strength of WebMD's brand and DentalPlans product.",
    contributions: ['UI/UX Design', 'eCommerce', 'Front-end Development', 'Strategy'],
    technologies: ['Bootstrap', 'HTML', 'CSS/LESS', 'PHP', 'WordPress'],
    problem:
      "Internet Brands needed to leverage the WebMD brand to expand into new revenue streams while integrating with DentalPlans' existing product infrastructure.",
    solution:
      "Designed and built a co-branded eCommerce experience that combined WebMD's trusted health brand with DentalPlans' product catalog and checkout flow.",
    results: [
      'Increased revenue through a new co-branded product channel',
      'Seamless brand integration between WebMD and DentalPlans',
      'Improved conversion via UX-optimized checkout flow',
    ],
  },
  {
    id: 'dentalplans',
    title: 'Dentalplans.com',
    subtitle: 'Product Framework and Design System',
    type: 'case-study',
    image: '/images/work/dpprod-modal/dpprod-hm.png',
    summary:
      "I led the design and front-end development of product-focused sites for DentalPlans.com. Over the course of a year, what started as a tiny product site initiative evolved into a core component of DentalPlans' business — a framework for rapidly designing and launching ecommerce websites for brands such as Cigna, Aetna, and WebMD.",
    contributions: ['Product Design', 'Design System', 'Front-end Development', 'Strategy'],
    technologies: ['Bootstrap', 'HTML', 'CSS/LESS', 'PHP', 'DevOps', 'Git'],
    problem:
      'DentalPlans needed to rapidly launch co-branded product sites for enterprise partners without rebuilding from scratch each time.',
    solution:
      'Built a modular design system and product framework enabling rapid deployment of white-label eCommerce sites — reducing new partner launches from months to weeks.',
    results: [
      '47% of new company revenue attributed to the product framework',
      '27% of total lead generation',
      '20% of overall company revenue',
      '66% reduction in project timelines',
    ],
  },
  {
    id: 'bumblebeemd',
    title: 'BumblebeeMD',
    subtitle: 'Brand and Product Development',
    type: 'case-study',
    image: '/images/work/BMD-HM.png',
    summary:
      'I had the privilege to partner with a brilliant brand manager Tiffany Tibbets on this project. We worked with executive stakeholders to bring this brand to life. Our goal was to invent a fun and family-focused brand.',
    contributions: ['Brand Design', 'Product Design', 'UI/UX Design', 'Strategy'],
    technologies: ['Figma', 'Adobe Creative Suite', 'Bootstrap', 'HTML', 'CSS'],
    problem:
      'A new healthcare startup needed a complete brand identity and digital product built from the ground up that would appeal to families.',
    solution:
      "Partnered with brand management and executive stakeholders to create a fun, family-focused brand identity and digital product experience from scratch.",
    results: [
      'Complete brand identity created from zero',
      'Family-focused product experience that resonated with target audience',
      'Executive stakeholder alignment on brand direction',
    ],
  },
  {
    id: 'hydra',
    title: 'Hydra',
    subtitle: 'The making of a design system.',
    type: 'case-study',
    image: '/images/work/hydra/hydra-hm.png',
    summary:
      "I championed and implemented the HYDRA design system — a large-scale project that unified the customer experience across the company's products and streamlined the design and engineering processes.",
    contributions: ['Design System', 'Design Leadership', 'Front-end Development', 'Strategy'],
    technologies: ['Figma', 'Bootstrap', 'HTML', 'CSS/LESS', 'Git', 'DevOps'],
    problem:
      'One Park Financial had inconsistent UI patterns across products, slow design-to-engineering handoffs, and no shared component library — causing duplication and brand fragmentation.',
    solution:
      'Championed and built the HYDRA design system: a unified pattern and component library providing a single source of truth for design and engineering, enabling rapid iteration.',
    results: [
      'Unified customer experience across all company products',
      'Significantly faster design-to-engineering handoff',
      'Enabled "fail fast" culture through reusable components',
      'Secured executive buy-in for long-term design investment',
    ],
  },
  {
    id: 'opfred',
    title: 'One Park Financial',
    subtitle: 'Redesign Corporate Website',
    type: 'case-study',
    image: '/images/work/opf-modal/brief.png',
    summary:
      'I partnered with the CEO and SVP of Marketing at One Park Financial to redesign its corporate website and lead flow.',
    contributions: ['UI/UX Design', 'Strategy', 'CRO', 'Front-end Development'],
    technologies: ['Figma', 'Bootstrap', 'HTML', 'CSS', 'WordPress'],
    problem:
      "One Park Financial's corporate website was underperforming on lead generation and didn't reflect the company's growth or brand positioning.",
    solution:
      'Partnered directly with the CEO and SVP of Marketing to redesign the corporate website with a focus on lead flow optimization and brand elevation.',
    results: [
      'Improved lead flow and conversion rate',
      'Modernized brand presence aligned to company growth stage',
      'Direct CEO and SVP alignment on design direction',
    ],
  },

  // ── Design Modules ────────────────────────────────────────────────────────
  {
    id: 'split-test',
    title: 'A/B Testing',
    subtitle: 'Design Module',
    type: 'design-module',
    image: '/images/work/split01-modal/thumb.jpg',
    icon: 'fa-light fa-vial',
    summary:
      'A look at how I approach A/B testing as a design discipline — from hypothesis formation to test design and results analysis.',
    contributions: ['A/B Testing', 'CRO', 'Data Analysis', 'UX Design'],
    technologies: ['Adobe Target', 'Optimizely', 'VWO', 'Google Analytics'],
  },
  {
    id: 'call-center-ux',
    title: 'Call Center XD',
    subtitle: 'Design Module',
    type: 'design-module',
    image: '/images/work/ccux-modal/home-control.png',
    icon: 'fa-light fa-headset',
    summary:
      'Designing for call center agents and customer service teams — optimizing complex workflows for high-stress, high-volume environments.',
    contributions: ['UX Research', 'UI Design', 'Workflow Design'],
    technologies: ['Figma', 'Adobe XD'],
  },
  {
    id: 'marketing-auto',
    title: 'Data Driven Personalisation',
    subtitle: 'Design Module',
    type: 'design-module',
    image: '/images/work/ma-modal/automation.png',
    icon: 'fa-light fa-bullseye-arrow',
    summary:
      'How I design for personalization and marketing automation — creating experiences that adapt to user behavior and segment data.',
    contributions: ['Strategy', 'UX Design', 'Data Analysis'],
    technologies: ['Salesforce', 'Marketing Cloud', 'Google Analytics'],
  },
  {
    id: 'workshops',
    title: 'Team Workshops',
    subtitle: 'Design Module',
    type: 'design-module',
    image: '/images/work/workshop/cover.jpg',
    icon: 'fa-light fa-screen-users',
    summary:
      'Facilitation methods and workshop formats I use to align cross-functional teams, generate ideas, and solve design problems collaboratively.',
    contributions: ['Workshop Facilitation', 'Design Thinking', 'Leadership'],
    technologies: ['FigJam', 'Miro', 'Lucid Chart'],
  },
  {
    id: 'roadmap',
    title: 'UX Roadmaps',
    subtitle: 'Design Module',
    type: 'design-module',
    image: '/images/work/roadmap/rm.jpg',
    icon: 'fa-light fa-mouse-field',
    summary:
      'How I build and communicate UX roadmaps — translating user needs and business goals into prioritized, actionable design plans.',
    contributions: ['UX Strategy', 'Roadmapping', 'Stakeholder Management'],
    technologies: ['Jira', 'Asana', 'FigJam', 'Miro'],
  },
  {
    id: 'personas',
    title: 'Personas',
    subtitle: 'Design Module',
    type: 'design-module',
    image: '/images/work/kitchen-sink/Persona-Cards.png',
    icon: 'fa-light fa-masks-theater',
    summary:
      'My approach to building user personas from qualitative and quantitative research — creating shared understanding across teams.',
    contributions: ['UX Research', 'User Interviews', 'Synthesis'],
    technologies: ['Figma', 'FigJam', 'UserTesting.com', 'Userlytics'],
  },

  // ── Visual Design ─────────────────────────────────────────────────────────
  {
    id: 'reveal',
    title: 'Reveal',
    subtitle: 'Visual Design',
    type: 'visual-design',
    image: '/images/work/kitchen-sink/reveal-cover.jpg',
    thumbnail: '/images/work/kitchen-sink/btn-reveal.png',
    summary: 'A visual design exploration showcasing brand, typography, and composition work.',
    contributions: ['Visual Design', 'Brand Design', 'Typography'],
    technologies: ['Adobe Creative Suite', 'Figma'],
  },
  {
    id: 'viva',
    title: 'Viva',
    subtitle: 'Visual Design',
    type: 'visual-design',
    image: '/images/work/Viva-HM.png',
    thumbnail: '/images/work/kitchen-sink/btn-viva.png',
    summary: 'A vibrant visual design project exploring color, identity, and expressive design.',
    contributions: ['Visual Design', 'Brand Design', 'Color Theory'],
    technologies: ['Adobe Creative Suite', 'Figma'],
  },
  {
    id: 'wrong',
    title: 'Wrong',
    subtitle: 'Visual Design',
    type: 'visual-design',
    image: '/images/work/kitchen-sink/wrong-cover.jpg',
    thumbnail: '/images/work/kitchen-sink/btn-wrong.png',
    summary:
      'A visual design study that explores intentional rule-breaking and unconventional design choices.',
    contributions: ['Visual Design', 'Experimental Design', 'Typography'],
    technologies: ['Adobe Creative Suite', 'Figma'],
  },
]
