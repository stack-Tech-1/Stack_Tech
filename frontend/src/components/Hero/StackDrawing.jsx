// Isometric exploded view of "the stack": interface / services / data.
// Layers separate further via the --e custom property set by <Hero>.

const CX = 220
const HW = 170 // half width of a layer
const HH = 98  // half height (isometric)
const T = 16   // slab thickness

const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]

function Layer({ y, index, title, sub, variant }) {
  const top = [CX, y - HH]
  const right = [CX + HW, y]
  const bottom = [CX, y + HH]
  const left = [CX - HW, y]
  const face = `M${top} L${right} L${bottom} L${left} Z`
  const sides = `M${left} L${left[0]},${left[1] + T} L${bottom[0]},${bottom[1] + T} L${right[0]},${right[1] + T} L${right} M${bottom} L${bottom[0]},${bottom[1] + T}`

  // Detail lines on the face
  const details = []
  if (variant === 'ui') {
    // Parallel strokes: rows of an interface
    ;[0.3, 0.45, 0.6, 0.75].forEach((t) => {
      const a = lerp(top, left, t)
      const b = lerp(right, bottom, t)
      const mid = lerp(a, b, t === 0.3 ? 0.55 : 0.8)
      details.push(`M${a} L${mid}`)
    })
  } else if (variant === 'svc') {
    // Grid: services talking to each other
    ;[0.33, 0.66].forEach((t) => {
      const a = lerp(top, left, t), b = lerp(right, bottom, t)
      const c = lerp(top, right, t), d = lerp(left, bottom, t)
      details.push(`M${a} L${b}`, `M${c} L${d}`)
    })
  } else {
    // Concentric: storage
    ;[0.72, 0.44].forEach((s) => {
      const p = (pt) => [CX + (pt[0] - CX) * s, y + (pt[1] - y) * s]
      details.push(`M${p(top)} L${p(right)} L${p(bottom)} L${p(left)} Z`)
    })
  }

  const leaderStart = [right[0] + 6, right[1]]

  return (
    <g className="layer" style={{ '--i': index }}>
      <path d={face} className={variant === 'ui' ? 'face faceHot' : 'face'} pathLength="1" />
      <path d={sides} className="side" pathLength="1" />
      {details.map((d, i) => (
        <path key={i} d={d} className="detail" pathLength="1" />
      ))}
      {variant === 'svc' &&
        [[0.33, 0.33], [0.66, 0.33], [0.33, 0.66], [0.66, 0.66]].map(([u, v], i) => {
          const p = lerp(lerp(top, left, v), lerp(right, bottom, v), u)
          return <circle key={i} cx={p[0]} cy={p[1]} r="3.5" className="node" />
        })}
      {/* Leader + label */}
      <path d={`M${leaderStart} l40,0 l14,-14 l70,0`} className="leader" pathLength="1" />
      <text x={leaderStart[0] + 56} y={right[1] - 20} className="lblNo">L{3 - index}</text>
      <text x={leaderStart[0] + 78} y={right[1] - 20} className="lblTitle">{title}</text>
      <text x={leaderStart[0] + 56} y={right[1] + 2} className="lblSub">{sub}</text>
    </g>
  )
}

export default function StackDrawing({ className }) {
  return (
    <svg viewBox="0 0 640 500" className={className} role="img" aria-label="Exploded drawing of a software stack: interface, services and data layers">
      {/* Centre line */}
      <path d={`M${CX},20 L${CX},480`} className="centre" />
      <g className="explode explode-0">
        <Layer y={130} index={0} title="INTERFACE" sub="React · Next.js · mobile" variant="ui" />
      </g>
      <g className="explode explode-1">
        <Layer y={240} index={1} title="SERVICES" sub="Node · Python · AI · APIs" variant="svc" />
      </g>
      <g className="explode explode-2">
        <Layer y={350} index={2} title="DATA" sub="Postgres · Mongo · S3" variant="data" />
      </g>
      {/* Dimension: overall height */}
      <g className="dim">
        <path d="M24,32 L24,468 M18,32 L30,32 M18,468 L30,468" />
        <text x="14" y="250" transform="rotate(-90 14 250)">FULL STACK</text>
      </g>
    </svg>
  )
}
