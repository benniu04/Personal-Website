import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { VoxelModel } from './VoxelModel'
import { CRATE_MODEL } from './models'
import { STATIONS } from './stations'
import { seeded } from '../pixel/generators'
import { useWorld } from './WorldContext'

const GRAVITY = -22

// ------------------------------------------------------------- tennis ball --
// Lives near the rest stop. Walk into it and it takes off; it bounces,
// rolls, and slowly comes to rest. Pure hand-rolled physics.
const HOBBY_POS = STATIONS.find((s) => s.id === 'hobbies').pos

export function TennisBall() {
  const { playerRef } = useWorld()
  const meshRef = useRef(null)
  const ball = useRef({
    p: new THREE.Vector3(HOBBY_POS[0] + 3.4, 0.35, HOBBY_POS[2] + 2.6),
    v: new THREE.Vector3(),
  })
  const RADIUS = 0.35

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05)
    const { p, v } = ball.current
    const player = playerRef.current

    // kick when the player runs into it
    const dx = p.x - player.x
    const dz = p.z - player.z
    const dist = Math.hypot(dx, dz)
    if (dist < 1.05 && p.y < 1) {
      const push = Math.max(0.2, dist)
      v.x = (dx / push) * 7
      v.z = (dz / push) * 7
      v.y = 5.5
    }

    v.y += GRAVITY * dt
    p.addScaledVector(v, dt)

    // ground bounce + rolling friction
    if (p.y < RADIUS) {
      p.y = RADIUS
      if (v.y < 0) v.y = -v.y * 0.6
      if (Math.abs(v.y) < 0.6) v.y = 0
      v.x *= 1 - Math.min(1, 2.2 * dt)
      v.z *= 1 - Math.min(1, 2.2 * dt)
    }

    // drift home if it wanders far from the court
    const homeDx = HOBBY_POS[0] + 3.4 - p.x
    const homeDz = HOBBY_POS[2] + 2.6 - p.z
    if (Math.hypot(homeDx, homeDz) > 14 && p.y <= RADIUS) {
      v.x += homeDx * 0.15 * dt * 10
      v.z += homeDz * 0.15 * dt * 10
    }

    const mesh = meshRef.current
    if (mesh) {
      mesh.position.copy(p)
      mesh.rotation.x += v.z * dt * 2
      mesh.rotation.z -= v.x * dt * 2
    }
  })

  return (
    <mesh ref={meshRef} castShadow>
      <icosahedronGeometry args={[0.35, 1]} />
      <meshStandardMaterial color="#F2B84B" roughness={0.8} flatShading />
    </mesh>
  )
}

// ------------------------------------------------------------------ crates --
// A stack of crates by the arcade. Run through them and they scatter with a
// tumble, then settle where they land.
const ARCADE_POS = STATIONS.find((s) => s.id === 'projects').pos

export function Crates() {
  const { playerRef } = useWorld()
  const groupRefs = useRef([])
  const crates = useMemo(() => {
    const rand = seeded('crates')
    const base = [ARCADE_POS[0] - 4.4, 0, ARCADE_POS[2] + 3.4]
    return [
      { x: base[0], y: 0, z: base[2] },
      { x: base[0] + 0.75, y: 0, z: base[2] + 0.2 },
      { x: base[0] + 0.35, y: 0.72, z: base[2] + 0.1 },
      { x: base[0] - 0.5, y: 0, z: base[2] + 0.8 },
    ].map((p) => ({
      p: new THREE.Vector3(p.x, p.y, p.z),
      v: new THREE.Vector3(),
      spin: new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).multiplyScalar(8),
      rot: new THREE.Euler(),
      airborne: false,
    }))
  }, [])
  const HALF = 0.36

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05)
    const player = playerRef.current
    crates.forEach((crate, i) => {
      const { p, v } = crate
      const dx = p.x - player.x
      const dz = p.z - player.z
      const dist = Math.hypot(dx, dz)
      if (dist < 1 && p.y < 1.4) {
        const push = Math.max(0.2, dist)
        v.x = (dx / push) * 5.5
        v.z = (dz / push) * 5.5
        v.y = 4.5
        crate.airborne = true
      }

      if (crate.airborne || p.y > HALF) {
        v.y += GRAVITY * dt
        p.addScaledVector(v, dt)
        crate.rot.x += crate.spin.x * dt
        crate.rot.y += crate.spin.y * dt
        crate.rot.z += crate.spin.z * dt
        if (p.y <= HALF) {
          p.y = HALF
          if (Math.abs(v.y) > 2) {
            v.y = -v.y * 0.35
          } else {
            v.set(0, 0, 0)
            crate.airborne = false
            crate.rot.set(0, crate.rot.y, 0) // land flat, keep the yaw
          }
        }
      }

      const group = groupRefs.current[i]
      if (group) {
        group.position.copy(p)
        group.rotation.copy(crate.rot)
      }
    })
  })

  return crates.map((crate, i) => (
    <group key={i} ref={(el) => (groupRefs.current[i] = el)} position={crate.p.toArray()}>
      <VoxelModel voxels={CRATE_MODEL} size={0.18} position={[0, -HALF, 0]} />
    </group>
  ))
}

// ---------------------------------------------------------------- campfire --
// Flickering light + rising sparks + a pulsing emissive flame.
export function CampfireFlame() {
  const lightRef = useRef(null)
  const flameRef = useRef(null)
  const sparksRef = useRef(null)
  const SPARKS = 26

  const sparkData = useMemo(() => {
    const rand = seeded('sparks')
    return Array.from({ length: SPARKS }, () => ({
      x: (rand() - 0.5) * 0.7,
      z: (rand() - 0.5) * 0.7,
      y: rand() * 1.6,
      speed: 0.7 + rand() * 0.9,
    }))
  }, [])

  const positions = useMemo(() => new Float32Array(SPARKS * 3), [])

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime
    const flicker = 1.6 + Math.sin(t * 9) * 0.25 + Math.sin(t * 23) * 0.15
    if (lightRef.current) lightRef.current.intensity = flicker * 6
    if (flameRef.current) {
      const s = 0.9 + Math.sin(t * 11) * 0.12
      flameRef.current.scale.set(s, 1 + Math.sin(t * 7) * 0.18, s)
    }
    sparkData.forEach((spark, i) => {
      spark.y += spark.speed * dt
      if (spark.y > 1.8) spark.y = 0.2
      positions[i * 3] = spark.x + Math.sin(t * 2 + i) * 0.08
      positions[i * 3 + 1] = spark.y
      positions[i * 3 + 2] = spark.z
    })
    if (sparksRef.current) {
      sparksRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group position={[0, 0.4, 0]}>
      <pointLight ref={lightRef} color="#E8853A" distance={14} decay={2} position={[0, 0.8, 0]} />
      <mesh ref={flameRef} position={[0, 0.7, 0]}>
        <coneGeometry args={[0.55, 1.6, 6]} />
        <meshBasicMaterial color="#F2B84B" transparent opacity={0.92} />
      </mesh>
      <points ref={sparksRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#F2B84B" size={0.1} sizeAttenuation transparent opacity={0.9} />
      </points>
    </group>
  )
}
