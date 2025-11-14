export const projects = [
  {
    slug: 'stock-prediction',
    title: 'Stock Price Prediction and Trading',
    blurb: 'A comprehensive dashboard for visualizing model performance and trading decisions.',
    cover: '/images/stock-trading-dashboard.png',
    description: 'A dashboard that visualizes the performance of a stock price prediction model and allows for automated trading decisions (model performance still needs to be improved).',
    url: 'https://github.com/benniu04/StockPrediction',
    meta: {
      role: 'Personal Project',
      timeline: '3 months',
      tools: 'Python, scikit-learn, pandas, numpy, matplotlib, seaborn, yfinance, ta-lib'
    }
  },
  {
    slug: 'nema',
    title: 'NEMA',
    blurb: 'A streaming platform dedicated for smaller indie filmmakers to showcase their work.',
    cover: '/images/nema-home.png',
    description: 'Co-creating NEMA, a streaming platform dedicated for smaller indie filmmakers to showcase their work.',
    url: 'https://nemaa.netlify.app/',
    meta: {
      role: 'Full Stack Developer',
      timeline: 'In Progress',
      tools: 'React, Node.js, Tailwind CSS, AWS S3, MongoDB, Express, JWT'
    }
  },
  {
    slug: 'secret-app',
    title: 'Startup App',
    blurb: 'Top Secret',
    cover: '/images/secret-wallpaper.jpg',
    description: 'In Progress',
    meta: {
      role: 'Co-Founder',
      timeline: 'In Progress',
      tools: '...'
    }
  },
  {
    slug:'voice-agent',
    title: 'Voice Agent',
    blurb: 'A voice agent that changes based on the emotional sentiment of the speaker.',
    cover: '/images/voice-agent.png',
    description: 'A full-stack web application that performs real-time audio transcription and visualizes the speakers emotional sentiment through a beautiful, dynamic Perlin noise field.',
    url: 'https://voice-agent-ruddy.vercel.app/',
    meta: {
      role: 'Personal Project',
      timeline: 'In Progress',
      tools: 'React, Node.js, Tailwind CSS, Vercel, OpenAI, Perlin noise, Python, FastAPI'
    }
  }
] 