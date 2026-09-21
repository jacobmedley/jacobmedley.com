import { BannerCard } from '@/components/ui/QuietPrism'
import type { Metadata } from 'next'
import AnimatedStudyImage from '@/components/ui/AnimatedStudyImage'
import { projects } from '@/lib/data/projects'

export const metadata:Metadata={title:'Retained Quiet Prism components',robots:{index:false,follow:false}}

const tones=['gold','green','purple','rose'] as const

export default function RetainedPatternsPage(){
  return <main style={{maxWidth:1200,margin:'0 auto',padding:24}}>
    <h1 style={{fontSize:28}}>Signal Tile</h1>
    <p>Retained, not on the homepage. Documentation props, original BannerCard component.</p>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,260px),1fr))',gap:24,marginTop:24}}>
      {tones.map(tone=><div id={tone} key={tone}><BannerCard tone={tone} eyebrow="Retained component" title={`${tone[0].toUpperCase()}${tone.slice(1)} tone`} description="BannerCard with documentation props. No homepage pathway is restored." icon="fa-thin fa-layer-group" action="Non-interactive specimen"/></div>)}
    </div>
    <section id="animated-image" style={{marginTop:48}}>
      <h2>Animated Image</h2>
      <p>Retained component. The existing marketing-automation GIF is supplied as a documentation prop.</p>
      <AnimatedStudyImage src={projects.find(project=>project.id==='marketing-auto')!.brief.image!.src} alt={projects.find(project=>project.id==='marketing-auto')!.brief.image!.alt}/>
    </section>
  </main>
}
