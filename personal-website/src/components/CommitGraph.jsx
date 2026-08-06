import { useEffect, useState } from 'react'

// GitHub contribution heatmap rendered as a kin of the PixelField motif:
// columns are weeks, rows are days, API `level` 0–4 picks the rust step.
const LEVELS = ['#EADBCC', '#DDA77B', '#C16E38', '#9A4D22', '#763615']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const CELL = 11
const GAP = 3
const PITCH = CELL + GAP
const LABEL_H = 18 // room for month labels above the grid
const SKELETON_WEEKS = 53

const CACHE_KEY = 'gh-contributions'

function toWeeks(contributions) {
  // Pad the first column so rows always run Sun–Sat, like github.com.
  const offset = new Date(contributions[0].date + 'T00:00:00').getDay()
  const padded = [...Array(offset).fill(null), ...contributions]
  const weeks = []
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7))
  }
  return weeks
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
      if (col - lastLabelCol >= 3 && col <= weeks.length - 3) {
        labels.push({ col, text: MONTHS[month] })
        lastLabelCol = col
      }
      lastMonth = month
    }
  })
  return labels
}

function Grid({ weeks, labels = [], pulse = false }) {
  const width = weeks.length * PITCH - GAP
  const height = LABEL_H + 7 * PITCH - GAP

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`w-full h-auto ${pulse ? 'animate-pulse' : ''}`}
      role="img"
      aria-label="GitHub contribution activity over the last year"
    >
      {labels.map(({ col, text }) => (
        <text
          key={`${col}-${text}`}
          x={col * PITCH}
          y={10}
          className="font-mono uppercase"
          fontSize="10"
          letterSpacing="0.08em"
          fill="#8F6A58"
        >
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
              fill={LEVELS[day?.level ?? 0]}
            >
              {day && (
                <title>
                  {`${day.count} contribution${day.count === 1 ? '' : 's'} · ${date}`}
                </title>
              )}
            </rect>
          )
        })
      )}
    </svg>
  )
}

export function CommitGraph({ username }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const cached = sessionStorage.getItem(CACHE_KEY)
    if (cached) {
      setData(JSON.parse(cached))
      return
    }
    let cancelled = false
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => {
        if (cancelled) return
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(json))
        setData(json)
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })
    return () => {
      cancelled = true
    }
  }, [username])

  if (error) {
    return (
      <p className="text-cocoa">
        Commit activity unavailable.{' '}
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="link-quiet"
        >
          see GitHub ↗
        </a>
      </p>
    )
  }

  const weeks = data
    ? toWeeks(data.contributions)
    : Array.from({ length: SKELETON_WEEKS }, () => Array(7).fill(null))
  const labels = data ? monthLabels(weeks) : []
  const total = data?.total?.lastYear

  return (
    <div>
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[640px]">
          <Grid weeks={weeks} labels={labels} pulse={!data} />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-clay">
          Less
          {LEVELS.map((color) => (
            <span key={color} className="inline-block w-[11px] h-[11px]" style={{ backgroundColor: color }} />
          ))}
          More
        </p>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-clay hover:text-rust transition-colors"
        >
          {total != null && `${total} contributions in the last year · `}@{username} ↗
        </a>
      </div>
    </div>
  )
}

export default CommitGraph
