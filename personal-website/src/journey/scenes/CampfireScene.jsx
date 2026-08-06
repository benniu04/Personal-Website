import { useEffect, useRef } from 'react'
import { SceneCanvas } from '../../pixel/SceneCanvas'
import { drawStars } from '../../pixel/generators'
import { drawSprite } from '../../pixel/drawSprite'
import { AVATAR_SIT, CAMPFIRE_FRAMES, MONUMENT } from '../../pixel/sprites'
import { useReducedMotionPref } from '../../hooks/useReducedMotionPref'

function drawNightSky(ctx, { w, h }) {
  drawStars(ctx, { w, h, seed: 'save-point', count: 90, maxY: 0.7 })
}

// The one animated canvas in the journey: three flame frames, ticking only
// while on screen and never under reduced motion.
function Campfire() {
  const canvasRef = useRef(null)
  const reduce = useReducedMotionPref()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = false
    let frame = 0
    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawSprite(ctx, CAMPFIRE_FRAMES[frame % CAMPFIRE_FRAMES.length], 0, 0, 1)
    }
    drawFrame()
    if (reduce) return

    let visible = false
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    observer.observe(canvas)
    const timer = setInterval(() => {
      if (!visible) return
      frame += 1
      drawFrame()
    }, 260)
    return () => {
      observer.disconnect()
      clearInterval(timer)
    }
  }, [reduce])

  return <canvas ref={canvasRef} width={16} height={11} className="pixelated w-24 md:w-28" aria-hidden="true" />
}

function StaticSprite({ map, className }) {
  const canvasRef = useRef(null)
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.imageSmoothingEnabled = false
    drawSprite(ctx, map, 0, 0, 1)
  }, [map])
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

// Save-point backdrop: stars over the dusk gradient, the traveler sitting by
// the fire beside a waypoint monument and a SAVE POINT sign.
export function CampfireScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <SceneCanvas draw={drawNightSky} width={640} height={360} className="w-full h-full object-cover" />
      <div className="absolute bottom-10 right-8 lg:right-20 hidden md:flex items-end gap-8">
        <StaticSprite map={MONUMENT} className="w-16 opacity-90" />
        <div className="flex flex-col items-center gap-2">
          <p className="font-pixel text-[0.6875rem] uppercase tracking-[0.1em] text-linen/90 bg-ember/80 border-2 border-linen/40 px-2 py-1">
            Save point
          </p>
          <div className="flex items-end gap-3">
            <StaticSprite map={AVATAR_SIT} className="w-14" />
            <Campfire />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampfireScene
