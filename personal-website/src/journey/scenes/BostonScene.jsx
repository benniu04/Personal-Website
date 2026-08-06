import { SceneCanvas } from '../../pixel/SceneCanvas'
import { ParallaxLayer } from '../ParallaxLayer'
import { drawSkyline, drawClouds, drawGround } from '../../pixel/generators'
import { drawSprite } from '../../pixel/drawSprite'
import { CAMPUS_HALL } from '../../pixel/sprites'
import { PALETTE } from '../../pixel/palette'

const W = 640
const H = 360

function drawCity(ctx, { w, h }) {
  drawClouds(ctx, { w, h, seed: 'boston-clouds', count: 3, color: PALETTE.P })
  // skyline silhouette across the bottom, clay behind cocoa for depth
  drawSkyline(ctx, { w, h: h * 0.92, seed: 'boston-back', color: PALETTE.Y, litChance: 0.08, cell: 4 })
  drawSkyline(ctx, { w, h, seed: 'boston-front', color: PALETTE.C, litChance: 0.2, cell: 4 })
}

function drawCampus(ctx, { w, h }) {
  const groundTop = drawGround(ctx, { w, h, seed: 'campus-ground', from: 0.9 })
  const scale = 5
  drawSprite(ctx, CAMPUS_HALL, w * 0.66, groundTop - CAMPUS_HALL.length * scale, scale)
}

// Boston: layered skyline behind, the campus hall up front.
export function BostonScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <ParallaxLayer speed={0.05}>
        <SceneCanvas draw={drawCity} width={W} height={H} className="w-full h-full object-cover object-bottom opacity-70" />
      </ParallaxLayer>
      <ParallaxLayer speed={-0.03}>
        <SceneCanvas draw={drawCampus} width={W} height={H} className="w-full h-full object-cover object-bottom" />
      </ParallaxLayer>
    </div>
  )
}

export default BostonScene
