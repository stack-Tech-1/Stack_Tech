import styles from './Projects.module.css'

export default function ProjectCard({ project, index }) {
  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    card.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease'
    card.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateY(-8px) scale(1.02)`
  }

  const handleMouseLeave = (e) => {
    const card = e.currentTarget
    card.style.transition = 'transform 0.55s ease, box-shadow 0.3s ease, border-color 0.3s ease'
    card.style.transform = ''
  }

  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.cardShine} aria-hidden="true" />

      <div className={styles.cardTop}>
        <span className={styles.cardNumber}>0{index + 1}</span>
        <div className={styles.cardLinks}>
          <a href={project.github} className={styles.cardLinkBtn} aria-label="GitHub repository" target="_blank" rel="noopener noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            GitHub ↗
          </a>
          <a href={project.live} className={styles.cardLinkBtn} aria-label="Live project" target="_blank" rel="noopener noreferrer">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Live ↗
          </a>
        </div>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{project.name}</h3>
        <p className={styles.cardDesc}>{project.description}</p>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.techTags}>
          {project.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  )
}
