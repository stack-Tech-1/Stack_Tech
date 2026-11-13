import { useRef } from 'react'
import { PROCESS } from '../../data/site'
import { useReveal } from '../../hooks/useReveal'
import styles from './Process.module.css'

export default function Process() {
  const ref = useRef(null)
  useReveal(ref, { threshold: 0.12 })

  return (
    <section id="process" ref={ref} className="section">
      <div className="container">
        <p className="sheet-label reveal"><b>§ 03</b> Process</p>
        <h2 className="heading reveal" style={{ '--d': '0.08s' }}>
          Drawn up first. <em>Then built.</em>
        </h2>
        <p className="lede reveal" style={{ '--d': '0.14s' }}>
          The same stages an engineer uses to commission a physical system, applied to software. You always know which
          stage we&apos;re in and what you&apos;ll have at the end of it.
        </p>

        <div className={styles.wrap}>
        <span className={`${styles.rail} draw-x`} style={{ '--d': '0.2s' }} aria-hidden="true" />
        <ol className={styles.track}>
          {PROCESS.map((p, i) => (
            <li key={p.step} className={`${styles.step} reveal`} style={{ '--d': `${0.25 + i * 0.15}s` }}>
              <span className={styles.node} aria-hidden="true"><span /></span>
              <span className={styles.no}>STAGE {p.step}</span>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.body}>{p.body}</p>
              <p className={styles.out}>
                <span>Output</span>
                {p.out}
              </p>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  )
}
