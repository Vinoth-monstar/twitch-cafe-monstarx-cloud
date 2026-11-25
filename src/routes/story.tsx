import { createFileRoute } from '@tanstack/react-router'
import { StoryPage } from '@/pages/Story'
export const Route = createFileRoute('/story')({ component: StoryPage })
