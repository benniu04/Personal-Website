import { ChapterNav } from './ChapterNav'
import { Avatar } from './Avatar'
import { TitleScene } from './scenes/TitleScene'
import { OriginScene } from './scenes/OriginScene'
import { BostonScene } from './scenes/BostonScene'
import { CampfireScene } from './scenes/CampfireScene'
import { TitleChapter } from './chapters/TitleChapter'
import { OriginChapter } from './chapters/OriginChapter'
import { BostonChapter } from './chapters/BostonChapter'
import { ExperienceChapter } from './chapters/ExperienceChapter'
import { ProjectsChapter } from './chapters/ProjectsChapter'
import { ToolkitChapter } from './chapters/ToolkitChapter'
import { HobbiesChapter } from './chapters/HobbiesChapter'
import { SetupChapter } from './chapters/SetupChapter'
import { CommitsChapter } from './chapters/CommitsChapter'
import { ContactChapter } from './chapters/ContactChapter'

// The whole site as one scrollable journey. Chapter order must match
// src/journey/chapters/meta.js.
export function JourneyPage() {
  return (
    <>
      <a
        href="#start"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-parchment focus:text-ink focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.14em] focus:px-4 focus:py-3 focus:border-2 focus:border-ink"
      >
        Skip to content
      </a>
      <a
        href="#contact"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-40 focus:z-[60] focus:bg-parchment focus:text-ink focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.14em] focus:px-4 focus:py-3 focus:border-2 focus:border-ink"
      >
        Skip journey — jump to contact
      </a>

      <ChapterNav />
      <Avatar />

      <main>
        <TitleChapter scene={<TitleScene />} />
        <OriginChapter scene={<OriginScene />} />
        <BostonChapter scene={<BostonScene />} />
        <ExperienceChapter />
        <ProjectsChapter />
        <ToolkitChapter />
        <HobbiesChapter />
        <SetupChapter />
        <CommitsChapter />
        <ContactChapter scene={<CampfireScene />} />
      </main>
    </>
  )
}

export default JourneyPage
