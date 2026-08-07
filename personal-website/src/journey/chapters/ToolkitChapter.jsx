import { Chapter } from '../Chapter'
import { DialogPanel } from '../DialogPanel'
import { ScrollReveal } from '../../components/ScrollReveal'
import { TOOLKIT } from '../../data/about'

// Chapter 5 — the toolkit as an RPG inventory: labelled rows of item slots.
export function ToolkitChapter({ scene = null }) {
  return (
    <Chapter
      id="toolkit"
      label="Chapter 5"
      title="Inventory."
      scene={scene}
      className="bg-cream"
    >
      <div className="max-w-3xl space-y-8">
        {TOOLKIT.map((row, i) => (
          <ScrollReveal key={row.area} delay={i * 0.08}>
            <DialogPanel label={row.area}>
              <ul className="flex flex-wrap gap-3 list-none">
                {row.items.map((item) => (
                  <li
                    key={item}
                    className="border-2 border-ink bg-cream px-3 py-2 font-mono text-xs uppercase tracking-[0.1em] text-ink shadow-[3px_3px_0_0_#43261A] hover:bg-blush transition-colors"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </DialogPanel>
          </ScrollReveal>
        ))}
      </div>
    </Chapter>
  )
}

export default ToolkitChapter
