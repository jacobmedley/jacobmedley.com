import type { CSSProperties } from 'react'

type NetworkNode = readonly [x: number, y: number, size: number]

const nodes: readonly NetworkNode[] = [
  [4, 12, 10], [15, 7, 13], [27, 16, 17], [39, 6, 11], [51, 13, 15], [64, 5, 10], [77, 15, 16], [92, 8, 12],
  [9, 29, 16], [21, 24, 11], [34, 33, 14], [46, 23, 10], [59, 31, 18], [72, 25, 12], [86, 35, 15], [97, 27, 10],
  [3, 48, 12], [16, 43, 18], [29, 52, 11], [42, 45, 15], [54, 54, 10], [66, 44, 16], [80, 52, 12], [94, 46, 17],
  [8, 66, 14], [22, 61, 10], [36, 71, 17], [49, 63, 13], [62, 73, 15], [75, 64, 10], [88, 74, 18], [98, 62, 11],
  [14, 86, 16], [31, 81, 11], [45, 91, 15], [59, 83, 12], [73, 92, 17], [88, 86, 13],
]

// Each node connects to the nearest forward neighbors. The rule is fixed so the
// pattern stays deterministic while reading as an organic service network.
const connections = nodes.flatMap(([x, y], index) => nodes
  .map(([nextX, nextY], nextIndex) => ({
    nextIndex,
    distance: Math.hypot(nextX - x, nextY - y),
    forward: nextY > y + 4 && nextY - y < 27,
  }))
  .filter(({ forward }) => forward)
  .sort((a, b) => a.distance - b.distance || a.nextIndex - b.nextIndex)
  .slice(0, index % 4 === 0 ? 3 : 2)
  .map(({ nextIndex }) => [index, nextIndex] as const))

export default function ThinkingConnections() {
  return (
    <>
      <svg className="thinking-connections" viewBox="0 0 100 100" preserveAspectRatio="none">
        {connections.map(([from, to], index) => (
          <line key={`${from}-${to}-${index}`} x1={nodes[from][0]} y1={nodes[from][1]} x2={nodes[to][0]} y2={nodes[to][1]} />
        ))}
      </svg>
      {nodes.map(([x, y, size], index) => (
        <span
          className={`thinking-network-node thinking-network-node-${index % 3}`}
          key={`${x}-${y}`}
          style={{ left: `${x}%`, top: `${y}%`, width: `${size}px`, animationDelay: `${-((index % 9) * 0.7)}s` } as CSSProperties}
        />
      ))}
    </>
  )
}
