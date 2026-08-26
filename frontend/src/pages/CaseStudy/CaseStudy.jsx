import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProjectBySlug, PROJECTS } from '../../data/projects'
import styles from './CaseStudy.module.css'

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function LiveIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ArrowLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 12H5m0 0l6 6m-6-6l6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [slug])

  if (!project) {
    return (
      <section className={styles.notFound}>
        <div className="container">
          <p className="section-label">404</p>
          <h1 className="section-heading">Project not found</h1>
          <Link to="/#projects" className={styles.backLink}>
            <ArrowLeft /> Back to all projects
          </Link>
        </div>
      </section>
    )
  }

  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug)
  const next = PROJECTS[(currentIndex + 1) % PROJECTS.length]

  return (
    <article className={styles.page}>
      <div className="container">
        <Link to="/#projects" className={styles.backLink}>
          <ArrowLeft /> Back to all projects
        </Link>

        <header className={styles.header}>
          <span className="section-label">Case Study</span>
          <h1 className={styles.title}>{project.name}</h1>
          <p className={styles.tagline}>{project.tagline}</p>

          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>

          <div className={styles.actions}>
            {project.github ? (
              <a href={project.github} className={styles.linkBtn} target="_blank" rel="noopener noreferrer">
                <GitHubIcon /> Source
              </a>
            ) : (
              <span className={styles.privateBadge}>Private codebase</span>
            )}
            {project.live && (
              <a href={project.live} className={`${styles.linkBtn} ${styles.linkBtnPrimary}`} target="_blank" rel="noopener noreferrer">
                <LiveIcon /> Live demo
              </a>
            )}
          </div>
        </header>

        <div className={styles.mediaFrame}>
          {project.screenshots.length > 0 ? (
            <img src={project.screenshots[0].src} alt={project.screenshots[0].alt} className={styles.mediaImg} />
          ) : (
            <div className={styles.mediaPlaceholder} aria-hidden="true">
              <span className={styles.mediaGlyph}>{'</>'}</span>
            </div>
          )}
        </div>

        {project.screenshots.length > 1 && (
          <div className={styles.gallery}>
            {project.screenshots.slice(1).map((shot) => (
              <img key={shot.src} src={shot.src} alt={shot.alt} className={styles.galleryImg} />
            ))}
          </div>
        )}

        <div className={styles.body}>
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>Overview</h2>
            {project.overview.map((para, i) => (
              <p key={i} className={styles.paragraph}>{para}</p>
            ))}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>Key Features</h2>
            <ul className={styles.featureList}>
              {project.features.map((feature) => (
                <li key={feature} className={styles.featureItem}>
                  <span className={styles.featureBullet} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>Tech Stack</h2>
            <div className={styles.stackGrid}>
              {Object.entries(project.techStack).map(([category, items]) => (
                <div key={category} className={styles.stackGroup}>
                  <h3 className={styles.stackCategory}>{category}</h3>
                  <div className={styles.stackTags}>
                    {items.map((item) => (
                      <span key={item} className={styles.tag}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {project.highlights.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Technical Highlights</h2>
              <div className={styles.highlights}>
                {project.highlights.map((highlight, i) => (
                  <div key={i} className={styles.highlightCard}>
                    <p>{highlight}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className={styles.footerNav}>
          <Link to="/#projects" className={styles.backLink}>
            <ArrowLeft /> All projects
          </Link>
          <Link to={`/projects/${next.slug}`} className={styles.nextLink}>
            Next: {next.name} →
          </Link>
        </div>
      </div>
    </article>
  )
}
