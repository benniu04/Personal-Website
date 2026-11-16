import { SITES } from '../layout.js'
import { COLORS as C } from '../palette.js'
import { heightAt } from '../terrain.js'
import { assemble, box, cyl, fence, place, roof } from './kit.js'

const site = () => ({ x: SITES.cabin.x, y: heightAt(SITES.cabin.x, SITES.cabin.z), z: SITES.cabin.z, ry: 0.61 })
const CHIMNEY = [0.95, 3.45, -0.5]

// Stop 1, About: a cabin on the south shore with a porch, a woodpile, a dock and a rowing boat.
export function buildCabin() {
  const parts = [
    box(3.4, 0.25, 2.6, C.stone).translate(0, 0.125, 0),
    box(3.2, 1.8, 2.4, C.wall).translate(0, 1.15, 0),
    roof(3.9, 1.3, 2.9, C.coral).translate(0, 2.05, 0),
    box(0.16, 0.08, 3.0, C.woodDark).translate(0, 3.36, 0), // ridge beam
    // door, with a step
    box(0.66, 1.2, 0.06, C.woodDark).translate(-0.7, 0.85, 1.2),
    box(0.56, 1.1, 0.08, C.wood).translate(-0.7, 0.82, 1.22),
    // front window: frame, glass, glazing bars, sill
    box(0.96, 0.76, 0.06, C.woodDark).translate(0.7, 1.3, 1.2),
    box(0.8, 0.6, 0.08, C.glass).translate(0.7, 1.3, 1.22),
    box(0.04, 0.6, 0.1, C.wall).translate(0.7, 1.3, 1.22),
    box(0.8, 0.04, 0.1, C.wall).translate(0.7, 1.3, 1.22),
    box(1.0, 0.06, 0.16, C.wood).translate(0.7, 0.92, 1.26),
    // side window
    box(0.06, 0.76, 0.96, C.woodDark).translate(1.6, 1.3, 0),
    box(0.08, 0.6, 0.8, C.glass).translate(1.62, 1.3, 0),
    // chimney with a cap
    box(0.42, 1.1, 0.42, C.stone).translate(CHIMNEY[0], 2.85, CHIMNEY[2]),
    box(0.52, 0.08, 0.52, C.rockDark).translate(CHIMNEY[0], 3.42, CHIMNEY[2]),
    // porch: deck, two posts, lean-to roof
    box(1.6, 0.12, 1.0, C.wood).translate(-0.7, 0.2, 1.7),
    cyl(0.05, 0.05, 1.5, 5, C.woodDark).translate(-1.4, 1.0, 2.1),
    cyl(0.05, 0.05, 1.5, 5, C.woodDark).translate(0, 1.0, 2.1),
    box(1.8, 0.07, 1.1, C.coral).rotateX(0.22).translate(-0.7, 1.86, 1.72),
    box(0.9, 0.1, 0.4, C.stone).translate(-0.7, 0.05, 2.45),
    // barrel and a bench under the window
    cyl(0.22, 0.2, 0.52, 8, C.woodDark).translate(-2.0, 0.26, 0.9),
    box(0.9, 0.07, 0.3, C.wood).translate(0.75, 0.42, 1.55),
    box(0.07, 0.4, 0.26, C.woodDark).translate(0.38, 0.2, 1.55),
    box(0.07, 0.4, 0.26, C.woodDark).translate(1.12, 0.2, 1.55),
    ...fence(2.4, -1.4, 2.4, 2.7, { hex: C.wood }),
    ...fence(2.4, 2.7, 0.9, 2.7, { hex: C.wood }),
  ]
  // woodpile against the back wall, stacked 3-2-1
  ;[[0, 0], [0.26, 0], [0.52, 0], [0.13, 0.22], [0.39, 0.22], [0.26, 0.44]].forEach(([dx, dy]) => {
    parts.push(cyl(0.12, 0.12, 0.7, 6, C.bark).rotateX(Math.PI / 2).translate(-2.3 + dx, 0.12 + dy, -0.6))
  })
  const cabin = assemble(parts, site())

  // Dock: boards on stringers, running out over the water from the beach
  const dockParts = [
    box(0.08, 0.1, 7.4, C.woodDark).translate(-0.38, 0.32, 0),
    box(0.08, 0.1, 7.4, C.woodDark).translate(0.38, 0.32, 0),
  ]
  for (let i = 0; i < 14; i++) {
    dockParts.push(box(1.0 + (i % 3) * 0.04, 0.06, 0.46, i % 4 === 1 ? C.woodDark : C.wood).translate(0, 0.4, -3.4 + i * 0.523))
  }
  for (let i = -3; i <= 3; i += 2) {
    dockParts.push(cyl(0.06, 0.06, 1.4, 5, C.bark).translate(-0.5, -0.1, i))
    dockParts.push(cyl(0.06, 0.06, 1.4, 5, C.bark).translate(0.5, -0.1, i))
  }
  dockParts.push(
    // mooring posts and a ladder at the seaward end
    cyl(0.08, 0.08, 2.0, 6, C.bark).translate(-0.52, 0.3, 3.75),
    cyl(0.08, 0.08, 2.0, 6, C.bark).translate(0.52, 0.3, 3.75),
    box(0.05, 0.9, 0.05, C.woodDark).translate(-0.62, 0, 2.2),
    box(0.05, 0.9, 0.05, C.woodDark).translate(-0.62, 0, 2.6),
    box(0.05, 0.05, 0.4, C.woodDark).translate(-0.62, 0.15, 2.4),
    box(0.05, 0.05, 0.4, C.woodDark).translate(-0.62, -0.1, 2.4),
    // rowing boat moored alongside: tapered hull, coral gunwale, two thwarts, oars
    cyl(0.34, 0.2, 0.3, 6, C.wall).scale(1, 1, 2.6).translate(1.15, 0.08, 1.6),
    cyl(0.37, 0.37, 0.06, 6, C.coral).scale(1, 1, 2.6).translate(1.15, 0.25, 1.6),
    cyl(0.3, 0.3, 0.07, 6, C.wall).scale(1, 1, 2.6).translate(1.15, 0.26, 1.6),
    box(0.6, 0.05, 0.14, C.wood).translate(1.15, 0.3, 1.35),
    box(0.56, 0.05, 0.14, C.wood).translate(1.15, 0.3, 1.95),
    cyl(0.025, 0.025, 1.3, 4, C.wood).rotateX(Math.PI / 2).rotateY(0.25).translate(1.05, 0.33, 1.6),
    cyl(0.025, 0.025, 1.3, 4, C.wood).rotateX(Math.PI / 2).rotateY(-0.2).translate(1.27, 0.33, 1.65),
  )
  const dock = assemble(dockParts, { x: 14.3, y: 0, z: 19.9, ry: 0.62 })

  return [cabin, dock]
}

// Where the smoke starts
export const chimneyTop = () => place(CHIMNEY, site())
