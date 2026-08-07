import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { VoxelModel } from './VoxelModel'
import { PLAYER_PARTS } from './models'
import { STATIONS, WORLD_BOUNDS, PLAYER_SPAWN } from './stations'
import { useWorld } from './WorldContext'

const SPEED = 7
const V = 0.15 // voxel edge in world units; character ≈ 2.8u tall
const HIP_Y = 5 * V
const SHOULDER_Y = HIP_Y + 6 * V
const NECK_Y = HIP_Y + 7 * V

const CAM_DIST = 8.5
const CAM_HEIGHT = 4.2
const camPos = new THREE.Vector3()
const lookTarget = new THREE.Vector3()

const shortestAngle = (delta) => {
  while (delta > Math.PI) delta -= Math.PI * 2
  while (delta < -Math.PI) delta += Math.PI * 2
  return delta
}

// The drivable traveler: an articulated voxel body (limbs swing while
// walking) with an open-world follow camera that swings around to stay
// behind wherever the character is heading. Controls are camera-relative.
export function Player() {
  const { inputRef, playerRef, nearStation, setNearStation, openPanel, camDragRef } = useWorld()
  const groupRef = useRef(null)
  const armLRef = useRef(null)
  const armRRef = useRef(null)
  const legLRef = useRef(null)
  const legRRef = useRef(null)
  const lightRef = useRef(null)
  const walkClock = useRef(0)
  const swingAmp = useRef(0)
  const camYaw = useRef(Math.PI)
  const nearRef = useRef(null)
  const { camera } = useThree()

  nearRef.current = nearStation

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.1)
    const player = playerRef.current
    const drag = camDragRef.current
    const input = openPanel ? { x: 0, z: 0 } : inputRef.current
    const moving = input.x !== 0 || input.z !== 0

    // camera-relative input: W walks away from the camera, A/D carve turns
    const effYaw = camYaw.current + drag.yawOff
    const cosY = Math.cos(effYaw)
    const sinY = Math.sin(effYaw)
    const moveX = -input.x * cosY - input.z * sinY
    const moveZ = input.x * sinY - input.z * cosY

    player.x = THREE.MathUtils.clamp(player.x + moveX * SPEED * dt, WORLD_BOUNDS.minX, WORLD_BOUNDS.maxX)
    player.z = THREE.MathUtils.clamp(player.z + moveZ * SPEED * dt, WORLD_BOUNDS.minZ, WORLD_BOUNDS.maxZ)

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

    // face where we're going (model front is +z)
    if (moving) {
      const targetYaw = Math.atan2(moveX, moveZ)
      player.yaw += shortestAngle(targetYaw - player.yaw) * Math.min(1, dt * 12)
    }
    player.moving = moving

    // limb swing: amplitude eases in/out, phase runs while walking
    walkClock.current += (moving ? dt : 0)
    const targetAmp = moving ? 0.8 : 0
    swingAmp.current += (targetAmp - swingAmp.current) * Math.min(1, dt * 8)
    const amp = swingAmp.current
    const swing = Math.sin(walkClock.current * 9.5) * amp
    if (legLRef.current) legLRef.current.rotation.x = swing
    if (legRRef.current) legRRef.current.rotation.x = -swing
    if (armLRef.current) armLRef.current.rotation.x = -swing * 0.8
    if (armRRef.current) armRRef.current.rotation.x = swing * 0.8

    const group = groupRef.current
    if (group) {
      group.position.set(player.x, Math.abs(Math.cos(walkClock.current * 9.5)) * 0.06 * amp, player.z)
      group.rotation.y = player.yaw
    }

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

    // follow camera: swing around behind the heading while moving; drag-look
    // offsets ease back to zero once you walk
    if (moving) {
      camYaw.current += shortestAngle(player.yaw - camYaw.current) * Math.min(1, dt * 2.5)
      drag.yawOff += (0 - drag.yawOff) * Math.min(1, dt * 3)
      drag.pitchOff += (0 - drag.pitchOff) * Math.min(1, dt * 3)
    }
    const viewYaw = camYaw.current + drag.yawOff
    const height = THREE.MathUtils.clamp(CAM_HEIGHT + drag.pitchOff, 1.6, 9)
    camPos.set(
      player.x - Math.sin(viewYaw) * CAM_DIST,
      height,
      player.z - Math.cos(viewYaw) * CAM_DIST
    )
    camera.position.lerp(camPos, 1 - Math.pow(0.0005, dt))
    lookTarget.set(player.x, 2.1, player.z)
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
        <group position={[0, HIP_Y, 0]}>
          <VoxelModel voxels={PLAYER_PARTS.torso} size={V} />
        </group>
        <group position={[0, NECK_Y, 0]}>
          <VoxelModel voxels={PLAYER_PARTS.head} size={V} />
        </group>
        <group ref={armLRef} position={[-5 * V, SHOULDER_Y, 0]}>
          <VoxelModel voxels={PLAYER_PARTS.arm} size={V} />
        </group>
        <group ref={armRRef} position={[5 * V, SHOULDER_Y, 0]}>
          <VoxelModel voxels={PLAYER_PARTS.arm} size={V} />
        </group>
        <group ref={legLRef} position={[-2 * V, HIP_Y, 0]}>
          <VoxelModel voxels={PLAYER_PARTS.leg} size={V} />
        </group>
        <group ref={legRRef} position={[2 * V, HIP_Y, 0]}>
          <VoxelModel voxels={PLAYER_PARTS.leg} size={V} />
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
