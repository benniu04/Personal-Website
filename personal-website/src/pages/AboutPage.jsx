import { useState } from 'react'
import { motion } from 'motion/react'
import { ScrollReveal } from '../components/ScrollReveal'
import { SectionHeading } from '../components/SectionHeading'

const FACTS = [
  { label: 'Location', value: 'Boston, MA, originally from Connecticut' },
  { label: 'Education', value: 'Computer Science & Finance, Northeastern University' },
  { label: 'Focus areas', value: 'Full-stack development · Machine learning · Fintech' },
  { label: 'Currently reading', value: '“Atomic Habits” by James Clear' },
  { label: 'Off the clock', value: 'Piano · Tennis · Golf · Traveling' },
]

const TOOLKIT = [
  {
    area: 'Development',
    items: 'React · JavaScript · Tailwind CSS · Node.js · Python · Java · Express · MongoDB · JWT · Docker',
  },
  {
    area: 'DevOps & Cloud',
    items: 'AWS S3 · CloudFront · EC2 · GitHub Actions · CI/CD · Git · Vercel · Netlify · Render',
  },
  {
    area: 'Currently exploring',
    items: 'Machine learning · Fintech · Design systems',
  },
]

const SETUPS = {
  pc: {
    label: 'Gaming PC',
    blurb: 'My custom-built gaming and development rig for coding, gaming, and the occasional VM farm.',
    specs: [
      ['CPU', 'AMD Ryzen 5 5600X'],
      ['GPU', 'AMD Radeon RX 6700 XT'],
      ['RAM', '16GB Corsair Vengeance DDR4 3200MHz'],
      ['Storage', '1TB NVMe SSD'],
      ['Motherboard', 'MSI MAG B550 Tomahawk'],
      ['Case', 'Maingear Vybe'],
    ],
  },
  macbook: {
    label: 'MacBook Pro',
    blurb: 'My portable powerhouse. The M1 Pro handles everything from React development to Docker containers without breaking a sweat.',
    specs: [
      ['Model', 'MacBook Pro 14"'],
      ['Chip', 'Apple M1 Pro'],
      ['RAM', '16GB Unified Memory'],
      ['Storage', '512GB SSD'],
      ['Display', '14.2" Liquid Retina XDR'],
      ['Battery', 'Up to 18 hours'],
    ],
  },
}

function AboutPage() {
  const [activeSetup, setActiveSetup] = useState('pc')
  const setup = SETUPS[activeSetup]

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
            <p className="eyebrow text-rust mb-6">About</p>
            <h1 className="font-display font-light text-ink text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.015em] max-w-3xl">
              Hello, I'm Ben.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Bio */}
      <section>
        <div className="max-w-site mx-auto px-6 py-20 md:py-28 grid lg:grid-cols-[20rem_1fr] gap-14 lg:gap-24">
          <ScrollReveal>
            <img
              src="/images/profile-pic.jpeg"
              alt="Benjamin Niu"
              className="w-full max-w-xs border border-hairline object-cover [filter:saturate(0.85)]"
            />
          </ScrollReveal>

          <div className="max-w-2xl">
            <ScrollReveal delay={0.1}>
              <p className="font-display font-light text-2xl md:text-3xl text-ink leading-snug">
                I enjoy the pursuit of design and development, and helping
                others along the way.
              </p>
              <div className="mt-8 space-y-6 text-lg leading-relaxed text-cocoa">
                <p>
                  I'm a student at Northeastern University studying computer
                  science and finance. While building this website, I became
                  obsessed with the intersection of design and development.
                </p>
                <p>
                  These days I'm diving deep into that intersection, with a
                  growing interest in fintech and how considered interfaces can
                  make complex financial systems more accessible. I'm
                  experienced in building full-stack applications, with a bit
                  of machine learning on the side.
                </p>
              </div>
            </ScrollReveal>

            {/* Quick facts — editorial rows */}
            <ScrollReveal delay={0.15}>
              <div className="mt-16">
                {FACTS.map((fact) => (
                  <div
                    key={fact.label}
                    className="grid sm:grid-cols-[11rem_1fr] gap-1 sm:gap-8 border-t border-hairline py-5"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-clay pt-1">
                      {fact.label}
                    </p>
                    <p className="text-ink">{fact.value}</p>
                  </div>
                ))}
                <div className="border-t border-hairline" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* At a glance — centered statement */}
      <section className="bg-blush border-y border-hairline">
        <div className="max-w-site mx-auto px-6 py-24 md:py-32">
          <ScrollReveal>
            <SectionHeading
              center
              eyebrow="At a glance"
              title={
                <>
                  Fewer templates.
                  <br />
                  More intention.
                  <br />
                  Software that feels considered.
                </>
              }
            />
            <p className="mt-8 mx-auto max-w-xl text-center text-lg leading-relaxed text-cocoa">
              Full-stack applications, a bit of machine learning, and a growing
              obsession with the intersection of design and development,
              currently pointed at fintech.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Toolkit — editorial rows */}
      <section>
        <div className="max-w-site mx-auto px-6 py-20 md:py-28">
          <ScrollReveal>
            <SectionHeading eyebrow="Toolkit" title="What I work with" className="mb-14" />
          </ScrollReveal>

          <div>
            {TOOLKIT.map((row, i) => (
              <ScrollReveal key={row.area} delay={i * 0.06}>
                <div className="grid md:grid-cols-[12rem_1fr] gap-2 md:gap-12 border-t border-hairline py-8">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-clay pt-1">
                    {row.area}
                  </p>
                  <p className="text-lg text-ink leading-relaxed">{row.items}</p>
                </div>
              </ScrollReveal>
            ))}
            <div className="border-t border-hairline" />
          </div>
        </div>
      </section>

      {/* Setup */}
      <section className="bg-blush border-t border-hairline">
        <div className="max-w-site mx-auto px-6 py-20 md:py-28">
          <ScrollReveal>
            <p className="eyebrow text-rust mb-5">The hardware</p>
            <h2 className="font-display font-light text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] text-ink">
              My setup
            </h2>

            <div className="mt-10 flex gap-8 border-b border-hairline">
              {Object.entries(SETUPS).map(([key, s]) => (
                <button
                  key={key}
                  onClick={() => setActiveSetup(key)}
                  className={`font-mono text-xs uppercase tracking-[0.14em] pb-4 -mb-px border-b-2 transition-colors ${
                    activeSetup === key
                      ? 'border-rust text-ink'
                      : 'border-transparent text-clay hover:text-ink'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-cocoa">{setup.blurb}</p>

            <div className="mt-10 max-w-2xl">
              {setup.specs.map(([component, name]) => (
                <div
                  key={component}
                  className="grid sm:grid-cols-[11rem_1fr] gap-1 sm:gap-8 border-t border-hairline py-4"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-clay pt-1">
                    {component}
                  </p>
                  <p className="text-ink">{name}</p>
                </div>
              ))}
              <div className="border-t border-hairline" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
