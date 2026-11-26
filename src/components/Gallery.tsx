import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { spacePhotos } from '@/data/cafe'
import { LocalizedMain } from './LocalizedMain'
import { useLanguage } from './LanguageProvider'
import { Photo, Reveal } from './ui'
export function Gallery() {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<number | null>(null)
  const modal = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLButtonElement | null>(null)
  const current = selected === null ? null : spacePhotos[selected]
  const move = (direction: number) => setSelected(index => index === null ? null : (index + direction + spacePhotos.length) % spacePhotos.length)
  useEffect(() => {
    if (selected !== null && !modal.current?.open) modal.current?.showModal()
    if (selected === null && modal.current?.open) { modal.current.close(); opener.current?.focus() }
  }, [selected])
  return <LocalizedMain as="div" className="contents"><div className="space-gallery">{spacePhotos.slice(0, 4).map((item, index) => <Reveal key={item.image} delay={index * 0.06}><button className="gallery-tile" aria-label={`${t('Enlarge photo')}: ${t(item.alt)}`} onClick={event => { opener.current = event.currentTarget; setSelected(index) }}><Photo image={item.image} alt={item.alt} /><span><Expand size={18} /></span></button></Reveal>)}</div><dialog className="lightbox" ref={modal} aria-label="Inside Twitch Cafe photo gallery" onClose={() => { setSelected(null); opener.current?.focus() }} onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); move(1) } if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) } }} onClick={event => { if (event.target === modal.current) setSelected(null) }}><button className="lightbox-close icon-button" aria-label="Close photo gallery" onClick={() => setSelected(null)}><X /></button>{current && <div className="lightbox-content"><Photo image={current.image} alt={current.alt} priority /><div className="lightbox-caption"><p>{current.alt}</p><span>{selected! + 1} / {spacePhotos.length}</span></div></div>}<button className="lightbox-previous icon-button" aria-label="Previous photo" onClick={() => move(-1)}><ChevronLeft /></button><button className="lightbox-next icon-button" aria-label="Next photo" onClick={() => move(1)}><ChevronRight /></button></dialog></LocalizedMain>
}
