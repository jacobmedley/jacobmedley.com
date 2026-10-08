'use client'

import { useCallback, useEffect, useRef, useState, useId } from 'react'
type StudyAsset = { id: string; name: string; caption: string; alt: string }
import styles from './AIExperience.module.css'

type Stage = 'pending' | 'ack' | 'hold' | 'patience' | 'failure' | 'critical' | 'balance'
type DialogKind = 'reference' | 'contact' | 'articles' | 'demo'

const stages: Record<Exclude<Stage, 'pending'>, { name: string; message: string; time: string }> = {
  ack: { name: 'Question received', message: 'Question received. Thinking.', time: '0.2 s' },
  hold: { name: 'Holding message', message: 'I’m still working on your question.', time: '3 s' },
  patience: { name: 'Still working', message: 'Thanks for waiting. I’m sorry this is taking longer.', time: '7 s' },
  failure: { name: 'Failure exit', message: 'I couldn’t answer that. Your account manager can help.', time: '10 s' },
  critical: { name: 'Unable to continue', message: 'Something went wrong, so I can’t continue this answer. Your account manager can help.', time: 'Immediate exit' },
  balance: { name: 'Account-specific request', message: 'Please contact your account manager to confirm your account balance.', time: 'Referral' },
}

const rail: { stage: Stage; time: string; label: string }[] = [
  { stage: 'ack', time: '0.1 to 0.4 seconds', label: 'Acknowledge the question' },
  { stage: 'hold', time: '3 seconds', label: 'Give a holding message' },
  { stage: 'patience', time: '7 seconds', label: 'Thank them for waiting' },
  { stage: 'failure', time: '10 seconds or failure', label: 'Offer a route to help' },
]

const dialogs: Record<DialogKind, { title: string; text: string }> = {
  reference: { title: 'Illustrative reference excerpt', text: 'For an account-specific balance question, direct the customer to their account manager. This paraphrases the project requirement. It is not an original policy document or financial guidance.' },
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

export function CustomerExperience({ customer, timing }: { customer: StudyAsset; timing: StudyAsset }) {
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

  return <div className={styles.customerSequence} id="ai-customer-demo">
    <figure className={styles.figure} aria-label={customer.alt}>
      <div className={`${styles.panel} ${styles.customerPanel}`}>
        <div className={styles.panelHead}><span className={styles.panelSymbol} aria-hidden="true">◌</span><div><h3>Customer assistant</h3><p>Public-site deployment</p></div><span className={styles.chip}>Sample</span></div>
        <div className={styles.customerBody}>
          <p className={styles.welcome}>Hello. How can I help?</p>
          <p className={styles.customerQuestion}>{scenario === 'balance' ? 'What is my account balance?' : 'Where can I find help with my account?'}</p>
          <p className={styles.assistantMeta}>Assistant <span aria-hidden="true">·</span> {state?.name ?? 'Question sent'}</p>
          <div className={styles.assistantMessage} role="status" aria-live="polite" aria-atomic="true">
            {stage === 'ack' ? <><span className={styles.visuallyHidden}>{state?.message}</span><span className={styles.dots} aria-hidden="true"><i /><i /><i /></span></> : state?.message ?? 'The question has been sent.'}
          </div>
          {showHelp && <div className={styles.helpActions}><button type="button" className={styles.primary} onClick={(event) => openDialog('contact', event.currentTarget)}>Contact account manager</button><button type="button" onClick={(event) => openDialog('articles', event.currentTarget)}>Browse help articles</button></div>}
          <div className={styles.composer}><span>Choose a scenario below</span><button type="button" aria-label="About this conversation demonstration" onClick={(event) => openDialog('demo', event.currentTarget)}>?</button></div>
          <p className={styles.smallNote}>No live AI, account connection, or support contact.</p>
        </div>
        <div className={styles.panelFoot}>Specified behavior shown for review. Delivery of each feature was not established.</div>
      </div>
      <figcaption>{customer.caption}</figcaption>
    </figure>
    <figure className={styles.figure} aria-label={timing.alt}>
      <div className={styles.timingPanel}>
        <div className={styles.timingHead}><div><h3>The response-time specification</h3><p>Select a state or replay the waiting sequence. A critical error exits immediately.</p></div><span aria-live="off">{elapsed}</span></div>
        <div className={styles.stateRail} role="group" aria-label="Select a response state">{rail.map((item) => <button type="button" key={item.stage} aria-pressed={stage === item.stage} onClick={() => selectStage(item.stage)}><strong>{item.time}</strong><span>{item.label}</span></button>)}</div>
        <div className={styles.controls}><label htmlFor="ai-scenario">Scenario</label><select id="ai-scenario" value={scenario} onChange={(event) => { const value = event.target.value as 'delay' | 'balance'; stopRun(); setScenario(value); setStage(value === 'balance' ? 'balance' : 'failure'); setElapsed(value === 'balance' ? 'Review state · Referral' : 'Review state · 10 s') }}><option value="delay">Slow response</option><option value="balance">Account-balance request</option></select><button type="button" className={styles.primary} onClick={runScenario}>{running ? 'Stop replay' : 'Run scenario'}</button><button type="button" onClick={() => { stopRun(); setStage('critical'); setElapsed('Immediate failure exit') }}>Trigger critical error</button><button type="button" onClick={reset}>Reset demonstration</button></div>
        <p className={styles.smallNote}>Timing values are project requirements. The replay is approximate and does not measure a live model.</p>
      </div>
      <figcaption>{timing.caption}</figcaption>
    </figure>
    <DemoDialog kind={dialogKind} setKind={setDialogKind} dialogRef={dialogRef} triggerRef={triggerRef} />
  </div>
}

const suggested = 'Please contact your account manager to confirm your account balance.'
const initialDraft = 'Your current balance is...'

export function RepresentativeExperience({ asset }: { asset: StudyAsset }) {
  const [draft, setDraft] = useState(initialDraft)
  const [sent, setSent] = useState(false)
  const [status, setStatus] = useState('The example alert is simulated. It is not a compliance certification.')
  const [dialogKind, setDialogKind] = useState<DialogKind | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const isSuggested = draft.trim() === suggested

  const openReference = (trigger: HTMLButtonElement) => {
    triggerRef.current = trigger
    setDialogKind('reference')
    dialogRef.current?.showModal()
  }

  return <figure className={styles.figure} aria-label={asset.alt} id="ai-representative-demo">
    <div className={styles.panel}>
      <div className={styles.panelHead}><span className={styles.panelSymbol} aria-hidden="true">▦</span><div><h3>Representative workspace</h3><p>Context, conversation, and assistance in one view</p></div><span className={styles.chip}>Internal deployment</span></div>
      <div className={styles.workspace}>
        <aside className={styles.context} aria-label="Conversation context"><p className={styles.smallLabel}>Conversation context</p><h4>Account question</h4><p>Customer needs help with account-specific information.</p><div className={styles.summary}><span className={styles.smallLabel}>Session summary</span><p>The customer asked about a balance. No verified account data is available in this demonstration.</p></div><p className={styles.smallLabel}>Prior context</p><div className={styles.history}><p><strong>Question received</strong>Looking for account information.</p><p><strong>Next route</strong>Account manager can confirm details.</p></div></aside>
        <section className={styles.conversation} aria-label="Representative conversation"><div className={styles.conversationTop}><h4>Customer conversation</h4><span className={styles.chip}>Sample</span></div><p className={styles.personRole}>Customer</p><p className={styles.message}>Can you tell me my account balance?</p><p className={styles.personRole}>Representative</p><p className={`${styles.message} ${styles.reply}`}>Let me check the right way to help.</p>{sent && <><p className={styles.personRole}>Representative</p><p className={`${styles.message} ${styles.reply}`}>{suggested}</p></>}<label htmlFor="ai-reply-draft" className={styles.replyTitle}>Draft reply</label><div className={`${styles.draftBox} ${isSuggested ? styles.ready : ''}`}><textarea ref={textareaRef} id="ai-reply-draft" value={draft} onChange={(event) => { setDraft(event.target.value); setStatus('The draft needs representative review. Nothing has been sent.') }} spellCheck={false} /><p>{isSuggested ? 'Suggested referral applied. Ready for representative review.' : 'Review the assistance panel before sending.'}</p></div><div className={styles.sendRow}><span>The representative owns the reply.</span><button type="button" className={styles.primary} disabled={!isSuggested || sent} onClick={() => { if (draft.trim() !== suggested) return; setSent(true); setStatus('Reply added to the sample conversation. No message was sent to a real person.') }}>Add reply to sample conversation</button></div><p className={styles.smallNote} role="status">{status}</p><button type="button" className={styles.resetLink} onClick={() => { setDraft(initialDraft); setSent(false); setStatus('The example alert is simulated. It is not a compliance certification.') }}>Reset example</button></section>
        <aside className={styles.assist} aria-label="Assistant support for representative"><h4>Assistant support</h4><div className={`${styles.alert} ${isSuggested ? styles.alertReady : ''}`}><strong>{isSuggested ? 'Suggested wording applied' : 'Account information'}</strong><p>{isSuggested ? 'The suggested referral is in the draft. Review it before sending.' : 'The draft starts an account-specific answer. Refer this question to the account manager.'}</p><span>Simulated language alert</span></div><p className={styles.smallLabel}>Suggested reply</p><p>{suggested}</p><button type="button" onClick={() => { setDraft(suggested); setStatus('Suggested wording applied. Nothing has been sent.'); textareaRef.current?.focus() }}>Use suggested reply</button><div className={styles.reference}><p className={styles.smallLabel}>Related reference</p><p>Account-specific questions<br />Referral guidance</p><button type="button" onClick={(event) => openReference(event.currentTarget)}>View reference excerpt</button><p className={styles.smallNote}>Illustrative reference. No original policy text reproduced.</p></div></aside>
      </div>
      <div className={styles.panelFoot}>Reconstructed from requirements for context summaries, language alerts, relevant references, and a representative-reviewed reply. The original screen layout was not recovered.</div>
    </div>
    <figcaption>{asset.caption}</figcaption>
    <DemoDialog kind={dialogKind} setKind={setDialogKind} dialogRef={dialogRef} triggerRef={triggerRef} />
  </figure>
}
