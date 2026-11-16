import { CONTACT, HERO } from '../data/about.js'
import { COPY } from '../data/copy.js'
import { useStopRef } from '../journey/hooks.js'

export default function Hero() {
  const ref = useStopRef(0)
  return (
    <header
      ref={ref}
      id="top"
      className="flex min-h-[100svh] flex-col px-4 pb-8 pt-[13svh] sm:px-8 md:justify-center md:pt-0 lg:px-[6vw]"
    >
      <div className="max-w-[30rem] md:my-auto">
        <p className="eyebrow">{HERO.eyebrow}</p>
        <h1 className="mt-5 font-display text-[clamp(3.75rem,10vw,7rem)] font-light leading-[0.95] tracking-[-0.03em]">
          {CONTACT.name}
        </h1>
        <p className="mt-6 max-w-[27rem] text-[1.0625rem] leading-relaxed text-ink/80">{HERO.tagline}</p>
      </div>
      <a href="#about" className="mt-auto inline-flex items-center gap-2 self-start py-2 text-sm font-medium text-ink/80 md:mt-0">
        {COPY.hero.cue}
        <span aria-hidden="true" className="scroll-cue">↓</span>
      </a>
    </header>
  )
}
