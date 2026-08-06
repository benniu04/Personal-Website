export function SectionHeading({ eyebrow, title, subtitle, center = false, dark = false, className = '' }) {
  return (
    <div className={`${center ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <p className={`eyebrow mb-5 ${dark ? 'text-linen/70' : 'text-rust'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display font-light text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] tracking-[-0.01em] ${dark ? 'text-linen' : 'text-ink'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-lg leading-relaxed max-w-2xl ${center ? 'mx-auto' : ''} ${dark ? 'text-linen/80' : 'text-cocoa'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionHeading
