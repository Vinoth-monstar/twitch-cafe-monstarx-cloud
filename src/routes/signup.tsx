import { createFileRoute } from '@tanstack/react-router'
import { getSessionUser } from '@/lib/session'
import { AccountAccess } from '@/components/AuthPages'
export const Route = createFileRoute('/signup')({ beforeLoad: async () => ({ user: await getSessionUser() }), component: Signup })
function Signup() { const { user } = Route.useRouteContext(); return <AccountAccess mode="signup" user={user} /> }
