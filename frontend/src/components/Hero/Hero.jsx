import { useEffect, useRef } from 'react'
import StackDrawing from './StackDrawing'
import { PROJECTS, SHIPPED, LAB } from '../../data/projects'
import { COMPANY } from '../../data/site'
import { prefersReducedMotion } from '../../hooks/useReveal'
import styles from './Hero.module.css'

const pad = (n) => String(n).padStart(2, '0')

export default function Hero() {
  const heroRef = useRef(null)

  // Explode the stack drawing with pointer position and scroll
  useEffect(() => {
    const hero = heroRef.current
    if (!hero || prefersReducedMotion()) return
    let pointer = 0.3
    let raf = 0

    const apply = () => {
      raf = 0
      const scroll = Math.min(1, window.scrollY / (hero.offsetHeight * 0.8))
      const e = 10 + pointer * 26 + scroll * 46
      hero.style.setProperty('--e', `${e.toFixed(1)}px`)
    }
    const queue = () => { if (!raf) raf = requestAnimationFrame(apply) }
    const onMove = (ev) => {
      const r = hero.getBoundingClientRect()
      pointer = Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width))
      queue()
    }

    hero.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', queue, { passive: true })
    apply()
    return () => {
      hero.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', queue)
      cancelAnimationFrame(raf)
    }
  }, [])

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const live = PROJECTS.filter((p) => p.status === 'live').length
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()

  return (
    <section id="top" ref={heroRef} className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.kicker}>
            <span className={styles.kDot} />
            Software studio · {COMPANY.city}
          </p>

          <h1 className={styles.title}>
            <span className={styles.line}><span style={{ '--d': '0.1s' }}>Software,</span></span>
            <span className={styles.line}><span style={{ '--d': '0.22s' }}><em>engineered.</em></span></span>
          </h1>

          {/* Dimension line under the headline */}
          <div className={styles.dim} aria-hidden="true">
            <span className={styles.dimTick} />
            <span className={styles.dimLine} />
            <span className={styles.dimText}>BUILT TO SPEC</span>
            <span className={styles.dimLine} />
            <span className={styles.dimTick} />
          </div>

          <p className={styles.lede}>
            Stack Technologies designs and builds web platforms, online stores, business systems and AI
            automation for real businesses. It was founded by Precious Adetipe, an industrial engineer who
            treats software the way engineers treat machines: drawn up first, built to spec, and commissioned properly.
          </p>

          <div className={styles.actions}>
            <a href="#contact" onClick={scrollTo('contact')} className="btn btn--primary">
              Start a project
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" /></svg>
            </a>
            <a href="#work" onClick={scrollTo('work')} className="btn btn--ghost">
              See the work
            </a>
          </div>
        </div>

        <div className={styles.art}>
          <StackDrawing className={styles.drawing} />
        </div>
      </div>

      {/* Title block, like the corner of an engineering drawing */}
      <div className="container">
        <dl className={styles.block}>
          <div className={styles.cell}>
            <dt>Systems shipped</dt>
            <dd className={styles.num}>{pad(SHIPPED.length)}</dd>
          </div>
          <div className={styles.cell}>
            <dt>Live right now</dt>
            <dd className={styles.num}>{pad(live)}</dd>
          </div>
          <div className={styles.cell}>
            <dt>In the lab</dt>
            <dd className={styles.num}>{pad(LAB.length)}</dd>
          </div>
          <div className={styles.cell}>
            <dt>Client countries</dt>
            <dd className={styles.num}>02 <small>NG · SA</small></dd>
          </div>
          <div className={`${styles.cell} ${styles.meta}`}>
            <dt>Drawn by</dt>
            <dd>P. O. Adetipe, Founder</dd>
            <dt>Status</dt>
            <dd className={styles.open}><span className={styles.kDot} /> Taking on new projects</dd>
            <dt>Date</dt>
            <dd>{today}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
