import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const LINKS = [
  { label: 'Work', to: '/work' },
  { label: 'Experience', to: '/experience' },
  { label: 'About', to: '/about' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const navItem = (link) => (
    <NavLink
      key={link.label}
      to={link.to}
      className={({ isActive }) =>
        `font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
          isActive ? 'text-rust' : 'text-cocoa hover:text-rust'
        }`
      }
    >
      {link.label}
    </NavLink>
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-hairline">
      <div className="max-w-site mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-xl text-ink">
          Ben Niu
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {LINKS.map(navItem)}
          <a href="mailto:nub38bn@gmail.com" className="btn-ink !py-2.5 !px-5">
            Get in touch
          </a>
        </nav>

        <button
          className="md:hidden font-mono text-xs uppercase tracking-[0.14em] text-ink"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-hairline bg-cream px-6 py-6 flex flex-col gap-5">
          {LINKS.map(navItem)}
          <a href="mailto:nub38bn@gmail.com" className="btn-ink self-start !py-2.5 !px-5">
            Get in touch
          </a>
        </nav>
      )}
    </header>
  )
}

export default Navbar
