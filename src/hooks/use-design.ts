import { createContext, useContext } from 'react'
import type { Design } from '@/data/cafe'

export type AppearanceMode = 'light' | 'dark'
export type DesignSearch = { design?: Design }
export type Appearance = {
  design: Design
  linkSearch: DesignSearch
  ready: boolean
  notice: string
  setMode: (mode: AppearanceMode) => void
}
export const AppearanceContext = createContext<Appearance | null>(null)

export function useAppearance(): Appearance {
  const appearance = useContext(AppearanceContext)
  if (!appearance) throw new Error('Appearance controls must be inside the site appearance provider.')
  return appearance
}
export function useDesign(): Design { return useAppearance().design }
// Only forward an explicit legacy design selection. Ordinary navigation follows
// the saved/device appearance without pinning a transient device choice in links.
export function useDesignSearch(): DesignSearch { return useAppearance().linkSearch }
