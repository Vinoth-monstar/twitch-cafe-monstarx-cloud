import { useEffect, useState } from 'react'
import { Check, Copy, Plus } from 'lucide-react'
import { cafe } from '@/data/cafe'
import { occasions, enquiryInput } from '@/lib/enquiry-input'
import { validateInput } from '@/lib/monstarx/validation'
import { copyText } from '@/lib/monstarx/clipboard'
import { useAction } from '@/lib/actions'
import { ExternalLink } from './ui'
import { SavePrivateDraft } from './PrivateDrafts'
import { useLanguage } from './LanguageProvider'

export function EnquiryDraft() {
  const { t, language } = useLanguage()
  const [ready, setReady] = useState(false)
  const [draft, setDraft] = useState('')
  const [prepared, setPrepared] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [fields, setFields] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)
  useEffect(() => setReady(true), [])
  const copy = useAction(() => copyText(draft), { refresh: false, onSuccess: () => setCopied(true) })
  const field = (name: string) => fields[name] ? <span className="field-error" id={`${name}-error`}>{t(name === 'guests' && fields[name].startsWith('Invalid input:') ? 'Enter a whole number of guests.' : fields[name])}</span> : null
  return <div className="enquiry-form-wrap"><form className="enquiry-form" noValidate onSubmit={event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const checked = validateInput(enquiryInput, { occasion: data.get('occasion'), date: data.get('date'), guests: data.get('guests'), notes: data.get('notes') })
    if (!checked.ok) { setFields(checked.error.fieldErrors); return }
    setFields({}); setPrepared(true); setMessageError('')
    const input = checked.data
    const locale = { en: 'en-MY', ms: 'ms-MY', zh: 'zh-Hans-MY', ta: 'ta-MY' }[language]
    const formattedDate = input.date ? new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${input.date}T12:00:00Z`)) : t('Flexible / to be discussed')
    const occasion = language === 'en' ? input.occasion : t(occasions.find(([value]) => value === input.occasion)?.[1] ?? input.occasion)
    // Translate the template only when preparing. Never overwrite a visitor's edits on a language change.
    setDraft(`${t('Hi Twitch Cafe! I’d love to enquire about {occasion}.').replace('{occasion}', occasion)}\n\n${t('Preferred date: {date}').replace('{date}', formattedDate)}\n${t('Estimated group size: {guests} people').replace('{guests}', String(input.guests))}\n${input.notes ? `\n${t('A little more about the idea:')}\n${input.notes}\n` : ''}\n${t('Could you share suitable options and availability? Thank you!')}`)
    setCopied(false); copy.clearError()
  }}><fieldset disabled={!ready} className="enquiry-form"><label>{t('What’s the occasion?')}<select name="occasion" defaultValue="a small group gathering" aria-invalid={!!fields.occasion} aria-describedby={fields.occasion ? 'occasion-error' : undefined}>{occasions.map(([value, title]) => <option key={value} value={value}>{t(title)}</option>)}</select>{field('occasion')}</label><div className="form-row"><label>{t('Preferred date')} <span>{t('(optional)')}</span><input type="date" name="date" aria-invalid={!!fields.date} aria-describedby={fields.date ? 'date-error' : undefined} />{field('date')}</label><label>{t('Estimated guests')}<input type="number" name="guests" min="1" step="1" required placeholder={t('e.g. 12')} aria-invalid={!!fields.guests} aria-describedby={fields.guests ? 'guests-error' : undefined} />{field('guests')}</label></div><label>{t('A little about your idea')} <span>{t('(optional)')}</span><textarea name="notes" rows={3} placeholder={t('Tell us what you’re imagining…')} maxLength={2000} aria-invalid={!!fields.notes} aria-describedby={fields.notes ? 'notes-error' : undefined} />{field('notes')}</label><button className="button" type="submit"><span>{t('Prepare my message')}</span><Plus size={17} /></button></fieldset>{Object.keys(fields).length > 0 && <p className="error-message" role="alert">{t('Please check the highlighted details. Your entries have been kept.')}</p>}</form>{prepared && <div className="enquiry-result" role="region" aria-label={t('Your enquiry message')}><label htmlFor="enquiry-message">{t('Your message is ready to send')}</label><textarea id="enquiry-message" value={draft} aria-invalid={!!messageError} aria-describedby="saved-message-help saved-message-error" onChange={event => { setDraft(event.target.value); setMessageError(''); setCopied(false); copy.clearError() }} rows={8} /><div className="enquiry-result-actions"><button type="button" className="text-link" disabled={!copy.ready || copy.pending} onClick={() => copy.run()}>{copied ? <Check size={16} /> : <Copy size={16} />}{t(copy.pending ? 'Copying…' : copied ? 'Message copied' : 'Copy message')}</button><ExternalLink href={cafe.instagram}>{t('Open Instagram')}</ExternalLink></div>{copy.error && <p role="alert" className="error-message">{t('Select and copy the message above, then send it to @twitchcafe.pj on Instagram.')}</p>}<p role="status">{t(copied ? 'Copied. Open Instagram and paste your message to @twitchcafe.pj.' : 'Copy this message and send it to @twitchcafe.pj. It has not been sent yet.')}</p><p id="saved-message-help">{t('Private drafts need a non-empty message of no more than 10,000 characters.')}</p><p id="saved-message-error" className="field-error">{t(messageError)}</p><SavePrivateDraft message={draft} onMessageError={setMessageError} /></div>}</div>
}
