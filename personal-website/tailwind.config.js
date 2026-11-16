/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sky: '#F3F1EC',     // page background behind the scene
        paper: '#FFFFFF',   // card surface
        ink: '#16191C',     // headings and body
        muted: '#566065',   // secondary text (6.4:1 on paper)
        line: '#E4E2DB',    // hairlines
        accent: '#C4441F',  // the one accent (5.0:1 on paper)
        'accent-soft': '#F8E9E2',
      },
      fontFamily: {
        display: ['Sentient', 'Georgia', 'serif'],
        sans: ['"Schibsted Grotesk"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
