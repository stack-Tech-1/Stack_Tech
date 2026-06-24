import { useRef } from 'react'
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll'
import ProjectCard from './ProjectCard'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    name: 'Suretalk',
    description:
      'A full-stack communication platform enabling real-time messaging and seamless collaboration for teams. Built with a focus on reliability and low-latency delivery.',
    tags: ['React', 'Node.js', 'MongoDB', 'Twilio', 'WebSockets'],
    github: '#',
    live: '#',
  },
  {
    name: 'Trading Bot',
    description:
      'Automated algorithmic trading system deployed on AWS with real-time market data processing, risk management controls, and multi-asset strategy execution.',
    tags: ['Python', 'AWS Lambda', 'DynamoDB', 'WebSockets', 'REST API'],
    github: '#',
    live: '#',
  },
  {
    name: 'Procurement ERP',
    description:
      'Enterprise resource planning system for managing end-to-end procurement workflows, vendor relationships, approvals, and inventory across departments.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Express'],
    github: '#',
    live: '#',
  },
  {
    name: 'Telegram Bot',
    description:
      'Feature-rich automated Telegram bot with command routing, third-party API integrations, persistent state management, and real-time notification delivery.',
    tags: ['Node.js', 'Telegram API', 'MongoDB', 'Express', 'Webhooks'],
    github: '#',
    live: '#',
  },
]

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
            A selection of things I&apos;ve built — from platforms to automation systems. More on GitHub.
          </p>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
