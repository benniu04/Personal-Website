import { SITES } from '../layout.js'
import { COLORS as C } from '../palette.js'
import { heightAt } from '../terrain.js'
import { assemble, box, cyl, fence, ico } from './kit.js'

// Stop 4, Off the clock: a tennis court, a grand piano, a putting green and an outdoor gym.
export function buildClearing() {
  const { x, z } = SITES.clearing
  const L = 6.4
  const W = 3.4
  const line = (w, d, px, pz) => box(w, 0.02, d, C.white).translate(px, 0.11, pz)
  const court = [
    box(L + 0.8, 0.06, W + 0.8, C.green).translate(0, 0.03, 0), // apron
    box(L, 0.1, W, C.court).translate(0, 0.05, 0),
    line(L, 0.06, 0, W / 2 - 0.03),
    line(L, 0.06, 0, -W / 2 + 0.03),
    line(L, 0.05, 0, W / 2 - 0.42),
    line(L, 0.05, 0, -W / 2 + 0.42),
    line(0.06, W, L / 2 - 0.03, 0),
    line(0.06, W, -L / 2 + 0.03, 0),
    line(0.06, W - 0.84, L / 4, 0),
    line(0.06, W - 0.84, -L / 4, 0),
    line(L / 2, 0.06, 0, 0),
    // net with a white band, on two posts
    box(0.03, 0.36, W + 0.3, C.dark).translate(0, 0.3, 0),
    box(0.05, 0.06, W + 0.3, C.white).translate(0, 0.5, 0),
    cyl(0.05, 0.05, 0.7, 5, C.dark).translate(0, 0.35, W / 2 + 0.15),
    cyl(0.05, 0.05, 0.7, 5, C.dark).translate(0, 0.35, -W / 2 - 0.15),
    ico(0.11, C.glow).translate(1.4, 0.22, 0.6),
    // back fences behind each baseline, and a bench at the side
    ...fence(L / 2 + 0.7, -W / 2, L / 2 + 0.7, W / 2, { height: 1.1, hex: C.wall, gap: 0.85 }),
    ...fence(-L / 2 - 0.7, -W / 2, -L / 2 - 0.7, W / 2, { height: 1.1, hex: C.wall, gap: 0.85 }),
    box(1.3, 0.07, 0.34, C.wood).translate(-1.6, 0.42, -W / 2 - 0.9),
    box(0.07, 0.4, 0.3, C.woodDark).translate(-2.15, 0.2, -W / 2 - 0.9),
    box(0.07, 0.4, 0.3, C.woodDark).translate(-1.05, 0.2, -W / 2 - 0.9),
    // a racket left on the bench: handle and head
    box(0.05, 0.03, 0.3, C.woodDark).translate(-1.5, 0.48, -W / 2 - 0.9),
    cyl(0.13, 0.13, 0.03, 8, C.coral).translate(-1.5, 0.48, -W / 2 - 1.14),
  ]

  const piano = [
    box(1.5, 0.34, 1.2, C.dark).translate(0, 0.87, 0),
    box(1.5, 0.05, 1.2, C.dark).rotateZ(0.5).translate(-0.1, 1.42, 0),
    cyl(0.02, 0.02, 0.62, 4, C.dark).rotateZ(-0.25).translate(0.45, 1.3, -0.2), // lid prop
    box(1.34, 0.05, 0.24, C.white).translate(0, 0.84, 0.72),
    box(0.3, 0.3, 0.03, C.dark).rotateX(-0.25).translate(0, 1.2, 0.5), // music stand
    box(0.22, 0.2, 0.02, C.white).rotateX(-0.25).translate(0, 1.2, 0.52),
    cyl(0.05, 0.05, 0.7, 5, C.dark).translate(-0.62, 0.35, 0.45),
    cyl(0.05, 0.05, 0.7, 5, C.dark).translate(0.62, 0.35, 0.45),
    cyl(0.05, 0.05, 0.7, 5, C.dark).translate(0, 0.35, -0.45),
    box(0.7, 0.08, 0.34, C.coral).translate(0, 0.48, 1.3),
    box(0.06, 0.44, 0.3, C.dark).translate(-0.28, 0.22, 1.3),
    box(0.06, 0.44, 0.3, C.dark).translate(0.28, 0.22, 1.3),
  ]
  // black keys in their groups of two and three
  for (let i = 0; i < 15; i++) {
    if ([2, 6, 9, 13].includes(i)) continue
    piano.push(box(0.045, 0.03, 0.13, C.dark).translate(-0.6 + i * 0.086, 0.88, 0.67))
  }

  const green = [
    cyl(1.35, 1.45, 0.06, 12, C.green).translate(0, 0.03, 0),
    cyl(0.14, 0.14, 0.02, 8, C.dark).translate(0, 0.07, 0),
    cyl(0.03, 0.03, 1.5, 5, C.stone).translate(0, 0.75, 0),
    box(0.5, 0.3, 0.03, C.coral).translate(0.26, 1.34, 0),
    ico(0.07, C.white).translate(0.6, 0.11, 0.4),
    // golf bag with two clubs, standing at the edge
    cyl(0.14, 0.12, 0.7, 6, C.coral).rotateZ(0.16).translate(-1.1, 0.36, 0.7),
    cyl(0.015, 0.015, 0.5, 4, C.stone).rotateZ(0.3).translate(-1.26, 0.92, 0.7),
    cyl(0.015, 0.015, 0.45, 4, C.stone).rotateZ(0.05).translate(-1.14, 0.92, 0.76),
  ]

  // Outdoor gym behind the court: bench press with a loaded bar, a pull-up bar, dumbbells
  const plate = (r, hex, px) => cyl(r, r, 0.06, 10, hex).rotateZ(Math.PI / 2).translate(px, 1.02, -0.4)
  const dumbbell = (px, pz, turn) => [
    cyl(0.025, 0.025, 0.34, 5, C.stone).rotateZ(Math.PI / 2).rotateY(turn).translate(px, 0.1, pz),
    cyl(0.09, 0.09, 0.08, 8, C.dark).rotateZ(Math.PI / 2).translate(-0.15, 0, 0).rotateY(turn).translate(px, 0.1, pz),
    cyl(0.09, 0.09, 0.08, 8, C.dark).rotateZ(Math.PI / 2).translate(0.15, 0, 0).rotateY(turn).translate(px, 0.1, pz),
  ]
  const gym = [
    box(2.6, 0.04, 2.0, C.slate).translate(0.6, 0.02, 0), // rubber mat
    box(0.36, 0.08, 1.2, C.coral).translate(0, 0.44, 0.1),
    box(0.3, 0.4, 0.08, C.dark).translate(0, 0.2, 0.55),
    box(0.3, 0.4, 0.08, C.dark).translate(0, 0.2, -0.35),
    cyl(0.04, 0.04, 1.05, 5, C.dark).translate(-0.45, 0.52, -0.4),
    cyl(0.04, 0.04, 1.05, 5, C.dark).translate(0.45, 0.52, -0.4),
    cyl(0.025, 0.025, 1.7, 6, C.stone).rotateZ(Math.PI / 2).translate(0, 1.02, -0.4),
    plate(0.22, C.dark, -0.68),
    plate(0.22, C.dark, 0.68),
    plate(0.17, C.coral, -0.76),
    plate(0.17, C.coral, 0.76),
    // pull-up bar
    cyl(0.05, 0.05, 2.1, 5, C.dark).translate(1.2, 1.05, -0.5),
    cyl(0.05, 0.05, 2.1, 5, C.dark).translate(2.2, 1.05, -0.5),
    cyl(0.03, 0.03, 1.1, 6, C.stone).rotateZ(Math.PI / 2).translate(1.7, 2.05, -0.5),
    ...dumbbell(1.2, 0.6, 0.3),
    ...dumbbell(1.65, 0.7, -0.5),
    cyl(0.2, 0.2, 0.1, 10, C.dark).translate(-0.8, 0.07, 0.6), // spare plate on the ground
  ]

  return [
    assemble(
      [...court, ...gym.map((part) => part.translate(1.2, 0, -W / 2 - 2.0)), ...piano.map((part) => part.translate(5.1, 0, 0.2)), ...green.map((part) => part.translate(-5.2, 0, 0.6))],
      { x, y: heightAt(x, z), z, ry: 2.55 },
    ),
  ]
}
