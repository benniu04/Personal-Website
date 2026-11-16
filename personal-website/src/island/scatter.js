import * as THREE from 'three'
import { cone, cyl, ico, mergeGeometries } from './landmarks/kit.js'
import { GLADES, SITES } from './layout.js'
import { COLORS as C } from './palette.js'
import { rng } from './rng.js'
import { grove, heightAt, trailDistance } from './terrain.js'

// Everything that grows or lies about, each a single small geometry drawn many
// times over with its own size, turn and tint.
export function plantGeometries() {
  return {
    pine: mergeGeometries([
      cyl(0.07, 0.12, 0.6, 5, C.bark).translate(0, 0.3, 0),
      cone(0.7, 0.95, 7, C.leafDark).translate(0, 0.95, 0),
      cone(0.55, 0.85, 7, C.leaf).translate(0, 1.5, 0),
      cone(0.38, 0.8, 7, C.leafLight).translate(0, 2.05, 0),
    ]),
    round: mergeGeometries([
      cyl(0.08, 0.13, 0.8, 5, C.bark).translate(0, 0.4, 0),
      cyl(0.04, 0.05, 0.5, 4, C.bark).rotateZ(0.7).translate(-0.2, 0.85, 0),
      ico(0.6, C.leaf).translate(0, 1.3, 0),
      ico(0.42, C.leafLight).translate(0.36, 1.55, 0.2),
      ico(0.4, C.leafDark).translate(-0.38, 1.1, -0.15),
    ]),
    birch: mergeGeometries([
      cyl(0.05, 0.08, 1.5, 5, C.birch).translate(0, 0.75, 0),
      cyl(0.052, 0.062, 0.06, 5, C.dark).translate(0, 0.5, 0),
      cyl(0.05, 0.058, 0.05, 5, C.dark).translate(0, 0.95, 0),
      ico(0.46, C.leafBirch).scale(1, 1.3, 1).translate(0, 1.85, 0),
      ico(0.32, C.leafLight).translate(0.22, 1.45, 0.14),
    ]),
    bush: mergeGeometries([
      ico(0.36, C.leaf).scale(1.2, 0.8, 1).translate(0, 0.2, 0),
      ico(0.26, C.leafLight).translate(0.28, 0.2, 0.12),
      ico(0.22, C.leafDark).translate(-0.26, 0.14, -0.1),
    ]),
    tuft: mergeGeometries([
      cone(0.05, 0.34, 3, C.grassDeep).translate(0, 0.17, 0),
      cone(0.045, 0.28, 3, C.grass).rotateZ(0.35).translate(0.07, 0.13, 0.02),
      cone(0.045, 0.26, 3, C.grassDeep).rotateZ(-0.4).translate(-0.07, 0.12, -0.03),
      cone(0.04, 0.24, 3, C.grass).rotateX(0.4).translate(0, 0.11, 0.07),
    ]),
    flower: mergeGeometries([
      cyl(0.012, 0.012, 0.22, 3, C.leaf).translate(0, 0.11, 0),
      ico(0.055, C.white).translate(0, 0.24, 0),
    ]),
    rock: ico(0.5, C.rock),
  }
}

const sites = Object.values(SITES)
const tint = new THREE.Color()
const PETALS = ['#FFFFFF', '#FFE08A', '#F3A08A', '#E9D7F2']

function clear(x, z, margin, trail) {
  for (const s of sites) if (Math.hypot(x - s.x, z - s.z) < s.r + margin) return false
  return trailDistance(x, z) > trail
}

// Deterministic placement. Trees gather into groves and keep off the beach, the
// summit, the trails and every landmark's patch of ground; grass and flowers
// fill the meadows between.
export function scatter(q) {
  const rand = rng(21)
  const dummy = new THREE.Object3D()
  const kinds = ['pine', 'round', 'birch', 'bush', 'tuft', 'flower', 'rock']
  const out = Object.fromEntries(kinds.map((k) => [k, { matrices: [], colors: [] }]))

  const add = (kind, x, y, z, sx, sy, r, g, b, tilt = 0) => {
    dummy.position.set(x, y, z)
    dummy.rotation.set((rand() - 0.5) * tilt, rand() * Math.PI * 2, (rand() - 0.5) * tilt)
    dummy.scale.set(sx, sy, sx)
    dummy.updateMatrix()
    out[kind].matrices.push(dummy.matrix.clone())
    out[kind].colors.push(r, g, b)
  }
  const spot = (radius) => {
    const r = Math.sqrt(rand()) * radius
    const a = rand() * Math.PI * 2
    const x = Math.cos(a) * r
    const z = Math.sin(a) * r
    return [x, z, heightAt(x, z)]
  }
  const shade = (lo) => lo + rand() * (1 - lo)

  let placed = 0
  for (let tries = 0; placed < q.trees && tries < 9000; tries++) {
    const [x, z, h] = spot(23.5)
    if (h < 0.85 || h > 9.1 || !clear(x, z, 0.7, 1.5)) continue
    if (grove(x, z) < rand() * 1.6 - 0.9) continue
    if (GLADES.some((g) => Math.hypot(x - g.x, z - g.z) < g.r)) continue
    // birches like the low ground, pines take the slopes
    const pick = rand()
    const kind = h < 3 && pick < 0.22 ? 'birch' : pick < 0.74 ? 'pine' : 'round'
    const s = (kind === 'pine' ? 0.75 : 0.85) + rand() * 0.75
    const v = shade(0.8)
    add(kind, x, h - 0.06, z, s, s * (0.9 + rand() * 0.35), v, v * (0.96 + rand() * 0.04), v * (0.9 + rand() * 0.1), 0.08)
    placed++
  }

  placed = 0
  for (let tries = 0; placed < q.bushes && tries < 4000; tries++) {
    const [x, z, h] = spot(24)
    if (h < 0.7 || h > 9.6 || !clear(x, z, 0.3, 1.0)) continue
    const s = 0.7 + rand() * 0.9
    const v = shade(0.82)
    add('bush', x, h - 0.03, z, s, s, v, v, v * 0.95)
    placed++
  }

  placed = 0
  for (let tries = 0; placed < q.tufts && tries < 9000; tries++) {
    const [x, z, h] = spot(24.5)
    if (h < 0.65 || h > 10.3 || !clear(x, z, -0.4, 0.7)) continue
    const s = 0.8 + rand() * 1.1
    const v = shade(0.85)
    add('tuft', x, h - 0.02, z, s, s * (0.8 + rand() * 0.6), v, v, v * 0.9, 0.2)
    placed++
  }

  placed = 0
  for (let tries = 0; placed < q.flowers && tries < 6000; tries++) {
    const [x, z, h] = spot(24)
    // flowers keep to open meadow, in drifts
    if (h < 0.8 || h > 8 || grove(x, z) > 0.2 || !clear(x, z, -0.2, 0.7)) continue
    if (Math.sin(x * 0.9) * Math.cos(z * 0.8) < 0.1) continue
    tint.set(PETALS[Math.floor(rand() * PETALS.length)])
    add('flower', x, h - 0.01, z, 0.9 + rand() * 0.7, 0.8 + rand() * 0.8, tint.r, tint.g, tint.b, 0.3)
    placed++
  }

  placed = 0
  for (let tries = 0; placed < q.rocks && tries < 5000; tries++) {
    const [x, z, h] = spot(25.5)
    // mostly along the shore and on the steep upper slopes
    const shore = h > -0.25 && h < 0.7
    const high = h > 5.5 && h < 10
    if (!(shore || high || rand() < 0.12) || h < -0.25 || !clear(x, z, 0.2, 1.0)) continue
    const s = (shore ? 0.3 : 0.4) + rand() * (high ? 1.1 : 0.7)
    const v = shade(0.84)
    dummy.rotation.set(rand() * 3, rand() * 3, rand() * 3)
    add('rock', x, h + s * 0.1, z, s, s * (0.55 + rand() * 0.4), v, v, v, 6)
    placed++
  }
  return out
}

// A few flat-bottomed clouds on a wide ring around the island.
export function buildClouds(count) {
  const rand = rng(5)
  const parts = []
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + rand() * 0.5
    const r = 72 + rand() * 46
    const y = 22 + rand() * 12
    const s = 2.2 + rand() * 2
    const puffs = 3 + Math.floor(rand() * 3)
    for (let k = 0; k < puffs; k++) {
      const off = (k - (puffs - 1) / 2) * s * 1.2
      const size = s * (0.7 + rand() * 0.55) * (1 - Math.abs(k - (puffs - 1) / 2) * 0.12)
      parts.push(
        ico(size, C.cloud, 1)
          .scale(1.5, 0.62, 1.05)
          .rotateY(-a)
          .translate(Math.cos(a) * r + off * Math.sin(a), y + size * 0.3, Math.sin(a) * r - off * Math.cos(a)),
      )
    }
  }
  return mergeGeometries(parts)
}
