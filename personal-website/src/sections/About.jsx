import Reveal from '../components/Reveal.jsx'
import { BIO, CONTACT, FACTS } from '../data/about.js'
import { COPY } from '../data/copy.js'
import Section from './Section.jsx'

const ROWS = [
  ['Location', FACTS.location],
  ['Education', FACTS.education],
  ['Focus areas', FACTS.focus],
  ['Available', FACTS.availability],
]

export default function About() {
  return (
    <Section index={1} id="about" eyebrow={COPY.about.eyebrow} title={BIO.lede}>
      <Reveal className="mt-6 flex items-start gap-5">
        <img
          src={CONTACT.photo}
          alt={CONTACT.fullName}
          width={667}
          height={1000}
          loading="lazy"
          className="h-28 w-[4.75rem] shrink-0 rounded-xl object-cover"
        />
        <p className="leading-relaxed text-ink/80">{BIO.origin}</p>
      </Reveal>
      <Reveal as="p" className="mt-4 leading-relaxed text-ink/80">
        {BIO.boston}
      </Reveal>
      <Reveal as="p" className="mt-6 font-display text-xl font-light leading-snug">
        {BIO.statement.join(' ')}
      </Reveal>
      <Reveal as="dl" className="mt-6 divide-y divide-line border-t border-line text-[0.9375rem]">
        {ROWS.map(([label, value]) => (
          <div key={label} className="flex gap-4 py-3">
            <dt className="w-24 shrink-0 text-muted">{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </Reveal>
    </Section>
  )
}
