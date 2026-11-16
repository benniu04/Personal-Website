// `?gl=off` forces the static fallback; `?gl=force` accepts a software renderer
// (headless browsers), which is otherwise treated as "no WebGL" because the
// scene would crawl.
export function supportsWebGL() {
  const flag = new URLSearchParams(window.location.search).get('gl')
  if (flag === 'off') return false
  try {
    const canvas = document.createElement('canvas')
    const opts = { failIfMajorPerformanceCaveat: flag !== 'force' }
    return !!(canvas.getContext('webgl2', opts) || canvas.getContext('webgl', opts))
  } catch {
    return false
  }
}
