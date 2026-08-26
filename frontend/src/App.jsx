import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ParticleBackground from './components/ParticleBackground/ParticleBackground'
import CursorGlow from './components/CursorGlow/CursorGlow'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import CaseStudy from './pages/CaseStudy/CaseStudy'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

function App() {
  return (
    <BrowserRouter>
      <ParticleBackground />
      <Navbar />
      <ScrollToTop />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<CaseStudy />} />
        </Routes>
      </main>
      <Footer style={{ position: 'relative', zIndex: 1 }} />
      <CursorGlow />
    </BrowserRouter>
  )
}

export default App
