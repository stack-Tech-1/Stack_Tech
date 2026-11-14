import { Link, useLocation } from 'react-router-dom'
import Logo from '../Logo/Logo'
import { COMPANY } from '../../data/site'
import { PUBLISHED } from '../../data/notes'
import { NAV_LINKS } from '../Navbar/Navbar'
import styles from './Footer.module.css'

export default function Footer() {
  const { pathname } = useLocation()
  const year = new Date().getFullYear()

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.block}>
          <div className={`${styles.cell} ${styles.brand}`}>
            <Link to="/" aria-label="Stack Technologies, home"><Logo /></Link>
            <p>Software, engineered. Web platforms, e-commerce, business systems and AI automation.</p>
          </div>

          <nav className={styles.cell} aria-label="Footer">
            <span className={styles.label}>Index</span>
            <ul>
              {[...NAV_LINKS, { no: '06', label: 'Contact', id: 'contact' }].map((l) => (
                <li key={l.id}>
                  <Link to={`/#${l.id}`}><span>{l.no}</span>{l.label}</Link>
                </li>
              ))}
              {PUBLISHED.length > 0 && <li><Link to="/notes"><span>N</span>Notes</Link></li>}
            </ul>
          </nav>

          <div className={styles.cell}>
            <span className={styles.label}>Contact</span>
            <ul>
              <li><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>
              <li><a href={COMPANY.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a></li>
              <li><a href={COMPANY.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
              <li className={styles.muted}>{COMPANY.city}</li>
            </ul>
          </div>

          <div className={`${styles.cell} ${styles.reg}`}>
            <span className={styles.label}>Registered</span>
            <p>{COMPANY.legalName}</p>
            <p className={styles.muted}>CAC {COMPANY.regNo}</p>
            <p className={styles.muted}>Founder: {COMPANY.founder}</p>
          </div>
        </div>

        <div className={styles.base}>
          <span>© {year} {COMPANY.brand}. All rights reserved.</span>
          <span className={styles.scale}>SCALE 1:1 · {pathname === '/' ? 'SHEET 06/06' : 'DETAIL SHEET'}</span>
          <button type="button" onClick={toTop} className={styles.top}>
            Back to top
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 12V2M2.5 6.5 7 2l4.5 4.5" stroke="currentColor" strokeWidth="1.4" /></svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
