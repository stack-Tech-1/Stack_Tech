import { useEffect, useRef } from 'react'
import styles from './CursorGlow.module.css'

export default function CursorGlow() {
  const dotRef   = useRef(null)
  const ringRef  = useRef(null)
  const posRef   = useRef({ x: -200, y: -200 })
  const ringPos  = useRef({ x: -200, y: -200 })
  const rafRef   = useRef(null)

  useEffect(() => {
    const onMove = (e) => { posRef.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove, { passive: true })

    const animate = () => {
      const { x, y } = posRef.current
      const dot = dotRef.current
      const ring = ringRef.current
      if (dot) {
        dot.style.left = `${x}px`
        dot.style.top  = `${y}px`
      }
      if (ring) {
        // Lazy follow for the ring
        ringPos.current.x += (x - ringPos.current.x) * 0.12
        ringPos.current.y += (y - ringPos.current.y) * 0.12
        ring.style.left = `${ringPos.current.x}px`
        ring.style.top  = `${ringPos.current.y}px`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className={styles.dot}  aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  )
}
