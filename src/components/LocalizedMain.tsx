import { cloneElement, isValidElement } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { useLanguage } from './LanguageProvider'

// Translate only presentation text. Input values, keys, URLs and event handlers
// remain untouched. Stateful interactive children keep their identity and data.
export function LocalizedMain({ children, as: Tag = 'main', ...props }: HTMLAttributes<HTMLElement> & { as?: 'main' | 'section' | 'header' | 'footer' | 'div' | 'nav' | 'article' }) {
  const { t } = useLanguage()
  const visit = (node: ReactNode): ReactNode => {
    if (typeof node === 'string') return t(node)
    if (Array.isArray(node)) return node.map(visit)
    if (!isValidElement<Record<string, unknown>>(node)) return node
    if (node.props.translate === 'no') return node
    const translated: Record<string, unknown> = {}
    for (const name of ['alt', 'title', 'aria-label', 'placeholder']) {
      const value = node.props[name]
      if (typeof value === 'string') translated[name] = t(value)
    }
    if ('children' in node.props) translated.children = visit(node.props.children as ReactNode)
    return cloneElement(node, translated)
  }
  return <Tag {...props}>{visit(children)}</Tag>
}
