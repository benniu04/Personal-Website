import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Links to the old multi-page site still land on the matching stop.
const LEGACY = [
  [/^\/work(\/|$)/, '#work'],
  [/^\/experience\/?$/, '#experience'],
  [/^\/about\/?$/, '#about'],
  [/^\/journey\/?$/, ''],
]
const { pathname, search, hash } = window.location
if (pathname !== '/') {
  const match = LEGACY.find(([pattern]) => pattern.test(pathname))
  window.history.replaceState(null, '', `/${search}${hash || match?.[1] || ''}`)
}

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production HTML is prerendered (scripts/prerender.mjs); dev starts empty.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)

if (new URLSearchParams(search).has('debug')) import('./journey/debug.js')
