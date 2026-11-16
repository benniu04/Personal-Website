// `?debug`: live readout of the journey parameter, and a handle for scripted checks.
import { getActive, getBreakpoints, rig, uAt } from './journeyStore.js'

const el = document.createElement('pre')
el.style.cssText =
  'position:fixed;left:8px;bottom:8px;z-index:99;margin:0;padding:6px 8px;font:11px/1.4 ui-monospace,monospace;background:#16191cd9;color:#fff;border-radius:6px;pointer-events:none'
document.body.append(el)

window.__journey = {
  get target() { return uAt(window.scrollY) },
  get u() { return rig.u },
  get ready() { return rig.ready },
  get active() { return getActive() },
  get breakpoints() { return getBreakpoints() },
}

const tick = () => {
  el.textContent = `target ${uAt(window.scrollY).toFixed(3)}\ncamera ${rig.u.toFixed(3)}\nactive ${getActive()}`
  requestAnimationFrame(tick)
}
tick()
