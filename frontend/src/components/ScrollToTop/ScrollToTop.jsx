import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// On route change: jump to the top, or to the #section in the URL once it has rendered.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }
    const timer = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
    return () => clearTimeout(timer)
  }, [pathname, hash])

  return null
}
