'use client'

import { useEffect, useRef } from 'react'

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
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = ref.current
    const root = svg?.closest<HTMLElement>('[data-motion-root]')
    if (!svg || !root) return
    const circles = [...svg.querySelectorAll<SVGCircleElement>('.thinking-network-node')]
    const lines = [...svg.querySelectorAll('line')]
    const packets = [...svg.querySelectorAll<SVGCircleElement>('.thinking-data-packet')]
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const fine = matchMedia('(hover: hover) and (pointer: fine)')
    let frame = 0
    let last = 0
    let elapsed = 0
    let depth = 0
    let pointer = false
    let focused = false
    let visible = false

    const draw = () => {
      // Project one 3D model. Edges, node centers and packets all consume these
      // same projected vertices; no independently transformed HTML nodes.
      const yaw = (1 - depth) * .24 + Math.sin(elapsed / 9000) * .12 + depth * .72
      const pitch = (1 - depth) * -.14 + Math.cos(elapsed / 11000) * .09 - depth * .36
      const points = nodes.map(([x, y, size], index) => {
        const z = Math.sin(index * 2.4) * (19 + depth * 11) + Math.sin(elapsed / 5300 + index * 1.7) * 3
        const px = x - 50 + Math.sin(elapsed / 4200 + index * 2.1) * 2.6
        const py = y - 50 + Math.cos(elapsed / 5100 + index * 1.6) * 2.2
        const rx = px * Math.cos(yaw) + z * Math.sin(yaw)
        const rz = z * Math.cos(yaw) - px * Math.sin(yaw)
        const ry = py * Math.cos(pitch) - rz * Math.sin(pitch)
        const zz = py * Math.sin(pitch) + rz * Math.cos(pitch)
        const perspective = 180 / (180 - zz - depth * 18)
        return [50 + rx * perspective, 50 + ry * perspective, size / 8 * perspective]
      })
      circles.forEach((circle, i) => {
        circle.setAttribute('cx', points[i][0].toFixed(3))
        circle.setAttribute('cy', points[i][1].toFixed(3))
        circle.setAttribute('r', points[i][2].toFixed(3))
      })
      lines.forEach((line, i) => {
        const [from, to] = connections[i]
        line.setAttribute('x1', points[from][0].toFixed(3))
        line.setAttribute('y1', points[from][1].toFixed(3))
        line.setAttribute('x2', points[to][0].toFixed(3))
        line.setAttribute('y2', points[to][1].toFixed(3))
      })
      packets.forEach((packet, i) => {
        const progress = ((elapsed + i * 2900) % 11000) / 1800
        const [from, to] = connections[packetEdges[i]]
        packet.setAttribute('cx', (points[from][0] + (points[to][0] - points[from][0]) * Math.min(progress, 1)).toFixed(3))
        packet.setAttribute('cy', (points[from][1] + (points[to][1] - points[from][1]) * Math.min(progress, 1)).toFixed(3))
        packet.setAttribute('opacity', progress < 1 ? String(Math.sin(progress * Math.PI)) : '0')
      })
    }
    const tick = (now: number) => {
      if (now - last >= 32) {
        const delta = last ? Math.min(now - last, 64) : 0
        last = now
        elapsed += delta
        depth += ((pointer || focused ? 1 : 0) - depth) * (1 - Math.exp(-delta / 130))
        draw()
      }
      frame = requestAnimationFrame(tick)
    }
    const sync = () => {
      cancelAnimationFrame(frame)
      frame = 0
      last = 0
      const stopped = reduced.matches || document.hidden || !visible ||
        document.documentElement.matches('.motion-paused, .motion-hidden') || root.classList.contains('motion-offscreen')
      svg.dataset.networkState = stopped ? 'paused' : 'running'
      if (reduced.matches) {
        elapsed = 0
        depth = 0
        draw()
      }
      if (!stopped) frame = requestAnimationFrame(tick)
    }
    const enter = () => { pointer = fine.matches }
    const leave = () => { pointer = false }
    const focusIn = () => { focused = true }
    const focusOut = (event: FocusEvent) => { focused = event.relatedTarget instanceof Node && root.contains(event.relatedTarget) }
    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync() })
    intersection.observe(root)
    root.addEventListener('pointerenter', enter)
    root.addEventListener('pointerleave', leave)
    root.addEventListener('focusin', focusIn)
    root.addEventListener('focusout', focusOut)
    document.addEventListener('visibilitychange', sync)
    reduced.addEventListener('change', sync)
    draw()
    sync()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      intersection.disconnect()
      root.removeEventListener('pointerenter', enter)
      root.removeEventListener('pointerleave', leave)
      root.removeEventListener('focusin', focusIn)
      root.removeEventListener('focusout', focusOut)
      document.removeEventListener('visibilitychange', sync)
      reduced.removeEventListener('change', sync)
    }
  }, [])

  return (
      <svg ref={ref} className="thinking-connections" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {connections.map(([from, to], index) => (
          <line key={`${from}-${to}-${index}`} data-from={from} data-to={to} x1={nodes[from][0]} y1={nodes[from][1]} x2={nodes[to][0]} y2={nodes[to][1]} />
        ))}
      {nodes.map(([x, y, size], index) => (
        <circle
          className="thinking-network-node"
          key={`${x}-${y}`}
          data-node={index}
          cx={x} cy={y} r={size / 8}
        />
      ))}
      {packetEdges.map((edge) => <circle key={edge} className="thinking-data-packet" data-edge={edge} r=".65" opacity="0" />)}
      </svg>
  )
}

const packetEdges = [6, 31, 59]
