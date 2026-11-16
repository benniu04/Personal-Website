# Ben Niu · personal site

A single page where scrolling carries a camera around a small low-poly island, each stop
revealing a section: about, experience, projects, off the clock, contact.

Live: https://benniu.dev/

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build + prerendered HTML in dist/
npm run preview  # serve the build
npm run lint
```

## Where things are

| Path | What |
|---|---|
| `src/data/` | All content. `about.js`, `experience.js`, `projects.js` are the facts; `copy.js` is headings; `stops.js` is the journey order and camera keyframes. |
| `src/sections/` | One component per stop. Plain HTML and Tailwind. |
| `src/journey/journeyStore.js` | Maps scroll position to the journey parameter `u` (0 = first stop, 1 = second, ...) from each card's measured position. |
| `src/island/` | The 3D scene (three.js + react-three-fiber), loaded lazily. `terrain.js` shapes the island, `landmarks/` builds each stop's models, `palette.js` holds scene colours and the dawn-to-dusk sky. |
| `src/components/Backdrop.jsx` | Chooses between the live island and the still-image fallback. |
| `scripts/prerender.mjs` | Writes the page's HTML into `dist/index.html` at build time. |

## Editing content

Change the files in `src/data/`.
Adding a project with a `cover` shows its screenshot; leaving `cover` out renders a text-only row.

## Useful URL flags

- `?debug` shows the live journey parameter.
- `?gl=off` forces the no-WebGL fallback.
- `?gl=force` allows a software renderer (headless browsers).

To move a landmark, change its site in `src/island/layout.js`; to reframe a stop, change its
`cam` / `look` in `src/data/stops.js`. If the island's look changes, re-capture
`public/images/island-still.webp` and `island-og.jpg` from the hero view.
