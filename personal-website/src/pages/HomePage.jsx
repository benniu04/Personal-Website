import Hero from '../components/Hero'
import CommitGraph from '../components/CommitGraph'
import { ScrollReveal } from '../components/ScrollReveal'
import { SectionHeading } from '../components/SectionHeading'

function HomePage() {
  return (
    <main>
      <Hero />

      {/* Commit activity */}
      <section className="bg-blush border-b border-hairline">
        <div className="max-w-site mx-auto px-6 py-24 md:py-32">
          <ScrollReveal>
            <SectionHeading eyebrow="Proof of work" title="A year of commits" className="mb-14" />
            <CommitGraph username="benniu04" />
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}

export default HomePage
