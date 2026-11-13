import { useRef } from 'react'
import { COMPANY, TIMELINE, TOOLKIT } from '../../data/site'
import { useReveal } from '../../hooks/useReveal'
import styles from './Founder.module.css'

export default function Founder() {
  const ref = useRef(null)
  useReveal(ref, { threshold: 0.06 })

  return (
    <section id="founder" ref={ref} className="section">
      <div className="container">
        <p className="sheet-label reveal"><b>§ 05</b> Founder</p>

        <div className={styles.grid}>
          {/* Portrait, mounted like a plate on a drawing */}
          <figure className={`${styles.plate} reveal`} style={{ '--d': '0.1s' }}>
            <div className={styles.frame}>
              <img
                src="/images/founder.jpg"
                alt="Precious Oreoluwa Adetipe, founder of Stack Technologies"
                width="900"
                height="1200"
                loading="lazy"
              />
              <span className={`${styles.corner} ${styles.tl}`} aria-hidden="true" />
              <span className={`${styles.corner} ${styles.tr}`} aria-hidden="true" />
              <span className={`${styles.corner} ${styles.bl}`} aria-hidden="true" />
              <span className={`${styles.corner} ${styles.br}`} aria-hidden="true" />
              <span className={styles.scan} aria-hidden="true" />
            </div>
            {/* Vertical dimension line beside the plate */}
            <div className={styles.dimV} aria-hidden="true">
              <span />
              <em>PLATE 05-A</em>
              <span />
            </div>
            <figcaption className={styles.caption}>
              <span>FIG. 5</span> {COMPANY.founder}, Founder
            </figcaption>
          </figure>

          <div className={styles.text}>
            <h2 className="heading reveal" style={{ '--d': '0.08s' }}>
              An engineer who <em>writes software.</em>
            </h2>

            <div className={`${styles.story} reveal`} style={{ '--d': '0.16s' }}>
              <p>
                I&apos;m Precious Adetipe. I study Industrial &amp; Production Engineering at the University of
                Ibadan, the discipline of making systems work: processes, people, machines and cost. I taught myself to
                code, and I build software the same way.
              </p>
              <p>
                That means asking how the work really flows before drawing anything, choosing boring and reliable
                foundations, and treating launch as commissioning, not the finish line. It&apos;s why the SureTalk
                migration kept the phones ringing, why the Paystack webhook verifies every signature, and why a
                procurement ERP for a firm in Saudi Arabia ended up with a real approval-workflow engine.
              </p>
              <p>
                Stack Technologies is the studio I started to do that work for businesses: registered in Nigeria,
                working with clients anywhere.
              </p>
            </div>

            <div className={`${styles.sign} reveal`} style={{ '--d': '0.24s' }}>
              <span className={styles.signName}>{COMPANY.founder}</span>
              <span className={styles.signRole}>Founder &amp; lead engineer · {COMPANY.brand}</span>
            </div>
          </div>
        </div>

        {/* Revision history */}
        <div className={`${styles.revs} reveal`} style={{ '--d': '0.1s' }}>
          <div className={styles.revHead}>
            <span>Rev.</span>
            <span>Revision history</span>
            <span>Date</span>
          </div>
          <ol>
            {TIMELINE.map((t) => (
              <li key={t.rev} className={styles.rev}>
                <span className={styles.revNo}>{t.rev}</span>
                <div className={styles.revMain}>
                  <h3 className={styles.revTitle}>{t.title}</h3>
                  <p className={styles.revBody}>{t.body}</p>
                </div>
                <span className={styles.revWhen}>{t.when}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Toolkit as a bill of materials */}
        <div className={`${styles.bom} reveal`} style={{ '--d': '0.1s' }}>
          <div className={styles.bomHead}>
            <span>Item</span>
            <span>Bill of materials: the toolkit</span>
          </div>
          {TOOLKIT.map((row, i) => (
            <div key={row.part} className={styles.bomRow}>
              <span className={styles.bomNo}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.bomPart}>{row.part}</span>
              <span className={styles.bomItems}>
                {row.items.map((it) => <span key={it} className="chip">{it}</span>)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
