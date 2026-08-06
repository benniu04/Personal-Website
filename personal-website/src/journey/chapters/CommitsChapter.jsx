import { Chapter } from '../Chapter'
import { DialogPanel } from '../DialogPanel'
import { ScrollReveal } from '../../components/ScrollReveal'
import { CommitGraph } from '../../components/CommitGraph'
import { StaticSprite } from '../../pixel/StaticSprite'
import { MONUMENT } from '../../pixel/sprites'
import { CONTACT } from '../../data/about'

// Chapter 8 — the quest log: live GitHub contributions as proof of work.
export function CommitsChapter({ scene = null }) {
  return (
    <Chapter
      id="commits"
      label="Chapter 8"
      title="Quest log."
      scene={scene}
      className="bg-blush"
    >
      <ScrollReveal>
        <DialogPanel label="Proof of work" className="max-w-4xl">
          <CommitGraph username={CONTACT.githubUser} />
          <div className="mt-6 flex items-end justify-between gap-6">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-clay">
              Every lit square is a day I shipped something.
            </p>
            <StaticSprite map={MONUMENT} className="w-10 shrink-0 hidden sm:block" />
          </div>
        </DialogPanel>
      </ScrollReveal>
    </Chapter>
  )
}

export default CommitsChapter
