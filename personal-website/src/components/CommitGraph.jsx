import { useEffect, useState } from 'react'

// GitHub contribution heatmap: columns are weeks, rows are days, and the API's
// `level` 0–4 picks the step on the accent ramp.
const LEVELS = ['#ECEAE4', '#F3CDBF', '#E79E85', '#D56B48', '#B8421F']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const CELL = 11
const GAP = 3
const PITCH = CELL + GAP
const LABEL_H = 18 // room for month labels above the grid
const WEEKS = 30 // about seven months: what fits a card without sideways scrolling

const CACHE_KEY = 'gh-contributions'
const TIMEOUT_MS = 8000

function toWeeks(contributions) {
  // Pad the first column so rows always run Sun–Sat, like github.com.
  const offset = new Date(contributions[0].date + 'T00:00:00').getDay()
  const padded = [...Array(offset).fill(null), ...contributions]
  const weeks = []
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7))
  }
  return weeks.slice(-WEEKS)
}

function monthLabels(weeks) {
  const labels = []
  let lastMonth = -1
  let lastLabelCol = -3
  weeks.forEach((week, col) => {
    const firstDay = week.find(Boolean)
    if (!firstDay) return
    const month = new Date(firstDay.date + 'T00:00:00').getMonth()
    if (month !== lastMonth) {
      // skip labels that would collide with the previous one or clip at the right edge
      if (col - lastLabelCol >= 3 && col <= weeks.length - 2) {
        labels.push({ col, text: MONTHS[month] })
        lastLabelCol = col
      }
      lastMonth = month
    }
  })
  return labels
}

function readCache() {
  try {
    const json = JSON.parse(sessionStorage.getItem(CACHE_KEY))
    return Array.isArray(json?.contributions) && json.contributions.length ? json : null
  } catch {
    return null
  }
}

function Grid({ weeks, labels = [], pulse = false }) {
  const width = weeks.length * PITCH - GAP
  const height = LABEL_H + 7 * PITCH - GAP

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`h-auto w-full ${pulse ? 'motion-safe:animate-pulse' : ''}`}
      role="img"
      aria-label={pulse ? 'Loading GitHub contribution activity' : 'GitHub contribution activity over recent months'}
    >
      {labels.map(({ col, text }) => (
        <text key={`${col}-${text}`} x={col * PITCH} y={10} fontSize="9.5" fill="#566065">
          {text}
        </text>
      ))}
      {weeks.map((week, col) =>
        week.map((day, row) => {
          if (!day && !pulse) return null
          const date = day
            ? new Date(day.date + 'T00:00:00').toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : null
          return (
            <rect
              key={`${col}-${row}`}
              x={col * PITCH}
              y={LABEL_H + row * PITCH}
              width={CELL}
              height={CELL}
              rx={2.5}
              fill={LEVELS[day?.level ?? 0]}
            >
              {day && <title>{`${day.count} contribution${day.count === 1 ? '' : 's'} · ${date}`}</title>}
            </rect>
          )
        }),
      )}
    </svg>
  )
}

export default function CommitGraph({ username }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const cached = readCache()
    if (cached) {
      setData(cached)
      return
    }
    let cancelled = false
    const controller = new AbortController()
    // Without this the skeleton would pulse forever if the third-party API hangs
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => {
        if (!Array.isArray(json?.contributions) || !json.contributions.length) throw new Error('empty')
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(json))
        } catch {
          // storage full or blocked: the graph still renders
        }
        if (!cancelled) setData(json)
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })
      .finally(() => clearTimeout(timer))
    return () => {
      cancelled = true
      clearTimeout(timer)
      controller.abort()
    }
  }, [username])

  const profile = `https://github.com/${username}`

  if (error) {
    return (
      <p className="text-[0.9375rem] text-muted">
        Commit activity is unavailable right now.{' '}
        <a href={profile} target="_blank" rel="noopener noreferrer" className="link text-ink">
          See GitHub <span aria-hidden="true">↗</span>
        </a>
      </p>
    )
  }

  const weeks = data ? toWeeks(data.contributions) : Array.from({ length: WEEKS }, () => Array(7).fill(null))
  const total = data?.total?.lastYear

  return (
    <div>
      <Grid weeks={weeks} labels={data ? monthLabels(weeks) : []} pulse={!data} />
      <div className="mt-4 flex min-h-[1.25rem] flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[0.8125rem] text-muted">
        <p className="flex items-center gap-1.5">
          Less
          {LEVELS.map((color) => (
            <span key={color} className="inline-block h-[11px] w-[11px] rounded-[3px]" style={{ backgroundColor: color }} />
          ))}
          More
        </p>
        <a href={profile} target="_blank" rel="noopener noreferrer" className="link">
          {total != null && `${total} contributions in the last year · `}@{username} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  )
}
