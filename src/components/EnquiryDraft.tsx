import { useEffect, useState } from 'react'
import { Check, Copy, Plus } from 'lucide-react'
import { cafe } from '@/data/cafe'
import { occasions, enquiryInput } from '@/lib/enquiry-input'
import { validateInput } from '@/lib/monstarx/validation'
import { copyText } from '@/lib/monstarx/clipboard'
import { useAction } from '@/lib/actions'
import { ExternalLink } from './ui'
import { SavePrivateDraft } from './PrivateDrafts'

export function EnquiryDraft() {
  const [ready, setReady] = useState(false)
  const [draft, setDraft] = useState('')
  const [prepared, setPrepared] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [fields, setFields] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)
  useEffect(() => setReady(true), [])
  const copy = useAction(() => copyText(draft), { refresh: false, onSuccess: () => setCopied(true) })
  const field = (name: string) => fields[name] ? <span className="field-error" id={`${name}-error`}>{fields[name]}</span> : null
  return <div className="enquiry-form-wrap"><form className="enquiry-form" noValidate onSubmit={event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const checked = validateInput(enquiryInput, { occasion: data.get('occasion'), date: data.get('date'), guests: data.get('guests'), notes: data.get('notes') })
    if (!checked.ok) { setFields(checked.error.fieldErrors); return }
    setFields({})
    setPrepared(true)
    setMessageError('')
    const input = checked.data
    const formattedDate = input.date ? new Intl.DateTimeFormat('en-MY', { dateStyle: 'long' }).format(new Date(`${input.date}T12:00:00`)) : 'Flexible / to be discussed'
    setDraft(`Hi Twitch Cafe! I’d love to enquire about ${input.occasion}.\n\nPreferred date: ${formattedDate}\nEstimated group size: ${input.guests} people\n${input.notes ? `\nA little more about the idea:\n${input.notes}\n` : ''}\nCould you share suitable options and availability? Thank you!`)
    setCopied(false)
    copy.clearError()
  }}><fieldset disabled={!ready} className="enquiry-form"><label>What’s the occasion?<select name="occasion" defaultValue="a small group gathering" aria-invalid={!!fields.occasion} aria-describedby={fields.occasion ? 'occasion-error' : undefined}>{occasions.map(([value, title]) => <option key={value} value={value}>{title}</option>)}</select>{field('occasion')}</label><div className="form-row"><label>Preferred date <span>(optional)</span><input type="date" name="date" aria-invalid={!!fields.date} aria-describedby={fields.date ? 'date-error' : undefined} />{field('date')}</label><label>Estimated guests<input type="number" name="guests" min="1" step="1" required placeholder="e.g. 12" aria-invalid={!!fields.guests} aria-describedby={fields.guests ? 'guests-error' : undefined} />{field('guests')}</label></div><label>A little about your idea <span>(optional)</span><textarea name="notes" rows={3} placeholder="Tell us what you’re imagining…" maxLength={2000} aria-invalid={!!fields.notes} aria-describedby={fields.notes ? 'notes-error' : undefined} />{field('notes')}</label><button className="button" type="submit"><span>Prepare my message</span><Plus size={17} /></button></fieldset>{Object.keys(fields).length > 0 && <p className="error-message" role="alert">Please check the highlighted details. Your entries have been kept.</p>}</form>{prepared && <div className="enquiry-result" role="region" aria-label="Your enquiry message"><label htmlFor="enquiry-message">Your message is ready to send</label><textarea id="enquiry-message" value={draft} aria-invalid={!!messageError} aria-describedby="saved-message-help saved-message-error" onChange={event => { setDraft(event.target.value); setMessageError(''); setCopied(false); copy.clearError() }} rows={8} /><div className="enquiry-result-actions"><button type="button" className="text-link" onClick={() => copy.run()}>{copied ? <Check size={16} /> : <Copy size={16} />}{copy.pending ? 'Copying…' : copied ? 'Message copied' : 'Copy message'}</button><ExternalLink href={cafe.instagram}>Open Instagram</ExternalLink></div>{copy.error && <p role="alert" className="error-message">{copy.error} Select and copy the message above, then send it to @twitchcafe.pj on Instagram.</p>}<p role="status">{copied ? 'Copied. Open Instagram and paste your message to @twitchcafe.pj.' : 'Copy this message and send it to @twitchcafe.pj. It has not been sent yet.'}</p><p id="saved-message-help">Private drafts need a non-empty message of no more than 10,000 characters.</p><p id="saved-message-error" className="field-error">{messageError}</p><SavePrivateDraft message={draft} onMessageError={setMessageError} /></div>}</div>
}
