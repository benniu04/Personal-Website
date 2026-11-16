import { useEffect, useRef } from 'react'

let io = null
function observe(el) {
  io ??= new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-in')
        io.unobserve(entry.target)
      })
    },
    { rootMargin: '0px 0px -12% 0px' },
  )
  io.observe(el)
  return () => io.unobserve(el)
}

// Fades its child up once, the first time it scrolls into view.
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null)
  useEffect(() => observe(ref.current), [])
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined} {...rest}>
      {children}
    </Tag>
  )
}
