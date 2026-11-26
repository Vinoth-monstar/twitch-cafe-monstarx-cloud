import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { z } from 'zod'
import { authClient } from '@/lib/auth-client'
import { useAction } from '@/lib/actions'
import { validateInput } from '@/lib/monstarx/validation'
import { useDesignSearch } from '@/hooks/use-design'
import { useLanguage } from './LanguageProvider'
import type { SessionUser } from '@/lib/session'

function schemas(t: (text: string) => string) {
const email = z.string().trim().email(t('Enter a valid email address.'))
const loginSchema = z.object({ email, password: z.string().min(1, t('Enter your password.')) })
const signupSchema = z.object({ name: z.string().trim().min(1, t('Enter your name.')).max(100, t('Use 100 characters or fewer.')), email, password: z.string().min(8, t('Use at least 8 characters.')).max(128, t('Use 128 characters or fewer.')) })
const resetSchema = z.object({ password: z.string().min(8, t('Use at least 8 characters.')).max(128, t('Use 128 characters or fewer.')), confirm: z.string() }).refine(v => v.password === v.confirm, { path: ['confirm'], message: t('Passwords must match.') })
const emailSchema = z.object({ email })
return { loginSchema, signupSchema, resetSchema, emailSchema }
}

function FieldError({ name, fields }: { name: string; fields: Record<string, string> }) {
  const { t } = useLanguage()
  return fields[name] ? <span className="field-error" id={`${name}-error`}>{t(fields[name])}</span> : null
}
function ErrorMessage({ error, uncertain }: { error: string | null; uncertain: boolean }) {
  const { t } = useLanguage()
  return error ? <div className="error-message" role="alert">{t(error)}{uncertain && <p>{t('Check your account or email before trying again. The request may have completed.')}</p>}</div> : null
}
function Intro({ title, text }: { title: string; text: string }) {
  const { t } = useLanguage()
  return <div><p className="eyebrow">{t('A little place to call your own')}</p><h1>{t(title)}</h1><p>{t(text)}</p></div>
}

export function SignOut({ stay = false }: { stay?: boolean }) {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const action = useAction(() => authClient.signOut(), { refresh: stay, onSuccess: () => { if (!stay) void navigate({ to: '/login' }) } })
  return <div><button className="text-link" type="button" onClick={() => action.run()} disabled={!action.ready}>{t(action.pending ? 'Signing out…' : 'Sign out')}</button><ErrorMessage error={action.error} uncertain={action.uncertain} /></div>
}

export function AccountAccess({ mode, user }: { mode: 'login' | 'signup'; user: SessionUser | null }) {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const designSearch = useDesignSearch()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const isSignup = mode === 'signup'
  const { signupSchema, loginSchema } = schemas(t)
  const action = useAction(async () => isSignup ? authClient.signUp.email({ name: name.trim(), email: address.trim(), password }) : authClient.signIn.email({ email: address.trim(), password }), {
    refresh: false,
    validate: () => validateInput(isSignup ? signupSchema : loginSchema, { name, email: address, password }),
    onSuccess: () => { void navigate({ to: '/account', search: designSearch }) },
  })
  return <main id="main" className="page-wrap auth-layout"><Intro title={isSignup ? 'Join us.' : 'Welcome back.'} text="Your own little corner of Twitch, whenever you need it." />{user ? <div className="auth-current"><p className="eyebrow">{t('Already signed in')}</p><h2>{t('Good to see you.')}</h2><p>{t('Signed in as')} <strong>{user.name}</strong> ({user.email}).</p><Link to="/account" search={designSearch} className="button">{t('My account')} <ArrowUpRight size={16} /></Link><p>{t('Want to use another account? Sign out first.')}</p><SignOut stay /></div> : <div><form noValidate onSubmit={event => { event.preventDefault(); action.run() }}><fieldset disabled={!action.ready} className="enquiry-form">{isSignup && <label>{t('Name')}<input value={name} autoComplete="name" readOnly={action.pending} onChange={event => setName(event.target.value)} aria-invalid={!!action.fieldErrors.name} aria-describedby={action.fieldErrors.name ? 'name-error' : undefined} /><FieldError name="name" fields={action.fieldErrors} /></label>}<label>{t('Email')}<input type="email" value={address} autoComplete="email" readOnly={action.pending} onChange={event => setAddress(event.target.value)} aria-invalid={!!action.fieldErrors.email} aria-describedby={action.fieldErrors.email ? 'email-error' : undefined} /><FieldError name="email" fields={action.fieldErrors} /></label><label>{t('Password')}<input type="password" value={password} autoComplete={isSignup ? 'new-password' : 'current-password'} readOnly={action.pending} onChange={event => setPassword(event.target.value)} aria-invalid={!!action.fieldErrors.password} aria-describedby={action.fieldErrors.password ? 'password-error' : undefined} /><FieldError name="password" fields={action.fieldErrors} />{isSignup && <span>{t('At least 8 characters.')}</span>}</label><button type="submit" className="button">{t(action.pending ? (isSignup ? 'Creating account…' : 'Signing in…') : (isSignup ? 'Create account' : 'Sign in'))} <ArrowUpRight size={16} /></button></fieldset><ErrorMessage error={action.error} uncertain={action.uncertain} /></form><div className="auth-links">{isSignup ? <Link className="text-link" to="/login" search={designSearch}>{t('Already have an account? Sign in')}</Link> : <><Link className="text-link" to="/signup" search={designSearch}>{t('Create an account')}</Link><Link className="text-link" to="/forgot-password" search={designSearch}>{t('Forgot password?')}</Link></>}</div></div>}</main>
}

export function ForgotPassword() {
  const { t } = useLanguage()
  const designSearch = useDesignSearch()
  const [address, setAddress] = useState('')
  const [sent, setSent] = useState(false)
  const { emailSchema } = schemas(t)
  const action = useAction(() => authClient.requestPasswordReset({ email: address.trim(), redirectTo: '/reset-password' }), { refresh: false, validate: () => validateInput(emailSchema, { email: address }), onSuccess: () => setSent(true) })
  return <main id="main" className="page-wrap auth-layout"><Intro title="Forgot your password?" text="We’ll help you find your way back." /><div>{sent ? <div className="success-message" role="status">{t('If an account exists for that email, a password reset link will be sent. Check your inbox and spam folder.')}</div> : <form noValidate onSubmit={event => { event.preventDefault(); action.run() }}><fieldset disabled={!action.ready} className="enquiry-form"><label>{t('Email')}<input type="email" autoComplete="email" value={address} readOnly={action.pending} onChange={event => setAddress(event.target.value)} aria-invalid={!!action.fieldErrors.email} aria-describedby={action.fieldErrors.email ? 'email-error' : undefined} /><FieldError name="email" fields={action.fieldErrors} /></label><button className="button" type="submit">{t(action.pending ? 'Sending…' : 'Send reset link')} <ArrowUpRight size={16} /></button></fieldset><ErrorMessage error={action.error} uncertain={action.uncertain} /></form>}<div className="auth-links"><Link className="text-link" to="/login" search={designSearch}>{t('Back to sign in')}</Link></div></div></main>
}

export function ResetPassword({ token, resetError }: { token: string; resetError: string }) {
  const { t } = useLanguage()
  const designSearch = useDesignSearch()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [done, setDone] = useState(false)
  const { resetSchema } = schemas(t)
  const action = useAction(() => authClient.resetPassword({ newPassword: password, token }), { refresh: false, validate: () => validateInput(resetSchema, { password, confirm }), onSuccess: () => setDone(true) })
  return <main id="main" className="page-wrap auth-layout"><Intro title="A fresh start." text="Choose a new password for your account." /><div>{done ? <p className="success-message" role="status">{t('Your password has been updated. You can now sign in.')}</p> : !token || resetError ? <p className="error-message" role="alert">{t('This reset link is missing or no longer valid. Please request a new one.')}</p> : <form noValidate onSubmit={event => { event.preventDefault(); action.run() }}><fieldset disabled={!action.ready} className="enquiry-form"><label>{t('New password')}<input type="password" value={password} autoComplete="new-password" readOnly={action.pending} onChange={event => setPassword(event.target.value)} aria-invalid={!!action.fieldErrors.password} aria-describedby={action.fieldErrors.password ? 'password-error' : undefined} /><FieldError name="password" fields={action.fieldErrors} /><span>{t('At least 8 characters.')}</span></label><label>{t('Confirm password')}<input type="password" value={confirm} autoComplete="new-password" readOnly={action.pending} onChange={event => setConfirm(event.target.value)} aria-invalid={!!action.fieldErrors.confirm} aria-describedby={action.fieldErrors.confirm ? 'confirm-error' : undefined} /><FieldError name="confirm" fields={action.fieldErrors} /></label><button className="button" type="submit">{t(action.pending ? 'Updating…' : 'Update password')} <ArrowUpRight size={16} /></button></fieldset><ErrorMessage error={action.error} uncertain={action.uncertain} /></form>}<div className="auth-links"><Link to="/login" search={designSearch} className="text-link">{t('Back to sign in')}</Link>{(!token || resetError || action.error) && <Link to="/forgot-password" search={designSearch} className="text-link">{t('Request a new link')}</Link>}</div></div></main>
}

export function AccountHome({ user }: { user: SessionUser }) {
  const { t } = useLanguage()
  const designSearch = useDesignSearch()
  return <main id="main" className="page-wrap section-space"><div className="account-top"><div><p className="eyebrow">{t('Your account')}</p><h1>{t('Welcome, {name}.').replace('{name}', user.name)}</h1><p>{t('Signed in as')} {user.email}</p></div><SignOut /></div><div className="empty-state"><h2>{t('Make yourself at home.')}</h2><p>{t('Your account is ready. Prepare an enquiry and save its message privately to My drafts.')}</p><Link to="/gather" search={designSearch} className="button">{t('Prepare an enquiry')} <ArrowUpRight size={16} /></Link></div></main>
}
