import { createContext, useContext, useMemo, useRef, useState } from 'react'

// Shared world state. Fast-changing values (input, player position) live in
// refs so the render loop never causes React re-renders; only the near
// station and the open panel are React state (they change rarely).
const WorldContext = createContext(null)

export function WorldProvider({ children }) {
  const inputRef = useRef({ x: 0, z: 0 }) // normalized move intent
  const camDragRef = useRef({ yawOff: 0, pitchOff: 0 }) // drag-to-look offsets
  // ?spawn=x,z drops the player anywhere — handy for sharing a spot or debugging
  // yaw π = facing into the world, so the camera starts behind the character
  const playerRef = useRef(
    (() => {
      const param = new URLSearchParams(window.location.search).get('spawn')
      const [x, z] = (param ?? '').split(',').map(Number)
      return Number.isFinite(x) && Number.isFinite(z)
        ? { x, z, yaw: Math.PI, moving: false }
        : { x: 0, z: 1, yaw: Math.PI, moving: false }
    })()
  )
  const [nearStation, setNearStation] = useState(null)
  const [openPanel, setOpenPanel] = useState(null)

  const value = useMemo(
    () => ({ inputRef, playerRef, camDragRef, nearStation, setNearStation, openPanel, setOpenPanel }),
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
