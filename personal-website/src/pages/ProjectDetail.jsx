import { Link, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { projects } from '../data/projects'
import { PixelMark } from '../components/PixelMark'
import { DialogPanel } from '../journey/DialogPanel'
import { CONTACT } from '../data/about'

function DetailFooter() {
  return (
    <footer className="border-t-2 border-hairline mt-20">
      <div className="max-w-site mx-auto px-6 py-8 flex flex-wrap gap-4 justify-between items-center">
        <p className="font-mono text-xs text-clay">
          © {new Date().getFullYear()} {CONTACT.fullName}. Crafted with curiosity and care.
        </p>
        <Link
          to="/journey#projects"
          className="font-pixel text-[0.6875rem] uppercase tracking-[0.1em] text-rust hover:text-rust-deep"
        >
          Scroll the 2D journey
        </Link>
      </div>
    </footer>
  )
}

// Level briefing for one side quest (project).
function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  const index = projects.indexOf(project)
  const secret = slug === 'secret-app'

  if (!project) {
    return (
      <main className="bg-cream min-h-screen">
        <div className="max-w-site mx-auto px-6 py-32">
          <p className="font-pixel text-sm uppercase tracking-[0.1em] text-rust mb-6">Error 404</p>
          <h1 className="font-display font-light text-4xl text-ink">
            This quest doesn't exist.
          </h1>
          <Link to="/" className="pixel-btn-parchment mt-10">
            ← Back to the world
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-cream min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <section className="border-b-2 border-hairline">
          <div className="max-w-site mx-auto px-6 pt-16 pb-14 md:pt-24 md:pb-16">
            <Link
              to="/"
              className="font-pixel text-[0.6875rem] uppercase tracking-[0.1em] text-clay hover:text-rust transition-colors"
            >
              ← Back to the world
            </Link>
            <div className="mt-10 flex items-start gap-6">
              <div className="hidden sm:block border-2 border-ink bg-blush p-3 shrink-0">
                {secret ? (
                  <span className="font-pixel text-3xl text-rust block w-12 h-12 text-center leading-[3rem]" aria-hidden="true">
                    ?
                  </span>
                ) : (
                  <PixelMark seed={project.slug} className="w-12 h-12" />
                )}
              </div>
              <div>
                <p className="font-pixel text-xs uppercase tracking-[0.1em] text-rust mb-4">
                  Quest {String(index + 1).padStart(2, '0')} · Level briefing
                </p>
                <h1 className="font-display font-light text-ink text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.015em] max-w-3xl">
                  {project.title}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Meta */}
        {project.meta && (
          <section className="border-b-2 border-hairline bg-blush">
            <div className="max-w-site mx-auto px-6 py-8 grid sm:grid-cols-3 gap-8">
              {[
                ['Role', project.meta.role],
                ['Timeline', project.meta.timeline],
                ['Tools', project.meta.tools],
              ]
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div key={label}>
                    <p className="font-pixel text-[0.6875rem] uppercase tracking-[0.1em] text-rust mb-2">
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
            <div className="pixel-panel p-2.5">
              <img src={project.cover} alt={project.title} className="w-full object-cover" />
            </div>

            <div className="mt-14 max-w-2xl">
              <DialogPanel label="Briefing">
                <p className="text-lg leading-relaxed text-cocoa">
                  {project.description || project.blurb}
                </p>
              </DialogPanel>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-btn-rust mt-10"
                >
                  ▶ Play level — visit live ↗
                </a>
              )}
            </div>
          </div>
        </section>
      </motion.div>
      <DetailFooter />
    </main>
  )
}

export default ProjectDetail
