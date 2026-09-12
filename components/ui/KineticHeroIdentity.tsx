'use client'

import { useEffect, useRef, useState } from 'react'
import { MotionToggle, useMotionPaused, useReducedMotion } from './MotionControls'

const ROLES = ['Product', 'UX', 'Systems', 'Service', 'Motion', 'Interaction', 'Human'] as const
const NAME = '// Jacob Medley //'

export default function KineticHeroIdentity() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(true)
  const [nameLength, setNameLength] = useState(0)
  const [roleIndex, setRoleIndex] = useState(0)
  const [roleLength, setRoleLength] = useState(ROLES[0].length)
  const [phase, setPhase] = useState<'name' | 'type' | 'hold' | 'erase' | 'done'>('name')
  const reduced = useReducedMotion()
  const paused = useMotionPaused()

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    const node = rootRef.current
    if (!node || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!mounted || reduced || paused || !visible || document.hidden || phase === 'done') return
    let delay = 70
    let next = () => {}
    if (phase === 'name') {
      next = () => nameLength < NAME.length ? setNameLength(nameLength + 1) : setPhase('hold')
      delay = nameLength < NAME.length ? 55 : 350
    } else if (phase === 'type') {
      const role = ROLES[roleIndex]
      next = () => roleLength < role.length ? setRoleLength(roleLength + 1) : setPhase('hold')
      delay = 72
    } else if (phase === 'hold') {
      next = () => roleIndex === ROLES.length - 1 ? setPhase('done') : setPhase('erase')
      delay = roleIndex === 0 && nameLength === NAME.length ? 850 : 760
    } else if (phase === 'erase') {
      next = () => {
        if (roleLength > 0) setRoleLength(roleLength - 1)
        else {
          setRoleIndex(roleIndex + 1)
          setPhase('type')
        }
      }
      delay = 36
    }
    const timer = window.setTimeout(next, delay)
    return () => window.clearTimeout(timer)
  }, [mounted, nameLength, paused, phase, reduced, roleIndex, roleLength, visible])

  const staticMode = !mounted || reduced
  const visibleName = staticMode ? NAME : NAME.slice(0, nameLength)
  const visibleRole = staticMode ? ROLES[0] : ROLES[roleIndex].slice(0, roleLength)
  const complete = staticMode || phase === 'done'

  return (
    <div ref={rootRef} className="kinetic-identity" data-motion-root>
      <h1 className="display-4 hero-title text-prime mt-0" aria-label="Jacob Medley">
        <span aria-hidden="true">{visibleName}</span>
        {!staticMode && phase === 'name' && <span className="kinetic-caret" aria-hidden="true" />}
      </h1>
      <p className="kinetic-role" aria-label="Product and design leader">
        <span aria-hidden="true" className="kinetic-brace">{'{ '}</span>
        <span aria-hidden="true" className="kinetic-word">{visibleRole}</span>
        <span aria-hidden="true" className="kinetic-brace">{' }'}</span>
        <span aria-hidden="true" className="kinetic-plus"> + </span>
        <span aria-hidden="true">Design</span>
      </p>
      <p className={`kinetic-closing${complete ? ' is-visible' : ''}`}>Let&apos;s Design and Build Something Great Together!</p>
      {!staticMode && !complete && <MotionToggle className="hero-motion-control" />}
    </div>
  )
}
