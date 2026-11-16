import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'

// Tiny modelling kit. Every part is a primitive with one flat colour baked into
// its vertices, so a whole landmark merges into a single geometry and the whole
// island draws with one material.
const tmp = new THREE.Color()

export function paint(geometry, hex) {
  const geo = geometry.index ? geometry.toNonIndexed() : geometry
  geo.deleteAttribute('uv')
  const count = geo.attributes.position.count
  const colors = new Float32Array(count * 3)
  tmp.set(hex)
  for (let i = 0; i < count; i++) colors.set([tmp.r, tmp.g, tmp.b], i * 3)
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  return geo
}

export const box = (w, h, d, hex) => paint(new THREE.BoxGeometry(w, h, d), hex)
export const cyl = (top, bottom, h, sides, hex) => paint(new THREE.CylinderGeometry(top, bottom, h, sides), hex)
export const cone = (r, h, sides, hex) => paint(new THREE.ConeGeometry(r, h, sides), hex)
export const ico = (r, hex, detail = 0) => paint(new THREE.IcosahedronGeometry(r, detail), hex)

// Gabled roof: a triangular prism with its ridge along z, base at y = 0.
export function roof(w, h, d, hex) {
  const shape = new THREE.Shape()
  shape.moveTo(-w / 2, 0)
  shape.lineTo(w / 2, 0)
  shape.lineTo(0, h)
  shape.closePath()
  const geo = new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: false })
  geo.translate(0, 0, -d / 2)
  return paint(geo, hex)
}

// Merge parts built around the origin (y = 0 is the ground, +z is the front),
// then turn and place the result in the world.
export function assemble(parts, { x = 0, y = 0, z = 0, ry = 0 } = {}) {
  const geo = mergeGeometries(parts)
  geo.rotateY(ry)
  geo.translate(x, y, z)
  return geo
}

// A torus lying flat: rails and rings.
export const ring = (r, tube, sides, hex) => paint(new THREE.TorusGeometry(r, tube, 4, sides).rotateX(Math.PI / 2), hex)

// A post-and-rail fence between two points on level ground.
export function fence(x1, z1, x2, z2, { height = 0.55, hex, gap = 0.7 } = {}) {
  const len = Math.hypot(x2 - x1, z2 - z1)
  const angle = Math.atan2(x2 - x1, z2 - z1)
  const posts = Math.max(1, Math.round(len / gap))
  const parts = []
  for (let i = 0; i <= posts; i++) {
    const t = i / posts
    parts.push(box(0.08, height, 0.08, hex).translate(x1 + (x2 - x1) * t, height / 2, z1 + (z2 - z1) * t))
  }
  for (const y of [height * 0.45, height * 0.85]) {
    parts.push(box(0.04, 0.05, len, hex).rotateY(angle).translate((x1 + x2) / 2, y, (z1 + z2) / 2))
  }
  return parts
}

// Local point -> world, matching what `assemble` does to geometry.
export function place([lx, ly, lz], { x = 0, y = 0, z = 0, ry = 0 }) {
  const cos = Math.cos(ry)
  const sin = Math.sin(ry)
  return [x + lx * cos + lz * sin, y + ly, z - lx * sin + lz * cos]
}

export { mergeGeometries }
