import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { PUBLISHED, readingTime } from '../../data/notes'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { useReveal } from '../../hooks/useReveal'
import styles from './Notes.module.css'

export const formatDate = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

export default function Notes() {
  const ref = useRef(null)
  useDocumentTitle('Notes', 'Engineering notes from Stack Technologies: how real systems were built, migrated and kept running.')
  useReveal(ref, { threshold: 0.05 })

  return (
    <section ref={ref} className={styles.page}>
      <div className="container">
        <p className="sheet-label reveal"><b>NOTES</b> Engineering log</p>
        <h1 className="heading reveal" style={{ '--d': '0.08s' }}>
          Field <em>notes.</em>
        </h1>
        <p className="lede reveal" style={{ '--d': '0.14s' }}>
          How real systems were built, migrated and kept running: the decisions, the trade-offs and the code.
        </p>

        <div className={styles.list}>
          {PUBLISHED.length === 0 && <p className={styles.empty}>The first note is on its way.</p>}
          {PUBLISHED.map((n, i) => (
            <Link key={n.slug} to={`/notes/${n.slug}`} viewTransition className={`${styles.item} reveal`} style={{ '--d': `${0.1 + i * 0.06}s` }} data-cursor="Read note">
              <span className={styles.no}>{n.no}</span>
              <div className={styles.main}>
                <h2 className={styles.title} style={{ viewTransitionName: `note-${n.slug}` }}>{n.title}</h2>
                <p className={styles.dek}>{n.dek}</p>
                <div className={styles.meta}>
                  <span>{formatDate(n.date)}</span>
                  <span>{readingTime(n)} min read</span>
                  {n.draft && <span className={styles.draft}>Draft</span>}
                </div>
              </div>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
