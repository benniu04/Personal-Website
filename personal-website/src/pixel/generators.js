import { PALETTE, HILL_RAMP } from './palette'

// Seeded randomness in the same FNV-1a + LCG idiom as PixelMark, so every
// scene renders identically on every visit.
function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function seeded(seedStr) {
  let s = hash(seedStr) || 1
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    return s / 4294967296
  }
}

// Rolling hill ridgelines, back to front, quantized to `cell`-sized pixels.
// Each layer fills from its ridge down to the bottom of the canvas.
export function drawHills(ctx, { w, h, seed = 'hills', layers = HILL_RAMP, cell = 4, base = 0.45 }) {
  const rand = seeded(seed)
  layers.forEach((color, i) => {
    const phase = rand() * Math.PI * 2
    const phase2 = rand() * Math.PI * 2
    const amp = h * (0.045 + rand() * 0.05)
    const baseY = h * (base + (i / layers.length) * (0.98 - base))
    ctx.fillStyle = color
    for (let x = 0; x < w; x += cell) {
      const t = x / w
      const y =
        baseY +
        Math.sin(t * Math.PI * 2 * (1.2 + i * 0.6) + phase) * amp +
        Math.sin(t * Math.PI * 2 * (2.8 + i) + phase2) * amp * 0.4
      const yq = Math.floor(y / cell) * cell
      ctx.fillRect(x, yq, cell, h - yq)
    }
  })
}

// Fluffy mirrored cloud blobs drifting across the top band of the scene.
export function drawClouds(ctx, { w, h, seed = 'clouds', count = 5, cell = 4, color = PALETTE.W }) {
  const rand = seeded(seed)
  ctx.fillStyle = color
  for (let i = 0; i < count; i++) {
    const cx = rand() * w
    const cy = rand() * h * 0.3 + h * 0.04
    const width = 6 + Math.floor(rand() * 8) // in cells, per half
    const height = 2 + Math.floor(rand() * 2)
    for (let row = 0; row < height; row++) {
      const rowW = width - row * 2
      for (let col = -rowW; col <= rowW; col++) {
        if (rand() < 0.12) continue // ragged edges
        ctx.fillRect(
          Math.round(cx + col * cell),
          Math.round(cy - row * cell),
          cell,
          cell
        )
      }
    }
  }
}

// City skyline: seeded runs of rectangles with dithered lit windows.
export function drawSkyline(
  ctx,
  { w, h, seed = 'boston', cell = 4, color = PALETTE.C, litColor = PALETTE.f, litChance = 0.18, base = 1 }
) {
  const rand = seeded(seed)
  let x = 0
  const bottom = h * base
  while (x < w) {
    const bw = (3 + Math.floor(rand() * 5)) * cell
    const bh = h * (0.25 + rand() * 0.55)
    const top = bottom - bh
    const topQ = Math.floor(top / cell) * cell
    ctx.fillStyle = color
    ctx.fillRect(x, topQ, bw, bottom - topQ)
    // windows on a grid, some lit
    for (let wy = topQ + cell; wy < bottom - cell; wy += cell * 2) {
      for (let wx = x + cell; wx < x + bw - cell; wx += cell * 2) {
        if (rand() < litChance) {
          ctx.fillStyle = litColor
          ctx.fillRect(wx, wy, cell, cell)
        }
      }
    }
    x += bw + cell * (1 + Math.floor(rand() * 2))
  }
}

// Star scatter for the dusk scene; a few stars get a + twinkle shape.
export function drawStars(ctx, { w, h, seed = 'stars', count = 60, color = PALETTE.L, maxY = 0.6 }) {
  const rand = seeded(seed)
  ctx.fillStyle = color
  for (let i = 0; i < count; i++) {
    const x = Math.floor(rand() * w)
    const y = Math.floor(rand() * h * maxY)
    ctx.globalAlpha = 0.4 + rand() * 0.6
    ctx.fillRect(x, y, 2, 2)
    if (rand() < 0.12) {
      ctx.fillRect(x - 2, y, 2, 2)
      ctx.fillRect(x + 2, y, 2, 2)
      ctx.fillRect(x, y - 2, 2, 2)
      ctx.fillRect(x, y + 2, 2, 2)
    }
  }
  ctx.globalAlpha = 1
}

// Flat ground band with sparse texture flecks.
export function drawGround(
  ctx,
  { w, h, seed = 'ground', from = 0.82, color = PALETTE.d, fleck = PALETTE.e, cell = 4 }
) {
  const rand = seeded(seed)
  const top = Math.floor((h * from) / cell) * cell
  ctx.fillStyle = color
  ctx.fillRect(0, top, w, h - top)
  ctx.fillStyle = fleck
  for (let x = 0; x < w; x += cell) {
    for (let y = top; y < h; y += cell) {
      if (rand() < 0.07) ctx.fillRect(x, y, cell, cell)
    }
  }
  return top
}
