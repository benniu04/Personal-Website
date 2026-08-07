import { useMemo } from 'react'
import * as THREE from 'three'
import { seeded } from '../pixel/generators'
import { WORLD_BOUNDS } from './stations'

const GROUND_W = 80
const GROUND_L = 180
const GROUND_CENTER_Z = -58

// One 64² pixel tile of speckled meadow, repeated across the plane with
// nearest filtering so every texel reads as a chunky ground pixel.
function makeGroundTexture() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const rand = seeded('ground-tile')

  ctx.fillStyle = '#F1DFD1'
  ctx.fillRect(0, 0, size, size)
  const flecks = [
    ['#EAD5C3', 0.1],
    ['#F6EBE0', 0.05],
    ['#E3D0BF', 0.05],
    ['#C9A188', 0.012],
    ['#96A468', 0.02],
    ['#6F7F4E', 0.006],
  ]
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      for (const [color, chance] of flecks) {
        if (rand() < chance) {
          ctx.fillStyle = color
          ctx.fillRect(x, y, 1, 1)
          break
        }
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.magFilter = THREE.NearestFilter
  texture.minFilter = THREE.NearestFilter
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(GROUND_W / 6, GROUND_L / 6)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

// Stepped rust ridge: 4 stacked slabs through the PixelField ramp, jittered
// per segment so the skyline undulates like the 2D hills.
const RAMP = ['#E09A60', '#C16E38', '#9A4D22', '#763615']

function Ridge({ x, z, length, along = 'z', seed }) {
  const segments = useMemo(() => {
    const rand = seeded(seed)
    const out = []
    const count = Math.ceil(length / 9)
    for (let i = 0; i < count; i++) {
      const offset = (i - count / 2) * 9
      out.push({
        offset,
        height: 4 + rand() * 5,
        width: 8 + rand() * 5,
        jitter: (rand() - 0.5) * 4,
      })
    }
    return out
  }, [length, seed])

  return (
    <group position={[x, 0, z]}>
      {segments.map((seg, i) => (
        <group
          key={i}
          position={along === 'z' ? [seg.jitter, 0, seg.offset] : [seg.offset, 0, seg.jitter]}
        >
          {RAMP.map((color, step) => {
            const shrink = 1 - step * 0.24
            return (
              <mesh
                key={color}
                position={[0, (seg.height * (step + 0.5) * 0.25), 0]}
              >
                <boxGeometry
                  args={[
                    seg.width * (along === 'z' ? shrink : 1.15 - step * 0.1),
                    seg.height * 0.25,
                    seg.width * (along === 'z' ? 1.15 - step * 0.1 : shrink),
                  ]}
                />
                <meshStandardMaterial color={color} roughness={1} />
              </mesh>
            )
          })}
        </group>
      ))}
    </group>
  )
}

// Textured meadow + the brand's rust ridgelines on every horizon.
export function Ground() {
  const texture = useMemo(makeGroundTexture, [])

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, GROUND_CENTER_Z]} receiveShadow>
        <planeGeometry args={[GROUND_W, GROUND_L]} />
        <meshStandardMaterial map={texture} roughness={1} />
      </mesh>

      <Ridge x={WORLD_BOUNDS.minX - 12} z={GROUND_CENTER_Z} length={GROUND_L} seed="ridge-west" />
      <Ridge x={WORLD_BOUNDS.maxX + 12} z={GROUND_CENTER_Z} length={GROUND_L} seed="ridge-east" />
      <Ridge x={0} z={WORLD_BOUNDS.minZ - 16} length={GROUND_W} along="x" seed="ridge-south" />
      <Ridge x={0} z={WORLD_BOUNDS.maxZ + 14} length={GROUND_W} along="x" seed="ridge-north" />
    </>
  )
}

export default Ground
