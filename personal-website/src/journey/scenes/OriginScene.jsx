import { SceneCanvas } from '../../pixel/SceneCanvas'
import { ParallaxLayer } from '../ParallaxLayer'
import { drawClouds, drawGround } from '../../pixel/generators'
import { drawSprite } from '../../pixel/drawSprite'
import { HOUSE, PINE, SMOKE_PUFF } from '../../pixel/sprites'

const W = 640
const H = 360

function drawConnecticut(ctx, { w, h }) {
  drawClouds(ctx, { w, h, seed: 'origin-clouds', count: 4 })
  const groundTop = drawGround(ctx, { w, h, seed: 'origin-ground', from: 0.86 })

  // childhood house on the right, smoke drifting from the chimney
  const houseScale = 5
  const houseH = HOUSE.length * houseScale
  const houseX = w * 0.64
  const houseY = groundTop - houseH
  drawSprite(ctx, HOUSE, houseX, houseY, houseScale)
  drawSprite(ctx, SMOKE_PUFF, houseX + 18.5 * houseScale, houseY - 3 * houseScale, 2)
  drawSprite(ctx, SMOKE_PUFF, houseX + 19.5 * houseScale, houseY - 6 * houseScale, 3)

  // pines flanking the yard
  drawSprite(ctx, PINE, w * 0.5, groundTop - PINE.length * 4, 4)
  drawSprite(ctx, PINE, w * 0.95, groundTop - PINE.length * 3, 3)
  drawSprite(ctx, PINE, w * 0.06, groundTop - PINE.length * 3, 3)
}

// Connecticut countryside: quiet sky, a cottage with chimney smoke, pines.
export function OriginScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <ParallaxLayer speed={-0.03}>
        <SceneCanvas draw={drawConnecticut} width={W} height={H} className="w-full h-full object-cover object-bottom" />
      </ParallaxLayer>
    </div>
  )
}

export default OriginScene
