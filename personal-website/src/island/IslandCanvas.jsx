import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import Atmosphere from './Atmosphere.jsx'
import CameraRig from './CameraRig.jsx'
import Island from './Island.jsx'
import { getQuality } from './quality.js'

// The whole 3D scene. Loaded lazily, so three.js is never on the text's critical path.
export default function IslandCanvas({ reduced, onReady, onLost }) {
  const quality = useMemo(getQuality, [])
  return (
    <Canvas
      flat
      shadows
      dpr={quality.dpr}
      // Idle motion (swell, clouds, smoke, the fire) only when motion is welcome; otherwise
      // the scene redraws just when the page scrolls.
      frameloop={reduced ? 'demand' : 'always'}
      camera={{ fov: 38, near: 0.5, far: 1400, position: [0, 17, 80] }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      resize={{ scroll: false }}
      style={{ pointerEvents: 'none' }}
      onCreated={({ gl }) => {
        gl.shadowMap.autoUpdate = false
        gl.domElement.addEventListener('webglcontextlost', onLost, { once: true })
      }}
    >
      <CameraRig reduced={reduced} onReady={onReady} />
      <Atmosphere shadowSize={quality.shadow} />
      <Island quality={quality} animate={!reduced} />
    </Canvas>
  )
}
