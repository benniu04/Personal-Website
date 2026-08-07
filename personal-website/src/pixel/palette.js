// One palette for every scene. Keys are the single characters used in sprite
// maps (sprites.js). Base colors mirror tailwind.config.js tokens; the ramp
// (o r d e) is PixelField's rust gradient; the handful of accents (foliage,
// flame, sky, skin) are the only colors that exist nowhere else in the brand.
export const PALETTE = {
  // brand tokens
  K: '#43261A', // ink — outlines
  C: '#5F4037', // cocoa
  Y: '#8F6A58', // clay
  R: '#A24A21', // rust
  D: '#7E3616', // rust deep
  E: '#5C2812', // ember
  L: '#EEDFD1', // linen
  P: '#FBF5EE', // parchment
  M: '#F6EBE0', // cream
  B: '#F1DFD1', // blush
  // rust ramp (hills, roofs) — from PixelField
  o: '#E09A60',
  r: '#C16E38',
  d: '#9A4D22',
  e: '#763615',
  // accents
  g: '#96A468', // foliage light
  G: '#6F7F4E', // foliage dark
  f: '#F2B84B', // flame bright / lit window
  F: '#E8853A', // flame orange
  W: '#FFF9F0', // warm white
  N: '#3A1F12', // dusk dark
  s: '#E8B48C', // skin
}

// Layered hill shades, back (light) to front (dark).
export const HILL_RAMP = ['#E09A60', '#C16E38', '#9A4D22', '#763615']

export default PALETTE
