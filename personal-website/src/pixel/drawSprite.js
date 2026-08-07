import { PALETTE } from './palette'

// Blit a string-array pixel map onto a 2D context. Each character indexes
// PALETTE; '.' and ' ' are transparent. One map cell = `scale` device pixels.
export function drawSprite(ctx, map, x, y, scale = 1, { flip = false, palette = PALETTE } = {}) {
  const width = map[0].length
  for (let row = 0; row < map.length; row++) {
    const line = map[row]
    for (let col = 0; col < line.length; col++) {
      const ch = line[col]
      if (ch === '.' || ch === ' ') continue
      const color = palette[ch]
      if (!color) continue
      const cx = flip ? width - 1 - col : col
      ctx.fillStyle = color
      ctx.fillRect(Math.round(x + cx * scale), Math.round(y + row * scale), scale, scale)
    }
  }
}

export function spriteSize(map, scale = 1) {
  return { w: map[0].length * scale, h: map.length * scale }
}
