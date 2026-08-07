import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DialogPanel } from '../journey/DialogPanel'
import { PixelMark } from '../components/PixelMark'
import { CommitGraph } from '../components/CommitGraph'
import { PianoKeys } from '../journey/PianoKeys'
import { StaticSprite } from '../pixel/StaticSprite'
import { PADLOCK } from '../pixel/sprites'
import { HERO, BIO, FACTS, TOOLKIT, SETUPS, CONTACT } from '../data/about'
import { EXPERIENCE } from '../data/experience'
import { projects } from '../data/projects'
import { STATIONS } from './stations'
import { useWorld } from './WorldContext'

const locationFact = FACTS.find((f) => f.label === 'Location')
const educationFact = FACTS.find((f) => f.label === 'Education')
const readingFact = FACTS.find((f) => f.label === 'Currently reading')
const hobbiesFact = FACTS.find((f) => f.label === 'Off the clock')

function MonoLabel({ children }) {
  return <p className="font-mono text-xs uppercase tracking-[0.14em] text-clay">{children}</p>
}

function PanelBody({ id }) {
  switch (id) {
    case 'welcome':
      return (
        <>
          <p className="font-display font-light text-2xl text-ink leading-snug">
            Welcome, traveler.
          </p>
          <p className="mt-4 text-cocoa leading-relaxed">{HERO.tagline}</p>
          <p className="mt-4 text-cocoa leading-relaxed">
            Follow the path — every stop tells a chapter. Walk up to anything and press{' '}
            <span className="font-pixel text-xs">E</span> (or click it) to hear the story.
          </p>
          <MonoLabel>{HERO.eyebrow}</MonoLabel>
        </>
      )
    case 'origin':
      return (
        <>
          <p className="text-lg text-cocoa leading-relaxed">{BIO.origin}</p>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-clay">
            {locationFact.label} · {locationFact.value}
          </p>
          <div className="mt-6 pixel-panel p-4 bg-cream">
            <p className="font-pixel text-[0.6875rem] uppercase tracking-[0.1em] text-rust mb-2">
              The mailbox has mail
            </p>
            <p className="text-sm text-cocoa">
              Want to write back?{' '}
              <a href={`mailto:${CONTACT.email}`} className="link-quiet">
                {CONTACT.email}
              </a>
            </p>
          </div>
        </>
      )
    case 'boston':
      return (
        <>
          <div className="flex items-start gap-5">
            <figure className="pixel-panel p-1.5 w-28 shrink-0 hidden sm:block">
              <img src="/images/profile-pic.jpeg" alt="Benjamin Niu" className="w-full object-cover [filter:saturate(0.85)]" />
            </figure>
            <div>
              <p className="font-display font-light text-xl text-ink leading-snug">{BIO.lede}</p>
              <p className="mt-3 text-cocoa leading-relaxed">{BIO.boston}</p>
            </div>
          </div>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-clay">
            {educationFact.label} · {educationFact.value}
          </p>
          <p className="mt-6 font-display font-light text-lg text-ink">
            {BIO.statement.join(' ')}
          </p>
        </>
      )
    case 'experience':
      return (
        <div className="space-y-6">
          {EXPERIENCE.map((job) => (
            <div key={job.company} className="border-t-2 border-hairline pt-5 first:border-t-0 first:pt-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <p className="font-pixel text-[0.6875rem] uppercase tracking-[0.1em] text-rust">
                  Level {job.level}
                </p>
                {job.locked && (
                  <p className="inline-flex items-center gap-1.5 font-pixel text-[0.625rem] uppercase tracking-[0.1em] text-linen bg-cocoa border-2 border-ink px-1.5 py-0.5">
                    <StaticSprite map={PADLOCK} className="w-3" /> {job.lockedLabel}
                  </p>
                )}
                <p className="ml-auto font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-clay">
                  {job.dates}
                </p>
              </div>
              <h3 className="mt-2 font-display text-xl text-ink">{job.role}</h3>
              <p className="text-cocoa">{job.company}</p>
              <ul className="mt-3 space-y-2">
                {job.notes.map((note) => (
                  <li key={note} className="text-sm text-cocoa leading-relaxed pl-4 relative">
                    <span className="absolute left-0 top-[0.5em] w-1.5 h-1.5 bg-rust" aria-hidden="true" />
                    {note}
                  </li>
                ))}
              </ul>
              {job.tags && <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-clay">{job.tags.join(' · ')}</p>}
            </div>
          ))}
        </div>
      )
    case 'projects':
      return (
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              to={`/work/${project.slug}`}
              className="group border-2 border-ink bg-cream p-4 shadow-[3px_3px_0_0_#43261A] hover:-translate-y-0.5 transition-transform motion-reduce:transition-none"
            >
              <div className="flex items-center gap-3">
                {project.slug === 'secret-app' ? (
                  <span className="font-pixel text-2xl text-rust w-10 text-center" aria-hidden="true">?</span>
                ) : (
                  <PixelMark seed={project.slug} className="w-10 h-10 shrink-0" />
                )}
                <div>
                  <p className="font-pixel text-[0.625rem] uppercase tracking-[0.1em] text-rust">
                    Quest {String(i + 1).padStart(2, '0')}
                  </p>
                  <p className="font-display text-lg text-ink group-hover:text-rust transition-colors">{project.title}</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-cocoa leading-relaxed">{project.blurb}</p>
            </Link>
          ))}
        </div>
      )
    case 'hobbies':
      return (
        <>
          <ul className="flex flex-wrap gap-2">
            {hobbiesFact.value.split(' · ').map((hobby) => (
              <li key={hobby} className="border-2 border-ink bg-cream px-2.5 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink shadow-[2px_2px_0_0_#43261A]">
                {hobby}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-cocoa">
            {readingFact.label}: <span className="text-ink">{readingFact.value}</span>
          </p>
          <PianoKeys />
        </>
      )
    case 'setup':
      return (
        <div className="space-y-6">
          {Object.values(SETUPS).map((setup) => (
            <div key={setup.label}>
              <p className="font-pixel text-xs uppercase tracking-[0.1em] text-rust mb-2">{setup.label}</p>
              <p className="text-sm text-cocoa leading-relaxed">{setup.blurb}</p>
              <div className="mt-3">
                {setup.specs.map(([component, name]) => (
                  <div key={component} className="grid grid-cols-[7rem_1fr] gap-3 border-t border-hairline py-1.5">
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-clay pt-0.5">{component}</p>
                    <p className="text-sm text-ink">{name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
    case 'commits':
      return (
        <>
          <CommitGraph username={CONTACT.githubUser} />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-clay">
            Every lit square is a day I shipped something.
          </p>
        </>
      )
    case 'contact':
      return (
        <>
          <p className="font-display font-light text-2xl text-ink leading-snug">
            No shortcuts. No filler. Just craft.
          </p>
          <p className="mt-4 text-cocoa leading-relaxed">
            You made it to the campfire. Save your progress — say hello, and let's build something
            worth a second look.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`mailto:${CONTACT.email}`} className="pixel-btn-rust">◆ Save game — say hello</a>
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="pixel-btn-parchment">GitHub ↗</a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="pixel-btn-parchment">LinkedIn ↗</a>
          </div>
          <p className="mt-6 font-mono text-xs text-clay">
            © {new Date().getFullYear()} {CONTACT.fullName}. Crafted with curiosity and care.
          </p>
        </>
      )
    default:
      return null
  }
}

// The story overlay for whichever station is open. DOM, not canvas — real
// text, scrollable, Esc/backdrop to close.
export function WorldPanels() {
  const { openPanel, setOpenPanel } = useWorld()

  useEffect(() => {
    if (!openPanel) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenPanel(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openPanel, setOpenPanel])

  if (!openPanel) return null
  const station = STATIONS.find((s) => s.id === openPanel)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={station.label}
      className="fixed inset-0 z-50 bg-ember/50 backdrop-blur-[2px] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpenPanel(null)
      }}
    >
      <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogPanel label={station.label}>
          <button
            type="button"
            onClick={() => setOpenPanel(null)}
            autoFocus
            className="float-right -mt-1 font-pixel text-sm text-ink border-2 border-ink px-2 py-0.5 hover:bg-blush"
          >
            ✕<span className="sr-only"> Close</span>
          </button>
          <PanelBody id={openPanel} />
        </DialogPanel>
      </div>
    </div>
  )
}

export default WorldPanels
