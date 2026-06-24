import { useEffect } from 'react'

export function useAnimateOnScroll(ref, threshold = 0.15) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.classList.add('animate-hidden')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('animate-hidden')
          el.classList.add('animate-visible')
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold])
}
