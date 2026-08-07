import { useState } from 'react'
import { Chapter } from '../Chapter'
import { DialogPanel } from '../DialogPanel'
import { ScrollReveal } from '../../components/ScrollReveal'
import { StaticSprite } from '../../pixel/StaticSprite'
import { MAILBOX } from '../../pixel/sprites'
import { BIO, FACTS, CONTACT } from '../../data/about'

const locationFact = FACTS.find((f) => f.label === 'Location')

// Click the mailbox and there's a letter waiting.
function Mailbox() {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-6 flex items-end gap-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="hover:-translate-y-0.5 transition-transform motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        <StaticSprite map={MAILBOX} className="w-11" />
        <span className="sr-only">Check the mailbox</span>
      </button>
      {open && (
        <div className="pixel-panel p-4 max-w-xs">
          <p className="font-pixel text-[0.6875rem] uppercase tracking-[0.1em] text-rust mb-2">
            You've got mail
          </p>
          <p className="text-sm text-cocoa leading-relaxed">
            Want to write back?{' '}
            <a href={`mailto:${CONTACT.email}`} className="link-quiet">
              {CONTACT.email}
            </a>
          </p>
        </div>
      )}
    </div>
  )
}

// Chapter 1 — the Connecticut countryside where the journey starts.
export function OriginChapter({ scene = null, mailbox = <Mailbox /> }) {
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
