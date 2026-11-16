import { SITES } from '../layout.js'
import { COLORS as C } from '../palette.js'
import { heightAt } from '../terrain.js'
import { assemble, box, cyl, roof } from './kit.js'

function hut(x, z, w, roofColor, { chimney = false } = {}) {
  const parts = [
    box(w + 0.14, 0.16, 1.74, C.stone).translate(x, 0.08, z),
    box(w, 1.3, 1.6, C.wall).translate(x, 0.8, z),
    roof(w + 0.45, 0.9, 2.0, roofColor).translate(x, 1.45, z),
    box(0.12, 0.07, 2.06, C.woodDark).translate(x, 2.34, z),
    box(0.5, 0.92, 0.06, C.woodDark).translate(x - w * 0.2, 0.62, z + 0.8),
    box(0.42, 0.85, 0.09, C.wood).translate(x - w * 0.2, 0.6, z + 0.8),
    box(0.5, 0.46, 0.06, C.woodDark).translate(x + w * 0.24, 0.95, z + 0.8),
    box(0.4, 0.36, 0.09, C.glass).translate(x + w * 0.24, 0.95, z + 0.8),
  ]
  if (chimney) parts.push(box(0.3, 0.7, 0.3, C.stone).translate(x + w * 0.25, 2.1, z - 0.4))
  return parts
}

// The one still under construction: a bare frame, rafters going on, a crate
function frame(x, z) {
  const parts = [box(1.9, 0.12, 1.7, C.stone).translate(x, 0.06, z)]
  for (const dx of [-0.8, 0.8]) {
    for (const dz of [-0.7, 0.7]) parts.push(cyl(0.06, 0.06, 1.4, 5, C.wood).translate(x + dx, 0.82, z + dz))
    parts.push(box(0.1, 0.1, 1.5, C.wood).translate(x + dx, 1.54, z))
  }
  for (const dz of [-0.7, 0.7]) parts.push(box(1.7, 0.1, 0.1, C.wood).translate(x, 1.54, z + dz))
  for (const dz of [-0.5, 0]) {
    parts.push(box(1.1, 0.07, 0.07, C.wood).rotateZ(0.7).translate(x - 0.42, 1.9, z + dz))
    parts.push(box(1.1, 0.07, 0.07, C.wood).rotateZ(-0.7).translate(x + 0.42, 1.9, z + dz))
  }
  parts.push(
    box(0.5, 0.5, 0.5, C.woodDark).translate(x - 0.1, 0.37, z + 0.1),
    cyl(0.03, 0.03, 1.9, 4, C.woodDark).rotateZ(0.32).translate(x + 1.15, 0.9, z + 0.4), // ladder rails
    cyl(0.03, 0.03, 1.9, 4, C.woodDark).rotateZ(0.32).translate(x + 1.15, 0.9, z + 0.75),
  )
  return parts
}

// Stop 3, Workshop: a cluster of small buildings where the projects live.
export function buildWorkshop() {
  const { x, z } = SITES.workshop
  const parts = [
    ...hut(-3.3, -0.4, 1.9, C.coral, { chimney: true }),
    ...hut(-1.1, 0.5, 1.7, C.slate),
    ...hut(1.1, 0.5, 1.8, C.coral),
    ...frame(3.3, -0.4),
    // workbench out front, with a vice and a toolbox
    box(1.5, 0.1, 0.6, C.wood).translate(0, 0.6, 2.6),
    box(0.1, 0.6, 0.5, C.woodDark).translate(-0.6, 0.3, 2.6),
    box(0.1, 0.6, 0.5, C.woodDark).translate(0.6, 0.3, 2.6),
    box(0.3, 0.2, 0.25, C.coral).translate(0.3, 0.75, 2.6),
    box(0.16, 0.14, 0.16, C.dark).translate(-0.45, 0.72, 2.7),
    // stacked crates, a barrel, and timber waiting to be used
    box(0.55, 0.55, 0.55, C.wood).translate(-2.4, 0.28, 2.2),
    box(0.5, 0.5, 0.5, C.woodDark).rotateY(0.4).translate(-2.9, 0.25, 2.5),
    box(0.45, 0.45, 0.45, C.wood).rotateY(0.2).translate(-2.55, 0.78, 2.25),
    cyl(0.24, 0.22, 0.56, 8, C.woodDark).translate(2.0, 0.28, 2.3),
    box(0.14, 0.1, 2.4, C.wood).rotateY(1.4).translate(3.2, 0.05, 1.9),
    box(0.14, 0.1, 2.4, C.wood).rotateY(1.45).translate(3.25, 0.05, 2.1),
    box(0.14, 0.1, 2.2, C.woodDark).rotateY(1.38).translate(3.2, 0.15, 2.0),
    // signpost at the edge of the yard
    cyl(0.05, 0.05, 1.3, 5, C.bark).translate(-4.5, 0.65, 2.2),
    box(0.9, 0.36, 0.06, C.wood).translate(-4.5, 1.15, 2.24),
    box(0.5, 0.05, 0.02, C.coral).translate(-4.5, 1.15, 2.28),
  ]
  return [assemble(parts, { x, y: heightAt(x, z), z, ry: 1.19 })]
}
