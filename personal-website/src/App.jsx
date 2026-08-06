import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import JourneyPage from './journey/JourneyPage'
import ProjectDetail from './pages/ProjectDetail'
import './App.css'

// The 3D world pulls in three.js — keep it out of the 2D journey's bundle.
const WorldPage = lazy(() => import('./world/WorldPage'))

function WorldLoading() {
  return (
    <div className="fixed inset-0 bg-cream flex items-center justify-center">
      <p className="font-pixel text-sm uppercase tracking-[0.1em] text-ink animate-px-blink">
        Loading world…
      </p>
    </div>
  )
}

// Scrolls to the hash target when one is present (e.g. redirects from old
// routes land on /#projects), otherwise resets to the top on navigation.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<WorldLoading />}>
              <WorldPage />
            </Suspense>
          }
        />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
        {/* Old routes live on as fast-travel points into the 2D journey */}
        <Route path="/work" element={<Navigate to="/journey#projects" replace />} />
        <Route path="/experience" element={<Navigate to="/journey#experience" replace />} />
        <Route path="/about" element={<Navigate to="/journey#boston" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
