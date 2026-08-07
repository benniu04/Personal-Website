// Game dialog box: parchment surface with a pixel border. Every block of
// readable text in the journey sits on one of these, so contrast never
// depends on what the scene paints behind it.
export function DialogPanel({ label, className = '', children }) {
  return (
    <div className={`pixel-panel p-6 md:p-8 ${className}`}>
      {label && (
        <p className="font-pixel text-[0.6875rem] uppercase tracking-[0.1em] text-rust mb-4">
          {label}
        </p>
      )}
      {children}
    </div>
  )
}

export default DialogPanel
