'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useId } from 'react'
import { PrismStudySurface } from '@/components/ui/PrismStudy'
type StudyAsset = { id: string; name: string; caption: string; alt: string }
import styles from './AIExperience.module.css'
import wire from './AIWireframe.module.css'

type Stage = 'pending' | 'ack' | 'hold' | 'patience' | 'failure' | 'critical' | 'balance'
type DialogKind = 'contact' | 'articles' | 'demo'

const stages: Record<Exclude<Stage, 'pending'>, { name: string; message: string; time: string }> = {
  ack: { name: 'Question received', message: 'Question received. Thinking.', time: '0.2 s' },
  hold: { name: 'Holding message', message: 'I’m still working on your question.', time: '3 s' },
  patience: { name: 'Still working', message: 'Thanks for waiting. I’m sorry this is taking longer.', time: '7 s' },
  failure: { name: 'Failure exit', message: 'I couldn’t answer that. Your account manager can help.', time: '10 s' },
  critical: { name: 'Unable to continue', message: 'Something went wrong, so I can’t continue this answer. Your account manager can help.', time: 'Immediate exit' },
  balance: { name: 'Account-specific request', message: 'Please contact your account manager to confirm your account balance.', time: 'Referral' },
}

const rail: { stage: Stage; time: string; label: string }[] = [
  { stage: 'ack', time: '0.2 s', label: 'Received' },
  { stage: 'hold', time: '3 s', label: 'Holding' },
  { stage: 'patience', time: '7 s', label: 'Waiting' },
  { stage: 'failure', time: '10 s', label: 'Get help' },
]

const dialogs: Record<DialogKind, { title: string; text: string }> = {
  contact: { title: 'Route to an account manager', text: 'In the proposed experience, this action leads to the correct support channel. This demonstration does not place a call, collect contact details, or contact anyone.' },
  articles: { title: 'Related help', text: 'A production experience would offer relevant, reviewed help articles here. No original article library was supplied, so this demonstration does not invent a list of source documents.' },
  demo: { title: 'About this reconstruction', text: 'Use the response-time controls to replay the documented states. This is a deterministic interface demonstration, not a connected AI assistant. All conversation content is illustrative.' },
}

function DemoDialog({ kind, setKind, dialogRef, triggerRef }: {
  kind: DialogKind | null
  setKind: (kind: DialogKind | null) => void
  dialogRef: React.RefObject<HTMLDialogElement | null>
  triggerRef: React.RefObject<HTMLButtonElement | null>
}) {
  const titleId = useId()
  return <dialog ref={dialogRef} className={styles.dialog} aria-labelledby={titleId} onClose={() => { setKind(null); triggerRef.current?.focus() }}>
    <h3 id={titleId}>{kind ? dialogs[kind].title : ''}</h3>
    <p>{kind ? dialogs[kind].text : ''}</p>
    <button type="button" onClick={() => dialogRef.current?.close()}>Close</button>
  </dialog>
}

export function CustomerExperience({ customer, timing, headingLevel = 'h4', onBack }: { customer: StudyAsset; timing: StudyAsset; headingLevel?: 'h3' | 'h4'; onBack?: () => void }) {
  const Heading = headingLevel
  const headingRef = useRef<HTMLHeadingElement>(null)
  useLayoutEffect(() => { headingRef.current?.focus({ preventScroll: true }) }, [])
  const [stage, setStage] = useState<Stage>('failure')
  const [scenario, setScenario] = useState<'delay' | 'balance'>('delay')
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState('Review state · 10 s')
  const [dialogKind, setDialogKind] = useState<DialogKind | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const runToken = useRef(0)
  const advanceRef = useRef<(() => void) | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const stopRun = useCallback(() => {
    runToken.current += 1
    if (intervalRef.current !== null) clearInterval(intervalRef.current)
    intervalRef.current = null
    advanceRef.current = null
    setRunning(false)
  }, [])

  useEffect(() => {
    const updateAfterVisibility = () => { if (!document.hidden) advanceRef.current?.() }
    document.addEventListener('visibilitychange', updateAfterVisibility)
    return () => {
      runToken.current += 1
      if (intervalRef.current !== null) clearInterval(intervalRef.current)
      document.removeEventListener('visibilitychange', updateAfterVisibility)
    }
  }, [])

  const openDialog = (kind: DialogKind, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger
    setDialogKind(kind)
    dialogRef.current?.showModal()
  }

  const selectStage = (next: Stage) => {
    stopRun()
    setScenario('delay')
    setStage(next)
    setElapsed(`Review state · ${next === 'pending' ? '0 s' : stages[next].time}`)
  }

  const runScenario = () => {
    if (running) { stopRun(); setElapsed('Replay stopped'); return }
    stopRun()
    if (scenario === 'balance') {
      setStage('balance')
      setElapsed('Review state · Referral')
      return
    }
    const token = runToken.current
    const started = performance.now()
    setStage('pending')
    setRunning(true)
    setElapsed('Elapsed · 0.0 s')
    const advance = () => {
      if (token !== runToken.current) return
      const ms = performance.now() - started
      const next: Stage = ms >= 10000 ? 'failure' : ms >= 7000 ? 'patience' : ms >= 3000 ? 'hold' : ms >= 200 ? 'ack' : 'pending'
      setStage((current) => current === next ? current : next)
      if (ms >= 10000) {
        stopRun()
        setElapsed('Replay complete · 10 s')
      } else setElapsed(`Elapsed · ${(ms / 1000).toFixed(1)} s`)
    }
    advanceRef.current = advance
    intervalRef.current = setInterval(advance, 80)
  }

  const reset = () => {
    stopRun()
    setScenario('delay')
    setStage('failure')
    setElapsed('Review state · 10 s')
  }

  const state = stage === 'pending' ? null : stages[stage]
  const showHelp = stage === 'failure' || stage === 'critical' || stage === 'balance'

  return <div className={`${wire.wireframe} ${styles.customerSequence}`} id="ai-customer-demo" data-prism-tone="plum">
    {onBack && <button className={wire.back} type="button" data-ai-back onClick={onBack}><i className="fa-thin fa-arrow-left" aria-hidden="true" />Back to case study</button>}
    <header className={wire.header}><div><span className={wire.eyebrow}>Reconstruction</span><h3 ref={headingRef} tabIndex={-1}>Customer experience</h3><p>Choose a state to see the response, or replay the wait.</p></div></header>
    <figure className={styles.figure} aria-label={customer.alt}>
      <div className={styles.layout}>
        <PrismStudySurface className={`${wire.surface} ${styles.conversation}`} tone="plum">
          <Heading><i className="fa-thin fa-comments" aria-hidden="true" />Conversation</Heading>
          <div className={wire.message}><span>Sample customer</span><p>{scenario === 'balance' ? 'What is my account balance?' : 'Where can I find help with my account?'}</p></div>
          <div className={styles.answer}>
            <i className="fa-thin fa-comment" aria-hidden="true" />
            <div><p className={styles.assistantMeta}>Assistant · {state?.name ?? 'Question sent'}</p>
              <div className={styles.assistantMessage} role="status" aria-live="polite" aria-atomic="true">
                {stage === 'ack' ? <><span className={styles.visuallyHidden}>{state?.message}</span><span className={styles.dots} aria-hidden="true"><i /><i /><i /></span></> : state?.message ?? 'The question has been sent.'}
              </div>
              {showHelp && <div className={`${wire.actions} ${styles.helpActions}`}><button type="button" onClick={event => openDialog('contact',event.currentTarget)}>Contact account manager</button><button type="button" onClick={event => openDialog('articles',event.currentTarget)}>Browse help articles</button></div>}
            </div>
          </div>
          <p className={`${wire.rule} ${styles.panelFoot}`}>No live AI, account connection, or support contact.</p>
        </PrismStudySurface>
        <PrismStudySurface className={`${wire.surface} ${styles.controls}`} tone="slate">
          <Heading><i className="fa-thin fa-stopwatch" aria-hidden="true" />Response states</Heading>
          <label htmlFor="ai-scenario">Scenario</label>
          <select id="ai-scenario" value={scenario} onChange={event => {
            const value = event.target.value as 'delay' | 'balance'
            stopRun(); setScenario(value); setStage(value === 'balance' ? 'balance' : 'failure')
            setElapsed(value === 'balance' ? 'Review state · Referral' : 'Review state · 10 s')
          }}><option value="delay">Slow response</option><option value="balance">Account-balance request</option></select>
          <div className={styles.stateRail} role="group" aria-label="Select a response state">{rail.map(item => <button type="button" key={item.stage} aria-pressed={scenario === 'delay' && stage === item.stage} onClick={() => selectStage(item.stage)}><span>{item.label}</span><strong>{item.time}</strong></button>)}</div>
          <div className={styles.replayRow}><button type="button" className={wire.primary} disabled={scenario === 'balance'} onClick={runScenario}>{running ? 'Stop replay' : 'Replay 10 seconds'}</button><span aria-live="off">{elapsed}</span></div>
          <div className={`${wire.actions} ${wire.rule} ${styles.secondaryControls}`}>
            <button type="button" onClick={() => { stopRun(); setScenario('delay'); setStage('critical'); setElapsed('Immediate failure exit') }}>Critical error</button>
            <button type="button" onClick={reset}>Reset</button>
            <button type="button" aria-label="About this conversation demonstration" onClick={event => openDialog('demo',event.currentTarget)}>About this demo</button>
          </div>
        </PrismStudySurface>
      </div>
      <figcaption>{customer.caption} {timing.caption}</figcaption>
    </figure>
    <DemoDialog kind={dialogKind} setKind={setDialogKind} dialogRef={dialogRef} triggerRef={triggerRef} />
  </div>
}
