import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getNote, readingTime } from '../../data/notes'
import { getProjectBySlug } from '../../data/projects'
import SystemDiagram from '../../components/SystemDiagram/SystemDiagram'
import NotFound from '../NotFound/NotFound'
import { formatDate } from '../Notes/Notes'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { useReveal } from '../../hooks/useReveal'
import styles from './Note.module.css'

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 className={styles.h2}>{block.text}</h2>
    case 'list':
      return (
        <ul className={styles.list}>
          {block.items.map((it) => <li key={it}>{it}</li>)}
        </ul>
      )
    case 'code':
      return (
        <figure className={styles.code}>
          <figcaption>{block.lang}</figcaption>
          <pre><code>{block.text}</code></pre>
        </figure>
      )
    case 'callout':
      return <aside className={styles.callout}><span>NOTE</span><p>{block.text}</p></aside>
    case 'diagram':
      return <div className={styles.diagram}><SystemDiagram diagram={block.diagram} caption={block.caption} /></div>
    default:
      return <p className={styles.p}>{block.text}</p>
  }
}

export default function Note() {
  const { slug } = useParams()
  const note = getNote(slug)
  const ref = useRef(null)
  useDocumentTitle(note?.title, note?.dek)
  useReveal(ref, { threshold: 0.05, deps: [slug] })

  if (!note) return <NotFound />
  const project = note.project ? getProjectBySlug(note.project) : null

  return (
    <article ref={ref} key={slug} className={styles.page}>
      <div className={`container ${styles.narrow}`}>
        <Link to="/notes" className={styles.back}>← All notes</Link>

        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.no}>{note.no}</span>
            <span>{formatDate(note.date)}</span>
            <span>{readingTime(note)} min read</span>
            {note.draft && <span className={styles.draft}>Draft · not published</span>}
          </div>
          <h1 className={styles.title} style={{ viewTransitionName: `note-${note.slug}` }}>{note.title}</h1>
          <p className={styles.dek}>{note.dek}</p>
          <div className={styles.tags}>
            {note.tags.map((t) => <span key={t} className="chip">{t}</span>)}
          </div>
          <p className={styles.byline}>By Precious Adetipe, Founder · Stack Technologies</p>
        </header>

        <div className={styles.body}>
          {note.blocks.map((b, i) => <Block key={i} block={b} />)}
        </div>

        <footer className={styles.footer}>
          {project && (
            <Link to={`/projects/${project.slug}`} viewTransition className={styles.related}>
              <span>Related case study</span>
              <strong>{project.name} →</strong>
            </Link>
          )}
          <div className={styles.cta}>
            <p>Running a system that can&apos;t go down while you change it?</p>
            <Link to="/#contact" className="btn btn--primary">Start a project</Link>
          </div>
        </footer>
      </div>
    </article>
  )
}
