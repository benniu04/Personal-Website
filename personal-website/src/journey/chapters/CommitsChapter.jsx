import { Chapter } from '../Chapter'
import { DialogPanel } from '../DialogPanel'
import { ScrollReveal } from '../../components/ScrollReveal'
import { CommitGraph } from '../../components/CommitGraph'
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
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-clay">
            Every lit square is a day I shipped something.
          </p>
        </DialogPanel>
      </ScrollReveal>
    </Chapter>
  )
}

export default CommitsChapter
