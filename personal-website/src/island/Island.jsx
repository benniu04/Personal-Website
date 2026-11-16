import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { rig } from '../journey/journeyStore.js'
import { buildCabin, chimneyTop } from './landmarks/cabin.js'
import { buildClearing } from './landmarks/clearing.js'
import { buildBirds, buildSailboat, buildSeaStacks } from './landmarks/extras.js'
import { mergeGeometries } from './landmarks/kit.js'
import { buildLighthouse } from './landmarks/lighthouse.js'
import { buildFlame, buildSummit, flamePosition } from './landmarks/summit.js'
import { buildWorkshop } from './landmarks/workshop.js'
import { SITES } from './layout.js'
import { live } from './live.js'
import { COLORS } from './palette.js'
import { buildClouds, plantGeometries, scatter } from './scatter.js'
import { buildCoastBand, buildTerrain, buildWater, swell } from './terrain.js'

const SHADOWED = new Set(['pine', 'round', 'birch', 'bush', 'rock'])
const PUFFS = [0, 1, 2, 3]

function Instances({ geometry, material, items, shadow }) {
  const ref = useRef()
  useLayoutEffect(() => {
    const mesh = ref.current
    const color = new THREE.Color()
    items.matrices.forEach((m, i) => {
      mesh.setMatrixAt(i, m)
      mesh.setColorAt(i, color.fromArray(items.colors, i * 3))
    })
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    mesh.computeBoundingSphere()
  }, [items])
  if (!items.matrices.length) return null
  return <instancedMesh ref={ref} args={[geometry, material, items.matrices.length]} castShadow={shadow} receiveShadow={shadow} />
}

export default function Island({ quality, animate }) {
  const clouds = useRef()
  const flame = useRef()
  const fire = useRef()
  const foam = useRef()
  const birds = useRef()
  const boat = useRef()
  const smoke = useRef([])

  const scene = useMemo(() => {
    // One flat-shaded material paints everything; colour lives in the vertices
    const paint = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true })
    const translucent = (color, opacity) =>
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide, depthWrite: false })
    const water = buildWater(quality.water)
    swell(water, 0)
    return {
      paint,
      // Mostly self-lit so the sea keeps its pale tint at any sun angle, with
      // just enough shading left to pick out the facets and take shadows
      sea: new THREE.MeshLambertMaterial({ flatShading: true }),
      cloud: new THREE.MeshLambertMaterial({ color: COLORS.cloud, emissive: '#A6A6A6', flatShading: true }),
      shallows: translucent(COLORS.shallows, 0.5),
      shelf: translucent(COLORS.shallows, 0.22),
      foam: translucent('#FFFFFF', 0.75),
      smoke: PUFFS.map(() => translucent('#F1EEE8', 0)),
      terrain: buildTerrain(quality.terrain),
      shallowsGeo: buildCoastBand(-2, 2.4),
      shelfGeo: buildCoastBand(2.4, 6.5),
      foamGeo: buildCoastBand(-0.05, 0.32),
      landmarks: mergeGeometries([
        ...buildCabin(),
        ...buildLighthouse(),
        ...buildWorkshop(),
        ...buildClearing(),
        ...buildSummit(),
        ...buildSeaStacks(),
      ]),
      flame: buildFlame(),
      flameAt: flamePosition(),
      chimney: chimneyTop(),
      birds: buildBirds(),
      sailboat: buildSailboat(),
      plants: plantGeometries(),
      placed: scatter(quality),
      clouds: buildClouds(quality.clouds),
      water,
      puff: new THREE.IcosahedronGeometry(1, 1),
    }
  }, [quality])

  useFrame(({ clock }) => {
    const t = animate ? clock.elapsedTime : 0
    scene.sea.color.copy(live.sea).multiplyScalar(0.3)
    scene.sea.emissive.copy(live.sea).multiplyScalar(0.74)

    // Evening: the fire comes up
    const dusk = THREE.MathUtils.smoothstep(rig.u, 3.4, 5)
    fire.current.intensity = 1.5 + dusk * 4.5

    // Chimney smoke: four puffs rising, swelling and thinning in turn
    smoke.current.forEach((puff, i) => {
      const phase = (t * 0.16 + i / PUFFS.length) % 1
      puff.position.set(phase * phase * 1.1, phase * 2.2, phase * 0.4)
      puff.scale.setScalar(0.1 + phase * 0.26)
      scene.smoke[i].opacity = Math.sin(phase * Math.PI) * 0.32
    })

    if (!animate) return
    const flicker = 1 + Math.sin(t * 9) * 0.07 + Math.sin(t * 15.3) * 0.05
    flame.current.scale.set(1 / flicker, flicker, 1 / flicker)
    fire.current.intensity *= 0.92 + 0.08 * flicker
    clouds.current.rotation.y = t * 0.006
    birds.current.rotation.y = -t * 0.16
    birds.current.position.y = 17 + Math.sin(t * 0.4) * 0.6
    boat.current.position.y = Math.sin(t * 0.9) * 0.05
    boat.current.rotation.z = Math.sin(t * 0.7) * 0.04
    scene.foam.opacity = 0.6 + Math.sin(t * 0.8) * 0.2
    foam.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.004)
    swell(scene.water, t)
  })

  const [fx, fy, fz] = scene.flameAt
  return (
    <>
      <mesh geometry={scene.terrain} material={scene.paint} castShadow receiveShadow />
      <mesh geometry={scene.landmarks} material={scene.paint} castShadow receiveShadow />
      {Object.entries(scene.placed).map(([kind, items]) => (
        <Instances key={kind} geometry={scene.plants[kind]} material={scene.paint} items={items} shadow={SHADOWED.has(kind)} />
      ))}
      <mesh ref={clouds} geometry={scene.clouds} material={scene.cloud} />
      <mesh geometry={scene.water} material={scene.sea} frustumCulled={false} receiveShadow />
      <mesh geometry={scene.shelfGeo} material={scene.shelf} position={[0, 0.02, 0]} />
      <mesh geometry={scene.shallowsGeo} material={scene.shallows} position={[0, 0.03, 0]} />
      <mesh ref={foam} geometry={scene.foamGeo} material={scene.foam} position={[0, 0.045, 0]} />

      <mesh ref={boat} geometry={scene.sailboat} material={scene.paint} position={[5, 0, 37]} rotation={[0, 0.9, 0]} castShadow />
      <mesh ref={birds} geometry={scene.birds} material={scene.paint} position={[SITES.summit.x, 17, SITES.summit.z]} />
      <group position={scene.chimney}>
        {PUFFS.map((i) => (
          <mesh key={i} ref={(el) => void (smoke.current[i] = el)} geometry={scene.puff} material={scene.smoke[i]} />
        ))}
      </group>

      <mesh ref={flame} geometry={scene.flame} position={[fx, fy, fz]}>
        <meshBasicMaterial vertexColors />
      </mesh>
      <pointLight ref={fire} color="#FFB36B" position={[fx, fy + 0.9, fz]} distance={11} decay={1.6} />
    </>
  )
}
