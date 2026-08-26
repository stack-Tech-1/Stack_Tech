import { useEffect } from 'react'
import Hero from '../../components/Hero/Hero'
import About from '../../components/About/About'
import Projects from '../../components/Projects/Projects'
import Skills from '../../components/Skills/Skills'
import Contact from '../../components/Contact/Contact'

export default function Home() {
  useEffect(() => {
    if (!window.location.hash) return
    const el = document.querySelector(window.location.hash)
    if (!el) return
    const timer = setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 120)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </>
  )
}
