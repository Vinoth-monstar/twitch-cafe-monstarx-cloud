import { useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Copy, Save, Trash2 } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { useAction, useOptimisticAction } from '@/lib/actions'
import { copyText } from '@/lib/monstarx/clipboard'
import { validateInput } from '@/lib/monstarx/validation'
import { savedDraftInput } from '@/lib/enquiry-input'
import { useDesignSearch } from '@/hooks/use-design'
import { deleteDraft, inspectDraft, saveDraft } from '@/server/drafts'
import type { EnquiryDraftRecord } from '@/db/schema'
import type { SessionUser } from '@/lib/session'
import { SignOut } from './AuthPages'
import { LocalizedMain } from './LocalizedMain'
import { useLanguage } from './LanguageProvider'

function DraftStatus({ id }: { id: string }) {
  const [status, setStatus] = useState('')
  const check = useAction(inspectDraft, { refresh: false, onSuccess: result => {
    if ('draft' in result) setStatus(result.draft ? result.draft.deletedAt ? 'Deletion confirmed. This draft is no longer in My drafts.' : 'Save confirmed. This draft is in My drafts.' : 'No saved draft was found for this attempt yet. A delayed request may still finish. Check again before preparing another save.')
  } })
  return <LocalizedMain as="div" className="recovery-panel"><p>Check the saved status without sending another save or delete request.</p><button className="text-link" type="button" disabled={!check.ready || check.pending} onClick={() => check.run({ data: { id } })}>{check.pending ? 'Checking…' : 'Check saved status'}</button>{status && <p role="status">{status}</p>}{check.error && <p className="error-message" role="alert">{check.error}</p>}</LocalizedMain>
}

export function SavePrivateDraft({ message, onMessageError }: { message: string; onMessageError: (error: string) => void }) {
  const designSearch = useDesignSearch()
  const { data: session, isPending } = authClient.useSession()
  const [attempt, setAttempt] = useState('')
  const [savedMessage, setSavedMessage] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [validationError, setValidationError] = useState('')
  const saving = useRef(false)
  const save = useAction(saveDraft, { validate: ({ data }) => validateInput(savedDraftInput, data), onSuccess: result => {
    if ('draft' in result && result.draft) { setSavedMessage(result.draft.message); setConfirmed(true); saving.current = false }
  } })
  // Once a request has an unknown outcome, keep this action blocked and only offer read-only reconciliation.
  const blocked = !!save.error || save.uncertain
  if (isPending) return <LocalizedMain as="div"><p>Checking account access…</p></LocalizedMain>
  if (!session) return <LocalizedMain as="div" className="recovery-panel"><p>Want to keep this message privately? Sign in in another tab, then return here. Your unsaved message stays on this page while it is open.</p><div className="auth-links"><Link to="/login" search={designSearch} target="_blank" rel="noopener" className="text-link">Sign in to save <ArrowUpRight size={16} /></Link><Link to="/signup" search={designSearch} target="_blank" rel="noopener" className="text-link">Create an account</Link></div></LocalizedMain>
  return <LocalizedMain as="div" className="recovery-panel"><p>Save privately to your account. Saving does not send a message or confirm a booking.</p><form noValidate onSubmit={event => {
    event.preventDefault()
    if (saving.current || save.pending || blocked || (confirmed && savedMessage === message.trim())) return
    const id = crypto.randomUUID()
    const checked = validateInput(savedDraftInput, { id, message })
    if (!checked.ok) { const error = checked.error.fieldErrors.message ?? 'Enter a valid message before saving.'; setValidationError(error); onMessageError(error); return }
    saving.current = true; onMessageError(''); setValidationError(''); setConfirmed(false); setAttempt(id)
    save.run({ data: checked.data })
  }}><fieldset disabled={!save.ready}><button type="submit" className="button" disabled={save.pending || blocked || (confirmed && savedMessage === message.trim())}><Save size={16} />{save.pending ? 'Saving privately…' : confirmed && savedMessage === message.trim() ? 'Draft saved' : 'Save private draft'}</button></fieldset></form>{validationError && <p className="error-message" role="alert">{validationError}</p>}{save.error && <p className="error-message" role="alert">{save.error} Your message is kept above.</p>}{confirmed && <p role="status">Saved privately. Any later edits stay on this page until you save them as another draft.</p>}{blocked && attempt && <DraftStatus id={attempt} />}<Link to="/account" search={designSearch} className="text-link">My drafts <ArrowUpRight size={16} /></Link></LocalizedMain>
}

function DraftCard({ draft }: { draft: EnquiryDraftRecord }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [copied, setCopied] = useState(false)
  const copy = useAction(() => copyText(draft.message), { refresh: false, onSuccess: () => setCopied(true) })
  const remove = useOptimisticAction({ value: false, update: () => true, action: () => deleteDraft({ data: { id: draft.id } }) })
  return <LocalizedMain as="article" className="draft-card"><h2>Enquiry draft</h2><p className="draft-meta">Saved {draft.createdAt.replace('T', ' ').slice(0, 16)} UTC</p><p className="draft-message" translate="no">{draft.message}</p><p className="draft-meta">Private · Not sent · Not a confirmed booking</p>{remove.value ? <p role="status">Deleting draft…</p> : <div className="enquiry-result-actions"><button type="button" className="text-link" disabled={!copy.ready || copy.pending} onClick={() => copy.run()}><Copy size={16} />{copy.pending ? 'Copying…' : copied ? 'Message copied' : 'Copy message'}</button>{!confirmDelete ? <button type="button" className="text-link" disabled={!remove.ready || !!remove.error || remove.uncertain} onClick={() => setConfirmDelete(true)}><Trash2 size={16} />Delete draft</button> : <div className="recovery-panel"><p>Delete this private draft? Its message will be removed. This does not cancel any arrangement with the café.</p><button type="button" className="text-link" disabled={!remove.ready || !!remove.error || remove.uncertain} onClick={() => remove.run()}>Confirm deletion</button><button type="button" className="text-link" onClick={() => setConfirmDelete(false)}>Keep draft</button></div>}</div>}{copy.error && <p role="alert" className="error-message">{copy.error} Select and copy the message above manually.</p>}{remove.error && <><p role="alert" className="error-message">{remove.error}</p><DraftStatus id={draft.id} /></>}</LocalizedMain>
}

export function PrivateAccount({ user, drafts }: { user: SessionUser; drafts: EnquiryDraftRecord[] }) {
  const { t } = useLanguage()
  const designSearch = useDesignSearch()
  return <LocalizedMain id="main" className="page-wrap section-space"><div className="account-top"><div><p className="eyebrow">Your account</p><h1 translate="no">{t('Welcome, {name}.').replace('{name}', user.name)}</h1><p>{t('Signed in as')} <span translate="no">{user.email}</span></p></div><SignOut /></div><div className="account-toolbar"><Link to="/gather" search={designSearch} className="text-link">Prepare an enquiry <ArrowUpRight size={16} /></Link><a href="/twitch-cafe-migration-handoff.md" download className="text-link">Download migration handoff</a></div>{drafts.length === 0 ? <div className="empty-state"><h2>Your next gathering starts here.</h2><p>No saved enquiries yet. Prepare a message, edit it to make it yours, then save it privately.</p><Link to="/gather" search={designSearch} className="button">Prepare an enquiry <ArrowUpRight size={16} /></Link></div> : <><h2 className="mt-10 text-4xl">My drafts</h2><p>Only your saved messages appear here. Saving never sends an enquiry.</p><div className="draft-grid">{drafts.map(draft => <DraftCard key={draft.id} draft={draft} />)}</div></>}</LocalizedMain>
}
