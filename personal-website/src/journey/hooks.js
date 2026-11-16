import { useCallback, useSyncExternalStore } from 'react'
import { getActive, register, subscribe } from './journeyStore.js'

// Ref callback that registers a card as stop `index`.
export function useStopRef(index) {
  return useCallback((el) => (el ? register(index, el) : undefined), [index])
}

export function useActiveStop() {
  return useSyncExternalStore(subscribe, getActive, () => 0)
}
