import Reveal from '../components/Reveal.jsx'
import { FACTS } from '../data/about.js'
import { COPY } from '../data/copy.js'
import Section from './Section.jsx'

export default function OffTheClock() {
  return (
    <Section index={4} id="off-the-clock" eyebrow={COPY.off.eyebrow} title={COPY.off.title}>
      <Reveal as="ul" className="mt-6 grid grid-cols-2 gap-x-6 border-t border-line">
        {FACTS.hobbies.map((hobby) => (
          <li key={hobby} className="border-b border-line py-3 font-display text-xl font-light">
            {hobby}
          </li>
        ))}
      </Reveal>
      <Reveal as="p" className="mt-5 text-[0.9375rem]">
        <span className="text-muted">{COPY.off.reading}: </span>
        {FACTS.reading}
      </Reveal>
    </Section>
  )
}
