import { SITES } from '../layout.js'
import { COLORS as C } from '../palette.js'
import { heightAt } from '../terrain.js'
import { assemble, box, cone, cyl, ico } from './kit.js'

const RY = -2.46 // the fire's "front" faces the last camera

// Stop 5, Contact: a campfire at the top of the hill, under a summit flag.
export function buildSummit() {
  const { x, z } = SITES.summit
  const parts = [cyl(0.95, 1.0, 0.04, 10, C.dirt).translate(0, 0.02, 0)]
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2
    parts.push(ico(0.17 + (i % 3) * 0.035, i % 2 ? C.stone : C.rock).translate(Math.cos(a) * 0.72, 0.1, Math.sin(a) * 0.72))
  }
  for (let i = 0; i < 4; i++) {
    parts.push(
      cyl(0.07, 0.08, 0.95, 5, C.bark)
        .rotateZ(1.12)
        .rotateY((i / 4) * Math.PI * 2 + 0.3)
        .translate(0, 0.22, 0),
    )
  }
  parts.push(
    // two log seats, set back and to the sides so they don't hide the fire
    cyl(0.2, 0.2, 1.5, 6, C.wood).rotateZ(Math.PI / 2).rotateY(0.5).translate(-1.3, 0.2, -0.9),
    cyl(0.2, 0.2, 1.3, 6, C.wood).rotateZ(Math.PI / 2).rotateY(-0.6).translate(1.3, 0.2, -0.8),
    // summit flag
    cyl(0.035, 0.045, 2.6, 5, C.bark).translate(1.7, 1.3, -1.7),
    box(0.8, 0.46, 0.03, C.coral).translate(2.12, 2.3, -1.7),
    // kettle and a pack by the seats
    cyl(0.1, 0.12, 0.16, 6, C.dark).translate(0.55, 0.12, 0.75),
    box(0.3, 0.4, 0.22, C.slate).rotateY(0.4).translate(1.55, 0.2, 0.1),
  )
  return [assemble(parts, { x, y: heightAt(x, z), z, ry: RY })]
}

// The flame is its own small mesh so it can flicker.
export function buildFlame() {
  return assemble([
    cone(0.3, 0.75, 5, C.flame).translate(0, 0.5, 0),
    cone(0.17, 0.48, 5, C.flameCore).translate(0.03, 0.42, 0.05),
  ])
}

export function flamePosition() {
  const { x, z } = SITES.summit
  return [x, heightAt(x, z), z]
}
