// The world's story stops, in path order. `pos` is the station center,
// `radius` the interaction range, `collider` a solid circle the player
// can't walk through (usually smaller than the prompt radius).
export const STATIONS = [
  { id: 'welcome', label: 'Trailhead', pos: [2.8, 0, -4], radius: 4.5, collider: 0.9 },
  { id: 'origin', label: 'Chapter 1 · Connecticut', pos: [-8, 0, -20], radius: 6, collider: 2.6 },
  { id: 'boston', label: 'Chapter 2 · Boston', pos: [8, 0, -34], radius: 6, collider: 2.8 },
  { id: 'experience', label: 'Chapter 3 · The Co-op Levels', pos: [-8, 0, -48], radius: 6.5, collider: 2.4 },
  { id: 'projects', label: 'Chapter 4 · Side Quest Arcade', pos: [8, 0, -62], radius: 6.5, collider: 2.4 },
  { id: 'hobbies', label: 'Chapter 5 · Rest Stop', pos: [-8, 0, -76], radius: 6, collider: 1.6 },
  { id: 'setup', label: 'Chapter 6 · The Rig', pos: [8, 0, -90], radius: 5.5, collider: 1.8 },
  { id: 'commits', label: 'Chapter 7 · Quest Log', pos: [-6, 0, -102], radius: 5, collider: 1 },
  { id: 'contact', label: 'Final Chapter · Save Point', pos: [0, 0, -114], radius: 6, collider: 1.2 },
]

export const WORLD_BOUNDS = { minX: -18, maxX: 18, minZ: -122, maxZ: 4 }

export const PLAYER_SPAWN = [0, 0, 1]
