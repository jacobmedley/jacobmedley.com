'use client'

import { useEffect, useRef, useState } from 'react'
import { useMotionPaused, useReducedMotion } from './MotionControls'

const STATES = {
  ready: { label: 'Ready', icon: 'fa-phone-volume', header: 'Ready to help', banner: 'Our team is ready. Call for help choosing a plan.', title: 'Find your dental savings plan.', body: 'Talk to our team or explore plans online.', action: 'View plans', offer: 'No offer. Phone support is available.' },
  busy: { label: 'Busy', icon: 'fa-clock', header: 'High call volume', banner: 'Skip the wait. Explore plans online while the team is unavailable.', title: 'Keep smiling. Skip the wait.', body: 'Our team is busy. You can explore plans online.', action: 'View plans', offer: 'Example busy state.' },
  closed: { label: 'Closed', icon: 'fa-moon', header: 'Call center closed', banner: 'The call center is closed. You can explore plans online.', title: 'Your next step is online.', body: 'Explore dental savings plans online.', action: 'View plans', offer: 'Example closed state.' },
} as const
type State = keyof typeof STATES
type Mode = State | 'auto'
const ORDER: State[] = ['ready', 'busy', 'closed']
const Icon = ({ name }: { name: string }) => <i className={`fa-thin ${name}`} aria-hidden="true" />

export default function CallCenterDemo() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<Mode>('auto')
  const [state, setState] = useState<State>('ready')
  const [highlight, setHighlight] = useState(false)
  const [menu, setMenu] = useState(false)
  const [view, setView] = useState<'home' | 'plans' | 'phone'>('home')
  const reduced = useReducedMotion()
  const paused = useMotionPaused()
  const current = STATES[state]

  useEffect(() => {
    if (mode !== 'auto' || reduced || paused) return
    const root = rootRef.current!
    let visible = false
    let disposed = false
    let timer: ReturnType<typeof setInterval> | undefined
    const sync = () => {
      clearInterval(timer)
      if (disposed || !visible || document.hidden || root.querySelector('.demo-phone')?.contains(document.activeElement)) return
      timer = setInterval(() => setState(previous => ORDER[(ORDER.indexOf(previous) + 1) % ORDER.length]), 5000)
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync() }, { threshold: .25 })
    observer.observe(root)
    const onBlur = () => queueMicrotask(sync)
    root.addEventListener('focusin', sync)
    root.addEventListener('focusout', onBlur)
    document.addEventListener('visibilitychange', sync)
    return () => {
      disposed = true
      clearInterval(timer)
      observer.disconnect()
      root.removeEventListener('focusin', sync)
      root.removeEventListener('focusout', onBlur)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [mode, reduced, paused])

  const choose = (next: Mode) => {
    setMode(next)
    setState(next === 'auto' ? 'ready' : next)
    setView('home')
    setMenu(false)
  }
  const navigate = (next: typeof view) => {
    setView(next)
    setMenu(false)
    if (mode === 'auto') setMode(state)
    requestAnimationFrame(() => rootRef.current?.querySelector<HTMLElement>(next === 'home' ? '.demo-store-hero .demo-primary' : '.demo-destination h5')?.focus())
  }

  return (
    <section className="call-center-demo-section" aria-labelledby="call-center-demo-title">
      <div className="modal-section-heading">
        <span><Icon name="fa-window" /></span>
        <h4 id="call-center-demo-title">Responsive site states</h4>
      </div>
      <hr className="solid-center rule-heading" />
      <div ref={rootRef} className="call-center-demo modal-section-content" data-state={state} data-highlight={highlight}>
        <div className="demo-phone" role="group" aria-label="Interactive ecommerce phone preview">
          <div className="demo-phone-speaker" aria-hidden="true" />
          <div className="demo-phone-screen">
            <header className="demo-store-header demo-reactive">
              <span className="demo-store-logo">DentalPlans.com</span>
              <button type="button" className="demo-header-call" onClick={() => navigate(state === 'ready' ? 'phone' : 'plans')}>
                <Icon name={state === 'ready' ? 'fa-phone' : 'fa-cart-shopping'} />
                <span>{state === 'ready' ? 'Call now' : 'Shop online'}</span>
              </button>
              <button type="button" className="demo-menu-button" aria-label={menu ? 'Close menu' : 'Open mobile menu'} aria-expanded={menu} aria-controls="demo-store-menu" onClick={() => { setMenu(!menu); if (mode === 'auto') setMode(state) }}><Icon name={menu ? 'fa-xmark' : 'fa-bars'} /></button>
              <span className="demo-header-status"><Icon name={current.icon} />{current.header}</span>
            </header>
            {menu && <nav id="demo-store-menu" className="demo-store-menu" aria-label="Demo store navigation">
              <button type="button" onClick={() => navigate('plans')}>Explore plans</button>
              <button type="button" onClick={() => navigate('plans')}>Find a dentist</button>
            </nav>}
            <div className="demo-store-banner demo-reactive"><Icon name={current.icon} /><span key={state}>{current.banner}</span></div>
            {view === 'home' ? <>
              <div className="demo-store-hero demo-reactive">
                <div className="demo-hero-art" aria-hidden="true"><Icon name="fa-tooth" /><span /><span /></div>
                <div key={state} className="demo-state-copy"><h5>{current.title}</h5><p>{current.body}</p></div>
                <button type="button" className="demo-primary" onClick={() => navigate('plans')}>{current.action}<Icon name="fa-arrow-right" /></button>
              </div>
              <div className="demo-store-plans"><b>Explore plans</b><div className="demo-plan-tiles">
                <button type="button" onClick={() => navigate('plans')}><Icon name="fa-rectangle-list" /><span>Compare plans</span></button>
                <button type="button" onClick={() => navigate('plans')}><Icon name="fa-location-dot" /><span>Find a dentist</span></button>
              </div></div>
            </> : <div className="demo-destination" aria-live="polite">
              <Icon name={view === 'phone' ? 'fa-headset' : 'fa-rectangle-list'} />
              <h5 tabIndex={-1}>{view === 'phone' ? 'Phone support is available.' : 'Plan comparison preview'}</h5>
              <p>{view === 'phone' ? current.banner : 'Browse dental savings plans online.'}</p>
              {view === 'plans' && <div className="demo-plan-skeleton" aria-hidden="true"><span /><span /><span /></div>}
              <button type="button" className="demo-primary" onClick={() => navigate('home')}>Back to home</button>
            </div>}
          </div>
          <div className="demo-phone-home" aria-hidden="true" />
        </div>
        <div className="demo-controls">
          <span className="demo-eyebrow">Illustrative interaction demo</span>
          <h5>Call center</h5>
          <p>Watch the site respond to call-center availability.</p>
          <div className="demo-state-buttons" role="group" aria-label="Call center state">
            {(['auto', ...ORDER] as const).map(option => <button key={option} type="button" aria-pressed={mode === option} onClick={() => choose(option)}>
              <Icon name={option === 'auto' ? 'fa-arrows-rotate' : STATES[option].icon} />{option === 'auto' ? 'Auto' : STATES[option].label}
            </button>)}
          </div>
          <div className="demo-selected-state" aria-live={mode === 'auto' ? 'off' : 'polite'} aria-atomic="true"><Icon name={current.icon} /><div><strong>{current.label}</strong><p>{current.offer}</p></div></div>
          <div className="demo-highlight-control">
            <label htmlFor="demo-highlight">Sections</label>
            <button id="demo-highlight" type="button" role="switch" aria-checked={highlight} aria-describedby="demo-highlight-help" onClick={() => setHighlight(!highlight)}><span aria-hidden="true" /></button>
          </div>
          <p id="demo-highlight-help" className="demo-help">Emphasize the areas that change.</p>
          <ul className="demo-regions"><li><Icon name="fa-window" />Header</li><li><Icon name="fa-message-lines" />Sitewide banner</li><li><Icon name="fa-image" />Hero</li></ul>
          <p className="demo-help">{reduced ? 'Reduced motion: choose a state to preview it.' : 'Auto cycles every 5 seconds. Choose a state to stop.'}</p>
        </div>
      </div>
    </section>
  )
}
