import { useReducedMotion } from 'motion/react'

// Single import point for the reduced-motion preference, so every journey
// component gates its motion the same way.
export function useReducedMotionPref() {
  return useReducedMotion()
}

export default useReducedMotionPref
