import * as THREE from 'three'
import { SITES, TRAILS } from './layout.js'
import { COLORS } from './palette.js'
import { rng } from './rng.js'

export const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

function hash(i, j) {
  let n = Math.imul(i, 374761393) + Math.imul(j, 668265263)
  n = Math.imul(n ^ (n >>> 13), 1274126177)
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296
}

// Smooth value noise in 0..1
export function noise(x, z) {
  const i = Math.floor(x)
  const j = Math.floor(z)
  const fx = x - i
  const fz = z - j
  const u = fx * fx * (3 - 2 * fx)
  const v = fz * fz * (3 - 2 * fz)
  const a = hash(i, j)
  const b = hash(i + 1, j)
  const c = hash(i, j + 1)
  const d = hash(i + 1, j + 1)
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
}

// Where trees gather: > 0 is woodland, < 0 open meadow.
export const grove = (x, z) => Math.sin(x * 0.33 + 1.1) * Math.cos(z * 0.29 - 0.4) + Math.sin((x + z) * 0.17)

// The island before any ground is levelled: a wobbly disc with one main hill,
// a rise for the lighthouse, and two scales of rolling ground. Sea level is y = 0.
function rawHeight(x, z) {
  const r = Math.hypot(x, z)
  const th = Math.atan2(z, x)
  const coast = 26 + 2.6 * Math.sin(3 * th + 0.5) + 1.6 * Math.sin(5 * th + 1.7) + 0.7 * Math.sin(9 * th + 0.3)
  const land = 1 - smooth(0.72, 1.12, r / coast)
  let h = -2.2 + 3.4 * land
  h += 9.5 * Math.exp(-((x + 6) ** 2 + (z + 8) ** 2) / (2 * 6.5 ** 2)) * land
  h += 2.6 * Math.exp(-((x + 16) ** 2 + (z - 3) ** 2) / (2 * 4 ** 2)) * land
  h += 1.4 * Math.exp(-((x - 2) ** 2 + (z - 3) ** 2) / (2 * 5 ** 2)) * land
  h += ((noise(x * 0.2 + 3, z * 0.2) - 0.5) * 1.3 + (noise(x * 0.62 + 9, z * 0.62) - 0.5) * 0.4) * land * land
  return h
}

const sites = Object.values(SITES).map((s) => ({ ...s, h: rawHeight(s.x, s.z) }))

export function heightAt(x, z) {
  let h = rawHeight(x, z)
  for (const s of sites) {
    const d = Math.hypot(x - s.x, z - s.z)
    if (d < s.r) h += (s.h - h) * (1 - smooth(s.r * 0.55, s.r, d))
  }
  return h
}

// Dense points along every trail, for cheap distance checks
const trailPts = []
for (const trail of TRAILS) {
  for (let i = 0; i < trail.length - 1; i++) {
    const [ax, az] = trail[i]
    const [bx, bz] = trail[i + 1]
    const steps = Math.ceil(Math.hypot(bx - ax, bz - az) / 0.5)
    for (let k = 0; k <= steps; k++) trailPts.push(ax + ((bx - ax) * k) / steps, az + ((bz - az) * k) / steps)
  }
}

export function trailDistance(x, z) {
  let best = Infinity
  for (let i = 0; i < trailPts.length; i += 2) {
    const d = (x - trailPts[i]) ** 2 + (z - trailPts[i + 1]) ** 2
    if (d < best) best = d
  }
  return Math.sqrt(best)
}

const SIZE = 80
const C = Object.fromEntries(Object.entries(COLORS).map(([k, v]) => [k, new THREE.Color(v)]))

export function buildTerrain(segments) {
  const rand = rng(7)
  const n = segments + 1
  const step = SIZE / segments
  // Jittered grid: breaks up the rows so the facets read as hand-cut
  const pts = new Float32Array(n * n * 3)
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const edge = i === 0 || j === 0 || i === segments || j === segments
      const x = -SIZE / 2 + i * step + (edge ? 0 : (rand() - 0.5) * step * 0.6)
      const z = -SIZE / 2 + j * step + (edge ? 0 : (rand() - 0.5) * step * 0.6)
      pts.set([x, heightAt(x, z), z], (j * n + i) * 3)
    }
  }

  const position = []
  const color = []
  const a = new THREE.Vector3()
  const b = new THREE.Vector3()
  const c = new THREE.Vector3()
  const edge = new THREE.Vector3()
  const normal = new THREE.Vector3()
  const base = new THREE.Color()

  const tri = (ia, ib, ic) => {
    a.fromArray(pts, ia * 3)
    b.fromArray(pts, ib * 3)
    c.fromArray(pts, ic * 3)
    if (Math.max(a.y, b.y, c.y) < -0.9) return // seabed far below the surface is never seen
    const mid = (a.y + b.y + c.y) / 3
    const cx = (a.x + b.x + c.x) / 3
    const cz = (a.z + b.z + c.z) / 3
    normal.subVectors(b, a).cross(edge.subVectors(c, a)).normalize()
    const broad = noise(cx * 0.16 + 40, cz * 0.16)
    const fine = noise(cx * 0.7, cz * 0.7 + 17)

    if (mid < 0.14) base.copy(C.wetSand)
    else if (mid < 0.6) base.copy(C.sand).lerp(C.sandLight, fine)
    else if (normal.y < 0.76 && mid > 1.6) {
      // exposed rock, banded by height like weathered strata
      base.copy(C.rock).lerp(C.rockDark, Math.floor(mid * 1.4) % 2 ? 0.7 : fine * 0.4)
    } else if (trailDistance(cx, cz) < 0.75 && mid < 10.2) base.copy(C.dirt).lerp(C.sand, fine * 0.4)
    else {
      // meadow to woodland floor, with drier patches and paler turf up high
      base.copy(C.grass).lerp(C.grassDeep, smooth(-0.3, 0.9, grove(cx, cz)) * 0.75 + broad * 0.25)
      base.lerp(C.grassDry, smooth(0.62, 0.9, fine) * 0.55)
      base.lerp(C.grassHigh, smooth(7.6, 9.8, mid))
      base.lerp(C.sand, (1 - smooth(0.6, 1.15, mid)) * 0.6)
    }
    base.offsetHSL(0, 0, (rand() - 0.5) * 0.03)
    position.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z)
    for (let k = 0; k < 3; k++) color.push(base.r, base.g, base.b)
  }

  for (let j = 0; j < segments; j++) {
    for (let i = 0; i < segments; i++) {
      const p = j * n + i
      // alternate the diagonal for a less mechanical pattern
      if ((i + j) % 2) {
        tri(p, p + n, p + 1)
        tri(p + 1, p + n, p + n + 1)
      } else {
        tri(p, p + n, p + n + 1)
        tri(p, p + n + 1, p + 1)
      }
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(position, 3))
  geo.setAttribute('color', new THREE.Float32BufferAttribute(color, 3))
  geo.computeVertexNormals()
  return geo
}

// Distance from the centre to the waterline in each direction
const COAST_STEPS = 96
const coastline = Array.from({ length: COAST_STEPS }, (_, k) => {
  const th = (k / COAST_STEPS) * Math.PI * 2
  let lo = 5
  let hi = 40
  for (let it = 0; it < 18; it++) {
    const m = (lo + hi) / 2
    if (heightAt(Math.cos(th) * m, Math.sin(th) * m) > 0) lo = m
    else hi = m
  }
  return [th, lo]
})

// A flat band following the coast from `inner` to `outer` metres beyond the
// waterline: used for the graded shallows and the line of foam.
export function buildCoastBand(inner, outer) {
  const position = []
  const index = []
  coastline.forEach(([th, r], k) => {
    const cos = Math.cos(th)
    const sin = Math.sin(th)
    position.push(cos * (r + inner), 0, sin * (r + inner), cos * (r + outer), 0, sin * (r + outer))
    const p = k * 2
    const q = ((k + 1) % COAST_STEPS) * 2
    index.push(p, q, p + 1, p + 1, q, q + 1)
  })
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(position, 3))
  geo.setIndex(index)
  return geo
}

// The sea: one sheet, finely faceted around the island and coarse far out.
export function buildWater(segments) {
  const geo = new THREE.PlaneGeometry(2, 2, segments, segments).rotateX(-Math.PI / 2)
  const pos = geo.attributes.position
  const warp = (v) => Math.sign(v) * Math.abs(v) ** 2.2 * 520
  for (let i = 0; i < pos.count; i++) pos.setXYZ(i, warp(pos.getX(i)), 0, warp(pos.getZ(i)))
  return geo
}

// Low swell that dies away towards the shore so the waterline stays put.
export function swell(geo, t) {
  const pos = geo.attributes.position
  const arr = pos.array
  for (let i = 0; i < pos.count; i++) {
    const x = arr[i * 3]
    const z = arr[i * 3 + 2]
    const r = Math.hypot(x, z)
    if (r > 260) continue
    const open = smooth(27, 44, r)
    arr[i * 3 + 1] =
      open * 0.12 * (Math.sin(x * 0.35 + t * 0.7) + Math.sin(z * 0.28 - t * 0.5 + x * 0.1) + 0.5 * Math.sin((x + z) * 0.9 + t * 1.1))
  }
  pos.needsUpdate = true
}
