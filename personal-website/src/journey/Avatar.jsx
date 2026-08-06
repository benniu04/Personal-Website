import { useEffect, useRef } from 'react'
import { useScroll, useMotionValueEvent } from 'motion/react'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref'
import { drawSprite } from '../pixel/drawSprite'
import {
  AVATAR_IDLE,
  AVATAR_WALK,
  SUITCASE,
  BACKPACK,
  LAPTOP_HELD,
  CONTROLLER,
} from '../pixel/sprites'
import { CHAPTERS } from './chapters/meta'

// What the traveler carries in each chapter of the journey.
const ACCESSORY = {
  start: SUITCASE,
  origin: SUITCASE,
  boston: BACKPACK,
  experience: BACKPACK,
  projects: LAPTOP_HELD,
  toolkit: LAPTOP_HELD,
  hobbies: null,
  setup: CONTROLLER,
  commits: LAPTOP_HELD,
  contact: null, // the campfire scene draws its own sitting avatar
}

const CANVAS_W = 24
const CANVAS_H = 19
const STEP_PX = 48 // scroll distance per walk frame

// The little traveler fixed to the bottom-left of the viewport. Scrolling
// advances the walk cycle; scroll direction flips the sprite; the accessory
// swaps as chapters pass. All drawing runs through refs — zero re-renders.
export function Avatar() {
  const canvasRef = useRef(null)
  const reduce = useReducedMotionPref()
  const stateRef = useRef({ frame: 0, flip: false, walking: false, chapter: 'start', idleTimer: 0 })
  const { scrollY } = useScroll()

  const render = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const s = stateRef.current
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = false
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)

    const accessory = ACCESSORY[s.chapter]
    if (accessory) {
      const ax = s.flip ? CANVAS_W - accessory[0].length : 0
      drawSprite(ctx, accessory, ax, CANVAS_H - accessory.length, 1)
    }
    const map = s.walking && !reduce ? AVATAR_WALK[s.frame % AVATAR_WALK.length] : AVATAR_IDLE
    drawSprite(ctx, map, 6, CANVAS_H - AVATAR_IDLE.length, 1, { flip: s.flip })

    canvas.style.opacity = s.chapter === 'contact' ? '0' : '1'
  }

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (reduce) return
    const s = stateRef.current
    const prev = scrollY.getPrevious() ?? latest
    const delta = latest - prev
    if (delta !== 0) {
      s.flip = delta < 0
      s.frame = Math.floor(latest / STEP_PX)
      s.walking = true
      render()
      window.clearTimeout(s.idleTimer)
      s.idleTimer = window.setTimeout(() => {
        s.walking = false
        render()
      }, 140)
    }
  })

  useEffect(() => {
    // Track the active chapter for accessory swaps (mirrors ChapterNav).
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            stateRef.current.chapter = entry.target.id
            render()
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    sections.forEach((sec) => observer.observe(sec))
    render()
    const state = stateRef.current
    return () => {
      observer.disconnect()
      window.clearTimeout(state.idleTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce])

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_W}
      height={CANVAS_H}
      className="pixelated animate-px-bob fixed bottom-2 left-2 md:bottom-3 md:left-4 z-30 w-16 md:w-24 pointer-events-none transition-opacity duration-500"
      aria-hidden="true"
    />
  )
}

export default Avatar
