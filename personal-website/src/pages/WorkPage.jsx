import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { projects } from '../data/projects'
import { ScrollReveal } from '../components/ScrollReveal'
import PixelMark from '../components/PixelMark'

function WorkPage() {
  return (
    <main className="bg-cream pt-16">
      {/* Header */}
      <section className="border-b border-hairline">
        <div className="max-w-site mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow text-rust mb-6">Selected work</p>
            <h1 className="font-display font-light text-ink text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.015em] max-w-3xl">
              Things I've built
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cocoa">
              An index of projects that show how I approach design and
              engineering problems. Each mark is generated from the project's
              name, so no two are alike.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Index */}
      <section>
        <div className="max-w-site mx-auto px-6 py-16 md:py-24">
          {projects.map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 0.05}>
              <Link
                to={`/work/${project.slug}`}
                className="group grid grid-cols-[3.5rem_1fr_auto] md:grid-cols-[6rem_1fr_auto] items-center gap-6 md:gap-12 border-t border-hairline py-10 md:py-12"
              >
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-clay self-start pt-2">
                  No. {String(index + 1).padStart(2, '0')}
                </p>

                <div>
                  <h2 className="font-display font-light text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] text-ink group-hover:text-rust transition-colors duration-200">
                    {project.title}
                  </h2>
                  <p className="mt-3 max-w-xl text-cocoa leading-relaxed">{project.blurb}</p>
                  {project.meta && (
                    <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-clay">
                      {[project.meta.role, project.meta.timeline].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-6">
                  <PixelMark
                    seed={project.slug}
                    className="w-14 h-14 md:w-20 md:h-20 opacity-80 group-hover:opacity-100 transition-opacity duration-300 [filter:saturate(0.9)] group-hover:[filter:saturate(1)]"
                  />
                  <span
                    aria-hidden="true"
                    className="hidden md:inline font-mono text-sm text-clay group-hover:text-rust group-hover:translate-x-1 transition-all duration-200"
                  >
                    →
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
          <div className="border-t border-hairline" />
        </div>
      </section>
    </main>
  )
}

export default WorkPage
