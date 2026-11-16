import Reveal from '../components/Reveal.jsx'
import { useStopRef } from '../journey/hooks.js'

// One stop on the journey: an empty stretch where the island is in full view
// while the camera travels, then the card that tells this part of the story.
export default function Section({ index, id, eyebrow, title, children }) {
  const ref = useStopRef(index)
  return (
    <section aria-labelledby={`${id}-title`} className="px-4 sm:px-8 lg:px-[6vw]">
      <div className="h-[85svh]" aria-hidden="true" />
      <div ref={ref} id={id} className="card">
        <Reveal>
          <p className="eyebrow">
            <span className="text-accent">{String(index).padStart(2, '0')}</span>
            <span className="mx-2 text-line">/</span>
            {eyebrow}
          </p>
          <h2 id={`${id}-title`} className="title mt-4">
            {title}
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  )
}
