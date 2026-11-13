import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { LAB } from '../../data/projects'
import { useReveal } from '../../hooks/useReveal'
import styles from './Lab.module.css'

export default function Lab() {
  const ref = useRef(null)
  useReveal(ref, { threshold: 0.08 })

  return (
    <section id="lab" ref={ref} className={`section ${styles.lab}`}>
      <div className="container">
        <p className="sheet-label reveal"><b>§ 04</b> The Lab</p>
        <div className={styles.head}>
          <h2 className="heading reveal" style={{ '--d': '0.08s' }}>
            On the <em>drawing board.</em>
          </h2>
          <p className={`${styles.note} reveal`} style={{ '--d': '0.14s' }}>
            Our own products and research, built in the open. Not finished yet, and labelled honestly.
          </p>
        </div>

        <div className={styles.grid}>
          {LAB.map((p, i) => (
            <Link
              key={p.slug}
              to={`/projects/${p.slug}`}
              viewTransition
              className={`${styles.card} reveal`}
              style={{ '--d': `${0.12 + i * 0.1}s` }}
              data-cursor="Open lab notes"
            >
              <div className={styles.media}>
                {p.screenshots[0] ? (
                  <img src={p.screenshots[0].src} alt={p.screenshots[0].alt} loading="lazy" />
                ) : (
                  <div className={styles.placeholder} aria-hidden="true">
                    <span>{p.no}</span>
                    <strong>{p.name}</strong>
                    <em>Greybox: no art yet</em>
                  </div>
                )}
                <span className={styles.wip} aria-hidden="true">Work in progress</span>
              </div>

              <div className={styles.body}>
                <div className={styles.meta}>
                  <span className="mono">{p.no}</span>
                  <span className="status status--in-build">In build</span>
                </div>
                <h3 className={styles.name} style={{ viewTransitionName: `title-${p.slug}` }}>{p.name}</h3>
                <p className={styles.type}>{p.type}</p>
                <p className={styles.summary}>{p.summary}</p>
                <p className={styles.milestone}>
                  <span>Current milestone</span>
                  {p.milestone}
                </p>
                <div className={styles.tags}>
                  {p.tags.slice(0, 4).map((t) => <span key={t} className="chip">{t}</span>)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
