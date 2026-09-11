import { useId, type CSSProperties } from 'react'

const FEATURED_ICONS: Record<string, string[]> = {
  webmd: [
    'fa-thin fa-heart-pulse',
    'fa-thin fa-stethoscope',
    'fa-thin fa-capsules',
    'fa-thin fa-dna',
    'fa-thin fa-heart-pulse',
    'fa-thin fa-stethoscope',
  ],
}

export function FeaturedAnchor({ projectId }: { projectId: string }) {
  if (projectId === 'opfred') {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- byte-verified supplied OPF icon
      <img src="/assets/featured/opf-icon-white.svg" alt="" width={132} height={124} className="featured-work-logo featured-work-logo-opf" />
    )
  }
  if (projectId === 'webmd') {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- supplied verified brand asset
      <img
        src="/assets/featured/webmd-logo-white.svg"
        alt=""
        width={110}
        height={26}
        className="featured-work-logo featured-work-logo-webmd"
      />
    )
  }

  if (projectId === 'bumblebeemd') {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- supplied verified brand asset
      <img
        src="/assets/featured/bumblebeemd-icon.svg"
        alt=""
        width={71}
        height={82}
        className="featured-work-logo featured-work-logo-bumblebee"
      />
    )
  }

  if (projectId === 'dentalplans') {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- supplied verified brand asset
      <img
        src="/assets/featured/dentalplans-icon.svg"
        alt=""
        width={132}
        height={132}
        className="featured-work-logo featured-work-logo-dentalplans"
      />
    )
  }

  const icon = projectId === 'hydra'
    ? 'fa-thin fa-hydra'
    : 'fa-thin fa-building-columns'

  return <i className={`${icon} featured-work-icon`} aria-hidden="true" />
}

export function FeaturedField({ projectId }: { projectId: string }) {
  const icons = FEATURED_ICONS[projectId] ?? []

  return (
    <div className="featured-work-scene" aria-hidden="true">
      <div className="featured-work-interaction">
        <div className="featured-work-drift">
          {projectId === 'hydra' ? <DesignSystem /> : null}
          {projectId === 'opfred' ? <FallingLeaves /> : null}
          {icons.map((icon, index) => (
            <span key={`${icon}-${index}`} className={`featured-work-motif featured-work-motif-${index + 1}`} style={{ '--pulse-delay': `${-index * 1.7}s` } as CSSProperties}>
              <i className={icon} /><b className="featured-health-ring" /><b className="featured-health-ring featured-health-ring-second" />
            </span>
          ))}
          {projectId === 'dentalplans' ? <DentalSystem /> : null}
          {projectId === 'bumblebeemd' ? (
            <div className="featured-work-honeycomb">
              {Array.from({ length: 24 }, (_, index) => (
                // eslint-disable-next-line @next/next/no-img-element -- supplied verified brand geometry
                <img
                  key={index}
                  style={{ '--hex': index } as CSSProperties}
                  src="/assets/featured/bumblebeemd-hex.svg"
                  alt=""
                  width={72}
                  height={66}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

const systemNodes = [
  { x: 8, y: 15, icon: 'fa-database' }, { x: 30, y: 12, icon: 'fa-cart-shopping' },
  { x: 53, y: 18, icon: 'fa-envelope' }, { x: 78, y: 10, icon: 'fa-browser' },
  { x: 94, y: 35, icon: 'fa-credit-card' }, { x: 70, y: 46, icon: 'fa-server' },
  { x: 43, y: 45, icon: 'fa-code' }, { x: 13, y: 48, icon: 'fa-file-lines' },
  { x: 7, y: 83, icon: 'fa-user' }, { x: 32, y: 87, icon: 'fa-tooth' },
  { x: 58, y: 82, icon: 'fa-chart-line' }, { x: 87, y: 83, icon: 'fa-globe' },
]
const systemEdges = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],[7,8],[8,9],[9,10],[10,11],[11,4],[1,6],[2,5],[5,10],[6,9],[0,6],[3,5],[5,11]]

function DesignSystem() {
  const gridId = useId()
  return <div className="featured-design-system">
    <svg viewBox="0 0 1000 440" preserveAspectRatio="xMidYMid slice">
      <defs><pattern id={gridId} width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="currentColor" strokeOpacity=".1" /></pattern></defs>
      <rect width="1000" height="440" fill={`url(#${gridId})`} />
      <g className="design-tokens">
        {[0,1,2,3,4,5].map(i => <rect key={i} x={42+i*58} y="40" width="42" height="42" rx={i*3+2} fill="currentColor" opacity={.12+i*.1} />)}
        <path d="M60 108H342M60 125H244M60 142H294" />
        {[0,1,2,3].map(i => <rect key={i} x={62+i*82} y="316" width="64" height={12+i*8} rx="5" />)}
      </g>
      <g className="design-components">
        <rect x="426" y="44" width="232" height="154" rx="20" />
        <circle cx="460" cy="78" r="12" /><path d="M488 72H628M488 84H582M452 112H628M452 128H606" />
        <rect x="452" y="148" width="86" height="26" rx="13" />
        <rect x="712" y="66" width="228" height="68" rx="14" /><path d="M736 92H858M736 109H816" /><circle cx="902" cy="100" r="12" />
        <rect x="694" y="202" width="244" height="176" rx="20" /><rect x="714" y="222" width="76" height="132" rx="10" /><path d="M812 238H912M812 258H886M812 298H906M812 320H875" />
        <rect x="438" y="248" width="194" height="104" rx="18" /><path d="M460 274H590M460 292H572" /><rect x="460" y="312" width="60" height="20" rx="10" />
      </g>
      <g className="design-connectors"><path d="M344 62H390V120H426M344 338H398V300H438M658 120H686V100H712M632 300H694" /></g>
    </svg>
  </div>
}

// Shape is the upright leaf in the supplied white OPF tree, preserved verbatim.
const opfLeaf = 'M20.32,9.23c5.49-4.44,1.24-4.71,1.32-9.23-3.54,2.37-2.81,6.02-1.32,9.23.12-.11.23-.22.34-.33l-.19.19-.15.14Z'
function FallingLeaves() {
  return <div className="featured-leaves">
    {Array.from({ length: 16 }, (_, i) => <span key={i} style={{ '--leaf': i, left: `${(i*37)%100}%`, animationDelay: `${-i*2.3}s`, animationDuration: `${22+i%5*3}s` } as CSSProperties}>
      <svg viewBox="18 0 7 10"><path d={opfLeaf} /></svg>
    </span>)}
  </div>
}

function DentalSystem() {
  return <div className="featured-system">
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="featured-system-links">
      {systemEdges.map(([from, to], i) => {
        const a = systemNodes[from], b = systemNodes[to]
        const d = `M ${a.x} ${a.y} L ${b.x} ${b.y}`
        return <g key={`${from}-${to}`} data-from={from} data-to={to}>
          <path d={d} />
          <path d={d} pathLength="100" className="featured-system-packet" style={{ animationDelay: `${-i * 1.8}s` }} />
        </g>
      })}
    </svg>
    {systemNodes.map(({ x, y, icon }) => <span key={icon} className="featured-system-node" style={{ left: `${x}%`, top: `${y}%` }}>
      <i className={`fa-thin ${icon}`} />
    </span>)}
  </div>
}
