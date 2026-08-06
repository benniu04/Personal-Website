import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import JourneyPage from './journey/JourneyPage'
import ProjectDetail from './pages/ProjectDetail'
import './App.css'

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
        <Route path="/" element={<JourneyPage />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
        {/* Old routes live on as fast-travel points into the journey */}
        <Route path="/work" element={<Navigate to="/#projects" replace />} />
        <Route path="/experience" element={<Navigate to="/#experience" replace />} />
        <Route path="/about" element={<Navigate to="/#boston" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
