import { useRef } from 'react'
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll'
import ProjectCard from './ProjectCard'
import { PROJECTS } from '../../data/projects'
import styles from './Projects.module.css'

export default function Projects() {
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  useAnimateOnScroll(headerRef)
  useAnimateOnScroll(gridRef, 0.05)

  return (
    <section id="projects" className={styles.projects}>
      <div className="container">
        <div ref={headerRef} className={styles.header}>
          <span className="section-label">What I&apos;ve Built</span>
          <h2 className="section-heading">Projects</h2>
          <p className="section-subtext">
            A selection of things I&apos;ve built; from platforms to automation systems. Click through for the full case study.
          </p>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
