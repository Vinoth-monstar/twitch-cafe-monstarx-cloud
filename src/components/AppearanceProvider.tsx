import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate, useRouterState, useSearch } from '@tanstack/react-router'
import { AppearanceContext } from '@/hooks/use-design'
import type { AppearanceMode } from '@/hooks/use-design'
import type { Design } from '@/data/cafe'

const preferenceKey = 'twitch-cafe-appearance'

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const search = useSearch({ from: '__root__' })
  const pathname = useRouterState({ select: state => state.location.pathname })
  const navigate = useNavigate()
  const [preference, setPreference] = useState<AppearanceMode | null>(null)
  const [systemDark, setSystemDark] = useState(false)
  const [ready, setReady] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemDark(media.matches)
    try {
      const saved = window.localStorage.getItem(preferenceKey)
      if (saved === 'light' || saved === 'dark') setPreference(saved)
    } catch { /* A browser can deny preference storage; the controls still work in this tab. */ }
    setReady(true)
    const onSystemChange = (event: MediaQueryListEvent) => setSystemDark(event.matches)
    const onStorage = (event: StorageEvent) => {
      if (event.key !== preferenceKey && event.key !== null) return
      const saved = event.key === null ? null : event.newValue
      setPreference(saved === 'light' || saved === 'dark' ? saved : null)
    }
    media.addEventListener('change', onSystemChange)
    window.addEventListener('storage', onStorage)
    return () => {
      media.removeEventListener('change', onSystemChange)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  // The old URLs remain intentional, shareable design previews. Explicit search
  // wins over the legacy route so its controls can switch modes without leaving it.
  const legacyDesign: Design | undefined = pathname === '/atelier' ? 'atelier' : pathname === '/nocturne' ? 'nocturne' : undefined
  const explicitDesign = search.design ?? legacyDesign
  const design: Design = explicitDesign ?? ((preference ?? (systemDark ? 'dark' : 'light')) === 'dark' ? 'nocturne' : 'forest')

  useEffect(() => {
    document.documentElement.dataset.design = design
    document.documentElement.style.colorScheme = design === 'nocturne' ? 'dark' : 'light'
  }, [design])

  function setMode(mode: AppearanceMode) {
    setPreference(mode)
    try {
      window.localStorage.setItem(preferenceKey, mode)
      setNotice('')
    } catch {
      setNotice('Your browser cannot remember this choice. It will apply while this tab stays open.')
    }
    if (explicitDesign) {
      // Update only design, retaining category, reset tokens, other search and hash.
      // No pathname change or component key: unsaved form edits remain mounted.
      void navigate({
        to: '.',
        search: previous => ({ ...previous, design: mode === 'dark' ? 'nocturne' : 'forest' }),
        hash: true,
        resetScroll: false,
      })
    }
  }

  return <AppearanceContext.Provider value={{ design, linkSearch: explicitDesign ? { design: explicitDesign } : {}, ready, notice, setMode }}>{children}</AppearanceContext.Provider>
}
