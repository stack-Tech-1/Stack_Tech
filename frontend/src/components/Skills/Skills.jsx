import { useRef } from 'react'
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll'
import styles from './Skills.module.css'

const SKILL_GROUPS = [
  {
    label: 'Frontend',
    skills: ['React', 'JavaScript', 'TypeScript', 'HTML & CSS'],
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'Express.js', 'Python', 'REST APIs'],
  },
  {
    label: 'Database',
    skills: ['MongoDB', 'PostgreSQL', 'DynamoDB', 'Redis'],
  },
  {
    label: 'DevOps & Cloud',
    skills: ['AWS', 'Docker', 'Git', 'Linux'],
  },
  {
    label: 'Integrations',
    skills: ['Twilio', 'Telegram API', 'WebSockets', 'Webhooks'],
  },
]

export default function Skills() {
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  useAnimateOnScroll(headerRef)
  useAnimateOnScroll(gridRef, 0.08)

  return (
    <section id="skills" className={styles.skills}>
      <div className="container">
        <div ref={headerRef} className={styles.header}>
          <span className="section-label">My Toolkit</span>
          <h2 className="section-heading">Skills & Technologies</h2>
          <p className="section-subtext">
            Technologies I work with day-to-day to build, deploy, and scale products.
          </p>
        </div>

        <div ref={gridRef} className={styles.groups}>
          {SKILL_GROUPS.map((group, gi) => (
            <div key={group.label} className={styles.group}>
              <span className={styles.groupLabel}>{group.label}</span>
              <div className={styles.badgeRow}>
                {group.skills.map((skill, si) => (
                  <span
                    key={skill}
                    className={styles.badge}
                    style={{ animationDelay: `${(gi * group.skills.length + si) * 0.04}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
