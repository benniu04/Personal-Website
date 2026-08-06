import { motion } from 'motion/react'
import { ScrollReveal } from '../components/ScrollReveal'

const EXPERIENCE = [
  {
    dates: 'Jun 2026 – Aug 2026',
    role: 'Actuarial / AI Intern',
    company: 'Berkley Small Business Solutions',
    notes: ['Incoming Summer 2026.'],
  },
  {
    dates: 'Jan 2026 – Present',
    role: 'Full Stack Developer Co-op',
    company: 'FuzionX Corporation',
    notes: [
      "Established the team's CI/CD pipeline with risk-tiered coverage enforcement (70-80% on HIPAA files, 20-40% global), Black formatting, Flake8 linting, and pytest-xdist parallelization that cut backend test runtime by ~2 minutes.",
      'Migrated website analytics from PostHog to Datadog RUM, consolidating analytics, logs, and monitoring into a unified platform and unlocking funnel analysis and UTM campaign tracking previously unavailable to the team.',
      'Refactored frontend data fetching from useEffect/fetch to TanStack Query with custom hooks, cutting data-layer code by 57% while eliminating redundant API calls and enabling automatic background refetching.',
      'Built authentication infrastructure integrating AWS Cognito with JWT-based session management, implementing secure token refresh, role-based access control, and protected route middleware across the application.',
    ],
  },
  {
    dates: 'Feb 2025 – Dec 2025',
    role: 'Generative AI Developer Intern',
    company: 'Bizdeglo',
    notes: [
      'Automated discovery and normalization of 500+ venture capital fund profiles, cutting 20+ hours of manual research weekly with a Selenium-based pipeline.',
      'Designed and fine-tuned an investor prediction system using Python, generative models, and structured VC datasets, improving client targeting accuracy.',
      'Partnered with early-stage startups to scope requirements, build prototypes, and ship production AI tools used in fundraising workflows.',
    ],
    tags: ['JavaScript', 'Tailwind', 'MongoDB'],
  },
]

function ExperiencePage() {
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
            <p className="eyebrow text-rust mb-6">Where I've been</p>
            <h1 className="font-display font-light text-ink text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.015em] max-w-3xl">
              Experience
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Rows */}
      <section>
        <div className="max-w-site mx-auto px-6 py-16 md:py-24">
          {EXPERIENCE.map((job, i) => (
            <ScrollReveal key={job.role} delay={i * 0.06}>
              <div className={`grid md:grid-cols-[12rem_1fr] gap-4 md:gap-12 py-10 md:py-12 ${i > 0 ? 'border-t border-hairline' : ''}`}>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-clay pt-1.5">
                  {job.dates}
                </p>
                <div>
                  <h2 className="font-display font-normal text-2xl text-ink">{job.role}</h2>
                  <p className="mt-1 text-cocoa">{job.company}</p>
                  <ul className="mt-5 space-y-3 max-w-2xl">
                    {job.notes.map((note) => (
                      <li key={note} className="text-cocoa leading-relaxed">
                        {note}
                      </li>
                    ))}
                  </ul>
                  {job.tags && (
                    <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-clay">
                      {job.tags.join(' · ')}
                    </p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  )
}

export default ExperiencePage
