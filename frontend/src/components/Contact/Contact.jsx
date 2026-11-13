import { useEffect, useRef, useState } from 'react'
import { COMPANY } from '../../data/site'
import { useReveal } from '../../hooks/useReveal'
import styles from './Contact.module.css'

const TYPES = ['Web platform / SaaS', 'E-commerce', 'Business system / ERP', 'AI & automation', 'Something else']
const TIMELINES = ['As soon as possible', 'Within 1–3 months', 'In 3+ months', 'Just exploring']
const EMPTY = { name: '', email: '', company: '', projectType: '', timeline: '', message: '', 'bot-field': '' }

const encode = (data) =>
  Object.keys(data).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`).join('&')

function IbadanClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(t)
  }, [])
  return (
    <time className="mono">
      {now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Lagos' })} WAT
    </time>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [copied, setCopied] = useState(false)
  useReveal(ref, { threshold: 0.1 })

  const set = (name, value) => setForm((f) => ({ ...f, [name]: value }))
  const onChange = (e) => set(e.target.name, e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (form['bot-field']) return
    setStatus('sending')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...form }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      setForm(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(COMPANY.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${COMPANY.email}`
    }
  }

  return (
    <section id="contact" ref={ref} className="section">
      <div className="container">
        <p className="sheet-label reveal"><b>§ 06</b> Contact</p>

        <div className={styles.grid}>
          <div className={styles.info}>
            <h2 className={`heading reveal ${styles.big}`} style={{ '--d': '0.08s' }}>
              Have something to <em>build?</em>
            </h2>
            <p className="lede reveal" style={{ '--d': '0.14s' }}>
              Tell us what you&apos;re working on. A short brief is plenty; we&apos;ll reply with questions, a rough
              plan and next steps. Every message is read by the founder.
            </p>

            <div className={`${styles.channels} reveal`} style={{ '--d': '0.2s' }}>
              <div className={styles.channel}>
                <span className={styles.chLabel}>Email</span>
                <div className={styles.emailRow}>
                  <a href={`mailto:${COMPANY.email}`} className={styles.email}>{COMPANY.email}</a>
                  <button type="button" onClick={copyEmail} className={styles.copy} aria-live="polite">
                    {copied ? 'Copied ✓' : 'Copy'}
                  </button>
                </div>
              </div>
              <div className={styles.channel}>
                <span className={styles.chLabel}>Studio</span>
                <span>{COMPANY.city} · <IbadanClock /> · working with clients worldwide</span>
              </div>
              <div className={styles.channel}>
                <span className={styles.chLabel}>Elsewhere</span>
                <span className={styles.socials}>
                  <a href={COMPANY.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                  <a href={COMPANY.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                </span>
              </div>
            </div>
          </div>

          <div className={`${styles.formWrap} ticks reveal`} style={{ '--d': '0.16s' }}>
            {status === 'sent' ? (
              <div className={styles.sent} role="status">
                <span className={styles.stamp}>Received</span>
                <h3>Brief received. Thank you.</h3>
                <p>We&apos;ll reply by email to the address you gave.</p>
                <button type="button" className="btn btn--ghost" onClick={() => setStatus('idle')}>Send another</button>
              </div>
            ) : (
              <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={onSubmit} className={styles.form}>
                <div className={styles.formHead}>
                  <span>Project brief</span>
                  <span>Form PB-01</span>
                </div>
                <input type="hidden" name="form-name" value="contact" />
                <p hidden>
                  <label>Don&apos;t fill this out: <input name="bot-field" value={form['bot-field']} onChange={onChange} /></label>
                </p>

                <div className={styles.row2}>
                  <label className={styles.field}>
                    <span>Your name *</span>
                    <input name="name" value={form.name} onChange={onChange} required autoComplete="name" />
                  </label>
                  <label className={styles.field}>
                    <span>Email *</span>
                    <input type="email" name="email" value={form.email} onChange={onChange} required autoComplete="email" />
                  </label>
                </div>

                <label className={styles.field}>
                  <span>Company / organisation</span>
                  <input name="company" value={form.company} onChange={onChange} autoComplete="organization" placeholder="Optional" />
                </label>

                <fieldset className={styles.field}>
                  <legend>What do you need?</legend>
                  <div className={styles.options}>
                    {TYPES.map((t) => (
                      <label key={t} className={`${styles.option} ${form.projectType === t ? styles.optionOn : ''}`}>
                        <input type="radio" name="projectType" value={t} checked={form.projectType === t} onChange={onChange} />
                        {t}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className={styles.field}>
                  <span>Timeline</span>
                  <select name="timeline" value={form.timeline} onChange={onChange}>
                    <option value="">Select…</option>
                    {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </label>

                <label className={styles.field}>
                  <span>Tell us about it *</span>
                  <textarea
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={onChange}
                    required
                    placeholder="What are you building, who is it for, and what does success look like?"
                  />
                </label>

                <button type="submit" className={`btn btn--primary ${styles.submit}`} disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send brief'}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" /></svg>
                </button>

                {status === 'error' && (
                  <p className={styles.error} role="alert">
                    That didn&apos;t send. Please email <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> directly.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
