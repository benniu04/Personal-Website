import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { STOPS } from '../data/stops.js'
import { rig, uAt } from '../journey/journeyStore.js'
import { heightAt } from './terrain.js'

const LAST = STOPS.length - 1
const points = (key) => STOPS.map((s) => new THREE.Vector3(...s[key]))
// Centripetal splines pass through every keyframe without overshooting, and
// getPoint (not getPointAt) lands exactly on keyframe i at t = i / LAST.
const camPath = new THREE.CatmullRomCurve3(points('cam'), false, 'centripetal')
const lookPath = new THREE.CatmullRomCurve3(points('look'), false, 'centripetal')
const look = new THREE.Vector3()

const BASE_FOV = 38
const MIN_HFOV = THREE.MathUtils.degToRad(36) // keep landmarks in frame on tall, narrow screens
const STIFFNESS = 4
const CLEARANCE = 1.6

// Fade the canvas back in after a jump cut, so a cut reads as intended.
function cut(canvas) {
  canvas.style.transition = 'none'
  canvas.style.opacity = '0'
  requestAnimationFrame(() => {
    canvas.style.transition = 'opacity 0.5s ease'
    canvas.style.opacity = '1'
  })
}

export default function CameraRig({ reduced, onReady }) {
  const invalidate = useThree((s) => s.invalidate)
  const started = useRef(false)
  const perf = useRef({ frames: 0, time: 0, done: false })

  useEffect(() => {
    const wake = () => invalidate()
    window.addEventListener('scroll', wake, { passive: true })
    return () => window.removeEventListener('scroll', wake)
  }, [invalidate])

  useEffect(() => () => void (rig.ready = false), [])

  useFrame((state, delta) => {
    const { camera, size, gl } = state
    let target = uAt(Math.max(0, window.scrollY))
    // Reduced motion: no travelling shots, just cut from stop to stop
    if (reduced) target = Math.round(target)

    const gap = Math.abs(target - rig.u)
    if (!started.current) {
      rig.u = target // also covers deep links and restored scroll positions
    } else if (reduced ? gap > 0 : gap > 1.5) {
      rig.u = target
      cut(gl.domElement)
    } else {
      rig.u = THREE.MathUtils.damp(rig.u, target, STIFFNESS, Math.min(delta, 1 / 30))
      if (gap < 1e-4) rig.u = target
    }

    const t = THREE.MathUtils.clamp(rig.u / LAST, 0, 1)
    camPath.getPoint(t, camera.position)
    lookPath.getPoint(t, look)
    const floor = heightAt(camera.position.x, camera.position.z) + CLEARANCE
    if (camera.position.y < floor) camera.position.y = floor
    camera.lookAt(look)

    // Widen the lens on narrow screens, then slide the picture clear of the text
    const aspect = size.width / size.height
    const portrait = aspect < 0.9
    const hfov = 2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(BASE_FOV) / 2) * aspect)
    camera.fov =
      hfov < MIN_HFOV ? Math.min(72, THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(MIN_HFOV / 2) / aspect))) : BASE_FOV

    const i = Math.min(LAST - 1, Math.floor(rig.u))
    const f = THREE.MathUtils.clamp(rig.u - i, 0, 1)
    const a = STOPS[i].shift[portrait ? 1 : 0]
    const b = STOPS[i + 1].shift[portrait ? 1 : 0]
    const sx = a[0] + (b[0] - a[0]) * f
    const sy = a[1] + (b[1] - a[1]) * f
    camera.setViewOffset(size.width, size.height, -sx * size.width, -sy * size.height, size.width, size.height)

    if (!started.current) {
      started.current = true
      rig.ready = true
      onReady?.()
    }

    // If the first travelling frames are slow, trade sharpness for smoothness
    const p = perf.current
    if (!p.done && gap > 1e-3) {
      p.frames++
      if (p.frames > 20) p.time += delta
      if (p.frames === 80) {
        p.done = true
        if (p.time / 60 > 0.028) state.setDpr(1)
      }
    }

    if (Math.abs(target - rig.u) > 1e-4) invalidate()
  })

  return null
}
