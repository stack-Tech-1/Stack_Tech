import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SHIPPED, STATUS_LABEL } from '../../data/projects'
import { useReveal } from '../../hooks/useReveal'
import styles from './Work.module.css'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'live', label: 'Live' },
  { id: 'shipped', label: 'Shipped' },
]

export default function Work() {
  const ref = useRef(null)
  const previewRef = useRef(null)
  const [filter, setFilter] = useState('all')
  const [hovered, setHovered] = useState(null)
  const items = filter === 'all' ? SHIPPED : SHIPPED.filter((p) => p.status === filter)

  useReveal(ref, { threshold: 0.05, deps: [filter] })

  // Floating preview that trails the cursor (fine pointers only)
  useEffect(() => {
    const el = previewRef.current
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0
    const tick = () => {
      cx += (x - cx) * 0.16
      cy += (y - cy) * 0.16
      el.style.transform = `translate3d(${cx + 28}px, ${cy - 110}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    const onMove = (e) => { x = e.clientX; y = e.clientY }
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  const shot = hovered?.screenshots[0]

  return (
    <section id="work" ref={ref} className="section">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className="sheet-label reveal"><b>§ 01</b> Drawing register</p>
            <h2 className="heading reveal" style={{ '--d': '0.08s' }}>
              Systems we&apos;ve <em>shipped.</em>
            </h2>
          </div>
          <div className={`${styles.filters} reveal`} role="group" aria-label="Filter projects" style={{ '--d': '0.16s' }}>
            {FILTERS.map((f) => (
              <button
                key={f.id}
                aria-pressed={filter === f.id}
                className={`${styles.filter} ${filter === f.id ? styles.filterOn : ''}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
                <span>{f.id === 'all' ? SHIPPED.length : SHIPPED.filter((p) => p.status === f.id).length}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.table} onMouseLeave={() => setHovered(null)}>
          <div className={styles.thead} aria-hidden="true">
            <span>No.</span>
            <span>Project</span>
            <span>Client</span>
            <span>Year</span>
            <span>Status</span>
            <span />
          </div>

          {items.map((p, i) => (
            <Link
              key={p.slug}
              to={`/projects/${p.slug}`}
              viewTransition
              className={`${styles.row} reveal`}
              style={{ '--d': `${i * 0.06}s` }}
              onMouseEnter={() => setHovered(p)}
              onFocus={() => setHovered(p)}
              data-cursor="Open case study"
            >
              <span className={styles.no}>{p.no}</span>

              <span className={styles.main}>
                {p.screenshots[0] && (
                  <img className={styles.thumb} src={p.screenshots[0].src} alt="" loading="lazy" />
                )}
                <span className={styles.name} style={{ viewTransitionName: `title-${p.slug}` }}>{p.name}</span>
                <span className={styles.type}>{p.type}</span>
                <span className={styles.summary}>{p.summary}</span>
              </span>

              <span className={styles.client}>{p.client || '—'}</span>
              <span className={styles.year}>{p.year}</span>
              <span><span className={`status status--${p.status}`}>{STATUS_LABEL[p.status]}</span></span>
              <span className={styles.arrow} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.5" /></svg>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div ref={previewRef} className={`${styles.preview} ${hovered ? styles.previewOn : ''}`} aria-hidden="true">
        {hovered && (shot ? (
          <img key={shot.src} src={shot.src} alt="" />
        ) : (
          <div className={styles.previewBlank}>
            <span>{hovered.no}</span>
            <strong>{hovered.name}</strong>
          </div>
        ))}
        {hovered && <span className={styles.previewTag}>{hovered.tags.slice(0, 3).join(' · ')}</span>}
      </div>
    </section>
  )
}
