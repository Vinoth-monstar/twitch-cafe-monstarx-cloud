import { createFileRoute } from '@tanstack/react-router'
import { ForgotPassword } from '@/components/AuthPages'
export const Route = createFileRoute('/forgot-password')({ component: ForgotPassword })
