import CommitGraph from '../components/CommitGraph.jsx'
import Reveal from '../components/Reveal.jsx'
import { CONTACT, TOOLKIT } from '../data/about.js'
import { COPY } from '../data/copy.js'
import { projects } from '../data/projects.js'
import Section from './Section.jsx'

function Project({ project }) {
  const { title, description, url, linkLabel, role, timeline, tools, cover } = project
  return (
    <Reveal as="li" className="mt-6 border-t border-line pt-6">
      {cover && (
        <img
          src={cover.src}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          loading="lazy"
          className="mb-4 w-full rounded-lg border border-line"
        />
      )}
      <h3 className="text-lg font-semibold leading-snug">{title}</h3>
      <p className="mt-0.5 text-[0.875rem] text-muted">
        {role} · {timeline}
      </p>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/80">{description}</p>
      {tools.length > 0 && <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">{tools.join(' · ')}</p>}
      {url && (
        <a href={url} target="_blank" rel="noopener noreferrer" className="link mt-3 inline-block text-[0.9375rem] font-medium">
          {linkLabel} <span aria-hidden="true">↗</span>
        </a>
      )}
    </Reveal>
  )
}

export default function Projects() {
  return (
    <Section index={3} id="work" eyebrow={COPY.work.eyebrow} title={COPY.work.title}>
      <Reveal as="p" className="mt-4 leading-relaxed text-ink/80">
        {COPY.work.intro}
      </Reveal>
      <ul>
        {projects.map((project) => (
          <Project key={project.slug} project={project} />
        ))}
      </ul>

      <Reveal className="mt-6 border-t border-line pt-6">
        <h3 className="text-lg font-semibold">{COPY.work.toolkit}</h3>
        {TOOLKIT.map(({ area, items }) => (
          <div key={area} className="mt-4">
            <h4 className="text-[0.8125rem] font-medium text-muted">{area}</h4>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-6 border-t border-line pt-6">
        <p className="mb-4 text-[0.9375rem] text-ink/80">{COPY.work.commits}</p>
        <CommitGraph username={CONTACT.githubUser} />
      </Reveal>
    </Section>
  )
}
