import { Component, lazy, Suspense, useEffect, useState } from 'react'
import { useReducedMotionPref } from '../hooks/useReducedMotionPref.js'
import { supportsWebGL } from '../hooks/webgl.js'

const IslandCanvas = lazy(() => import('../island/IslandCanvas.jsx'))

// If the 3D chunk fails to load or the scene throws, fall back to the still.
class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    this.props.onFail()
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

function Still() {
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      src="/images/island-still.webp"
      alt=""
      onLoad={() => setLoaded(true)}
      ref={(img) => img?.complete && img.naturalWidth > 0 && setLoaded(true)}
      className={`backdrop-layer h-full w-full object-cover ${loaded ? 'is-ready' : ''}`}
    />
  )
}

// The fixed scene behind the page. The text never waits on it: the sky gradient
// paints first, then either the live island or a still image fades in over it.
export default function Backdrop() {
  const reduced = useReducedMotionPref()
  const [mode, setMode] = useState('pending') // pending | live | still
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!supportsWebGL() || navigator.connection?.saveData) {
      setMode('still')
      return
    }
    const start = () => setMode('live')
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(start, { timeout: 1200 })
      return () => cancelIdleCallback(id)
    }
    const id = setTimeout(start, 200)
    return () => clearTimeout(id)
  }, [])

  const fail = () => setMode('still')

  return (
    <div className="backdrop" aria-hidden="true">
      {mode === 'still' && <Still />}
      {mode === 'live' && (
        <SceneBoundary onFail={fail}>
          <Suspense fallback={null}>
            <div className={`backdrop-layer ${ready ? 'is-ready' : ''}`}>
              <IslandCanvas reduced={reduced} onReady={() => setReady(true)} onLost={fail} />
            </div>
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  )
}
