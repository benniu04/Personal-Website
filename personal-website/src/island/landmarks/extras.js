import { COLORS as C } from '../palette.js'
import { assemble, box, cyl, ico, roof } from './kit.js'

// Rock stacks standing off the coast.
export function buildSeaStacks() {
  const stack = (x, z, s, lean) => [
    ico(s, C.rock).scale(1, 1.7, 0.9).rotateZ(lean).translate(x, s * 0.9, z),
    ico(s * 0.6, C.rockDark).scale(1.1, 1.2, 1).translate(x + s * 0.9, s * 0.3, z + s * 0.5),
    ico(s * 0.4, C.rock).translate(x - s * 0.8, s * 0.1, z - s * 0.6),
  ]
  return [assemble([...stack(31, 11, 1.3, 0.15), ...stack(27, -22, 1.4, -0.1), ...stack(-4, -30, 1.0, 0.2), ...stack(-24, -22, 1.2, -0.2)])]
}

// A few gulls on a slow circle above the hill. Built around the origin.
export function buildBirds() {
  const parts = []
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2 + (i % 2) * 0.4
    const r = 6 + (i % 3) * 2.4
    const y = (i % 4) * 0.9
    for (const side of [-1, 1]) {
      parts.push(
        box(0.34, 0.025, 0.12, C.dark)
          .translate(side * 0.16, 0, 0)
          .rotateZ(side * 0.32)
          .rotateY(-a)
          .translate(Math.cos(a) * r, y, Math.sin(a) * r),
      )
    }
  }
  return assemble(parts)
}

// A small sailing boat out in the bay. Built around the origin, sitting on y = 0.
export function buildSailboat() {
  return assemble([
    cyl(0.5, 0.28, 0.42, 6, C.wall).scale(1, 1, 2.8).translate(0, 0.12, 0),
    cyl(0.53, 0.53, 0.07, 6, C.coral).scale(1, 1, 2.8).translate(0, 0.34, 0),
    box(0.5, 0.26, 0.8, C.wall).translate(0, 0.5, -0.4),
    cyl(0.035, 0.04, 3.2, 5, C.woodDark).translate(0, 1.9, 0.2),
    // mainsail and jib: thin triangular sheets
    roof(1.5, 2.6, 0.03, C.white).scale(0.5, 1, 1).rotateY(Math.PI / 2).translate(0, 0.75, -0.25),
    roof(1.0, 2.0, 0.03, C.white).scale(0.5, 1, 1).rotateY(Math.PI / 2).translate(0, 0.7, 0.75),
  ])
}
