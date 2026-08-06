import { Link, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { projects } from '../data/projects'

function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  const index = projects.indexOf(project)

  if (!project) {
    return (
      <main className="bg-cream pt-16 min-h-screen">
        <div className="max-w-site mx-auto px-6 py-32">
          <p className="eyebrow text-rust mb-6">404</p>
          <h1 className="font-display font-light text-4xl text-ink">Project not found.</h1>
          <Link to="/work" className="btn-outline mt-10">
            Back to work
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-cream pt-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <section className="border-b border-hairline">
          <div className="max-w-site mx-auto px-6 pt-24 pb-14 md:pt-32 md:pb-16">
            <Link
              to="/work"
              className="font-mono text-xs uppercase tracking-[0.14em] text-clay hover:text-rust transition-colors"
            >
              ← All work
            </Link>
            <p className="eyebrow text-rust mt-10 mb-6">
              Project {String(index + 1).padStart(2, '0')}
            </p>
            <h1 className="font-display font-light text-ink text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.015em] max-w-3xl">
              {project.title}
            </h1>
          </div>
        </section>

        {/* Meta */}
        {project.meta && (
          <section className="border-b border-hairline">
            <div className="max-w-site mx-auto px-6 py-8 grid sm:grid-cols-3 gap-8">
              {[
                ['Role', project.meta.role],
                ['Timeline', project.meta.timeline],
                ['Tools', project.meta.tools],
              ]
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div key={label}>
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-clay mb-2">
                      {label}
                    </p>
                    <p className="text-ink leading-relaxed">{value}</p>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Body */}
        <section>
          <div className="max-w-site mx-auto px-6 py-16 md:py-20">
            <img
              src={project.cover}
              alt={project.title}
              className="w-full border border-hairline object-cover"
            />

            <div className="mt-14 max-w-2xl">
              <p className="text-lg leading-relaxed text-cocoa">
                {project.description || project.blurb}
              </p>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ink mt-10"
                >
                  Visit live ↗
                </a>
              )}
            </div>
          </div>
        </section>
      </motion.div>
    </main>
  )
}

export default ProjectDetail
