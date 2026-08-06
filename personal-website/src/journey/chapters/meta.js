// Single source of truth for chapter order — JourneyPage renders in this
// order and ChapterNav links against it.
export const CHAPTERS = [
  { id: 'start', label: 'Title Screen', nav: 'Start' },
  { id: 'origin', label: 'Chapter 1 · Connecticut', nav: 'Origin' },
  { id: 'boston', label: 'Chapter 2 · Boston', nav: 'Boston' },
  { id: 'experience', label: 'Chapter 3 · The Co-op Levels', nav: 'Experience' },
  { id: 'projects', label: 'Chapter 4 · Side Quests', nav: 'Projects' },
  { id: 'toolkit', label: 'Chapter 5 · Inventory', nav: 'Toolkit' },
  { id: 'hobbies', label: 'Chapter 6 · Rest Stops', nav: 'Hobbies' },
  { id: 'setup', label: 'Chapter 7 · The Rig', nav: 'Setup' },
  { id: 'commits', label: 'Chapter 8 · Quest Log', nav: 'Commits' },
  { id: 'contact', label: 'Final Chapter · Save Point', nav: 'Contact' },
]
