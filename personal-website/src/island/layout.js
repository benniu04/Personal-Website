// Where things stand on the island (x east, z south, y up). Each site is a patch
// of ground flattened to a single height so its landmark sits level.
export const SITES = {
  cabin: { x: 10, z: 14, r: 4.8 },
  lighthouse: { x: -16, z: 3, r: 3.2 },
  workshop: { x: 16, z: -4, r: 6.8 },
  clearing: { x: 8, z: -15, r: 6.8 },
  summit: { x: -6, z: -8, r: 2.8 },
}

// The stepping-stone footpath from the cabin up to the lighthouse.
export const PATH = [
  [7, 13.5],
  [2, 12.5],
  [-4, 12],
  [-9, 9.5],
  [-13, 6.5],
  [-15, 4.6],
]

// Open ground kept free of trees so they don't crowd a camera's foreground.
export const GLADES = [{ x: -8, z: 17.5, r: 6.5 }]

// Every worn track on the island: the footpath plus plain dirt trails linking
// the other stops. Grass gives way to earth along these and trees keep clear.
export const TRAILS = [
  PATH,
  [[11, 11], [13.5, 5], [14.5, 0]],
  [[14, -8], [11.5, -11], [9.5, -12.5]],
  [[-13, 5], [-11.5, 0], [-9.5, -4], [-7.5, -6.5]],
]
