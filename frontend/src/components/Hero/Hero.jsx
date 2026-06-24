import { useState, useEffect } from 'react'
import styles from './Hero.module.css'

const TAGLINE = 'code, an extension of the mind'

function TypewriterText({ text, delay = 0 }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) return
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, 52)
    return () => clearTimeout(timer)
  }, [started, displayed, text])

  return (
    <span className={styles.typewriterText}>
      {displayed}
      <span className={styles.cursor} aria-hidden="true">|</span>
    </span>
  )
}

export default function Hero() {
  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.glowOrb}    aria-hidden="true" />
      <div className={styles.glowOrb2}   aria-hidden="true" />
      <div className={styles.scanBar}    aria-hidden="true" />
      <div className={styles.gridLines}  aria-hidden="true" />

      {/* Corner brackets */}
      <span className={`${styles.bracket} ${styles.tl}`} aria-hidden="true" />
      <span className={`${styles.bracket} ${styles.tr}`} aria-hidden="true" />
      <span className={`${styles.bracket} ${styles.bl}`} aria-hidden="true" />
      <span className={`${styles.bracket} ${styles.br}`} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Available for work
        </div>

        <p className={styles.role}>Full Stack Developer</p>

        <h1 className={styles.name}>
          <span className={styles.nameLine} data-text="STack">STack </span>
          <span className={`${styles.nameLine} ${styles.nameAccent}`} data-text="TECHNOLOGIES">TECHNOLOGIES</span>
          {/*<span className={styles.nameLine} data-text="Adetipe"></span>*/}
        </h1>

        <p className={styles.tagline}>
          <TypewriterText text={TAGLINE} delay={900} />
        </p>

        <div className={styles.actions}>
          <a href="#projects" className={styles.ctaBtn} onClick={scrollTo('projects')}>
            See My Work
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#contact" className={styles.secondaryBtn} onClick={scrollTo('contact')}>
            Get In Touch
          </a>
        </div>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <div className={styles.scrollLine} />
        <span>scroll</span>
      </div>
    </section>
  )
}
