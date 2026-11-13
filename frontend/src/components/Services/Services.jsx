import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { SERVICES } from '../../data/site'
import { getProjectBySlug } from '../../data/projects'
import { useReveal } from '../../hooks/useReveal'
import styles from './Services.module.css'

export default function Services() {
  const ref = useRef(null)
  useReveal(ref, { threshold: 0.08 })

  return (
    <section id="services" ref={ref} className="section">
      <div className="container">
        <p className="sheet-label reveal"><b>§ 02</b> Services</p>
        <h2 className="heading reveal" style={{ '--d': '0.08s' }}>
          What we <em>build.</em>
        </h2>
        <p className="lede reveal" style={{ '--d': '0.14s' }}>
          Four kinds of work, one standard. Every service below links to a system already running in the real world.
        </p>

        <div className={styles.grid}>
          {SERVICES.map((s, i) => (
            <article key={s.code} className={`${styles.card} ticks reveal`} style={{ '--d': `${0.1 + i * 0.08}s` }}>
              <header className={styles.top}>
                <span className={styles.code}>{s.code}</span>
                <span className={`${styles.rule} draw-x`} style={{ '--d': `${0.3 + i * 0.08}s` }} />
              </header>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.body}>{s.body}</p>

              <ul className={styles.list}>
                {s.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>

              <footer className={styles.proof}>
                <span className={styles.proofLabel}>Seen in</span>
                {s.proof.map((slug) => {
                  const p = getProjectBySlug(slug)
                  return p ? (
                    <Link key={slug} to={`/projects/${slug}`} viewTransition className={styles.proofLink} data-cursor={`View ${p.name}`}>
                      {p.name}
                    </Link>
                  ) : null
                })}
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
