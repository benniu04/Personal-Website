import { Link } from 'react-router-dom'
import PixelField from './PixelField'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-cocoa text-linen overflow-hidden">
      {/* Closing statement */}
      <div className="relative max-w-site mx-auto px-6 pt-24 pb-20">
        <PixelField
          palette="cocoa"
          apex="bottom-right"
          cols={22}
          rows={12}
          className="pointer-events-none absolute right-6 bottom-0 w-[30rem] max-w-[40vw] hidden md:block"
        />
        <div className="relative max-w-2xl">
          <h2 className="font-display font-light text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.01em]">
            No shortcuts. No filler. Just craft.
          </h2>
          <a href="mailto:nub38bn@gmail.com" className="btn-linen mt-10">
            Say hello
          </a>
        </div>
      </div>

      {/* Link columns */}
      <div className="relative max-w-site mx-auto px-6 pb-12">
        <div className="border-t border-hairline-dark pt-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <p className="font-display text-3xl">Ben Niu</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-linen/60">
              Boston, MA
            </p>
          </div>

          <nav aria-label="Site">
            <p className="eyebrow text-linen/50 mb-5">Site</p>
            <ul className="space-y-3">
              <li><Link to="/work" className="text-linen/85 hover:text-linen transition-colors">Work</Link></li>
              <li><Link to="/experience" className="text-linen/85 hover:text-linen transition-colors">Experience</Link></li>
              <li><Link to="/about" className="text-linen/85 hover:text-linen transition-colors">About</Link></li>
            </ul>
          </nav>

          <nav aria-label="Connect">
            <p className="eyebrow text-linen/50 mb-5">Connect</p>
            <ul className="space-y-3">
              <li>
                <a href="mailto:nub38bn@gmail.com" className="text-linen/85 hover:text-linen transition-colors">Email</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/benniu04/" target="_blank" rel="noopener noreferrer" className="text-linen/85 hover:text-linen transition-colors">LinkedIn</a>
              </li>
              <li>
                <a href="https://github.com/benniu04" target="_blank" rel="noopener noreferrer" className="text-linen/85 hover:text-linen transition-colors">GitHub</a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-hairline-dark mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-3">
          <p className="font-mono text-xs tracking-[0.08em] text-linen/50">
            © {currentYear} Benjamin Niu. Crafted with curiosity and care.
          </p>
          <p className="font-mono text-xs tracking-[0.08em] text-linen/50">
            Available for new projects
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
