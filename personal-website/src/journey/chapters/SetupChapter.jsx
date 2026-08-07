import { useState } from 'react'
import { Chapter } from '../Chapter'
import { DialogPanel } from '../DialogPanel'
import { ScrollReveal } from '../../components/ScrollReveal'
import { StaticSprite } from '../../pixel/StaticSprite'
import { TOWER_PC, MACBOOK } from '../../pixel/sprites'
import { SETUPS } from '../../data/about'

const MACHINE_SPRITES = { pc: TOWER_PC, macbook: MACBOOK }

// Chapter 7 — the hardware, presented as a machine-select screen.
export function SetupChapter({ scene = null }) {
  const [activeSetup, setActiveSetup] = useState('pc')
  const setup = SETUPS[activeSetup]

  return (
    <Chapter
      id="setup"
      label="Chapter 7"
      title="The rig."
      scene={scene}
      className="bg-cream"
    >
      <ScrollReveal>
        <div className="max-w-2xl lg:max-w-none lg:grid lg:grid-cols-[minmax(0,42rem)_1fr] lg:gap-16 lg:items-start"><div>
          <div
            role="tablist"
            aria-label="Choose a machine"
            className="inline-flex gap-3 mb-8"
          >
            {Object.entries(SETUPS).map(([key, s]) => (
              <button
                key={key}
                role="tab"
                id={`setup-tab-${key}`}
                aria-selected={activeSetup === key}
                aria-controls="setup-specs"
                onClick={() => setActiveSetup(key)}
                className={`font-pixel text-xs uppercase tracking-[0.1em] border-2 border-ink px-4 py-2.5 shadow-[3px_3px_0_0_#43261A] transition-colors ${
                  activeSetup === key
                    ? 'bg-rust text-linen'
                    : 'bg-parchment text-ink hover:bg-blush'
                }`}
              >
                {activeSetup === key && <span aria-hidden="true">▶ </span>}
                {s.label}
              </button>
            ))}
          </div>

          <DialogPanel>
            <div id="setup-specs" role="tabpanel" aria-labelledby={`setup-tab-${activeSetup}`}>
              <p className="text-lg leading-relaxed text-cocoa">{setup.blurb}</p>
              <div className="mt-8">
                {setup.specs.map(([component, name]) => (
                  <div
                    key={component}
                    className="grid sm:grid-cols-[11rem_1fr] gap-1 sm:gap-8 border-t-2 border-hairline py-4"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-clay pt-1">
                      {component}
                    </p>
                    <p className="text-ink">{name}</p>
                  </div>
                ))}
                <div className="border-t-2 border-hairline" />
              </div>
            </div>
          </DialogPanel>
          </div>

          {/* the selected machine, standing on its desk */}
          <div className="hidden lg:flex flex-col items-center gap-3 pt-16">
            <StaticSprite
              map={MACHINE_SPRITES[activeSetup]}
              className={activeSetup === 'pc' ? 'w-36' : 'w-56'}
            />
            <div className="w-64 h-2 bg-cocoa border-2 border-ink" aria-hidden="true" />
            <p className="font-pixel text-[0.6875rem] uppercase tracking-[0.1em] text-clay">
              ▶ {setup.label} selected
            </p>
          </div>
        </div>
      </ScrollReveal>
    </Chapter>
  )
}

export default SetupChapter
