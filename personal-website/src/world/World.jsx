import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { VoxelModel } from './VoxelModel'
import {
  SIGNPOST_MODEL,
  HOUSE_MODEL,
  MAILBOX_MODEL,
  PINE_MODEL,
  CAMPUS_MODEL,
  MONUMENT_MODEL,
  TOWER_PC_MODEL,
  MACBOOK_MODEL,
  GOLF_FLAG_MODEL,
  PADLOCK_MODEL,
  PIANO_MODEL,
  CAMPFIRE_MODEL,
  LOG_MODEL,
  TENNIS_NET_MODEL,
  GRASS_MODEL,
  FLOWER_MODEL,
  officeModel,
  arcadeModel,
} from './models'
import { solid, translate, merge } from './voxel'
import { seeded } from '../pixel/generators'
import { STATIONS, WORLD_BOUNDS } from './stations'
import { useWorld } from './WorldContext'
import { Player } from './Player'
import { TennisBall, Crates, CampfireFlame } from './Toys'

const OFFICE_TONES = { bizdeglo: '#8F6A58', fuzionx: '#A24A21', berkley: '#5F4037' }
const ARCADE_ACCENTS = ['#C16E38', '#A24A21', '#763615', '#9A4D22']

// Flat stepping-stone tiles along the station path.
function PathTiles() {
  const tiles = useMemo(() => {
    const list = []
    for (let i = 0; i < STATIONS.length - 1; i++) {
      const [ax, , az] = STATIONS[i].pos
      const [bx, , bz] = STATIONS[i + 1].pos
      const dist = Math.hypot(bx - ax, bz - az)
      const steps = Math.floor(dist / 1.6)
      for (let s = 0; s <= steps; s++) {
        const t = s / steps
        list.push({ x: ax + (bx - ax) * t, z: az + (bz - az) * t, tone: s % 2 })
      }
    }
    return list
  }, [])

  return (
    <group>
      {tiles.map((tile, i) => (
        <mesh key={i} position={[tile.x, 0.04, tile.z]} receiveShadow>
          <boxGeometry args={[1.3, 0.08, 1.3]} />
          <meshStandardMaterial color={tile.tone ? '#FBF5EE' : '#F1DFD1'} roughness={1} />
        </mesh>
      ))}
    </group>
  )
}

// All ambient greenery merged into one instanced mesh.
function Scatter() {
  const voxels = useMemo(() => {
    const rand = seeded('world-scatter')
    const out = []
    for (let i = 0; i < 90; i++) {
      const x = Math.round((WORLD_BOUNDS.minX + rand() * (WORLD_BOUNDS.maxX - WORLD_BOUNDS.minX)) / 0.3)
      const z = Math.round((WORLD_BOUNDS.minZ + rand() * (WORLD_BOUNDS.maxZ - WORLD_BOUNDS.minZ)) / 0.3)
      const model = rand() < 0.35 ? FLOWER_MODEL : GRASS_MODEL
      out.push(...translate(model, x, 0, z))
    }
    return out
  }, [])
  return <VoxelModel voxels={voxels} size={0.3} castShadow={false} />
}

function ScatteredPines() {
  const voxels = useMemo(() => {
    const rand = seeded('world-pines')
    const out = []
    for (let i = 0; i < 14; i++) {
      const x = rand() < 0.5 ? -13 - rand() * 4 : 13 + rand() * 4
      const z = WORLD_BOUNDS.minZ + 6 + rand() * (WORLD_BOUNDS.maxZ - WORLD_BOUNDS.minZ - 10)
      out.push(...translate(PINE_MODEL, Math.round(x / 0.32), 0, Math.round(z / 0.32)))
    }
    return out
  }, [])
  return <VoxelModel voxels={voxels} size={0.32} />
}

// Clickable wrapper: any station prop opens its story panel. The floating
// label only shows when the player is nearby, so the horizon stays clean.
function Station({ id, children, labelHeight = 4.6 }) {
  const { setOpenPanel, playerRef } = useWorld()
  const labelRef = useRef(null)
  const station = STATIONS.find((s) => s.id === id)

  useFrame(() => {
    const el = labelRef.current
    if (!el) return
    const player = playerRef.current
    const dist = Math.hypot(player.x - station.pos[0], player.z - station.pos[2])
    el.style.opacity = dist < 15 ? '1' : '0'
  })

  return (
    <group
      position={station.pos}
      onClick={(e) => {
        e.stopPropagation()
        setOpenPanel(id)
      }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      <Html position={[0, labelHeight, 0]} center zIndexRange={[10, 0]} style={{ pointerEvents: 'none' }}>
        <p
          ref={labelRef}
          style={{ transition: 'opacity 0.5s' }}
          className="font-pixel text-[0.625rem] uppercase tracking-[0.08em] text-ink bg-parchment/95 border-2 border-ink px-2 py-1 whitespace-nowrap shadow-[2px_2px_0_0_#43261A]"
        >
          {station.label}
        </p>
      </Html>
      {children}
    </group>
  )
}

const BERKLEY_OFFICE = merge(
  officeModel(OFFICE_TONES.berkley, false),
  translate(PADLOCK_MODEL, 0, 14, 0)
)

const SETUP_DESK = merge(
  translate(solid({ w: 26, h: 1, d: 10, c: '#8F6A58' }), 0, 6, 0),
  translate(solid({ w: 2, h: 6, d: 8, c: '#5F4037' }), -11, 0, 0),
  translate(solid({ w: 2, h: 6, d: 8, c: '#5F4037' }), 11, 0, 0)
)

export function World() {
  return (
    <>
      <color attach="background" args={['#F6EBE0']} />
      <fog attach="fog" args={['#F6EBE0', 26, 85]} />
      <ambientLight intensity={0.85} color="#FFF6EA" />
      <hemisphereLight args={['#FFF6EA', '#C9A188', 0.4]} />

      {/* ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -58]} receiveShadow>
        <planeGeometry args={[80, 180]} />
        <meshStandardMaterial color="#F1DFD1" roughness={1} />
      </mesh>

      <PathTiles />
      <Scatter />
      <ScatteredPines />

      <Station id="welcome" labelHeight={4}>
        <VoxelModel voxels={SIGNPOST_MODEL} size={0.22} />
      </Station>

      <Station id="origin" labelHeight={6}>
        <VoxelModel voxels={HOUSE_MODEL} size={0.42} />
        <VoxelModel voxels={MAILBOX_MODEL} size={0.2} position={[3.2, 0, 2.6]} />
        <VoxelModel voxels={PINE_MODEL} size={0.3} position={[-4.2, 0, -1]} />
      </Station>

      <Station id="boston" labelHeight={7}>
        <VoxelModel voxels={CAMPUS_MODEL} size={0.5} />
        {/* skyline silhouettes behind */}
        <mesh position={[-5, 4, -6]} castShadow>
          <boxGeometry args={[3, 8, 3]} />
          <meshStandardMaterial color="#8F6A58" roughness={1} />
        </mesh>
        <mesh position={[6, 5.5, -7]} castShadow>
          <boxGeometry args={[3.5, 11, 3.5]} />
          <meshStandardMaterial color="#5F4037" roughness={1} />
        </mesh>
        <mesh position={[1, 3.5, -9]} castShadow>
          <boxGeometry args={[2.5, 7, 2.5]} />
          <meshStandardMaterial color="#C9A188" roughness={1} />
        </mesh>
      </Station>

      <Station id="experience" labelHeight={6}>
        <VoxelModel voxels={officeModel(OFFICE_TONES.bizdeglo)} size={0.26} position={[-3.6, 0, 0.6]} />
        <VoxelModel voxels={officeModel(OFFICE_TONES.fuzionx)} size={0.3} position={[0.4, 0, -1.2]} />
        <VoxelModel voxels={BERKLEY_OFFICE} size={0.26} position={[4.2, 0, 0.4]} />
      </Station>

      <Station id="projects" labelHeight={5}>
        {ARCADE_ACCENTS.map((accent, i) => (
          <VoxelModel
            key={accent}
            voxels={arcadeModel(accent)}
            size={0.22}
            position={[(i - 1.5) * 2.9, 0, 0]}
            rotation={[0, (i - 1.5) * -0.12, 0]}
          />
        ))}
      </Station>

      <Station id="hobbies" labelHeight={4.6}>
        <VoxelModel voxels={PIANO_MODEL} size={0.24} position={[-2.6, 0, -0.8]} rotation={[0, 0.5, 0]} />
        <VoxelModel voxels={TENNIS_NET_MODEL} size={0.2} position={[2.6, 0, 0.6]} />
        <VoxelModel voxels={GOLF_FLAG_MODEL} size={0.22} position={[0.4, 0, -2.6]} />
      </Station>

      <Station id="setup" labelHeight={5}>
        <VoxelModel voxels={SETUP_DESK} size={0.24} />
        <VoxelModel voxels={TOWER_PC_MODEL} size={0.16} position={[-1.6, 1.7, 0]} />
        <VoxelModel voxels={MACBOOK_MODEL} size={0.14} position={[1.4, 1.7, 0.2]} rotation={[0, -0.25, 0]} />
      </Station>

      <Station id="commits" labelHeight={4.4}>
        <VoxelModel voxels={MONUMENT_MODEL} size={0.3} />
      </Station>

      <Station id="contact" labelHeight={4}>
        <VoxelModel voxels={CAMPFIRE_MODEL} size={0.26} />
        <VoxelModel voxels={LOG_MODEL} size={0.24} position={[-1.9, 0, 1.6]} rotation={[0, 0.9, 0]} />
        <CampfireFlame />
      </Station>

      <TennisBall />
      <Crates />
      <Player />
    </>
  )
}

export default World
