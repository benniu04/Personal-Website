import { useEffect } from 'react'

const KEYMAP = {
  w: 'up', arrowup: 'up',
  s: 'down', arrowdown: 'down',
  a: 'left', arrowleft: 'left',
  d: 'right', arrowright: 'right',
}

// Writes a normalized move vector into inputRef from WASD/arrows.
// Disabled while a story panel is open (Esc handling lives with the panel).
export function useKeyboardInput(inputRef, { enabled = true, onInteract } = {}) {
  useEffect(() => {
    const held = new Set()

    const apply = () => {
      let x = 0
      let z = 0
      if (held.has('up')) z -= 1
      if (held.has('down')) z += 1
      if (held.has('left')) x -= 1
      if (held.has('right')) x += 1
      const len = Math.hypot(x, z) || 1
      inputRef.current.x = x / len
      inputRef.current.z = z / len
    }

    const onKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const key = e.key.toLowerCase()
      if (enabled && (key === 'e' || key === 'enter') && onInteract) {
        onInteract()
        return
      }
      const dir = KEYMAP[key]
      if (!dir) return
      e.preventDefault()
      if (!enabled) return
      held.add(dir)
      apply()
    }
    const onKeyUp = (e) => {
      const dir = KEYMAP[e.key.toLowerCase()]
      if (!dir) return
      held.delete(dir)
      apply()
    }
    const onBlur = () => {
      held.clear()
      apply()
    }

    if (!enabled) {
      held.clear()
      apply()
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [inputRef, enabled, onInteract])
}
