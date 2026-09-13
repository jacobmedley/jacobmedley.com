import type { CSSProperties } from 'react'
import ThinkingConnections from './ThinkingConnections'
import PersonalizationRays from './PersonalizationRays'
import RoadmapMaze from './RoadmapMaze'

/** One geometry source for each thumbnail and its expanded project field. */
export default function ProjectGeometry({ projectId }: { projectId: string }) {
  return <span className={`thinking-geometry project-geometry project-geometry-${projectId}`}>
    {projectId === 'call-center-ux' && <ThinkingConnections />}
    {projectId === 'marketing-auto' && <PersonalizationRays />}
    {projectId === 'roadmap' && <RoadmapMaze />}
    {Array.from({ length: 8 }, (_, index) => <i key={index} style={{ '--layer': index } as CSSProperties} />)}
  </span>
}
