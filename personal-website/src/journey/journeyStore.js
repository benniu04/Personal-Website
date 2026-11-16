// Scroll position -> journey parameter `u`, shared by the DOM and the 3D camera
// without going through React. u = 0 is the first stop, 1 the second, and so on;
// fractions are the travel between them.
//
// Each stop is a card in the document. The camera should have arrived by the time
// a card's top is 70% down the viewport, and may leave once its bottom has risen
// to 40%. Those per-card breakpoints are re-measured whenever a card resizes, so
// text and landmark stay in step at any viewport size or content length.

const ARRIVE = 0.7
const DEPART = 0.4
const MIN_TRAVEL = 0.35 // of a viewport, kept free between two stops
export const DRIFT = 0.12 // how far the camera eases onward while a card is read

const els = []
let bps = []
let active = 0
let observer = null
let frame = 0
let lastWidth = 0
let listening = false
const listeners = new Set()

// Written by the camera rig, read by the debug overlay and the tests.
export const rig = { u: 0, ready: false }

const clamp01 = (t) => Math.min(1, Math.max(0, t))
const smoother = (t) => t * t * t * (t * (t * 6 - 15) + 10)

export function measure() {
  const H = window.innerHeight
  const y0 = window.scrollY
  const list = els.filter(Boolean)
  bps = list.map((el) => {
    const r = el.getBoundingClientRect()
    return { enter: r.top + y0 - ARRIVE * H, leave: r.bottom + y0 - DEPART * H }
  })
  if (!bps.length) return
  bps[0].enter = 0
  bps.forEach((bp, i) => {
    const next = bps[i + 1]
    if (!next) bp.leave = Infinity
    else bp.leave = Math.max(bp.enter + 1, Math.min(bp.leave, next.enter - MIN_TRAVEL * H))
  })
  update()
}

export function uAt(y) {
  if (!bps.length) return 0
  let i = 0
  while (i < bps.length - 1 && y >= bps[i + 1].enter) i++
  const bp = bps[i]
  if (y <= bp.enter) return i
  if (bp.leave === Infinity) return i
  if (y <= bp.leave) return i + DRIFT * clamp01((y - bp.enter) / (bp.leave - bp.enter))
  const t = clamp01((y - bp.leave) / (bps[i + 1].enter - bp.leave))
  return i + DRIFT + (1 - DRIFT) * smoother(t)
}

function update() {
  const next = Math.round(uAt(window.scrollY))
  if (next !== active) {
    active = next
    listeners.forEach((fn) => fn())
  }
}

function schedule() {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = 0
    measure()
  })
}

function listen() {
  if (listening) return
  listening = true
  lastWidth = window.innerWidth
  window.addEventListener('scroll', update, { passive: true })
  // Ignore height-only changes: on phones that is just the address bar.
  window.addEventListener('resize', () => {
    if (window.innerWidth === lastWidth) return
    lastWidth = window.innerWidth
    schedule()
  })
  window.addEventListener('orientationchange', schedule)
  document.fonts?.ready.then(schedule)
}

export function register(index, el) {
  els[index] = el
  observer ??= new ResizeObserver(schedule)
  observer.observe(el)
  listen()
  schedule()
  return () => {
    observer.unobserve(el)
    if (els[index] === el) els[index] = null
  }
}

export function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export const getActive = () => active
export const getBreakpoints = () => bps
