import { useCallback, useMemo } from 'react'
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
  const { inputRef, nearStation, openPanel, setOpenPanel } = useWorld()

  const onInteract = useCallback(() => {
    if (nearStation) setOpenPanel(nearStation)
  }, [nearStation, setOpenPanel])

  useKeyboardInput(inputRef, { enabled: !openPanel, onInteract })

  return (
    <div className="fixed inset-0 bg-cream">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ fov: 42, position: [0, 9, 12], near: 0.5, far: 140 }}
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
