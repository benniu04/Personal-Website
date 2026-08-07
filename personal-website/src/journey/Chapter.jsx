// Section shell for one chapter of the journey. The scene (canvas art) sits
// absolutely behind; all readable content stays in the DOM layer above it.
export function Chapter({
  id,
  label,
  title,
  scene = null,
  className = '',
  contentClassName = '',
  dark = false,
  children,
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative scroll-mt-10 overflow-hidden ${className}`}
    >
      {scene && (
        <div className="absolute inset-0" aria-hidden="true">
          {scene}
        </div>
      )}
      <div className={`relative z-10 max-w-site mx-auto px-6 py-20 md:py-28 ${contentClassName}`}>
        {title && (
          <header className="mb-10 md:mb-14">
            {label && (
              <p className={`font-pixel text-xs md:text-sm uppercase tracking-[0.1em] mb-4 ${dark ? 'text-linen/80' : 'text-rust'}`}>
                {label}
              </p>
            )}
            <h2
              id={`${id}-title`}
              className={`font-display font-light text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] ${dark ? 'text-linen' : 'text-ink'}`}
            >
              {title}
            </h2>
          </header>
        )}
        {children}
      </div>
    </section>
  )
}

export default Chapter
