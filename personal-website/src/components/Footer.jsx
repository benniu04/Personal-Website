import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear();

  // Cool geometric logo component (same as navbar)
  const HandwrittenSignature = () => (
    <svg
      width="200"
      height="60"
      viewBox="0 0 400 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-14 w-auto"
    >
      <defs>
        <linearGradient id="sigGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path
        d="M10 80 Q 40 10, 80 60 T 150 60 Q 180 10, 210 60 T 300 60 Q 330 30, 370 60"
        stroke="url(#sigGrad)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="600"
        strokeDashoffset="600"
        >
        <animate
          attributeName="stroke-dashoffset"
          from="600"
          to="0"
          dur="3s"
          fill="freeze"
          repeatCount="1"
        />
      </path>
    </svg>
  );

  return (
    <footer className="relative bg-slate-950/90 border-t border-slate-800/50 backdrop-blur-sm">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-950/80 to-slate-900/50 opacity-80"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand section */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <HandwrittenSignature />
            <p className="text-slate-400 mt-4">Currently based in Boston, MA 🇺🇸</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-slate-200 font-semibold mb-6 text-sm uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                >
                  Work
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-slate-200 font-semibold mb-6 text-sm uppercase tracking-wider">
              Connect
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:nub38bn@gmail.com" 
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm flex items-center group"
                >
                  <svg className="w-4 h-4 mr-3 group-hover:text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  Email
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/benniu04/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm flex items-center group"
                >
                  <svg className="w-4 h-4 mr-3 group-hover:text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"/>
                  </svg>
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/benniu04" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm flex items-center group"
                >
                  <svg className="w-4 h-4 mr-3 group-hover:text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                  </svg>
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-slate-800/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-500 text-sm">
              © {currentYear} Portfolio. Designed by Benjamin Niu. Crafted with curiosity and care.
            </div>
            <div className="flex items-center space-x-6 text-slate-500 text-sm">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Available for new projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
