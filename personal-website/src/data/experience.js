// Co-op "levels", ordered as the journey plays them: earliest first.
// `locked` marks a level that hasn't started yet.
export const EXPERIENCE = [
  {
    level: 1,
    dates: 'Feb 2025 – Dec 2025',
    role: 'Generative AI Developer Intern',
    company: 'Bizdeglo',
    notes: [
      'Automated discovery and normalization of 500+ venture capital fund profiles, cutting 20+ hours of manual research weekly with a Selenium-based pipeline.',
      'Designed and fine-tuned an investor prediction system using Python, generative models, and structured VC datasets, improving client targeting accuracy.',
      'Partnered with early-stage startups to scope requirements, build prototypes, and ship production AI tools used in fundraising workflows.',
    ],
    tags: ['JavaScript', 'Tailwind', 'MongoDB'],
  },
  {
    level: 2,
    dates: 'Jan 2026 – Present',
    role: 'Full Stack Developer Co-op',
    company: 'FuzionX Corporation',
    notes: [
      "Established the team's CI/CD pipeline with risk-tiered coverage enforcement (70-80% on HIPAA files, 20-40% global), Black formatting, Flake8 linting, and pytest-xdist parallelization that cut backend test runtime by ~2 minutes.",
      'Migrated website analytics from PostHog to Datadog RUM, consolidating analytics, logs, and monitoring into a unified platform and unlocking funnel analysis and UTM campaign tracking previously unavailable to the team.',
      'Refactored frontend data fetching from useEffect/fetch to TanStack Query with custom hooks, cutting data-layer code by 57% while eliminating redundant API calls and enabling automatic background refetching.',
      'Built authentication infrastructure integrating AWS Cognito with JWT-based session management, implementing secure token refresh, role-based access control, and protected route middleware across the application.',
    ],
  },
  {
    level: 3,
    dates: 'Jun 2026 – Aug 2026',
    role: 'Actuarial / AI Intern',
    company: 'Berkley Small Business Solutions',
    notes: ['Incoming Summer 2026.'],
    locked: true,
    lockedLabel: 'Unlocks Summer 2026',
  },
]
