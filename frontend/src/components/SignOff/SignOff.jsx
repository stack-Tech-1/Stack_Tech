import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { VISIBLE_TESTIMONIALS } from '../../data/site'
import { getProjectBySlug } from '../../data/projects'
import { useReveal } from '../../hooks/useReveal'
import styles from './SignOff.module.css'

/**
 * Client testimonial styled as the sign-off box on an engineering drawing:
 * the client "approves" the work. Pass `project` to show only that project's
 * testimonial (case-study pages); omit it for all of them (home page).
 */
export default function SignOff({ project, compact = false }) {
  const ref = useRef(null)
  const items = VISIBLE_TESTIMONIALS.filter((t) => !project || t.project === project)
  useReveal(ref, { threshold: 0.15 })
  if (items.length === 0) return null

  return (
    <div ref={ref} className={`${styles.wrap} ${compact ? styles.compact : ''}`}>
      {items.map((t) => {
        const p = getProjectBySlug(t.project)
        return (
          <figure key={t.id} className={`${styles.card} reveal`}>
            <header className={styles.head}>
              <span>Client sign-off</span>
              <span>{p ? `Ref. ${p.no} · ${p.name}` : t.company}</span>
            </header>

            <div className={styles.body}>
              <blockquote>
                <p className={styles.headline}>&ldquo;{t.headline}&rdquo;</p>
                {!compact && t.quote.map((q) => <p key={q} className={styles.quote}>{q}</p>)}
              </blockquote>

              <figcaption className={styles.sign}>
                <div className={styles.signLine}>
                  <span className={styles.label}>Approved by</span>
                  <span className={styles.name}>{t.name || '[ name pending ]'}</span>
                  <span className={styles.role}>{t.role}, {t.company}</span>
                </div>
                <span className={styles.stamp} aria-hidden="true">
                  <b>Approved</b>
                  <small>{new Date(`${t.date}T12:00:00`).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }).toUpperCase()}</small>
                </span>
              </figcaption>

              {p && !project && (
                <Link to={`/projects/${p.slug}`} viewTransition className={styles.link}>
                  See the {p.name} case study →
                </Link>
              )}
            </div>
          </figure>
        )
      })}
    </div>
  )
}
