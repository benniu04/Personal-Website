import { SceneCanvas } from '../../pixel/SceneCanvas'
import { ParallaxLayer } from '../ParallaxLayer'
import { drawClouds, drawHills } from '../../pixel/generators'
import { drawSprite } from '../../pixel/drawSprite'
import { PINE } from '../../pixel/sprites'

const W = 640
const H = 360

function drawSky(ctx, { w, h }) {
  drawClouds(ctx, { w, h, seed: 'title-clouds', count: 6 })
}

function drawLand(ctx, { w, h }) {
  drawHills(ctx, { w, h, seed: 'title-hills', base: 0.72, cell: 4 })
  // a stand of pines on the first ridge, marking the trailhead
  drawSprite(ctx, PINE, w * 0.08, h * 0.66, 3)
  drawSprite(ctx, PINE, w * 0.16, h * 0.7, 2)
  drawSprite(ctx, PINE, w * 0.86, h * 0.68, 3)
  drawSprite(ctx, PINE, w * 0.93, h * 0.72, 2)
}

// Title screen backdrop: cream sky, drifting clouds, rust ridgelines.
export function TitleScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-cream via-cream to-blush">
      <ParallaxLayer speed={0.03}>
        <SceneCanvas draw={drawSky} width={W} height={H} className="w-full h-full object-cover" />
      </ParallaxLayer>
      <ParallaxLayer speed={-0.04}>
        <SceneCanvas draw={drawLand} width={W} height={H} className="w-full h-full object-cover object-bottom" />
      </ParallaxLayer>
    </div>
  )
}

export default TitleScene
