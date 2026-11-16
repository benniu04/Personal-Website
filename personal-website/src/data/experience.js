// Newest first.
export const EXPERIENCE = [
  {
    dates: 'Jun 2026 – Aug 2026',
    role: 'Applied AI Engineer Intern',
    company: 'W. R. Berkley Corporation',
    notes: [
      'Built a Python Facebook data-enrichment integration that resolves a business’s page from its name and address to feed a downstream NAICS classification, summarization, and red-flag pipeline. Cut latency by 38% and SerpAPI calls 28% via a ranked candidate cap, lazy fallback search, and parallel profile fetching.',
      'Spearheaded a computer-vision pipeline using OpenAI vision on Google Street View and Solar/satellite imagery to auto-flag roof, structural, and housekeeping risks for an insurance underwriting API.',
      'Developed an LLM-guided web scraper that selects a site’s most informative pages before extracting content, cutting scraping and token costs while feeding cleaner input to the analysis pipeline.',
      'Partnered with commercial underwriters to validate an AI-powered property analysis pipeline across real locations, earning positive feedback from internal stakeholders on the detail and precision of its decision-support data.',
    ],
  },
  {
    dates: 'Jan 2026 – Jun 2026',
    role: 'Full Stack Developer Co-op',
    company: 'FuzionX Corporation',
    notes: [
      'Shipped 90+ reviewed PRs owning the frontend of a production clinical charting platform, including the patient list, session view, and tasks board, released behind Datadog feature flags to three academic medical centers.',
      'Migrated website analytics from PostHog to Datadog RUM, consolidating analytics, logs, and monitoring into a unified platform and unlocking funnel analysis and UTM campaign tracking previously unavailable to the team.',
      'Refactored frontend data fetching from useEffect/fetch to TanStack Query with custom hooks, cutting data-layer code by 57% while eliminating redundant API calls and enabling automatic background refetching.',
      'Established the team’s CI/CD pipeline with risk-tiered coverage enforcement (70-80% on HIPAA files, 20-40% global), Black formatting, Flake8 linting, and pytest-xdist parallelization that cut backend test runtime by ~2 minutes.',
    ],
  },
  {
    dates: 'Feb 2025 – Dec 2025',
    role: 'Generative AI Developer Intern',
    company: 'Bizdeglo',
    notes: [
      'Automated discovery and normalization of 500+ venture capital fund profiles, cutting 20+ hours of manual research weekly with a Selenium-based pipeline.',
      'Designed and fine-tuned an investor prediction system using Python, generative models, and structured VC datasets, improving client targeting accuracy.',
      'Partnered with early-stage startups to scope requirements, build prototypes, and ship production AI tools used in fundraising workflows.',
    ],
  },
]
