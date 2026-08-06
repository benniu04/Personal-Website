import { useState } from 'react'
import { motion } from 'motion/react'
import { Chapter } from '../Chapter'
import { DialogPanel } from '../DialogPanel'
import { ScrollReveal } from '../../components/ScrollReveal'
import { StaticSprite } from '../../pixel/StaticSprite'
import { TENNIS_BALL, GOLF_FLAG } from '../../pixel/sprites'
import { useReducedMotionPref } from '../../hooks/useReducedMotionPref'
import { PianoKeys } from '../PianoKeys'
import { FACTS } from '../../data/about'

const readingFact = FACTS.find((f) => f.label === 'Currently reading')
const hobbiesFact = FACTS.find((f) => f.label === 'Off the clock')

const HOBBIES = hobbiesFact.value.split(' · ')

// Click the ball and it bounces down the court.
function TennisBall() {
  const [serve, setServe] = useState(0)
  const reduce = useReducedMotionPref()
  return (
    <button
      type="button"
      onClick={() => setServe((s) => s + 1)}
      className="flex items-end gap-1"
      aria-label="Serve the tennis ball"
    >
      <motion.span
        key={serve}
        className="inline-block"
        animate={
          serve && !reduce
            ? { x: [0, 40, 80, 120, 150], y: [0, -34, 0, -18, 0] }
            : false
        }
        transition={{ duration: 0.8, ease: 'linear' }}
      >
        <StaticSprite map={TENNIS_BALL} className="w-5" />
      </motion.span>
      <span className="font-pixel text-[0.6875rem] uppercase tracking-[0.1em] text-clay">
        ← Serve
      </span>
    </button>
  )
}

// The flag waves when you hover the green.
function GolfFlag() {
  const reduce = useReducedMotionPref()
  return (
    <motion.span
      className="inline-block origin-bottom cursor-pointer"
      whileHover={reduce ? {} : { rotate: [0, -3, 3, -3, 0], transition: { duration: 0.6 } }}
      aria-hidden="true"
    >
      <StaticSprite map={GOLF_FLAG} className="w-10" />
    </motion.span>
  )
}

// Chapter 6 — rest stops: life off the clock, with toys.
export function HobbiesChapter({ scene = null, piano = <PianoKeys />, tennis = <TennisBall />, golf = <GolfFlag /> }) {
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
            <div className="mt-8 flex flex-wrap gap-8 items-end">
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
