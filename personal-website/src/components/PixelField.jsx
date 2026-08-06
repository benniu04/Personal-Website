// Stepped "pixel pyramid": a grid of squares whose shade steps through a
// palette by Manhattan distance from an apex, echoing tennr.com's motif.
// Palettes run bright at the apex and fade toward the host background;
// a `null` step means "skip the square" so the shape dissolves at its edge.
const PALETTES = {
  rust: ['#E09A60', '#D2814A', '#C16E38', '#AE5C2B', '#9A4D22', '#874019', '#763615', null],
  cocoa: ['#C9A188', '#B68E74', '#A37B62', '#906A52', '#7F5A47', '#6F4C3E', '#654339', null],
}

export function PixelField({
  cols = 25,
  rows = 16,
  cell = 22,
  gap = 3,
  palette = 'rust',
  apex = 'bottom-center',
  spread = 1.6, // horizontal stretch of the pyramid
  className = '',
}) {
  const steps = PALETTES[palette] ?? PALETTES.rust
  const apexCol = apex.endsWith('right') ? cols - 1 : apex.endsWith('left') ? 0 : (cols - 1) / 2
  const apexRow = apex.startsWith('top') ? 0 : rows - 1
  const pitch = cell + gap

  const rects = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dist = (Math.abs(c - apexCol) / spread + Math.abs(r - apexRow)) / rows
      const idx = Math.min(steps.length - 1, Math.floor(dist * steps.length))
      const color = steps[idx]
      if (!color) continue
      rects.push(
        <rect
          key={`${r}-${c}`}
          x={c * pitch}
          y={r * pitch}
          width={cell}
          height={cell}
          fill={color}
        />
      )
    }
  }

  return (
    <svg
      viewBox={`0 0 ${cols * pitch - gap} ${rows * pitch - gap}`}
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      {rects}
    </svg>
  )
}

export default PixelField
