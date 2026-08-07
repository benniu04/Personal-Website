import {
  HOUSE,
  PINE,
  MAILBOX,
  CAMPUS_HALL,
  MONUMENT,
  TOWER_PC,
  MACBOOK,
  GOLF_FLAG,
  PADLOCK,
} from '../pixel/sprites'
import { extrudeSprite, crossExtrude, solid, translate, merge } from './voxel'

// All world models as voxel lists. Sprites extrude straight from the 2D
// journey's art; purpose-built structures are assembled from solids.

// ------------------------------------------------- articulated character ---
// Integer-grid box painter: later boxes overwrite earlier voxels at the same
// cell, so hair can cap and wrap the skin without z-fighting. Ranges are
// [from, to) in voxel units.
function paint(...boxes) {
  const grid = new Map()
  for (const [xr, yr, zr, c] of boxes) {
    for (let x = xr[0]; x < xr[1]; x++) {
      for (let y = yr[0]; y < yr[1]; y++) {
        for (let z = zr[0]; z < zr[1]; z++) {
          grid.set(`${x},${y},${z}`, { x, y, z, c })
        }
      }
    }
  }
  return [...grid.values()]
}

const SKIN = '#E8B48C'
const HAIR = '#43261A'
const HOODIE = '#A24A21'
const HOODIE_DARK = '#7E3616'
const PANTS = '#5F4037'
const SHOE = '#43261A'

// A real 3D body, one voxel list per limb, each built around its own pivot
// so plain rotation.x swings it. Character front is +z: the face only exists
// on the front layer, the back of the head is all hair.
export const PLAYER_PARTS = {
  // pivot at neck; head spans y 0..7 (hair cap on top)
  head: paint(
    [[-3, 3], [0, 6], [-2, 3], SKIN],
    [[-3, 3], [5, 7], [-2, 3], HAIR], // cap (replaces top skin row)
    [[-3, 3], [0, 7], [-2, -1], HAIR], // back of head
    [[-3, -2], [3, 7], [-2, 3], HAIR], // left fringe
    [[2, 3], [3, 7], [-2, 3], HAIR], // right fringe
    [[-2, -1], [2, 3], [2, 3], HAIR], // left eye (front face only)
    [[1, 2], [2, 3], [2, 3], HAIR] // right eye
  ),
  // pivot at hip; torso spans y 0..7
  torso: paint(
    [[-4, 4], [0, 7], [-2, 3], HOODIE],
    [[-3, 3], [4, 7], [-3, -2], HOODIE_DARK], // hood resting on the back
    [[-2, 2], [1, 3], [3, 4], HOODIE_DARK] // front pocket
  ),
  // pivot at shoulder; hangs to y -6 (sleeve + skin hand)
  arm: paint(
    [[-1, 1], [-4, 0], [-1, 1], HOODIE],
    [[-1, 1], [-6, -4], [-1, 1], SKIN]
  ),
  // pivot at hip; hangs to y -5, shoe toe pokes forward
  leg: paint(
    [[-1, 1], [-4, 0], [-1, 1], PANTS],
    [[-1, 1], [-5, -4], [-1, 2], SHOE]
  ),
}

export const HOUSE_MODEL = extrudeSprite(HOUSE, { depth: 10 })
export const PINE_MODEL = crossExtrude(PINE, { depth: 2 })
export const MAILBOX_MODEL = extrudeSprite(MAILBOX, { depth: 2 })
export const CAMPUS_MODEL = extrudeSprite(CAMPUS_HALL, { depth: 10 })
export const MONUMENT_MODEL = extrudeSprite(MONUMENT, { depth: 4 })
export const TOWER_PC_MODEL = extrudeSprite(TOWER_PC, { depth: 6 })
export const MACBOOK_MODEL = extrudeSprite(MACBOOK, { depth: 8 })
export const GOLF_FLAG_MODEL = crossExtrude(GOLF_FLAG, { depth: 1 })
export const PADLOCK_MODEL = extrudeSprite(PADLOCK, { depth: 2 })

// Trailhead signpost: post + board.
export const SIGNPOST_MODEL = merge(
  solid({ w: 2, h: 10, d: 2, c: '#5F4037' }),
  translate(solid({ w: 14, h: 6, d: 2, c: '#FBF5EE' }), 0, 9, 0),
  translate(solid({ w: 16, h: 1, d: 2, c: '#43261A' }), 0, 8, 0),
  translate(solid({ w: 16, h: 1, d: 2, c: '#43261A' }), 0, 15, 0)
)

// Co-op office: small building; tone varies per company.
export function officeModel(tone, lit = true) {
  return merge(
    solid({ w: 14, h: 12, d: 12, c: tone }),
    translate(solid({ w: 16, h: 2, d: 14, c: '#43261A' }), 0, 12, 0),
    // door
    translate(solid({ w: 4, h: 6, d: 1, c: '#43261A', z: 0 }), 0, 0, 5.6),
    // windows
    translate(solid({ w: 3, h: 3, d: 1, c: lit ? '#F2B84B' : '#43261A' }), -4, 6, 5.6),
    translate(solid({ w: 3, h: 3, d: 1, c: lit ? '#F2B84B' : '#43261A' }), 4, 6, 5.6)
  )
}

// Arcade cabinet for a project: body + screen + marquee.
export function arcadeModel(accent = '#A24A21') {
  return merge(
    solid({ w: 10, h: 14, d: 8, c: '#5F4037' }),
    translate(solid({ w: 8, h: 6, d: 1, c: '#FBF5EE' }), 0, 6, 4.1),
    translate(solid({ w: 8, h: 2, d: 1, c: accent }), 0, 13, 4.1),
    translate(solid({ w: 10, h: 1, d: 9, c: accent }), 0, 15, 0),
    // joystick ledge
    translate(solid({ w: 8, h: 1, d: 3, c: '#8F6A58' }), 0, 4, 5.2)
  )
}

// Grand-ish piano: body, keys, legs.
export const PIANO_MODEL = merge(
  translate(solid({ w: 16, h: 4, d: 10, c: '#43261A' }), 0, 4, 0),
  translate(solid({ w: 14, h: 1, d: 3, c: '#FBF5EE' }), 0, 4, 6),
  translate(solid({ w: 1, h: 4, d: 1, c: '#43261A' }), -7, 0, 4),
  translate(solid({ w: 1, h: 4, d: 1, c: '#43261A' }), 7, 0, 4),
  translate(solid({ w: 1, h: 4, d: 1, c: '#43261A' }), -7, 0, -4),
  translate(solid({ w: 1, h: 4, d: 1, c: '#43261A' }), 7, 0, -4)
)

// Campfire: stone ring + crossed logs (flames are light + sparks at runtime).
export const CAMPFIRE_MODEL = merge(
  translate(solid({ w: 8, h: 1, d: 2, c: '#5F4037' }), 0, 0, 0),
  translate(solid({ w: 2, h: 1, d: 8, c: '#5F4037' }), 0, 1, 0),
  translate(solid({ w: 2, h: 1, d: 2, c: '#8F6A58' }), -5, 0, -4),
  translate(solid({ w: 2, h: 1, d: 2, c: '#8F6A58' }), 5, 0, -4),
  translate(solid({ w: 2, h: 1, d: 2, c: '#8F6A58' }), -5, 0, 4),
  translate(solid({ w: 2, h: 1, d: 2, c: '#8F6A58' }), 5, 0, 4),
  translate(solid({ w: 2, h: 1, d: 2, c: '#8F6A58' }), 0, 0, -6),
  translate(solid({ w: 2, h: 1, d: 2, c: '#8F6A58' }), 0, 0, 6)
)

// Sittable log bench.
export const LOG_MODEL = merge(
  solid({ w: 10, h: 2, d: 3, c: '#8F6A58' }),
  translate(solid({ w: 10, h: 1, d: 3, c: '#5F4037' }), 0, 2, 0)
)

// Knockable crate.
export const CRATE_MODEL = merge(
  solid({ w: 4, h: 4, d: 4, c: '#C9A188' }),
  translate(solid({ w: 4, h: 1, d: 4, c: '#8F6A58' }), 0, 3, 0)
)

// Tennis net between two posts.
export const TENNIS_NET_MODEL = merge(
  solid({ w: 1, h: 6, d: 1, c: '#5F4037', x: -8 }),
  solid({ w: 1, h: 6, d: 1, c: '#5F4037', x: 8 }),
  translate(solid({ w: 16, h: 3, d: 1, c: '#FBF5EE' }), 0, 2, 0),
  translate(solid({ w: 16, h: 1, d: 1, c: '#43261A' }), 0, 5, 0)
)

// Puffy sky cloud (rendered semi-large, drifts overhead).
export const CLOUD_MODEL = paint(
  [[-4, 4], [0, 2], [-2, 2], '#FFF9F0'],
  [[-6, -3], [0, 1], [-1, 1], '#FFF9F0'],
  [[3, 6], [0, 1], [-1, 2], '#FFF9F0'],
  [[-2, 3], [2, 3], [-1, 1], '#FFF9F0']
)

// Two-tone bush.
export const BUSH_MODEL = paint(
  [[-2, 2], [0, 2], [-2, 2], '#6F7F4E'],
  [[-1, 2], [1, 3], [-1, 1], '#96A468']
)

// Squat rock.
export const ROCK_MODEL = paint(
  [[-2, 1], [0, 2], [-1, 1], '#8F6A58'],
  [[-1, 1], [1, 3], [-1, 1], '#C9A188']
)

// Little mushroom: cream stem, rust cap.
export const MUSHROOM_MODEL = paint(
  [[-1, 1], [0, 2], [-1, 1], '#FBF5EE'],
  [[-2, 2], [2, 3], [-2, 2], '#A24A21'],
  [[-1, 1], [3, 4], [-1, 1], '#A24A21']
)

// One fence segment: two posts + two rails, runs along x.
export const FENCE_MODEL = merge(
  solid({ w: 1, h: 5, d: 1, c: '#5F4037', x: -5 }),
  solid({ w: 1, h: 5, d: 1, c: '#5F4037', x: 5 }),
  translate(solid({ w: 11, h: 1, d: 1, c: '#8F6A58' }), 0, 3, 0),
  translate(solid({ w: 11, h: 1, d: 1, c: '#8F6A58' }), 0, 1, 0)
)

// Little tufts of grass / flowers to scatter around.
export const GRASS_MODEL = [
  { x: 0, y: 0, z: 0, c: '#96A468' },
  { x: 1, y: 0, z: 1, c: '#6F7F4E' },
  { x: -1, y: 0, z: 0, c: '#96A468' },
]

export const FLOWER_MODEL = [
  { x: 0, y: 0, z: 0, c: '#6F7F4E' },
  { x: 0, y: 1, z: 0, c: '#F2B84B' },
]
