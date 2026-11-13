import Hero from '../../components/Hero/Hero'
import Work from '../../components/Work/Work'
import Services from '../../components/Services/Services'
import Process from '../../components/Process/Process'
import Lab from '../../components/Lab/Lab'
import Founder from '../../components/Founder/Founder'
import Contact from '../../components/Contact/Contact'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

export default function Home() {
  useDocumentTitle(null)

  return (
    <>
      <Hero />
      <Work />
      <Services />
      <Process />
      <Lab />
      <Founder />
      <Contact />
    </>
  )
}
