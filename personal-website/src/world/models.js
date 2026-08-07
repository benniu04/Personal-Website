import {
  AVATAR_IDLE,
  AVATAR_WALK_A,
  AVATAR_WALK_B,
  AVATAR_SIT,
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

export const PLAYER_FRAMES = {
  idle: extrudeSprite(AVATAR_IDLE, { depth: 2 }),
  walkA: extrudeSprite(AVATAR_WALK_A, { depth: 2 }),
  walkB: extrudeSprite(AVATAR_WALK_B, { depth: 2 }),
  sit: extrudeSprite(AVATAR_SIT, { depth: 2 }),
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
