import * as THREE from 'three'
import { PATH, SITES } from '../layout.js'
import { COLORS as C } from '../palette.js'
import { heightAt } from '../terrain.js'
import { assemble, box, cone, cyl, ring, roof } from './kit.js'

const site = () => ({ x: SITES.lighthouse.x, y: heightAt(SITES.lighthouse.x, SITES.lighthouse.z), z: SITES.lighthouse.z, ry: 0.5 })
const BASE = 0.4
const LANTERN = [0, BASE + 5.8, 0]
// Tower radius at a height above its foot
const radiusAt = (y) => 1.12 - 0.4 * (y / 5.2)

// Stop 2, Experience: a footpath with three flags, one per role, climbing to a lighthouse.
export function buildLighthouse() {
  const parts = [
    cyl(1.4, 1.55, BASE, 8, C.stone).translate(0, BASE / 2, 0),
    cyl(0.72, 1.12, 5.2, 8, C.wall).translate(0, BASE + 2.6, 0),
    cyl(0.95, 1.03, 0.9, 8, C.coral).translate(0, BASE + 2.3, 0),
    // gallery: deck, railing posts and rail
    cyl(1.1, 0.95, 0.16, 8, C.dark).translate(0, BASE + 5.27, 0),
    ring(1.04, 0.025, 8, C.dark).translate(0, BASE + 5.78, 0),
    // lantern room: glass, mullions, roof and finial
    cyl(0.52, 0.52, 0.9, 8, C.glow).translate(0, LANTERN[1], 0),
    cyl(0.58, 0.58, 0.06, 8, C.dark).translate(0, BASE + 5.38, 0),
    cone(0.82, 0.75, 8, C.coral).translate(0, BASE + 6.62, 0),
    cyl(0.03, 0.03, 0.4, 4, C.dark).translate(0, BASE + 7.15, 0),
    // door
    box(0.56, 1.0, 0.06, C.woodDark).translate(0, BASE + 0.5, 1.1),
    box(0.46, 0.92, 0.1, C.wood).translate(0, BASE + 0.48, 1.1),
    // keeper's store beside the tower
    box(1.5, 1.0, 1.2, C.wall).translate(2.0, 0.5, -0.2),
    roof(1.85, 0.6, 1.5, C.coral).translate(2.0, 1.0, -0.2),
    box(0.4, 0.7, 0.06, C.wood).translate(2.0, 0.35, 0.41),
  ]
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + 0.39
    parts.push(cyl(0.025, 0.025, 0.42, 4, C.dark).translate(Math.cos(a) * 1.04, BASE + 5.57, Math.sin(a) * 1.04))
    parts.push(box(0.04, 0.9, 0.04, C.dark).translate(Math.cos(a) * 0.53, LANTERN[1], Math.sin(a) * 0.53))
  }
  // small windows winding up the tower
  ;[[1.5, 0], [2.95, 1.4], [4.3, 2.6]].forEach(([y, a]) => {
    const r = radiusAt(y) - 0.02
    parts.push(box(0.22, 0.36, 0.1, C.dark).rotateY(a).translate(Math.sin(a) * r, BASE + y, Math.cos(a) * r))
  })
  const tower = assemble(parts, site())

  const curve = new THREE.CatmullRomCurve3(PATH.map(([px, pz]) => new THREE.Vector3(px, 0, pz)))
  const trail = []
  const p = new THREE.Vector3()
  const t = new THREE.Vector3()
  const STONES = 26
  for (let i = 0; i < STONES; i++) {
    curve.getPointAt(i / (STONES - 1), p)
    const side = i % 2 ? 0.2 : -0.2
    const s = 0.34 + ((i * 7) % 5) * 0.035
    trail.push(
      cyl(s, s + 0.06, 0.1, 6, i % 3 ? C.stone : C.rock)
        .rotateY(i * 1.3)
        .translate(p.x + side, heightAt(p.x + side, p.z + side) + 0.04, p.z + side),
    )
  }
  for (const at of [0.3, 0.6, 0.86]) {
    curve.getPointAt(at, p)
    curve.getTangentAt(at, t)
    const fx = p.x - t.z * 1.1
    const fz = p.z + t.x * 1.1
    const fy = heightAt(fx, fz)
    trail.push(
      cyl(0.045, 0.05, 1.8, 5, C.bark).translate(fx, fy + 0.9, fz),
      box(0.62, 0.36, 0.04, C.coral).translate(fx + 0.33, fy + 1.58, fz),
      cyl(0.2, 0.26, 0.14, 6, C.stone).translate(fx, fy + 0.05, fz),
    )
  }
  return [tower, assemble(trail)]
}
