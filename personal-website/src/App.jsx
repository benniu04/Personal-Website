import { useEffect } from 'react'
import Backdrop from './components/Backdrop.jsx'
import SiteNav from './components/SiteNav.jsx'
import SkipLink from './components/SkipLink.jsx'
import About from './sections/About.jsx'
import Contact from './sections/Contact.jsx'
import Experience from './sections/Experience.jsx'
import Hero from './sections/Hero.jsx'
import OffTheClock from './sections/OffTheClock.jsx'
import Projects from './sections/Projects.jsx'

export default function App() {
  // Land on the right stop when the page is opened with a #hash
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  return (
    <>
      <SkipLink />
      <Backdrop />
      <SiteNav />
      <div className="relative z-10">
        <Hero />
        <main>
          <About />
          <Experience />
          <Projects />
          <OffTheClock />
          <Contact />
        </main>
        <div className="h-[30svh]" aria-hidden="true" />
      </div>
    </>
  )
}
