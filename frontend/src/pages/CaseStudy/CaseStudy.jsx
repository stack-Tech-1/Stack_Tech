import { useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProjectBySlug, PROJECTS, STATUS_LABEL } from '../../data/projects'
import SystemDiagram from '../../components/SystemDiagram/SystemDiagram'
import NotFound from '../NotFound/NotFound'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { useReveal } from '../../hooks/useReveal'
import styles from './CaseStudy.module.css'

const Arrow = ({ dir = 'right' }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={dir === 'left' ? { transform: 'scaleX(-1)' } : undefined}>
    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)

function Lightbox({ shot, onClose }) {
  const ref = useRef(null)
  if (!shot) return null
  return (
    <dialog
      ref={(el) => { ref.current = el; if (el && !el.open) el.showModal() }}
      className={styles.lightbox}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
    >
      <img src={shot.src} alt={shot.alt} />
      <div className={styles.lbBar}>
        <span>{shot.alt}</span>
        <button type="button" onClick={() => ref.current?.close()} autoFocus>Close ✕</button>
      </div>
    </dialog>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  const ref = useRef(null)
  const [open, setOpen] = useState(null)

  useDocumentTitle(project?.name, project?.summary)
  useReveal(ref, { threshold: 0.05, deps: [slug] })

  if (!project) return <NotFound />

  const idx = PROJECTS.findIndex((p) => p.slug === slug)
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length]
  const next = PROJECTS[(idx + 1) % PROJECTS.length]
  const [hero, ...rest] = project.screenshots
  const backHref = project.status === 'in-build' ? '/#lab' : '/#work'

  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'features', title: 'Key features' },
    { id: 'architecture', title: 'Architecture' },
    { id: 'stack', title: 'Tech stack' },
    project.highlights.length > 0 && { id: 'notes', title: 'Engineering notes' },
  ].filter(Boolean)
  const num = (id) => `${sections.findIndex((s) => s.id === id) + 1}.0`

  return (
    <article ref={ref} key={slug} className={styles.page}>
      <div className="container">
        <Link to={backHref} className={styles.back}>
          <Arrow dir="left" /> {project.status === 'in-build' ? 'Back to the Lab' : 'All work'}
        </Link>

        <header className={styles.header}>
          <div className={styles.metaRow}>
            <span className={styles.no}>DWG {project.no}</span>
            <span className={`status status--${project.status}`}>{STATUS_LABEL[project.status]}</span>
            <span className={styles.type}>{project.type}</span>
          </div>
          <h1 className={styles.title} style={{ viewTransitionName: `title-${project.slug}` }}>{project.name}</h1>
          <p className={styles.tagline}>{project.tagline}</p>

          <dl className={styles.spec}>
            <div><dt>Client</dt><dd>{project.client || 'Private'}</dd></div>
            <div><dt>Role</dt><dd>{project.role}</dd></div>
            <div><dt>Year</dt><dd>{project.year}</dd></div>
            <div>
              <dt>Source</dt>
              <dd>
                {project.github
                  ? <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                  : 'Private codebase'}
              </dd>
            </div>
          </dl>

          <div className={styles.actions}>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn--primary" data-cursor="Visit live site">
                Visit live site <Arrow />
              </a>
            )}
            <Link to="/#contact" className="btn btn--ghost">Build something similar</Link>
          </div>

          {project.milestone && (
            <p className={styles.milestone}>
              <span>In build · current milestone</span>
              {project.milestone}
            </p>
          )}
        </header>

        {project.metrics && (
          <section className={`${styles.metrics} reveal`} aria-label="Results">
            <p className={styles.metricsLabel}>{project.metrics.label}</p>
            <dl className={styles.metricsGrid}>
              {project.metrics.items.map((m) => (
                <div key={m.label}>
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {hero && (
          <figure className={`${styles.media} reveal`}>
            <button type="button" className={styles.mediaBtn} onClick={() => setOpen(hero)} data-cursor="Enlarge">
              <img src={hero.src} alt={hero.alt} />
            </button>
            <figcaption><span>VIEW A</span> {hero.alt}</figcaption>
          </figure>
        )}

        {rest.length > 0 && (
          <div className={styles.gallery}>
            {rest.map((s, i) => (
              <figure key={s.src} className={`${styles.thumb} reveal`} style={{ '--d': `${i * 0.08}s` }}>
                <button type="button" className={styles.mediaBtn} onClick={() => setOpen(s)} data-cursor="Enlarge">
                  <img src={s.src} alt={s.alt} loading="lazy" />
                </button>
                <figcaption><span>VIEW {String.fromCharCode(66 + i)}</span> {s.alt}</figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className={styles.body}>
          <aside className={styles.toc} aria-label="On this page">
            <span>Contents</span>
            <ol>
              {sections.map((s) => (
                <li key={s.id}><a href={`#${s.id}`}><b>{num(s.id)}</b>{s.title}</a></li>
              ))}
            </ol>
          </aside>

          <div className={styles.content}>
            <section id="overview" className={`${styles.section} reveal`}>
              <h2><span>{num('overview')}</span>Overview</h2>
              {project.overview.map((p, i) => <p key={i} className={styles.p}>{p}</p>)}
            </section>

            <section id="features" className={`${styles.section} reveal`}>
              <h2><span>{num('features')}</span>Key features</h2>
              <ol className={styles.features}>
                {project.features.map((f, i) => (
                  <li key={f}><span>{String(i + 1).padStart(2, '0')}</span>{f}</li>
                ))}
              </ol>
            </section>

            <section id="architecture" className={`${styles.section} reveal`}>
              <h2><span>{num('architecture')}</span>Architecture</h2>
              <SystemDiagram diagram={project.diagram} caption={`${project.name}: how the pieces connect`} />
            </section>

            <section id="stack" className={`${styles.section} reveal`}>
              <h2><span>{num('stack')}</span>Tech stack</h2>
              <div className={styles.stack}>
                {Object.entries(project.techStack).map(([cat, items]) => (
                  <div key={cat} className={styles.stackRow}>
                    <h3>{cat}</h3>
                    <div>{items.map((it) => <span key={it} className="chip">{it}</span>)}</div>
                  </div>
                ))}
              </div>
            </section>

            {project.highlights.length > 0 && (
              <section id="notes" className={`${styles.section} reveal`}>
                <h2><span>{num('notes')}</span>Engineering notes</h2>
                <div className={styles.notes}>
                  {project.highlights.map((h, i) => (
                    <blockquote key={i} className={styles.note}>
                      <span>NOTE {i + 1}</span>
                      <p>{h}</p>
                    </blockquote>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        <nav className={styles.pager} aria-label="More projects">
          <Link to={`/projects/${prev.slug}`} viewTransition className={styles.pagerLink}>
            <span><Arrow dir="left" /> Previous · {prev.no}</span>
            <strong>{prev.name}</strong>
          </Link>
          <Link to={`/projects/${next.slug}`} viewTransition className={`${styles.pagerLink} ${styles.pagerNext}`}>
            <span>Next · {next.no} <Arrow /></span>
            <strong>{next.name}</strong>
          </Link>
        </nav>
      </div>

      <Lightbox shot={open} onClose={() => setOpen(null)} />
    </article>
  )
}
