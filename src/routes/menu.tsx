import { createFileRoute, stripSearchParams } from '@tanstack/react-router'
import { MenuPage } from '@/pages/Menu'
import { menu } from '@/data/cafe'
export const Route = createFileRoute('/menu')({
  validateSearch: (search: Record<string, unknown>): { category?: string } => ({ category: typeof search.category === 'string' && menu.some(item => item.id === search.category) ? search.category : 'all' }),
  search: { middlewares: [stripSearchParams({ category: 'all' })] },
  component: MenuPage,
})
