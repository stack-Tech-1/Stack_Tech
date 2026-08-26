import { useRef, useState } from 'react'
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll'
import styles from './Contact.module.css'

function encodeFormData(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

export default function Contact() {
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '', 'bot-field': '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  useAnimateOnScroll(leftRef)
  useAnimateOnScroll(rightRef, 0.1)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form['bot-field']) return // honeypot tripped — silently drop

    setStatus('sending')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData({ 'form-name': 'contact', ...form }),
      })
      if (!res.ok) throw new Error(`Submission failed: ${res.status}`)

      setStatus('sent')
      setForm({ name: '', email: '', message: '', 'bot-field': '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <div className={styles.grid}>
          <div ref={leftRef} className={styles.infoCol}>
            <span className="section-label">Say Hello</span>
            <h2 className="section-heading">Get In Touch</h2>
            <p className={styles.intro}>
              Have a project in mind, a question, or just want to connect? I&apos;m always open to
              interesting conversations and new opportunities.
            </p>

            <a href="mailto:stacktechnologies0@gmail.com" className={styles.emailLink}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              stacktechnologies0@gmail.com
            </a>

            <div className={styles.socials}>
              <a href="https://github.com/stack-Tech-1" className={styles.socialLink} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/precious-adetipe" className={styles.socialLink} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </a>
              <a href="mailto:stacktechnologies0@gmail.com" className={styles.socialLink} aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          <div ref={rightRef} className={styles.formCol}>
            <form
              className={styles.form}
              name="contact"
              onSubmit={handleSubmit}
              noValidate
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className={styles.honeypot} aria-hidden="true">
                <label>
                  Don&apos;t fill this out: <input tabIndex={-1} autoComplete="off" name="bot-field" value={form['bot-field']} onChange={handleChange} />
                </label>
              </p>

              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className={styles.input}
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className={styles.input}
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or just say hello..."
                  className={styles.textarea}
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className={styles.submitBtn} disabled={status === 'sending'}>
                {status === 'sent' ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Message Sent!
                  </>
                ) : status === 'sending' ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>

              {status === 'error' && (
                <p className={styles.formError}>
                  Something went wrong sending that — please email me directly at{' '}
                  <a href="mailto:stacktechnologies0@gmail.com">stacktechnologies0@gmail.com</a> instead.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
