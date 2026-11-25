import { createFileRoute } from '@tanstack/react-router'
import { getSessionUser } from '@/lib/session'
import { AccountAccess } from '@/components/AuthPages'
export const Route = createFileRoute('/login')({ beforeLoad: async () => ({ user: await getSessionUser() }), component: Login })
function Login() { const { user } = Route.useRouteContext(); return <AccountAccess mode="login" user={user} /> }
