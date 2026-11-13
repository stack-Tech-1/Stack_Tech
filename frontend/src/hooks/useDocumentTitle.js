import { useEffect } from 'react'

const BASE = 'Stack Technologies'

export function useDocumentTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} · ${BASE}` : `${BASE} — Software, engineered.`

    const meta = document.querySelector('meta[name="description"]')
    const previous = meta?.getAttribute('content')
    if (meta && description) meta.setAttribute('content', description)

    return () => {
      if (meta && previous) meta.setAttribute('content', previous)
    }
  }, [title, description])
}
