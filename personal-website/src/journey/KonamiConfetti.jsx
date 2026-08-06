import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'
import { seeded } from '../pixel/generators'

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

const COLORS = ['#E09A60', '#C16E38', '#A24A21', '#763615', '#F2B84B']

// ↑↑↓↓←→←→BA rains rust pixels. Purely decorative, never blocks anything.
export function KonamiConfetti() {
  const [burst, setBurst] = useState(0)
  const reduce = useReducedMotionPref()

  useEffect(() => {
    let progress = 0
    const onKey = (e) => {
      const expected = KONAMI[progress]
      if (e.key === expected || e.key.toLowerCase() === expected) {
        progress += 1
        if (progress === KONAMI.length) {
          progress = 0
          setBurst((b) => b + 1)
        }
      } else {
        progress = e.key === KONAMI[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!burst) return
    const timer = setTimeout(() => setBurst(0), 3000)
    return () => clearTimeout(timer)
  }, [burst])

  if (!burst || reduce) return null

  const rand = seeded(`konami-${burst}`)
  const pieces = Array.from({ length: 48 }, (_, i) => ({
    id: i,
    x: rand() * 100,
    delay: rand() * 0.6,
    duration: 1.4 + rand() * 1.2,
    size: 6 + Math.floor(rand() * 8),
    color: COLORS[Math.floor(rand() * COLORS.length)],
    spin: rand() > 0.5 ? 360 : -360,
  }))

  return (
    <div className="fixed inset-0 z-[70] pointer-events-none overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-[-5%]"
          style={{ left: `${p.x}%`, width: p.size, height: p.size, backgroundColor: p.color }}
          initial={{ y: '-5vh', rotate: 0, opacity: 1 }}
          animate={{ y: '110vh', rotate: p.spin, opacity: [1, 1, 0.8] }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'linear' }}
        />
      ))}
      <p className="sr-only">Konami code accepted — pixel confetti!</p>
    </div>
  )
}

export default KonamiConfetti
