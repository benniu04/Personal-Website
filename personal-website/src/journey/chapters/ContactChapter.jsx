import { ScrollReveal } from '../../components/ScrollReveal'
import { CampfireEnsemble } from '../scenes/CampfireScene'
import { CONTACT } from '../../data/about'
import { CHAPTERS } from './meta'

// Final chapter — the campfire save point. Doubles as the site footer.
export function ContactChapter({ scene = null }) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative min-h-svh overflow-hidden flex flex-col bg-gradient-to-b from-rust-deep via-ember to-ink text-linen"
    >
      {scene && (
        <div className="absolute inset-0" aria-hidden="true">
          {scene}
        </div>
      )}

      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-site mx-auto px-6 py-24 w-full grid lg:grid-cols-[minmax(0,1fr)_auto] gap-16 items-end">
          <ScrollReveal>
            <p className="font-pixel text-xs md:text-sm uppercase tracking-[0.1em] text-linen/80 mb-4">
              Final chapter · Save point
            </p>
            <h2
              id="contact-title"
              className="font-display font-light text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.015em] max-w-3xl"
            >
              No shortcuts. No filler.
              <br />
              Just craft.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-linen/85">
              You made it to the campfire. Save your progress — say hello, and let's build something
              worth a second look.
            </p>
            <div className="mt-10 flex flex-wrap gap-5">
              <a href={`mailto:${CONTACT.email}`} className="pixel-btn-rust">
                ◆ Save game — say hello
              </a>
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn-parchment"
              >
                GitHub ↗
              </a>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn-parchment"
              >
                LinkedIn ↗
              </a>
            </div>
          </ScrollReveal>

          <div className="hidden lg:block pb-2">
            <CampfireEnsemble />
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <footer className="relative z-10 border-t-2 border-linen/20">
        <div className="max-w-site mx-auto px-6 py-10 grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-pixel text-sm">{CONTACT.name}</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-linen/70">
              {CONTACT.location}
            </p>
          </div>
          <nav aria-label="Site">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-linen/60 mb-3">Fast travel</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 list-none">
              {CHAPTERS.filter((c) => c.id !== 'contact').map((chapter) => (
                <li key={chapter.id}>
                  <a
                    href={`#${chapter.id}`}
                    className="font-mono text-xs uppercase tracking-[0.14em] text-linen/85 hover:text-linen"
                  >
                    {chapter.nav}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-linen/60 mb-3">Connect</p>
            <ul className="space-y-2 list-none">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="font-mono text-xs uppercase tracking-[0.14em] text-linen/85 hover:text-linen">
                  Email
                </a>
              </li>
              <li>
                <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-[0.14em] text-linen/85 hover:text-linen">
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-[0.14em] text-linen/85 hover:text-linen">
                  GitHub ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-site mx-auto px-6 pb-8 flex flex-wrap gap-4 justify-between items-center">
          <p className="font-mono text-xs text-linen/60">
            © {new Date().getFullYear()} {CONTACT.fullName}. Crafted with curiosity and care.
          </p>
          <p className="font-pixel text-[0.6875rem] uppercase tracking-[0.1em] text-linen/70">
            Available for new projects · No game engine, just React
          </p>
        </div>
      </footer>
    </section>
  )
}

export default ContactChapter
