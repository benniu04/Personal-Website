// Phones get a lighter scene: fill rate is what hurts there.
export function getQuality() {
  const small = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
  return small
    ? { dpr: [1, 1.5], shadow: 1024, terrain: 76, water: 56, trees: 110, bushes: 40, tufts: 150, flowers: 50, rocks: 30, clouds: 5 }
    : { dpr: [1, 2], shadow: 2048, terrain: 124, water: 96, trees: 210, bushes: 80, tufts: 340, flowers: 110, rocks: 56, clouds: 8 }
}
