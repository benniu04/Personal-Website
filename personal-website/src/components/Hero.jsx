import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import PixelField from './PixelField'

const rise = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ember via-rust-deep to-rust">
      <PixelField
        palette="rust"
        apex="bottom-right"
        cols={26}
        rows={18}
        className="pointer-events-none absolute -right-10 bottom-0 w-[52rem] max-w-[90vw]"
      />

      <div className="relative max-w-site mx-auto px-6 pt-44 pb-32 md:pt-56 md:pb-44">
        <motion.p {...rise(0)} className="eyebrow text-linen/75 mb-7">
          Full-stack · Design-minded · Boston, MA
        </motion.p>

        <motion.h1
          {...rise(0.12)}
          className="font-display font-light text-linen text-[clamp(2.75rem,7vw,5.25rem)] leading-[1.04] tracking-[-0.015em] max-w-4xl"
        >
          Building software
          <br />
          worth a second look
        </motion.h1>

        <motion.p {...rise(0.24)} className="mt-8 max-w-xl text-lg leading-relaxed text-linen/85">
          I'm Ben Niu, a computer science and finance student at Northeastern,
          building full-stack products and exploring where thoughtful design
          meets engineering.
        </motion.p>

        <motion.div {...rise(0.36)} className="mt-12 flex flex-wrap gap-4">
          <Link to="/work" className="btn-linen">
            View work
          </Link>
          <a href="mailto:nub38bn@gmail.com" className="btn-outline-linen">
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
