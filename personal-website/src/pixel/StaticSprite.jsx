import { useEffect, useRef } from 'react'
import { drawSprite } from './drawSprite'

// A single sprite rendered once onto its own tiny canvas; size it with CSS
// (the pixelated upscale keeps it crisp).
export function StaticSprite({ map, className = '', flip = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.imageSmoothingEnabled = false
    ctx.clearRect(0, 0, map[0].length, map.length)
    drawSprite(ctx, map, 0, 0, 1, { flip })
  }, [map, flip])

  return (
    <canvas
      ref={canvasRef}
      width={map[0].length}
      height={map.length}
      className={`pixelated ${className}`}
      aria-hidden="true"
    />
  )
}

export default StaticSprite
