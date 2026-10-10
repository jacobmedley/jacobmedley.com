'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import content from '@/docs/ai-service-demo.json'
import styles from './AIServiceWorkspace.module.css'
import wire from './AIWireframe.module.css'
import Arrow from './Arrow'

type Panel = 'conversation' | 'account' | 'documents'
type SentReply = { text: string; attachments: string[] }
const panels: [Panel, string, string][] = [['conversation', 'Conversation', 'fa-comments'], ['account', 'Account', 'fa-user'], ['documents', 'Documents', 'fa-file-lines']]

export default function AIServiceWorkspace({ onBack }: { onBack: () => void }) {
  const [scenarioId, setScenarioId] = useState(content.scenarios[0].id)
  const scenario = content.scenarios.find(item => item.id === scenarioId) ?? content.scenarios[0]
  const [panel, setPanel] = useState<Panel>('conversation')
  const [draft, setDraft] = useState(scenario.draft)
  const [reviewed, setReviewed] = useState(false)
  const [attachments, setAttachments] = useState<string[]>([])
  const [sent, setSent] = useState<SentReply[]>([])
  const [query, setQuery] = useState('')
  const [documentId, setDocumentId] = useState('guide')
  const [previewOpen, setPreviewOpen] = useState(false)
  const [escalated, setEscalated] = useState(false)
  const [status, setStatus] = useState('Reply ready for review.')
  const [dragging, setDragging] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const draftRef = useRef<HTMLTextAreaElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const selectedDocument = content.documents.find(item => item.id === documentId) ?? content.documents[0]
  const documents = content.documents.filter(item => `${item.title} ${item.type}`.toLowerCase().includes(query.trim().toLowerCase()))

  useLayoutEffect(() => { headingRef.current?.focus({ preventScroll: true }) }, [])

  const selectPanel = (next: Panel) => {
    setPanel(next)
    requestAnimationFrame(() => {
      const target = rootRef.current?.querySelector<HTMLElement>(`#ai-panel-${next}`)
      target?.scrollIntoView({ block: 'start', behavior: 'instant' })
      target?.focus({ preventScroll: true })
    })
  }
  const editDraft = (value: string) => { setDraft(value); setReviewed(false); setStatus('Reply ready for review.') }
  const attach = (id: string) => {
    const document = content.documents.find(item => item.id === id)
    if (!document) return
    setAttachments(current => current.includes(id) ? current : [...current, id])
    setReviewed(false)
    setStatus(`${document.title} attached. Review the reply and attachments before sending.`)
    selectPanel('conversation')
  }
  const reset = (id = scenarioId) => {
    const next = content.scenarios.find(item => item.id === id) ?? content.scenarios[0]
    setScenarioId(next.id); setDraft(next.draft); setReviewed(false); setAttachments([]); setSent([])
    setEscalated(false); setDocumentId(next.document); setPreviewOpen(false); setQuery(''); setStatus('Reply ready for review.'); setDragging(false)
    setPanel('conversation')
  }
  const send = () => {
    if (!reviewed || !draft.trim()) return
    setSent(current => [...current, { text: draft.trim(), attachments: [...attachments] }])
    setDraft(''); setAttachments([]); setReviewed(false)
    setStatus('Reply sent in this demo. Nothing was sent outside this workspace.')
  }

  return <div ref={rootRef} className={`${wire.wireframe} ${styles.workspace}`} data-prism-tone="slate">
    <nav className={styles.nav} aria-label="Service workspace">
      <button type="button" data-ai-back onClick={onBack} className={styles.back}><i className="fa-thin fa-arrow-left" aria-hidden="true" /><span>Back to case study</span></button>
      {panels.map(([id, label, icon]) => <button key={id} type="button" aria-pressed={panel === id} aria-controls={`ai-panel-${id}`} onClick={() => selectPanel(id)}><i className={`fa-thin ${icon}`} aria-hidden="true" /><span>{label}</span></button>)}
    </nav>
    <header className={wire.header}><div><span className={wire.eyebrow}>{content.notice}</span><h3 tabIndex={-1} ref={headingRef}>{content.title}</h3><p>{content.subtitle}</p></div><button type="button" onClick={() => reset()}>Reset workspace</button></header>
    <div className={styles.toolbar}><label htmlFor="ai-service-scenario">Scenario</label><select id="ai-service-scenario" value={scenarioId} onChange={event => reset(event.target.value)}>{content.scenarios.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select><span>Nothing is sent outside this demo.</span></div>
    <div className={styles.layout}>


      <section id="ai-panel-conversation" tabIndex={-1} className={`modal-prism-surface ${wire.surface} ${styles.conversation}`} data-active={panel === 'conversation'} aria-labelledby="ai-conversation-title">
        <h4 id="ai-conversation-title"><i className="fa-thin fa-comments" aria-hidden="true" />Conversation</h4>
        <div className={styles.history}><div className={wire.message}><span>Sample customer</span><p>{scenario.customer}</p></div>{sent.length > 0 && <details className={styles.earlier}><summary>Earlier sample replies ({sent.length})</summary>{sent.map((reply, index) => <div className={`${wire.message} ${styles.sent}`} key={index}><span>Representative · Sample reply</span><p>{reply.text}</p>{reply.attachments.map(id => { const doc = content.documents.find(item => item.id === id)!; return <a key={id} href={doc.file} target="_blank" rel="noreferrer"><i className="fa-thin fa-paperclip" aria-hidden="true" />{doc.title}</a> })}</div>)}</details>}</div>
        <aside className={styles.guidance} data-prism-tone={scenarioId === 'security' ? 'gold' : 'sage'} aria-label="Review guidance"><div><i className={`fa-thin ${scenarioId === 'security' ? 'fa-shield-check' : 'fa-circle-info'}`} aria-hidden="true" /><strong>{scenario.guidance}</strong></div><p>{scenario.reason}</p><div className={styles.actions}><button type="button" onClick={() => { editDraft(scenario.suggested); draftRef.current?.focus() }}>Apply suggested wording</button><button type="button" disabled={escalated} onClick={() => { setEscalated(true); setStatus('Review note added to the sample case. No external escalation was sent.') }}>{escalated ? 'Review note added' : 'Mark for review'}</button></div></aside>
        <form className={styles.composer} data-dragging={dragging} onSubmit={event => { event.preventDefault(); send() }} onDragOver={event => { if (event.dataTransfer.types.includes('application/x-ai-demo-document')) { event.preventDefault(); event.dataTransfer.dropEffect = 'copy'; setDragging(true) } }} onDragLeave={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragging(false) }} onDrop={event => { event.preventDefault(); setDragging(false); attach(event.dataTransfer.getData('application/x-ai-demo-document')) }}>
          <label htmlFor="ai-service-draft">Draft reply</label><textarea id="ai-service-draft" ref={draftRef} rows={5} value={draft} onChange={event => editDraft(event.target.value)} placeholder="Start a new draft" />
          <div className={styles.followup}><span>Suggested follow-up</span><p>{scenario.followup}</p><button type="button" onClick={() => { editDraft(`${draft.trim()}${draft.trim() ? '\n\n' : ''}${scenario.followup}`); draftRef.current?.focus() }} disabled={draft.includes(scenario.followup)}>Add follow-up</button></div>
          <div className={styles.attachments}><span><i className="fa-thin fa-paperclip" aria-hidden="true" />{attachments.length ? 'Attached' : 'No documents attached'}</span>{attachments.map(id => { const doc = content.documents.find(item => item.id === id)!; return <div key={id}><span>{doc.title}</span><button type="button" aria-label={`Remove ${doc.title}`} onClick={() => { setAttachments(current => current.filter(item => item !== id)); setReviewed(false); setStatus(`${doc.title} removed. Review the reply again.`) }}>Remove</button></div> })}<p>Drop a document here, or use <button type="button" onClick={() => selectPanel('documents')}>Attach</button>.</p></div>
          <label className={styles.review}><input type="checkbox" checked={reviewed} onChange={event => setReviewed(event.target.checked)} disabled={!draft.trim()} /><span>I reviewed this reply and its attachments</span></label>
          <div className={styles.sendRow}><button type="submit" className={wire.primary} disabled={!reviewed || !draft.trim()}>Send sample reply<i className="fa-thin fa-arrow-right" aria-hidden="true" /></button></div>
          <p className={styles.status} role="status" aria-live="polite">{status}</p>
        </form>
      </section>

      <section id="ai-panel-account" tabIndex={-1} className={`modal-prism-surface ${wire.surface} ${styles.account}`} data-prism-tone="sage" data-active={panel === 'account'} aria-labelledby="ai-context-title">
        <h4 id="ai-context-title"><i className="fa-thin fa-user" aria-hidden="true" />Case context</h4>
        <div className={styles.customerIdentity}><span aria-hidden="true">SC</span><div><strong>Sample customer</strong><small>Sample account</small></div></div>
        <dl><div><dt>Account status</dt><dd>Verification pending</dd></div><div><dt>Account representative</dt><dd>Available through the service team</dd></div></dl>
        <h5>Conversation summary</h5><p>{scenario.summary}</p>
        <h5>Reference</h5><button type="button" className={styles.reference} onClick={() => { setDocumentId(scenario.document); setPreviewOpen(true); selectPanel('documents') }}><i className="fa-thin fa-file-lines" aria-hidden="true" />{scenario.reference}<Arrow /></button>
        <p className={styles.small}>Context shown here represents the proposed Salesforce integration.</p>
      </section>

      <section id="ai-panel-documents" tabIndex={-1} className={`modal-prism-surface ${wire.surface} ${styles.documents}`} data-active={panel === 'documents'} aria-labelledby="ai-documents-title">
        <h4 id="ai-documents-title"><i className="fa-thin fa-file-lines" aria-hidden="true" />Documents</h4>
        <label htmlFor="ai-document-search" className={styles.small}>Search documents</label><input type="search" id="ai-document-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Find a form or reference" />
        <ul className={styles.documentList}>{documents.map(doc => <li key={doc.id} draggable onDragStart={event => { event.dataTransfer.setData('application/x-ai-demo-document', doc.id); event.dataTransfer.effectAllowed = 'copy' }}><div><i className="fa-thin fa-file-pdf" aria-hidden="true" /><div><strong>{doc.title}</strong><small>{doc.type}</small></div></div><div className={styles.actions}><button type="button" aria-pressed={documentId === doc.id} onClick={() => { setDocumentId(doc.id); setPreviewOpen(true) }}>Preview<span className={styles.srOnly}> {doc.title}</span></button><button type="button" disabled={attachments.includes(doc.id)} onClick={() => attach(doc.id)}>{attachments.includes(doc.id) ? 'Attached' : 'Attach'}<span className={styles.srOnly}> {doc.title}</span></button></div></li>)}</ul>
        {!documents.length && <div className={styles.empty}><p>No documents match your search.</p><button type="button" onClick={() => setQuery('')}>Clear search</button></div>}
        <details className={styles.preview} open={previewOpen} onToggle={event => setPreviewOpen(event.currentTarget.open)}><summary>Document preview</summary><div className={styles.previewHead}><h5>{selectedDocument.title}</h5><a href={selectedDocument.file} target="_blank" rel="noreferrer">Open PDF <Arrow external /><span className="sr-only"> (opens in a new tab)</span></a></div>
          {/* eslint-disable-next-line @next/next/no-img-element -- exact preview rendered from the bundled sample PDF */}
          <img src={selectedDocument.file.replace('.pdf', '.png')} alt={`${selectedDocument.title}. ${selectedDocument.text} ${selectedDocument.footer}`} width={612} height={792} />
          <p>{selectedDocument.footer}</p>
        </details>
      </section>
    </div>
  </div>
}
