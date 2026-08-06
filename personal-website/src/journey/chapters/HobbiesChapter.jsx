import { Chapter } from '../Chapter'
import { DialogPanel } from '../DialogPanel'
import { ScrollReveal } from '../../components/ScrollReveal'
import { FACTS } from '../../data/about'

const readingFact = FACTS.find((f) => f.label === 'Currently reading')
const hobbiesFact = FACTS.find((f) => f.label === 'Off the clock')

const HOBBIES = hobbiesFact.value.split(' · ')

// Chapter 6 — rest stops: life off the clock. The playable piano and other
// easter eggs slot in via props once built.
export function HobbiesChapter({ scene = null, piano = null, tennis = null, golf = null }) {
  return (
    <Chapter
      id="hobbies"
      label="Chapter 6"
      title="Rest stops."
      scene={scene}
      className="bg-blush"
    >
      <div className="max-w-3xl space-y-8">
        <ScrollReveal>
          <DialogPanel label="Off the clock">
            <ul className="flex flex-wrap gap-3 list-none">
              {HOBBIES.map((hobby) => (
                <li
                  key={hobby}
                  className="border-2 border-ink bg-cream px-3 py-2 font-mono text-xs uppercase tracking-[0.1em] text-ink shadow-[3px_3px_0_0_#43261A]"
                >
                  {hobby}
                </li>
              ))}
            </ul>
            {piano}
            <div className="flex flex-wrap gap-6 items-end">
              {tennis}
              {golf}
            </div>
          </DialogPanel>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <DialogPanel label="On the bookshelf">
            <p className="text-lg text-ink leading-relaxed">{readingFact.value}</p>
          </DialogPanel>
        </ScrollReveal>
      </div>
    </Chapter>
  )
}

export default HobbiesChapter
