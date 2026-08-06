import { useEffect, useRef } from 'react'

// A pixel-art backdrop canvas. The backing store stays at the low logical
// resolution passed in; CSS upscales it with image-rendering: pixelated.
// Drawing happens once, lazily, when the canvas first approaches the
// viewport — after that it is a static bitmap the compositor can move freely.
export function SceneCanvas({ draw, width = 480, height = 270, className = '', style }) {
  const canvasRef = useRef(null)
  const drawnRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || drawnRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || drawnRef.current) return
        drawnRef.current = true
        const ctx = canvas.getContext('2d')
        ctx.imageSmoothingEnabled = false
        draw(ctx, { w: width, h: height })
        observer.disconnect()
      },
      { rootMargin: '75% 0px' }
    )
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [draw, width, height])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`pixelated ${className}`}
      style={style}
      aria-hidden="true"
    />
  )
}

export default SceneCanvas
