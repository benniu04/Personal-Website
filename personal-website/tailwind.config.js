/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F6EBE0',      // page background
        blush: '#F1DFD1',      // alternate section band
        parchment: '#FBF5EE',  // card surface
        ink: '#43261A',        // headings on light
        cocoa: '#5F4037',      // body text on light, footer background
        clay: '#8F6A58',       // muted text on light
        rust: '#A24A21',       // accent
        'rust-deep': '#7E3616',
        ember: '#5C2812',      // darkest hero shade
        linen: '#EEDFD1',      // text on dark surfaces
        hairline: '#E3D0BF',   // borders on light
        'hairline-dark': '#7A584A', // borders on cocoa
      },
      fontFamily: {
        display: ['Sentient', 'Georgia', 'serif'],
        sans: ['"Schibsted Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"Spline Sans Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        site: '72rem',
      },
    },
  },
  plugins: [],
}
