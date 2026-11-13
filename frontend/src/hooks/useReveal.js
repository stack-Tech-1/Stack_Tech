import { useEffect } from 'react'

/**
 * Adds `is-in` to every `.reveal` / `.draw-x` / `[data-reveal]` element inside
 * `ref` (and to `ref` itself) the first time it scrolls into view.
 * Pass `deps` when the children change (e.g. a filtered list).
 */
export function useReveal(ref, { threshold = 0.15, deps = [] } = {}) {
  useEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = [root, ...root.querySelectorAll('.reveal, .draw-x, [data-reveal]')]

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    )

    targets.forEach((el) => {
      if (!el.classList.contains('is-in')) io.observe(el)
    })
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, threshold, ...deps])
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
