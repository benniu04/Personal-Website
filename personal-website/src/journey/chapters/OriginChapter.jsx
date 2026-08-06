import { Chapter } from '../Chapter'
import { DialogPanel } from '../DialogPanel'
import { ScrollReveal } from '../../components/ScrollReveal'
import { BIO, FACTS } from '../../data/about'

const locationFact = FACTS.find((f) => f.label === 'Location')

// Chapter 1 — the Connecticut countryside where the journey starts.
export function OriginChapter({ scene = null, mailbox = null }) {
  return (
    <Chapter
      id="origin"
      label="Chapter 1"
      title="It starts in Connecticut."
      scene={scene}
      className="bg-cream min-h-svh flex flex-col justify-center"
    >
      <div className="max-w-2xl">
        <ScrollReveal>
          <DialogPanel label="Ben's journal">
            <p className="text-lg leading-relaxed text-cocoa">{BIO.origin}</p>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-clay">
              {locationFact.label} · {locationFact.value}
            </p>
          </DialogPanel>
        </ScrollReveal>
        {mailbox}
      </div>
    </Chapter>
  )
}

export default OriginChapter
