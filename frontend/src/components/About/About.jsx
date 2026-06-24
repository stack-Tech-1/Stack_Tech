import { useRef } from 'react'
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll'
import styles from './About.module.css'

export default function About() {
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useAnimateOnScroll(leftRef)
  useAnimateOnScroll(rightRef, 0.1)

  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <div className={styles.grid}>
          <div ref={leftRef} className={styles.textCol}>
            <span className="section-label">Who I Am</span>
            <h2 className="section-heading">About Me</h2>

            <div className={styles.body}>
              <p>
                I&apos;m a full stack developer with a passion for building products that live at the
                intersection of clean engineering and real-world impact. I thrive across the entire
                stack — from architecting scalable backend systems to crafting smooth, responsive
                user interfaces.
              </p>
              <p>
                My work spans web platforms, automation systems, enterprise tools, and cloud-native
                deployments. I believe that good code isn&apos;t just functional — it&apos;s readable,
                maintainable, and built to last. Every project I take on, I bring the same obsession
                with quality and detail.
              </p>
              <p>
                When I&apos;m not writing code, I&apos;m exploring the bleeding edge of what&apos;s possible —
                studying systems, experimenting with new tooling, and thinking about how technology
                can solve problems that matter.
              </p>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>3+</span>
                <span className={styles.statLabel}>Years of Experience</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum}>10+</span>
                <span className={styles.statLabel}>Projects Shipped</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum}>∞</span>
                <span className={styles.statLabel}>Lines of Code</span>
              </div>
            </div>
          </div>

          <div ref={rightRef} className={styles.codeCol}>
            <div className={styles.codeCard}>
              <div className={styles.codeHeader}>
                <div className={styles.dots}>
                  <span className={styles.dotRed} />
                  <span className={styles.dotYellow} />
                  <span className={styles.dotGreen} />
                </div>
                <span className={styles.codeFileName}>developer.js</span>
              </div>
              <pre className={styles.codeBody}>
                <code>
                  <span className={styles.kw}>const </span>
                  <span className={styles.fn}>developer</span>
                  <span className={styles.plain}> = &#123;</span>{'\n'}
                  {'  '}<span className={styles.key}>name</span>
                  <span className={styles.plain}>: </span>
                  <span className={styles.str}>&quot;Precious Adetipe&quot;</span>
                  <span className={styles.plain}>,</span>{'\n'}
                  {'  '}<span className={styles.key}>role</span>
                  <span className={styles.plain}>: </span>
                  <span className={styles.str}>&quot;Full Stack Developer&quot;</span>
                  <span className={styles.plain}>,</span>{'\n'}
                  {'  '}<span className={styles.key}>location</span>
                  <span className={styles.plain}>: </span>
                  <span className={styles.str}>&quot;Nigeria&quot;</span>
                  <span className={styles.plain}>,</span>{'\n'}
                  {'  '}<span className={styles.key}>available</span>
                  <span className={styles.plain}>: </span>
                  <span className={styles.bool}>true</span>
                  <span className={styles.plain}>,</span>{'\n'}
                  {'  '}<span className={styles.key}>stack</span>
                  <span className={styles.plain}>: [</span>{'\n'}
                  {'    '}<span className={styles.str}>&quot;React&quot;</span>
                  <span className={styles.plain}>, </span>
                  <span className={styles.str}>&quot;Node.js&quot;</span>
                  <span className={styles.plain}>,</span>{'\n'}
                  {'    '}<span className={styles.str}>&quot;AWS&quot;</span>
                  <span className={styles.plain}>, </span>
                  <span className={styles.str}>&quot;MongoDB&quot;</span>
                  <span className={styles.plain}>,</span>{'\n'}
                  {'    '}<span className={styles.str}>&quot;Docker&quot;</span>
                  <span className={styles.plain}>, </span>
                  <span className={styles.str}>&quot;PostgreSQL&quot;</span>{'\n'}
                  {'  '}<span className={styles.plain}>],</span>{'\n'}
                  {'  '}<span className={styles.key}>passion</span>
                  <span className={styles.plain}>: </span>
                  <span className={styles.str}>&quot;building things that matter&quot;</span>{'\n'}
                  <span className={styles.plain}>&#125;</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
