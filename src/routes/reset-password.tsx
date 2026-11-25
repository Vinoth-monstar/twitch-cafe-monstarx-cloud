import { createFileRoute } from '@tanstack/react-router'
import { ResetPassword } from '@/components/AuthPages'
export const Route = createFileRoute('/reset-password')({
  validateSearch: (search: Record<string, unknown>) => ({ token: typeof search.token === 'string' ? search.token : undefined, error: typeof search.error === 'string' ? search.error : undefined }),
  component: Reset,
})
function Reset() { const { token, error } = Route.useSearch(); return <ResetPassword token={token ?? ''} resetError={error ?? ''} /> }
