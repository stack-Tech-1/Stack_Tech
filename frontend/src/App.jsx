import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import CadCursor from './components/CadCursor/CadCursor'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Home from './pages/Home/Home'
import CaseStudy from './pages/CaseStudy/CaseStudy'
import NotFound from './pages/NotFound/NotFound'
import Notes from './pages/Notes/Notes'
import Note from './pages/Note/Note'

function App() {
  return (
    <BrowserRouter>
      <a href="#main" className="sr-only">Skip to content</a>
      <ScrollToTop />
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<CaseStudy />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/:slug" element={<Note />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CadCursor />
    </BrowserRouter>
  )
}

export default App
