// Recruiter-only portfolio (feat/recruiter-portfolio). Isolated from the
// public site's data: this file owns its own type, PortfolioStudy, and only
// reaches into lib/data/projects.ts for the block-content type union — a
// type-only import, so there is zero runtime coupling to the public site's
// data or components.
//
// All seven entries below are scaffolding: every prose field is lorem ipsum,
// marked with the '⚠ LOREM — REWRITE:' prefix, and `draft: true`. Replace the
// lorem, then flip `draft` to false study-by-study as real copy lands.
import type { ProjectMedia, StyledListBlock, CardBlock, SplitRowBlock } from './projects'

// Reuse the public site's block union verbatim (heading/text/image/styled-list/
// card/split-row/divider/etc.) under the name the spec calls for. Type-only —
// no value from projects.ts is imported, so this file has no runtime dependency
// on the public site's data module.
export type ContentBlock = ProjectMedia

export interface PortfolioStudy {
  slug: string
  codename: string // e.g. 'Ferryman'; '—' when the engagement has no codename
  title: string
  role: string // one line: what Jacob did
  context: string // one line: company descriptor, anonymized
  year: string
  draft: boolean // true while lorem — renders a visible badge
  summary: string
  blocks: ContentBlock[] // reuse the existing block union
}

const MARKER = '⚠ LOREM — REWRITE: '

// Rotates through a fixed pool of standard lorem ipsum sentences so every
// field reads as distinct placeholder text rather than one block repeated
// verbatim, without needing a random generator (keeps the data deterministic
// across builds).
const LOREM_SENTENCES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
  'Curabitur pretium tincidunt lacus, nulla gravida orci a odio.',
  'Nullam varius turpis et commodo pharetra est eros bibendum elit.',
  'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.',
  'Praesent commodo cursus magna vel scelerisque nisl consectetur et.',
  'Aenean lacinia bibendum nulla sed consectetur porttitor.',
  'Cras mattis consectetur purus sit amet fermentum.',
  'Donec ullamcorper nulla non metus auctor fringilla.',
]

let cursor = 0
/** Marked lorem, 2-4 full sentences — for body/paragraph-shaped fields. */
function lorem(sentenceCount: 2 | 3 | 4): string {
  const picked: string[] = []
  for (let i = 0; i < sentenceCount; i++) {
    picked.push(LOREM_SENTENCES[cursor % LOREM_SENTENCES.length])
    cursor++
  }
  return MARKER + picked.join(' ')
}
/** Marked lorem, short phrase — for label/heading-shaped fields (still
 * flagged, but sized like the title text it stands in for). */
function loremLabel(): string {
  const word = LOREM_SENTENCES[cursor % LOREM_SENTENCES.length].split(' ').slice(0, 3).join(' ').replace(/[.,]/g, '')
  cursor++
  return MARKER + word
}

// Two block-set shapes, alternated across studies for a bit of visual
// variety while a reader browses several drafts back to back. Both use only
// split-row / styled-list / card / divider, per spec — no heading/text/image
// blocks are introduced, including inside split-row's nested columns.
function blockSetA(): ContentBlock[] {
  const styledList: StyledListBlock = {
    type: 'styled-list',
    items: [
      { label: loremLabel(), body: lorem(2) },
      { label: loremLabel(), body: lorem(2) },
      { label: loremLabel(), body: lorem(2) },
    ],
  }
  const card: CardBlock = {
    type: 'card',
    header: loremLabel(),
    rows: [
      { label: loremLabel(), body: lorem(2) },
      { label: loremLabel(), body: lorem(2) },
    ],
  }
  const split: SplitRowBlock = {
    type: 'split-row',
    left: [styledList],
    right: [card],
  }
  return [
    split,
    { type: 'divider' },
    {
      type: 'card',
      header: loremLabel(),
      rows: [
        { label: loremLabel(), body: lorem(2) },
        { label: loremLabel(), body: lorem(2) },
        { label: loremLabel(), body: lorem(2) },
      ],
    },
  ]
}

function blockSetB(): ContentBlock[] {
  const card: CardBlock = {
    type: 'card',
    header: loremLabel(),
    rows: [
      { label: loremLabel(), body: lorem(2) },
      { label: loremLabel(), body: lorem(2) },
    ],
  }
  const styledList: StyledListBlock = {
    type: 'styled-list',
    items: [
      { label: loremLabel(), body: lorem(2) },
      { label: loremLabel(), body: lorem(2) },
    ],
  }
  const split: SplitRowBlock = {
    type: 'split-row',
    left: [card],
    right: [styledList],
    reverse: true,
  }
  return [
    {
      type: 'styled-list',
      items: [
        { label: loremLabel(), body: lorem(2) },
        { label: loremLabel(), body: lorem(2) },
        { label: loremLabel(), body: lorem(2) },
        { label: loremLabel(), body: lorem(2) },
      ],
    },
    { type: 'divider' },
    split,
  ]
}

export const portfolioStudies: PortfolioStudy[] = [
  {
    slug: 'ferryman',
    codename: 'Ferryman',
    title: 'Conversational AI in a Regulated Space',
    year: '2023–2025',
    draft: true,
    role: lorem(2),
    context: lorem(2),
    summary: lorem(3),
    blocks: blockSetA(),
  },
  {
    slug: 'keystone',
    codename: 'Keystone',
    title: 'Design Tokens as Infrastructure',
    year: '2025–2026',
    draft: true,
    role: lorem(2),
    context: lorem(2),
    summary: lorem(3),
    blocks: blockSetB(),
  },
  {
    slug: 'force-multiplier',
    codename: '—',
    title: 'AI as a Force Multiplier',
    year: '2025–2026',
    draft: true,
    role: lorem(2),
    context: lorem(2),
    summary: lorem(3),
    blocks: blockSetA(),
  },
  {
    slug: 'accessibility-pipeline',
    codename: '—',
    title: 'Accessibility as an Engineering Problem',
    year: '2026',
    draft: true,
    role: lorem(2),
    context: lorem(2),
    summary: lorem(3),
    blocks: blockSetB(),
  },
  {
    slug: 'forensics',
    codename: '—',
    title: 'Requirements Forensics',
    year: '2026',
    draft: true,
    role: lorem(2),
    context: lorem(2),
    summary: lorem(3),
    blocks: blockSetA(),
  },
  {
    slug: 'measurement',
    codename: '—',
    title: 'Making UX Measurable',
    year: '2025–2026',
    draft: true,
    role: lorem(2),
    context: lorem(2),
    summary: lorem(3),
    blocks: blockSetB(),
  },
  {
    slug: 'facilitation',
    codename: '—',
    title: 'Facilitating to a Decision',
    year: '2025–2026',
    draft: true,
    role: lorem(2),
    context: lorem(2),
    summary: lorem(3),
    blocks: blockSetA(),
  },
]
