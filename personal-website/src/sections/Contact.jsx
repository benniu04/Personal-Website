import Reveal from '../components/Reveal.jsx'
import { CONTACT } from '../data/about.js'
import { COPY } from '../data/copy.js'
import Section from './Section.jsx'

export default function Contact() {
  const links = [
    { label: 'Email', text: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { label: 'GitHub', text: `@${CONTACT.githubUser}`, href: CONTACT.github },
    { label: 'LinkedIn', text: 'in/benniu04', href: CONTACT.linkedin },
  ]
  return (
    <Section index={5} id="contact" eyebrow={COPY.contact.eyebrow} title={COPY.contact.title}>
      <Reveal as="p" className="mt-4 leading-relaxed text-ink/80">
        {COPY.contact.body}
      </Reveal>
      <Reveal className="mt-6">
        <a
          href={`mailto:${CONTACT.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[0.9375rem] font-medium text-paper transition-colors duration-200 hover:bg-accent"
        >
          Say hello <span aria-hidden="true">→</span>
        </a>
      </Reveal>
      <Reveal as="dl" className="mt-6 divide-y divide-line border-t border-line text-[0.9375rem]">
        {links.map(({ label, text, href }) => (
          <div key={label} className="flex gap-4 py-3">
            <dt className="w-24 shrink-0 text-muted">{label}</dt>
            <dd className="min-w-0 break-words">
              <a href={href} className="link" {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {text}
              </a>
            </dd>
          </div>
        ))}
      </Reveal>
      <p className="mt-6 text-[0.8125rem] text-muted">
        © {new Date().getFullYear()} {CONTACT.fullName}. {COPY.contact.footer}
      </p>
    </Section>
  )
}
