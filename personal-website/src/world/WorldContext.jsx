import { createContext, useContext, useMemo, useRef, useState } from 'react'

// Shared world state. Fast-changing values (input, player position) live in
// refs so the render loop never causes React re-renders; only the near
// station and the open panel are React state (they change rarely).
const WorldContext = createContext(null)

export function WorldProvider({ children }) {
  const inputRef = useRef({ x: 0, z: 0 }) // normalized move intent
  // ?spawn=x,z drops the player anywhere — handy for sharing a spot or debugging
  const playerRef = useRef(
    (() => {
      const param = new URLSearchParams(window.location.search).get('spawn')
      const [x, z] = (param ?? '').split(',').map(Number)
      return Number.isFinite(x) && Number.isFinite(z)
        ? { x, z, yaw: 0, moving: false }
        : { x: 0, z: 1, yaw: 0, moving: false }
    })()
  )
  const [nearStation, setNearStation] = useState(null)
  const [openPanel, setOpenPanel] = useState(null)

  const value = useMemo(
    () => ({ inputRef, playerRef, nearStation, setNearStation, openPanel, setOpenPanel }),
    [nearStation, openPanel]
  )
  return <WorldContext.Provider value={value}>{children}</WorldContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- tiny hook co-located with its provider
export function useWorld() {
  const ctx = useContext(WorldContext)
  if (!ctx) throw new Error('useWorld must be used inside WorldProvider')
  return ctx
}
