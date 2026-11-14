import { useId, useRef } from 'react'
import { useReveal } from '../../hooks/useReveal'
import styles from './SystemDiagram.module.css'

const W = 168    // node width
const H = 56     // node height
const COL = 268  // column pitch (gap wide enough for edge labels)
const ROW = 98   // row pitch
const PAD = 28

/**
 * Draws a project's architecture from `diagram = { nodes, edges }`.
 * Edges draw themselves in when scrolled into view, then data "packets"
 * travel along them. Return paths (`back: true`, or any edge pointing
 * left) are routed underneath the drawing.
 */
export default function SystemDiagram({ diagram, caption }) {
  const ref = useRef(null)
  const markerId = `arrow${useId().replace(/:/g, '')}`
  useReveal(ref, { threshold: 0.25 })
  if (!diagram) return null

  const { nodes, edges } = diagram
  const cols = Math.max(...nodes.map((n) => n.c)) + 1
  const rows = Math.max(...nodes.map((n) => n.r)) + 1
  const hasBack = edges.some((e) => e.back)

  const pos = Object.fromEntries(
    nodes.map((n) => [n.id, { ...n, x: PAD + n.c * COL, y: PAD + 16 + n.r * ROW }])
  )
  const width = PAD * 2 + (cols - 1) * COL + W
  const baseBottom = PAD + 16 + (rows - 1) * ROW + H
  const height = baseBottom + (hasBack ? 64 : PAD)

  let backLane = 0
  const paths = edges.map((e, i) => {
    const a = pos[e.from]
    const b = pos[e.to]
    if (!a || !b) return null
    let d
    let lx
    let ly

    if (e.back || b.c < a.c) {
      const y = baseBottom + 22 + backLane * 14
      backLane += 1
      const ax = a.x + W / 2 + 12
      const bx = b.x + W / 2 - 12
      d = `M${ax},${a.y + H} V${y} H${bx} V${b.y + H + 6}`
      lx = (ax + bx) / 2
      ly = y + 14
    } else if (b.c === a.c) {
      const down = b.r > a.r
      const x = a.x + W / 2
      d = down ? `M${x},${a.y + H} V${b.y - 6}` : `M${x},${a.y} V${b.y + H + 6}`
      lx = x + 8
      ly = (a.y + b.y + H) / 2
    } else {
      const x1 = a.x + W
      const y1 = a.y + H / 2
      const x2 = b.x - 6
      const y2 = b.y + H / 2
      const mx = (x1 + x2) / 2
      d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`
      lx = mx
      ly = (y1 + y2) / 2 - 8
    }
    return { ...e, d, lx, ly, i, back: e.back || b.c < a.c }
  }).filter(Boolean)

  return (
    <figure ref={ref} className={styles.figure}>
      <div className={styles.scroller}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className={styles.svg}
          style={{ minWidth: Math.min(width, 720) }}
          role="img"
          aria-label={`System diagram: ${edges.map((e) => `${pos[e.from]?.label} to ${pos[e.to]?.label}`).join(', ')}`}
        >
          <defs>
            <marker id={markerId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--chalk)" />
            </marker>
          </defs>

          {paths.map((p) => (
            <g key={`e${p.i}`} className={styles.edge} style={{ '--i': p.i }}>
              <path d={p.d} className={p.back ? styles.lineBack : styles.line} pathLength="1" markerEnd={`url(#${markerId})`} />
              {p.label && (
                <text x={p.lx} y={p.ly} className={styles.edgeLabel} textAnchor="middle">{p.label}</text>
              )}
              <circle r="3.2" className={styles.packet}>
                <animateMotion dur={`${2.2 + (p.i % 3) * 0.4}s`} begin={`${p.i * 0.35}s`} repeatCount="indefinite" path={p.d} />
              </circle>
            </g>
          ))}

          {Object.values(pos).map((n, i) => (
            <g key={n.id} className={styles.node} style={{ '--i': i }} transform={`translate(${n.x} ${n.y})`}>
              <rect width={W} height={H} rx="2" />
              <path d={`M0,10 V0 H10 M${W - 10},${H} H${W} V${H - 10}`} className={styles.corner} />
              <text x="14" y="24" className={styles.nodeLabel}>{n.label}</text>
              {n.sub && <text x="14" y="42" className={styles.nodeSub}>{n.sub}</text>}
            </g>
          ))}
        </svg>
      </div>
      <figcaption className={styles.caption}>
        <span>FIG. 1</span> {caption || 'System diagram'} <span className={styles.hint}>· data flow animated</span>
      </figcaption>
    </figure>
  )
}
