import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import styles from './NotFound.module.css'

export default function NotFound() {
  useDocumentTitle('Sheet not found')

  return (
    <section className={styles.wrap}>
      <div className="container">
        <p className="sheet-label"><b>ERR 404</b> Drawing register</p>
        <h1 className={styles.code} aria-label="404">
          <span>4</span><span className={styles.zero}>0</span><span>4</span>
        </h1>
        <h2 className={styles.title}>This sheet isn&apos;t in the register.</h2>
        <p className={styles.text}>
          The page may have moved, or the link has a typo. Everything that exists is linked from the home page.
        </p>
        <div className={styles.actions}>
          <Link to="/" className="btn btn--primary">Back to home</Link>
          <Link to="/#work" className="btn btn--ghost">See the work</Link>
        </div>
      </div>
    </section>
  )
}
