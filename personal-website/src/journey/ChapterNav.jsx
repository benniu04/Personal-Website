import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { CHAPTERS } from './chapters/meta'

// HUD: wordmark, XP-style scroll progress bar, a MAP overlay listing all
// chapters, and (md+) a right-edge rail of chapter dots. Active chapter is
// whichever section currently crosses the vertical center of the viewport.
export function ChapterNav() {
  const [active, setActive] = useState('start')
  const [mapOpen, setMapOpen] = useState(false)
  const mapButtonRef = useRef(null)
  const firstLinkRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.4 })

  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!mapOpen) return
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') setMapOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const mapButton = mapButtonRef.current
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      mapButton?.focus()
    }
  }, [mapOpen])

  const activeChapter = CHAPTERS.find((c) => c.id === active) ?? CHAPTERS[0]

  return (
    <>
      {/* XP progress bar */}
      <motion.div
        className="fixed top-0 inset-x-0 h-[6px] bg-rust origin-left z-50 motion-reduce:hidden"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      {/* Top HUD */}
      <div className="fixed top-[6px] inset-x-0 z-40 pointer-events-none">
        <div className="flex items-start justify-between px-4 md:px-6 pt-3">
          <a
            href="#start"
            className="pointer-events-auto font-pixel text-sm text-ink bg-cream/90 border-2 border-ink px-3 py-1.5 shadow-[3px_3px_0_0_#43261A] hover:bg-parchment"
          >
            Ben Niu
          </a>
          <button
            ref={mapButtonRef}
            type="button"
            onClick={() => setMapOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={mapOpen}
            className="pointer-events-auto font-pixel text-sm text-linen bg-rust border-2 border-ink px-3 py-1.5 shadow-[3px_3px_0_0_#43261A] hover:bg-rust-deep"
          >
            Map
          </button>
        </div>
      </div>

      {/* Right-edge chapter rail (md+) */}
      <nav
        aria-label="Chapters"
        className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-2.5"
      >
        {CHAPTERS.map((chapter) => (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            aria-current={active === chapter.id ? 'true' : undefined}
            title={chapter.label}
            className="group relative flex items-center justify-end"
          >
            <span className="absolute right-6 whitespace-nowrap font-pixel text-[0.6875rem] text-ink bg-parchment border-2 border-ink px-2 py-0.5 opacity-0 translate-x-1 pointer-events-none transition group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 motion-reduce:transition-none">
              {chapter.nav}
            </span>
            <span
              className={`block w-3 h-3 border-2 border-ink transition-colors ${
                active === chapter.id ? 'bg-rust' : 'bg-cream/80 group-hover:bg-blush'
              }`}
            />
          </a>
        ))}
      </nav>

      {/* Map overlay */}
      {mapOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Chapter map"
          className="fixed inset-0 z-50 bg-ember/60 backdrop-blur-[2px] flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMapOpen(false)
          }}
        >
          <div className="pixel-panel w-full max-w-md max-h-[85vh] overflow-y-auto p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <p className="font-pixel text-sm uppercase tracking-[0.1em] text-rust">World map</p>
              <button
                type="button"
                onClick={() => setMapOpen(false)}
                className="font-pixel text-sm text-ink border-2 border-ink px-2 py-0.5 hover:bg-blush"
              >
                ✕<span className="sr-only"> Close map</span>
              </button>
            </div>
            <ol className="space-y-1">
              {CHAPTERS.map((chapter, i) => (
                <li key={chapter.id}>
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={`#${chapter.id}`}
                    onClick={() => setMapOpen(false)}
                    aria-current={active === chapter.id ? 'true' : undefined}
                    className={`flex items-baseline gap-3 px-3 py-2.5 border-2 ${
                      active === chapter.id
                        ? 'border-ink bg-blush'
                        : 'border-transparent hover:border-hairline hover:bg-cream'
                    }`}
                  >
                    <span className="font-pixel text-[0.6875rem] text-clay w-6 shrink-0">
                      {String(i).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink">
                      {chapter.label}
                    </span>
                    {active === chapter.id && (
                      <span className="ml-auto font-pixel text-[0.6875rem] text-rust">You are here</span>
                    )}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* Screen-reader announcement of current chapter */}
      <p aria-live="polite" className="sr-only">
        {activeChapter.label}
      </p>
    </>
  )
}

export default ChapterNav
