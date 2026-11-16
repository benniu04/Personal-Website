// Bakes the page's HTML into dist/index.html so the text is there before any
// JavaScript runs: readable on slow connections, by crawlers and in link previews.
// The 3D island still loads afterwards and hydrates on top.
import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const htmlPath = `${root}dist/index.html`
const MARKER = '<!--app-->'

const { render } = await import(pathToFileURL(`${root}dist-ssr/entry-server.js`).href)
const html = await readFile(htmlPath, 'utf8')
if (!html.includes(MARKER)) throw new Error(`prerender: ${MARKER} not found in dist/index.html`)

await writeFile(htmlPath, html.replace(MARKER, render()))
await rm(`${root}dist-ssr`, { recursive: true, force: true })
console.log('prerendered dist/index.html')
