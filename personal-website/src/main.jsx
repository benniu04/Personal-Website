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

// Vercel Web Analytics: cookieless, page views only, no personal data.
// The script is served by Vercel itself, so it only exists in production.
if (import.meta.env.PROD) {
  window.va = window.va || ((...args) => (window.vaq = window.vaq || []).push(args))
  const script = document.createElement('script')
  script.defer = true
  script.src = '/_vercel/insights/script.js'
  document.head.appendChild(script)
}

if (new URLSearchParams(search).has('debug')) import('./journey/debug.js')
