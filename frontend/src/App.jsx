import ParticleBackground from './components/ParticleBackground/ParticleBackground'
import CursorGlow from './components/CursorGlow/CursorGlow'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Skills from './components/Skills/Skills'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <ParticleBackground />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer style={{ position: 'relative', zIndex: 1 }} />
      <CursorGlow />
    </>
  )
}

export default App
