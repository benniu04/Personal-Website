import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'

// A scene layer that drifts vertically as its section crosses the viewport.
// Motion values write transforms directly — no React re-renders — and the
// canvas inside stays a static bitmap the compositor moves.
// `speed` is the total drift as a fraction of layer height; positive lags
// the scroll (background), negative leads it (foreground).
export function ParallaxLayer({ speed = 0.08, className = '', style, children }) {
  const ref = useRef(null)
  const reduce = useReducedMotionPref()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`])

  return (
    <motion.div
      ref={ref}
      className={`absolute inset-0 will-change-transform ${className}`}
      style={{ y: reduce ? 0 : y, ...style }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  )
}

export default ParallaxLayer
