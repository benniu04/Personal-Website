import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { VoxelModel } from './VoxelModel'
import { PLAYER_FRAMES } from './models'
import { STATIONS, WORLD_BOUNDS, PLAYER_SPAWN } from './stations'
import { useWorld } from './WorldContext'

const SPEED = 7
const VOXEL = 0.17 // avatar ≈ 2.7 units tall
const CAM_OFFSET = new THREE.Vector3(0, 9, 11)
const camTarget = new THREE.Vector3()
const lookTarget = new THREE.Vector3()

// The drivable traveler. Movement, collision, walk animation, camera follow
// and the moving shadow light all live in one useFrame — no React re-renders.
export function Player() {
  const { inputRef, playerRef, nearStation, setNearStation, openPanel } = useWorld()
  const groupRef = useRef(null)
  const idleRef = useRef(null)
  const walkARef = useRef(null)
  const walkBRef = useRef(null)
  const lightRef = useRef(null)
  const walkClock = useRef(0)
  const nearRef = useRef(null)
  const { camera } = useThree()

  nearRef.current = nearStation

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.1)
    const player = playerRef.current
    const input = openPanel ? { x: 0, z: 0 } : inputRef.current
    const moving = input.x !== 0 || input.z !== 0

    // integrate + clamp to world bounds
    player.x = THREE.MathUtils.clamp(player.x + input.x * SPEED * dt, WORLD_BOUNDS.minX, WORLD_BOUNDS.maxX)
    player.z = THREE.MathUtils.clamp(player.z + input.z * SPEED * dt, WORLD_BOUNDS.minZ, WORLD_BOUNDS.maxZ)

    // circle colliders: push out of station props
    for (const station of STATIONS) {
      const dx = player.x - station.pos[0]
      const dz = player.z - station.pos[2]
      const dist = Math.hypot(dx, dz)
      if (dist > 0.0001 && dist < station.collider) {
        player.x = station.pos[0] + (dx / dist) * station.collider
        player.z = station.pos[2] + (dz / dist) * station.collider
      }
    }

    // face where we're going (paper-doll yaw; model front is +z)
    if (moving) {
      const targetYaw = Math.atan2(input.x, input.z)
      let delta = targetYaw - player.yaw
      while (delta > Math.PI) delta -= Math.PI * 2
      while (delta < -Math.PI) delta += Math.PI * 2
      player.yaw += delta * Math.min(1, dt * 12)
    }
    player.moving = moving

    const group = groupRef.current
    if (group) {
      group.position.set(player.x, 0, player.z)
      group.rotation.y = player.yaw
    }

    // 3-frame walk cycle
    walkClock.current = moving ? walkClock.current + dt : 0
    const phase = moving ? Math.floor(walkClock.current / 0.14) % 4 : -1
    if (idleRef.current) idleRef.current.visible = phase === -1 || phase === 1 || phase === 3
    if (walkARef.current) walkARef.current.visible = phase === 0
    if (walkBRef.current) walkBRef.current.visible = phase === 2

    // nearest station within prompt range
    let nearest = null
    let nearestDist = Infinity
    for (const station of STATIONS) {
      const d = Math.hypot(player.x - station.pos[0], player.z - station.pos[2])
      if (d < station.radius && d < nearestDist) {
        nearest = station.id
        nearestDist = d
      }
    }
    if (nearest !== nearRef.current) {
      nearRef.current = nearest
      setNearStation(nearest)
    }

    // camera follow with soft lag
    camTarget.set(player.x, 0, player.z).add(CAM_OFFSET)
    camera.position.lerp(camTarget, 1 - Math.pow(0.0005, dt))
    lookTarget.set(player.x, 1.6, player.z)
    camera.lookAt(lookTarget)

    // shadow light rides along so its frustum stays tight
    const light = lightRef.current
    if (light) {
      light.position.set(player.x + 8, 16, player.z + 6)
      light.target.position.set(player.x, 0, player.z)
      light.target.updateMatrixWorld()
    }
  })

  return (
    <>
      <group ref={groupRef} position={PLAYER_SPAWN}>
        <group ref={idleRef}>
          <VoxelModel voxels={PLAYER_FRAMES.idle} size={VOXEL} />
        </group>
        <group ref={walkARef} visible={false}>
          <VoxelModel voxels={PLAYER_FRAMES.walkA} size={VOXEL} />
        </group>
        <group ref={walkBRef} visible={false}>
          <VoxelModel voxels={PLAYER_FRAMES.walkB} size={VOXEL} />
        </group>
      </group>
      <directionalLight
        ref={lightRef}
        castShadow
        intensity={1.1}
        color="#FFF3E4"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
        shadow-camera-near={1}
        shadow-camera-far={40}
        shadow-bias={-0.0004}
      />
    </>
  )
}

export default Player
