import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { STATIONS } from './stations'
import { useWorld } from './WorldContext'

// Touch d-pad + interact button; only rendered on coarse-pointer devices.
function MobileControls() {
  const { inputRef, nearStation, setOpenPanel } = useWorld()

  const hold = (x, z) => ({
    onPointerDown: (e) => {
      e.currentTarget.setPointerCapture(e.pointerId)
      inputRef.current.x = x
      inputRef.current.z = z
    },
    onPointerUp: () => {
      inputRef.current.x = 0
      inputRef.current.z = 0
    },
    onPointerCancel: () => {
      inputRef.current.x = 0
      inputRef.current.z = 0
    },
  })

  const btn =
    'w-12 h-12 flex items-center justify-center font-pixel text-lg text-ink bg-parchment/90 border-2 border-ink shadow-[2px_2px_0_0_#43261A] select-none touch-none'

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 flex items-end justify-between px-4 pointer-events-none">
      <div className="grid grid-cols-3 gap-1 pointer-events-auto" aria-hidden="true">
        <span />
        <button type="button" className={btn} {...hold(0, -1)}>▲</button>
        <span />
        <button type="button" className={btn} {...hold(-1, 0)}>◀</button>
        <button type="button" className={btn} {...hold(0, 1)}>▼</button>
        <button type="button" className={btn} {...hold(1, 0)}>▶</button>
      </div>
      {nearStation && (
        <button
          type="button"
          onClick={() => setOpenPanel(nearStation)}
          className="pointer-events-auto w-16 h-16 font-pixel text-xl text-linen bg-rust border-2 border-ink shadow-[3px_3px_0_0_#43261A]"
        >
          E
        </button>
      )}
    </div>
  )
}

// DOM chrome over the canvas: wordmark, 2D escape hatch, controls hint,
// interact prompt.
export function WorldHUD() {
  const { nearStation, openPanel } = useWorld()
  const [coarse, setCoarse] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    setCoarse(mq.matches)
    const onChange = (e) => setCoarse(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const station = STATIONS.find((s) => s.id === nearStation)

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-40 flex items-start justify-between px-4 md:px-6 pt-4 pointer-events-none">
        <p className="pointer-events-auto font-pixel text-sm text-ink bg-cream/90 border-2 border-ink px-3 py-1.5 shadow-[3px_3px_0_0_#43261A]">
          Ben Niu · World
        </p>
        <Link
          to="/journey"
          className="pointer-events-auto font-pixel text-xs md:text-sm text-linen bg-rust border-2 border-ink px-3 py-1.5 shadow-[3px_3px_0_0_#43261A] hover:bg-rust-deep"
        >
          Prefer scrolling? 2D version
        </Link>
      </div>

      {!coarse && (
        <p className="fixed bottom-4 left-4 z-40 font-pixel text-[0.6875rem] uppercase tracking-[0.08em] text-ink bg-cream/90 border-2 border-ink px-3 py-2 shadow-[2px_2px_0_0_#43261A]">
          WASD / arrows to walk · E to interact
        </p>
      )}

      {station && !openPanel && !coarse && (
        <div className="fixed bottom-4 inset-x-0 z-40 flex justify-center pointer-events-none">
          <p className="font-pixel text-xs text-linen bg-ember/90 border-2 border-linen/50 px-4 py-2.5 animate-px-blink-slow">
            <span className="text-rust bg-linen px-1.5 py-0.5 mr-2">E</span>
            {station.label}
          </p>
        </div>
      )}

      {coarse && <MobileControls />}
    </>
  )
}

export default WorldHUD
