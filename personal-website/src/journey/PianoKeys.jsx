import { useEffect, useRef } from 'react'

// A playable octave of chiptune piano. Square-wave oscillators keep it on
// theme; every key is a real <button>, so it works by keyboard and screen
// reader too. Physical keys A–K (white) and W E T Y U (black) also play.
const WHITE_KEYS = [
  { note: 'C4', freq: 261.63, key: 'a' },
  { note: 'D4', freq: 293.66, key: 's' },
  { note: 'E4', freq: 329.63, key: 'd' },
  { note: 'F4', freq: 349.23, key: 'f' },
  { note: 'G4', freq: 392.0, key: 'g' },
  { note: 'A4', freq: 440.0, key: 'h' },
  { note: 'B4', freq: 493.88, key: 'j' },
  { note: 'C5', freq: 523.25, key: 'k' },
]

// Black keys sit after the white key at `after` (index into WHITE_KEYS).
const BLACK_KEYS = [
  { note: 'C#4', freq: 277.18, key: 'w', after: 0 },
  { note: 'D#4', freq: 311.13, key: 'e', after: 1 },
  { note: 'F#4', freq: 369.99, key: 't', after: 3 },
  { note: 'G#4', freq: 415.3, key: 'y', after: 4 },
  { note: 'A#4', freq: 466.16, key: 'u', after: 5 },
]

export function PianoKeys() {
  const audioRef = useRef(null)
  const buttonsRef = useRef({})
  const groupRef = useRef(null)
  const visibleRef = useRef(false)

  const play = (freq) => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    if (!audioRef.current) audioRef.current = new AudioCtx()
    const ctx = audioRef.current
    if (ctx.state === 'suspended') ctx.resume()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.value = freq
    const now = ctx.currentTime
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.1, now + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.5)
  }

  useEffect(() => {
    // Physical keys only play while the piano is actually on screen.
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting
    })
    if (groupRef.current) observer.observe(groupRef.current)

    const byKey = new Map(
      [...WHITE_KEYS, ...BLACK_KEYS].map((k) => [k.key, k])
    )
    const onKeyDown = (e) => {
      if (!visibleRef.current) return
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return
      const hit = byKey.get(e.key.toLowerCase())
      if (!hit) return
      play(hit.freq)
      const btn = buttonsRef.current[hit.note]
      if (btn) {
        btn.dataset.pressed = 'true'
        setTimeout(() => delete btn.dataset.pressed, 150)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      observer.disconnect()
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useEffect(() => () => audioRef.current?.close(), [])

  return (
    <div className="mt-8">
      <p className="font-pixel text-[0.6875rem] uppercase tracking-[0.1em] text-rust mb-3">
        The piano actually plays · try A–K
      </p>
      <div ref={groupRef} className="relative inline-flex" role="group" aria-label="Playable piano, one octave">
        {WHITE_KEYS.map((k) => (
          <button
            key={k.note}
            ref={(el) => (buttonsRef.current[k.note] = el)}
            type="button"
            onPointerDown={() => play(k.freq)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                play(k.freq)
              }
            }}
            aria-label={`Piano key ${k.note}`}
            className="w-9 h-24 md:h-28 bg-parchment border-2 border-ink -ml-[2px] first:ml-0 active:bg-blush data-[pressed]:bg-blush active:translate-y-[2px] data-[pressed]:translate-y-[2px] motion-reduce:translate-y-0"
          />
        ))}
        {BLACK_KEYS.map((k) => (
          <button
            key={k.note}
            ref={(el) => (buttonsRef.current[k.note] = el)}
            type="button"
            onPointerDown={() => play(k.freq)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                play(k.freq)
              }
            }}
            aria-label={`Piano key ${k.note}`}
            style={{ left: `${(k.after + 1) * 2.25 - 0.75}rem` }}
            className="absolute top-0 w-6 h-14 md:h-16 bg-ink border-2 border-ink z-10 active:bg-ember data-[pressed]:bg-ember active:translate-y-[2px] data-[pressed]:translate-y-[2px] motion-reduce:translate-y-0"
          />
        ))}
      </div>
    </div>
  )
}

export default PianoKeys
