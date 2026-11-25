import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight, ImageOff } from 'lucide-react'
import { photoUrls } from '@/data/cafe'
import type { Design } from '@/data/cafe'
import { useDesignSearch } from '@/hooks/use-design'
export type PublicPath = '/' | '/atelier' | '/nocturne' | '/story' | '/menu' | '/gather' | '/visit'
export function Photo({ image, alt, className = '', priority = false, position, sizes }: { image: string; alt: string; className?: string; priority?: boolean; position?: string; sizes?: string }) {
  const url = photoUrls[image]
  const [failed, setFailed] = useState(false)
  if (!url || failed) return <div className={`photo photo-placeholder ${className}`} role="img" aria-label={`Original photograph unavailable: ${alt}`}><ImageOff size={22} strokeWidth={1} aria-hidden="true" /><span className="photo-caption-label">{alt}</span><small>Original photograph unavailable</small></div>
  return <img src={url} alt={alt} className={`photo ${className}`} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" sizes={sizes} style={position ? { objectPosition: position } : undefined} onError={() => setFailed(true)} />
}
export function Reveal({ children, className = '', delay = 0, style }: { children: ReactNode; className?: string; delay?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) { el.classList.add('reveal-enter'); observer.disconnect() } }, { threshold: 0.12 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${className}`} style={{ ...style, animationDelay: `${delay}s` }}>{children}</div>
}
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) { return <p className={`eyebrow${light ? ' eyebrow--light' : ''}`}><span />{children}</p> }
export function PageLink({ to, children, secondary = false, className = '' }: { to: PublicPath; design: Design; children: ReactNode; secondary?: boolean; className?: string }) {
  const designSearch = useDesignSearch()
  return <Link to={to} search={designSearch} className={`${secondary ? 'text-link' : 'button'} ${className}`}><span>{children}</span><ArrowUpRight size={17} strokeWidth={1.6} aria-hidden="true" /></Link>
}
export function ExternalLink({ href, children, className = '', button = false }: { href: string; children: ReactNode; className?: string; button?: boolean }) {
  return <a href={href} target="_blank" rel="noreferrer" className={`${button ? 'button' : 'text-link'} ${className}`}><span>{children}</span><ArrowUpRight size={17} strokeWidth={1.6} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
}
