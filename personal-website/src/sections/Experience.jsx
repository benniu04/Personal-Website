import Reveal from '../components/Reveal.jsx'
import { COPY } from '../data/copy.js'
import { EXPERIENCE } from '../data/experience.js'
import Section from './Section.jsx'

export default function Experience() {
  return (
    <Section index={2} id="experience" eyebrow={COPY.experience.eyebrow} title={COPY.experience.title}>
      <ol className="mt-2">
        {EXPERIENCE.map((job) => (
          <Reveal as="li" key={job.company} className="border-t border-line pt-6 mt-6 first:mt-6">
            <p className="text-[0.8125rem] font-medium text-accent">{job.dates}</p>
            <h3 className="mt-1.5 text-lg font-semibold leading-snug">{job.role}</h3>
            <p className="text-muted">{job.company}</p>
            {job.notes.length > 0 && (
              <ul className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed text-ink/80">
                {job.notes.map((note) => (
                  <li key={note} className="relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-ink/30">
                    {note}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
