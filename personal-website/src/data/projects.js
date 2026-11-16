// `cover` is optional; a project without one renders as a text-only row.
export const projects = [
  {
    slug: 'daily-tldr-agent',
    title: 'Daily TLDR Agent',
    description:
      'An autonomous agent that condenses 20+ market and news sources into a daily briefing used by two Bank of America payments professionals. A hand-written tool-use loop runs within iteration, token, and wall-clock budgets, and a deterministic 7-layer link-integrity pipeline validates every cited source to prevent fabricated, stale, or duplicate links. Routing free APIs first and caching prompts holds each run to about $0.30.',
    role: 'Personal Project',
    timeline: 'Apr 2026 – Jun 2026',
    tools: ['Tool-use loop', 'Prompt caching', 'Finnhub', 'Alpha Vantage', 'RSS'],
  },
  {
    slug: 'trade-engine',
    title: 'TradeEngine',
    description:
      'A real-time stock trading platform in Go: a REST gateway, Kafka event pipeline, in-memory price-time priority matching engine with partial fills, and atomic Postgres trade settlement, fronted by a React/TypeScript dashboard streaming live order book and execution updates over WebSocket. Ordered row locking and re-validation in one transaction prevent double-spends and deadlocks.',
    role: 'Personal Project',
    timeline: 'Dec 2025 – Mar 2026',
    tools: ['Go', 'Kafka', 'PostgreSQL', 'React', 'TypeScript', 'WebSocket'],
  },
  {
    slug: 'stock-prediction',
    title: 'Stock Price Prediction and Trading',
    description:
      'A dashboard that visualizes the performance of a stock price prediction model and allows for automated trading decisions (model performance still needs to be improved).',
    url: 'https://github.com/benniu04/StockPrediction',
    linkLabel: 'View on GitHub',
    role: 'Personal Project',
    timeline: '3 months',
    tools: ['Python', 'scikit-learn', 'pandas', 'numpy', 'matplotlib', 'seaborn', 'yfinance', 'ta-lib'],
    cover: { src: '/images/stock-trading-dashboard.webp', width: 1200, height: 527, alt: 'Stock prediction dashboard with price charts and trading signals' },
  },
  {
    slug: 'nema',
    title: 'NEMA',
    description: 'Co-creating NEMA, a streaming platform dedicated for smaller indie filmmakers to showcase their work.',
    url: 'https://nemaa.netlify.app/',
    linkLabel: 'Visit site',
    role: 'Full Stack Developer',
    timeline: 'In Progress',
    tools: ['React', 'Node.js', 'Tailwind CSS', 'AWS S3', 'MongoDB', 'Express', 'JWT'],
    cover: { src: '/images/nema-home.webp', width: 1200, height: 666, alt: 'NEMA streaming platform home page' },
  },
  {
    slug: 'voice-agent',
    title: 'Voice Agent',
    description:
      'A full-stack web application that performs real-time audio transcription and visualizes the speakers emotional sentiment through a beautiful, dynamic Perlin noise field.',
    url: 'https://voice-agent-ruddy.vercel.app/',
    linkLabel: 'Visit site',
    role: 'Personal Project',
    timeline: 'In Progress',
    tools: ['React', 'Node.js', 'Tailwind CSS', 'Vercel', 'OpenAI', 'Perlin noise', 'Python', 'FastAPI'],
    cover: { src: '/images/voice-agent.webp', width: 1200, height: 667, alt: 'Voice Agent interface showing a Perlin noise field' },
  },
  {
    slug: 'secret-app',
    title: 'Startup App',
    description: 'Top secret, and in progress.',
    role: 'Co-Founder',
    timeline: 'In Progress',
    tools: [],
  },
]
