import { createFileRoute, redirect } from '@tanstack/react-router'
import { getSessionUser } from '@/lib/session'
import { PrivateAccount } from '@/components/PrivateDrafts'
import { listDrafts } from '@/server/drafts'
import { Link } from '@tanstack/react-router'
import { SignOut } from '@/components/AuthPages'
export const Route = createFileRoute('/account')({
  beforeLoad: async () => { const user = await getSessionUser(); if (!user) throw redirect({ to: '/login' }); return { user } },
  loader: () => listDrafts(),
  errorComponent: () => <main id="main" className="page-wrap section-space"><h1>Your drafts are temporarily unavailable.</h1><p>We could not load your private messages. They have not been deleted. Check your connection and return to My account.</p><div className="auth-links"><Link to="/gather" className="text-link">Prepare an enquiry</Link><Link to="/login" className="text-link">Check account access</Link><SignOut /></div></main>,
  component: Account,
})
function Account() { const { user } = Route.useRouteContext(); const drafts = Route.useLoaderData(); return <PrivateAccount user={user} drafts={drafts} /> }
