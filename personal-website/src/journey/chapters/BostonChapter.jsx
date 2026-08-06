import { Chapter } from '../Chapter'
import { DialogPanel } from '../DialogPanel'
import { ScrollReveal } from '../../components/ScrollReveal'
import { BIO, FACTS } from '../../data/about'

const educationFact = FACTS.find((f) => f.label === 'Education')

// Chapter 2 — Boston & Northeastern: where design × development took hold.
export function BostonChapter({ scene = null }) {
  return (
    <Chapter
      id="boston"
      label="Chapter 2"
      title="Then Boston happened."
      scene={scene}
      className="bg-blush min-h-svh flex flex-col justify-center"
    >
      <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem] gap-10 lg:gap-16 items-start">
        <div className="space-y-8 max-w-2xl">
          <ScrollReveal>
            <DialogPanel label="Ben's journal">
              <p className="font-display font-light text-2xl text-ink leading-snug">{BIO.lede}</p>
              <p className="mt-5 text-lg leading-relaxed text-cocoa">{BIO.boston}</p>
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-clay">
                {educationFact.label} · {educationFact.value}
              </p>
            </DialogPanel>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <DialogPanel label="Signpost" className="bg-cream">
              <p className="font-display font-light text-xl md:text-2xl text-ink leading-snug">
                {BIO.statement.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <p className="mt-4 text-cocoa leading-relaxed">{BIO.statementBody}</p>
            </DialogPanel>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.15} className="justify-self-center lg:justify-self-end">
          <figure className="pixel-panel p-2.5 max-w-[16rem]">
            <img
              src="/images/profile-pic.jpeg"
              alt="Benjamin Niu"
              className="w-full object-cover [filter:saturate(0.85)]"
            />
            <figcaption className="pt-2.5 pb-1 text-center font-pixel text-[0.6875rem] uppercase tracking-[0.1em] text-cocoa">
              Player 1 · Ben
            </figcaption>
          </figure>
        </ScrollReveal>
      </div>
    </Chapter>
  )
}

export default BostonChapter
