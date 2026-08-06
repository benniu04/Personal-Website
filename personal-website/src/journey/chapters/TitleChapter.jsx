import { motion } from 'motion/react'
import { HERO, CONTACT } from '../../data/about'

const rise = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

// Title screen — the game's opening. h1 lives here; the pixel wordmark art
// arrives with the scene layer.
export function TitleChapter({ scene = null }) {
  return (
    <section
      id="start"
      aria-labelledby="start-title"
      className="relative min-h-svh overflow-hidden flex flex-col"
    >
      {scene && (
        <div className="absolute inset-0" aria-hidden="true">
          {scene}
        </div>
      )}

      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-site mx-auto px-6 py-28 w-full text-center">
          <motion.p {...rise(0)} className="font-pixel text-xs md:text-sm uppercase tracking-[0.1em] text-rust mb-6">
            {HERO.eyebrow}
          </motion.p>
          <motion.h1
            {...rise(0.12)}
            id="start-title"
            className="font-display font-light text-ink text-[clamp(3rem,9vw,6.5rem)] leading-[1.02] tracking-[-0.015em]"
          >
            Ben Niu
          </motion.h1>
          <motion.p
            {...rise(0.24)}
            className="mt-3 font-pixel text-sm md:text-base text-cocoa uppercase tracking-[0.08em]"
          >
            A pixel odyssey
          </motion.p>
          <motion.p {...rise(0.34)} className="mt-8 mx-auto max-w-xl text-lg leading-relaxed text-cocoa">
            {HERO.tagline}
          </motion.p>
          <motion.div {...rise(0.46)} className="mt-10 flex flex-wrap justify-center gap-5">
            <a href="#origin" className="pixel-btn-rust">
              ▶ Start journey
            </a>
            <a href={`mailto:${CONTACT.email}`} className="pixel-btn-parchment">
              Get in touch
            </a>
          </motion.div>
        </div>
      </div>

      <motion.a
        {...rise(0.7)}
        href="#origin"
        className="relative z-10 mx-auto mb-8 flex flex-col items-center gap-1 text-ink bg-cream/90 border-2 border-ink px-4 py-2.5 shadow-[3px_3px_0_0_#43261A]"
        aria-label="Scroll to begin"
      >
        <span className="font-pixel text-[0.6875rem] uppercase tracking-[0.1em]">Scroll to begin</span>
        <span className="animate-px-blink text-xl leading-none" aria-hidden="true">
          ▼
        </span>
      </motion.a>
    </section>
  )
}

export default TitleChapter
