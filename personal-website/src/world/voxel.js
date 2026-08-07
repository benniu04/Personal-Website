import { PALETTE } from '../pixel/palette'

// Voxel model builders. A "voxel list" is [{ x, y, z, c }] on an integer
// grid — VoxelModel renders one instanced box per entry. The 2D sprite maps
// in src/pixel/sprites.js extrude straight into 3D, so the world and the 2D
// journey share one visual language.

// Extrude a string-array sprite map into a slab `depth` voxels thick.
// Row 0 of the map is the top; result is centered on x/z, base at y = 0.
export function extrudeSprite(map, { depth = 2, palette = PALETTE } = {}) {
  const voxels = []
  const height = map.length
  const width = map[0].length
  for (let row = 0; row < height; row++) {
    const line = map[row]
    for (let col = 0; col < line.length; col++) {
      const ch = line[col]
      if (ch === '.' || ch === ' ') continue
      const color = palette[ch]
      if (!color) continue
      for (let z = 0; z < depth; z++) {
        voxels.push({
          x: col - width / 2,
          y: height - 1 - row,
          z: z - depth / 2,
          c: color,
        })
      }
    }
  }
  return voxels
}

// Two extrusions crossed at 90° — reads as a solid object from every side
// (classic cardboard-cutout trick for trees and flags).
export function crossExtrude(map, opts) {
  const flat = extrudeSprite(map, opts)
  const crossed = flat.map((v) => ({ x: v.z, y: v.y, z: v.x, c: v.c }))
  return [...flat, ...crossed]
}

// Axis-aligned solid block of voxels.
export function solid({ w, h, d, c, x = 0, y = 0, z = 0 }) {
  const voxels = []
  for (let ix = 0; ix < w; ix++) {
    for (let iy = 0; iy < h; iy++) {
      for (let iz = 0; iz < d; iz++) {
        voxels.push({ x: x + ix - w / 2, y: y + iy, z: z + iz - d / 2, c })
      }
    }
  }
  return voxels
}

export function translate(voxels, dx = 0, dy = 0, dz = 0) {
  return voxels.map((v) => ({ ...v, x: v.x + dx, y: v.y + dy, z: v.z + dz }))
}

export function merge(...lists) {
  return lists.flat()
}
