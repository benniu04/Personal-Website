import { useCallback, useMemo, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { World } from './World'
import { WorldProvider, useWorld } from './WorldContext'
import { WorldHUD } from './WorldHUD'
import { WorldPanels } from './WorldPanels'
import { useKeyboardInput } from './useKeyboardInput'

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function WorldStage() {
  const { inputRef, nearStation, openPanel, setOpenPanel, camDragRef } = useWorld()
  const dragState = useRef(null)

  const onInteract = useCallback(() => {
    if (nearStation) setOpenPanel(nearStation)
  }, [nearStation, setOpenPanel])

  useKeyboardInput(inputRef, { enabled: !openPanel, onInteract })

  // drag-to-look: orbit the camera; offsets ease back once you walk
  const onPointerDown = (e) => {
    if (e.target.closest('button, a, [role="dialog"]')) return
    dragState.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerMove = (e) => {
    const start = dragState.current
    if (!start) return
    const drag = camDragRef.current
    drag.yawOff -= (e.clientX - start.x) * 0.006
    drag.pitchOff = Math.max(-2.4, Math.min(4.5, drag.pitchOff + (e.clientY - start.y) * 0.02))
    dragState.current = { x: e.clientX, y: e.clientY }
  }
  const endDrag = () => {
    dragState.current = null
  }

  return (
    <div
      className="fixed inset-0 bg-cream touch-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ fov: 42, position: [0, 4.2, 9.5], near: 0.5, far: 160 }}
      >
        <World />
      </Canvas>
      <WorldHUD />
      <WorldPanels />
      <h1 className="sr-only">Ben Niu — an explorable pixel world</h1>
    </div>
  )
}

// The 3D world at `/`. No WebGL → the 2D scroll journey at /journey.
export function WorldPage() {
  const webgl = useMemo(supportsWebGL, [])
  if (!webgl) return <Navigate to="/journey" replace />
  return (
    <WorldProvider>
      <WorldStage />
    </WorldProvider>
  )
}

export default WorldPage
