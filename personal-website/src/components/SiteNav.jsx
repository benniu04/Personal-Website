import { STOPS } from '../data/stops.js'
import { useActiveStop } from '../journey/hooks.js'

// Six dots: down the right edge on wide screens, a small pill along the top on phones.
export default function SiteNav() {
  const active = useActiveStop()
  return (
    <nav
      aria-label="Journey"
      className="fixed left-1/2 top-3 z-20 -translate-x-1/2 rounded-full border border-line bg-paper/90 px-2 md:left-auto md:right-5 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:rounded-none md:border-0 md:bg-transparent md:px-0"
    >
      <ol className="flex md:flex-col md:items-end">
        {STOPS.map((stop, i) => {
          const current = i === active
          return (
            <li key={stop.id}>
              <a
                href={`#${stop.id}`}
                aria-current={current ? 'step' : undefined}
                className="group flex h-8 items-center justify-end gap-3 px-2 md:h-9"
              >
                <span
                  className={`hidden rounded-full bg-paper/90 px-2.5 py-1 text-xs font-medium text-ink transition-opacity duration-200 md:block ${
                    current ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
                  }`}
                >
                  {stop.label}
                </span>
                <span className="sr-only md:hidden">{stop.label}</span>
                <span
                  aria-hidden="true"
                  className={`block h-2 w-2 rounded-full transition-all duration-300 ${
                    current ? 'scale-125 bg-accent' : 'bg-ink/30 group-hover:bg-ink/60'
                  }`}
                />
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
