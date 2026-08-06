// Deterministic pixel glyph: hashes a string (project slug) into a small
// mirrored grid of rust squares — every project gets its own mark, drawn
// from the same motif as PixelField. No images, no randomness.
const SHADES = ['#DDA77B', '#C16E38', '#9A4D22', '#763615']

const SIZE = 7 // odd, so the mirror has a center column
const CELL = 10
const GAP = 2
const PITCH = CELL + GAP

function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

// tiny seeded PRNG so each cell gets independent bits from one hash
function lcg(seed) {
  let s = seed || 1
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    return s / 4294967296
  }
}

export function PixelMark({ seed, className = '' }) {
  const rand = lcg(hash(seed))
  const half = Math.ceil(SIZE / 2)

  const rects = []
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < half; c++) {
      const filled = rand() < 0.55
      const shade = SHADES[Math.floor(rand() * SHADES.length)]
      if (!filled) continue
      const mirror = SIZE - 1 - c
      rects.push(
        <rect key={`${r}-${c}`} x={c * PITCH} y={r * PITCH} width={CELL} height={CELL} fill={shade} />
      )
      if (mirror !== c) {
        rects.push(
          <rect key={`${r}-${mirror}`} x={mirror * PITCH} y={r * PITCH} width={CELL} height={CELL} fill={shade} />
        )
      }
    }
  }

  const span = SIZE * PITCH - GAP
  return (
    <svg viewBox={`0 0 ${span} ${span}`} className={className} aria-hidden="true" role="presentation">
      {rects}
    </svg>
  )
}

export default PixelMark
