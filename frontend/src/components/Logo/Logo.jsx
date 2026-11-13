// Stack Technologies mark: three isometric layers (interface / services / data),
// the top one in red-line.
export function LogoMark({ size = 28, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M16 22.5 3 16l13-6.5L29 16 16 22.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.45" />
      <path d="M16 18.5 3 12l13-6.5L29 12 16 18.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.75" />
      <path d="M16 14.5 3 8l13-6.5L29 8 16 14.5Z" fill="var(--red)" stroke="var(--red)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3 20v4l13 6.5L29 24v-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.3" />
    </svg>
  )
}

export default function Logo({ className }) {
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <LogoMark />
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontStretch: '115%', fontSize: 15, letterSpacing: '0.04em' }}>
          STACK
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.28em', color: 'var(--muted)', marginTop: 3 }}>
          TECHNOLOGIES
        </span>
      </span>
    </span>
  )
}
