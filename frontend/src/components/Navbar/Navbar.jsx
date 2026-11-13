import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../Logo/Logo'
import styles from './Navbar.module.css'

export const NAV_LINKS = [
  { no: '01', label: 'Work', id: 'work' },
  { no: '02', label: 'Services', id: 'services' },
  { no: '03', label: 'Process', id: 'process' },
  { no: '04', label: 'Lab', id: 'lab' },
  { no: '05', label: 'Founder', id: 'founder' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const progressRef = useRef(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  // Scroll state + ruler progress (written straight to the DOM, no re-render per frame)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      progressRef.current?.style.setProperty('--p', p.toFixed(4))
      setScrolled(window.scrollY > 24)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [pathname])

  // Active section highlight on the home page
  useEffect(() => {
    if (!isHome) { setActive(''); return }
    const els = [...NAV_LINKS.map((l) => l.id), 'contact'].map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [isHome])

  // Lock page scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => setOpen(false), [pathname])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      history.replaceState(null, '', `#${id}`)
    } else {
      navigate(`/#${id}`)
    }
  }

  const goHome = (e) => {
    if (isHome) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      history.replaceState(null, '', '/')
    }
  }

  const sheet = active ? [...NAV_LINKS, { no: '06', id: 'contact' }].find((l) => l.id === active)?.no : '00'

  return (
    <header className={`${styles.nav} ${scrolled || !isHome ? styles.scrolled : ''} ${open ? styles.isOpen : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} onClick={goHome} aria-label="Stack Technologies, home">
          <Logo />
        </Link>

        <nav className={styles.links} aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`/#${l.id}`}
              onClick={go(l.id)}
              className={`${styles.link} ${active === l.id ? styles.active : ''}`}
            >
              <span className={styles.no}>{l.no}</span>
              {l.label}
            </a>
          ))}
        </nav>

        <div className={styles.right}>
          {isHome && <span className={styles.sheet} aria-hidden="true">SHEET {sheet}/06</span>}
          <a href="/#contact" onClick={go('contact')} className={`btn btn--primary ${styles.cta}`}>
            Start a project
          </a>
          <button
            className={styles.burger}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span /><span />
          </button>
        </div>
      </div>

      {/* Ruler-style scroll progress */}
      <div ref={progressRef} className={styles.ruler} aria-hidden="true">
        <div className={styles.rulerFill} />
      </div>

      <div id="mobile-menu" className={styles.mobile} hidden={!open}>
        <nav className="container" aria-label="Mobile">
          {[...NAV_LINKS, { no: '06', label: 'Contact', id: 'contact' }].map((l, i) => (
            <a key={l.id} href={`/#${l.id}`} onClick={go(l.id)} className={styles.mLink} style={{ '--i': i }}>
              <span className={styles.no}>{l.no}</span>
              {l.label}
            </a>
          ))}
          <p className={styles.mFoot}>stacktechnologies0@gmail.com · Ibadan, Nigeria</p>
        </nav>
      </div>
    </header>
  )
}
