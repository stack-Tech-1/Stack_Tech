import { useEffect, useRef, useState } from 'react'
import styles from './CadCursor.module.css'

/**
 * CAD-style crosshair: two hairlines that span the viewport and a live
 * X/Y coordinate readout. Over anything with `data-cursor="label"` the
 * readout swaps to that label. Desktop (fine pointer) only, and off for
 * reduced-motion users. The native cursor is kept for usability.
 */
export default function CadCursor() {
  const [enabled, setEnabled] = useState(false)
  const hRef = useRef(null)
  const vRef = useRef(null)
  const tagRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return
    let x = -100
    let y = -100
    let raf = 0
    let label = ''

    const render = () => {
      raf = 0
      if (hRef.current) hRef.current.style.transform = `translate3d(0, ${y}px, 0)`
      if (vRef.current) vRef.current.style.transform = `translate3d(${x}px, 0, 0)`
      if (tagRef.current) {
        tagRef.current.style.transform = `translate3d(${x + 14}px, ${y + 14}px, 0)`
        tagRef.current.textContent = label || `X ${String(Math.round(x)).padStart(4, '0')}  Y ${String(Math.round(y)).padStart(4, '0')}`
        tagRef.current.dataset.active = label ? 'true' : 'false'
      }
    }

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      const target = e.target instanceof Element ? e.target.closest('[data-cursor]') : null
      label = target ? target.getAttribute('data-cursor') : ''
      document.documentElement.dataset.cursor = 'on'
      if (!raf) raf = requestAnimationFrame(render)
    }
    const onLeave = () => { document.documentElement.dataset.cursor = 'off' }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
      delete document.documentElement.dataset.cursor
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className={styles.layer} aria-hidden="true">
      <div ref={hRef} className={styles.h} />
      <div ref={vRef} className={styles.v} />
      <div ref={tagRef} className={styles.tag} />
    </div>
  )
}
