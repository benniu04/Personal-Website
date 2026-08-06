import { Chapter } from '../Chapter'
import { DialogPanel } from '../DialogPanel'
import { ScrollReveal } from '../../components/ScrollReveal'
import { StaticSprite } from '../../pixel/StaticSprite'
import { PADLOCK } from '../../pixel/sprites'
import { EXPERIENCE } from '../../data/experience'

function LevelCard({ job, index }) {
  return (
    <ScrollReveal delay={index * 0.08} direction={index % 2 === 0 ? 'right' : 'left'} className="relative">
      {/* node on the world-map path */}
      <span
        className={`hidden md:block absolute top-9 -left-[2.95rem] w-5 h-5 border-2 border-ink ${
          job.locked ? 'bg-cocoa' : 'bg-rust'
        }`}
        aria-hidden="true"
      />
      <DialogPanel className={job.locked ? 'opacity-90' : ''}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="font-pixel text-xs uppercase tracking-[0.1em] text-rust">
            Level {job.level}
          </p>
          {job.locked ? (
            <p className="inline-flex items-center gap-1.5 font-pixel text-[0.6875rem] uppercase tracking-[0.1em] text-linen bg-cocoa border-2 border-ink px-2 py-0.5">
              <StaticSprite map={PADLOCK} className="w-3.5" /> Locked · {job.lockedLabel}
            </p>
          ) : (
            <p className="font-pixel text-[0.6875rem] uppercase tracking-[0.1em] text-ink bg-blush border-2 border-ink px-2 py-0.5">
              ★ XP earned
            </p>
          )}
          <p className="ml-auto font-mono text-xs uppercase tracking-[0.14em] text-clay">{job.dates}</p>
        </div>

        <h3 className="mt-5 font-display font-normal text-2xl text-ink">{job.role}</h3>
        <p className="mt-1 text-cocoa">{job.company}</p>

        <ul className="mt-5 space-y-3 max-w-2xl list-none">
          {job.notes.map((note) => (
            <li key={note} className="text-cocoa leading-relaxed pl-5 relative">
              <span className="absolute left-0 top-[0.55em] w-2 h-2 bg-rust" aria-hidden="true" />
              {note}
            </li>
          ))}
        </ul>

        {job.tags && (
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-clay">
            {job.tags.join(' · ')}
          </p>
        )}
      </DialogPanel>
    </ScrollReveal>
  )
}

// Chapter 3 — co-ops and internships as game levels along a world-map path.
export function ExperienceChapter({ scene = null }) {
  return (
    <Chapter
      id="experience"
      label="Chapter 3"
      title="The co-op levels."
      scene={scene}
      className="bg-cream"
    >
      <div className="relative max-w-3xl md:pl-14">
        {/* dotted world-map path connecting the levels */}
        <div
          className="hidden md:block absolute left-[1.55rem] top-10 bottom-10 w-1.5"
          style={{
            backgroundImage: 'repeating-linear-gradient(180deg, #A24A21 0 10px, transparent 10px 20px)',
          }}
          aria-hidden="true"
        />
        <div className="space-y-10 md:space-y-14">
          {EXPERIENCE.map((job, i) => (
            <LevelCard key={job.company} job={job} index={i} />
          ))}
        </div>
      </div>
    </Chapter>
  )
}

export default ExperienceChapter
