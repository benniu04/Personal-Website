import { Link } from 'react-router-dom'
import { Chapter } from '../Chapter'
import { ScrollReveal } from '../../components/ScrollReveal'
import { PixelMark } from '../../components/PixelMark'
import { projects } from '../../data/projects'

function Cartridge({ project, index }) {
  const secret = project.slug === 'secret-app'
  return (
    <ScrollReveal delay={index * 0.07}>
      <Link
        to={`/work/${project.slug}`}
        className="group block pixel-panel p-6 h-full transition-transform duration-150 hover:-translate-y-1 motion-reduce:hover:translate-y-0"
      >
        {/* Cartridge label window */}
        <div className="border-2 border-ink bg-blush flex items-center justify-center py-6 mb-5">
          {secret ? (
            <span className="font-pixel text-4xl text-rust" aria-hidden="true">
              ?
            </span>
          ) : (
            <PixelMark seed={project.slug} className="w-16 h-16" />
          )}
        </div>

        <p className="font-pixel text-[0.6875rem] uppercase tracking-[0.1em] text-rust">
          Quest {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="mt-2 font-display font-normal text-xl text-ink group-hover:text-rust transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 text-cocoa leading-relaxed">{project.blurb}</p>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-clay">
          {project.meta.role} · {project.meta.timeline}
        </p>
        <p className="mt-5 font-pixel text-[0.6875rem] uppercase tracking-[0.1em] text-ink">
          {secret ? 'Classified' : 'Insert cartridge'} <span aria-hidden="true">→</span>
        </p>
      </Link>
    </ScrollReveal>
  )
}

// Chapter 4 — projects as a level-select shelf of game cartridges, each
// stamped with its deterministic PixelMark identicon.
export function ProjectsChapter({ scene = null }) {
  return (
    <Chapter
      id="projects"
      label="Chapter 4"
      title="Side quests."
      scene={scene}
      className="bg-blush"
    >
      <p className="max-w-2xl -mt-6 mb-12 text-lg leading-relaxed text-cocoa">
        Projects that show how I approach design and engineering problems. Each mark is generated
        from the project's name, so no two cartridges are alike.
      </p>
      <div className="grid sm:grid-cols-2 gap-8 md:gap-10 max-w-4xl">
        {projects.map((project, i) => (
          <Cartridge key={project.slug} project={project} index={i} />
        ))}
      </div>
    </Chapter>
  )
}

export default ProjectsChapter
