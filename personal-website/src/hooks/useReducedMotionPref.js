import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(fn) {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener('change', fn)
  return () => mq.removeEventListener('change', fn)
}

export function useReducedMotionPref() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false)
}
