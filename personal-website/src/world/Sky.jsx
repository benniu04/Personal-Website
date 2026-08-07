import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { VoxelModel } from './VoxelModel'
import { CLOUD_MODEL } from './models'
import { seeded } from '../pixel/generators'
import { WORLD_BOUNDS } from './stations'
import { useWorld } from './WorldContext'

// Day at the trailhead, sunset by the campfire: everything here lerps with
// how far down the path the player has walked.
const DAY = {
  top: new THREE.Color('#A9C5CB'),
  horizon: new THREE.Color('#F6EBE0'),
  ambient: new THREE.Color('#FFF6EA'),
  sun: new THREE.Color('#FFF3D6'),
}
const DUSK = {
  top: new THREE.Color('#2E1208'),
  horizon: new THREE.Color('#D96324'),
  ambient: new THREE.Color('#D89A6B'),
  sun: new THREE.Color('#F2B84B'),
}

function journeyProgress(z) {
  return THREE.MathUtils.clamp((z - WORLD_BOUNDS.maxZ) / (WORLD_BOUNDS.minZ - WORLD_BOUNDS.maxZ), 0, 1)
}

const top = new THREE.Color()
const horizon = new THREE.Color()
const viewDir = new THREE.Vector3()

export function Sky() {
  const { playerRef } = useWorld()
  const { scene, camera } = useThree()
  const domeRef = useRef(null)
  const sunRef = useRef(null)
  const starsRef = useRef(null)
  const ambientRef = useRef(null)
  const hemiRef = useRef(null)
  const cloudRefs = useRef([])
  const smooth = useRef(0)
  const lastDrawn = useRef(-1)

  // The dome's gradient lives on a 1×64 canvas strip; sphere UV.y runs from
  // the top pole (0) to the bottom (1), so the strip paints zenith → horizon.
  // Using a textured basic material (not a raw shader) keeps the sky in the
  // same tone-mapping pipeline as the fog, so the horizon blends seamlessly.
  const { texture, ctx } = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 64
    const context = canvas.getContext('2d')
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return { texture: tex, ctx: context }
  }, [])

  const clouds = useMemo(() => {
    const rand = seeded('sky-clouds')
    return Array.from({ length: 7 }, (_, i) => ({
      x: -50 + rand() * 100,
      y: 8 + rand() * 6,
      z: WORLD_BOUNDS.minZ - 10 + rand() * (WORLD_BOUNDS.maxZ - WORLD_BOUNDS.minZ + 30),
      speed: 0.5 + rand() * 0.7,
      scale: 0.7 + rand() * 0.55,
      key: i,
    }))
  }, [])

  const starPositions = useMemo(() => {
    const rand = seeded('sky-stars')
    const out = new Float32Array(180 * 3)
    for (let i = 0; i < 180; i++) {
      const theta = rand() * Math.PI * 2
      const phi = rand() * Math.PI * 0.42
      const r = 105
      out[i * 3] = Math.sin(phi) * Math.cos(theta) * r
      out[i * 3 + 1] = Math.cos(phi) * r * 0.6 + 8
      out[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r
    }
    return out
  }, [])

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.1)
    const player = playerRef.current
    const target = journeyProgress(player.z)
    smooth.current += (target - smooth.current) * Math.min(1, dt * 1.5)
    const p = smooth.current

    top.lerpColors(DAY.top, DUSK.top, p)
    horizon.lerpColors(DAY.horizon, DUSK.horizon, p)
    if (scene.fog) scene.fog.color.copy(horizon)

    // repaint the gradient strip only when the blend has moved visibly
    if (Math.abs(p - lastDrawn.current) > 0.004) {
      lastDrawn.current = p
      const gradient = ctx.createLinearGradient(0, 0, 0, 64)
      gradient.addColorStop(0, `#${top.getHexString()}`)
      gradient.addColorStop(0.52, `#${horizon.getHexString()}`)
      gradient.addColorStop(1, `#${horizon.getHexString()}`)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 1, 64)
      texture.needsUpdate = true
    }

    if (ambientRef.current) {
      ambientRef.current.color.lerpColors(DAY.ambient, DUSK.ambient, p)
      ambientRef.current.intensity = 0.85 - p * 0.42
    }
    if (hemiRef.current) hemiRef.current.intensity = 0.4 - p * 0.2

    // dome and stars ride with the camera so the shell is never escaped
    if (domeRef.current) domeRef.current.position.set(camera.position.x, 0, camera.position.z)
    if (starsRef.current) {
      starsRef.current.position.set(camera.position.x, 0, camera.position.z)
      starsRef.current.material.opacity = p * p
    }

    // sun hangs ahead-right of wherever you look, sinking as dusk comes
    if (sunRef.current) {
      camera.getWorldDirection(viewDir)
      viewDir.y = 0
      viewDir.normalize()
      const sun = sunRef.current
      sun.position.copy(camera.position).addScaledVector(viewDir, 85)
      sun.position.x += -viewDir.z * 26 // ahead-right
      sun.position.z += viewDir.x * 26
      sun.position.y = 26 - p * 17
      sun.material.color.lerpColors(DAY.sun, DUSK.sun, p)
      sun.lookAt(camera.position)
    }

    // clouds drift, wrapping around the field
    clouds.forEach((cloud, i) => {
      const group = cloudRefs.current[i]
      if (!group) return
      cloud.x += cloud.speed * dt
      if (cloud.x > 60) cloud.x = -60
      group.position.set(cloud.x, cloud.y, cloud.z)
    })
  })

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.85} color="#FFF6EA" />
      <hemisphereLight ref={hemiRef} args={['#FFF6EA', '#C9A188', 0.4]} />

      <mesh ref={domeRef} frustumCulled={false}>
        <sphereGeometry args={[118, 24, 16]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} depthWrite={false} fog={false} />
      </mesh>

      <mesh ref={sunRef}>
        <circleGeometry args={[6, 24]} />
        <meshBasicMaterial color="#FFF3D6" fog={false} />
      </mesh>

      <points ref={starsRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#FFF9F0" size={3} sizeAttenuation={false} transparent opacity={0} fog={false} />
      </points>

      {clouds.map((cloud, i) => (
        <group
          key={cloud.key}
          ref={(el) => (cloudRefs.current[i] = el)}
          position={[cloud.x, cloud.y, cloud.z]}
          scale={cloud.scale}
        >
          <VoxelModel voxels={CLOUD_MODEL} size={0.9} castShadow={false} />
        </group>
      ))}
    </>
  )
}

export default Sky
