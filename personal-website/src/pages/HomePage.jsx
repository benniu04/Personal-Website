import { LampHero } from '../components/LampHero'
import ProjectGrid from '../components/ProjectGrid'
import { TracingBeam } from '../components/TracingBeam'

function HomePage() {
  return (
    <main>
      <LampHero />
      <TracingBeam>
        <div className="max-w-4xl mx-auto px-6">
          {/* About Section */}
          <section id="about" className="mb-20 pt-12">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-300 to-cyan-400 bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                I'm a current student at Northeastern University studying Computer Science and Finance. While building this website, I've became obsessed with the intersection of design and development. As of now, I'm still exploring what I want to do, potentially going into fintech.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Experienced in building full stack applications and websites as well as a bit of machine learning.
              </p>
            </div>
          </section>

          {/* Skills Section */}
          <section className="mb-20">
            <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Skills & Expertise
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-slate-300 mb-4">DevOps/Cloud</h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm">S3</span>
                    <span className="bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm">CloudFront</span>
                    <span className="bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm">EC2</span>
                    <span className="bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm">Github Actions</span>
                    <span className="bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm">CI/CD</span>
                    <span className="bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm">Git</span>
                    <span className="bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm">Vercel</span>
                    <span className="bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm">Netlify</span>
                    <span className="bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm">Render</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-300 mb-4">Development</h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm">React</span>
                    <span className="bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm">JavaScript</span>
                    <span className="bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm">Tailwind CSS</span>
                    <span className="bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm">Node.js</span>
                    <span className="bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm">Python</span>
                    <span className="bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm">Java</span>
                    <span className="bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm">Express</span>
                    <span className="bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm">MongoDB</span>
                    <span className="bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm">JWT</span>
                    <span className="bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm">Docker</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="mb-20">
            <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Experience
              </h2>

              <div className="space-y-8">
                {/* Experience Item 1 */}
                <div className="relative pl-8 border-l-2 border-cyan-500/30 hover:border-cyan-400/60 transition-colors duration-300">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-cyan-500 border-4 border-slate-900"></div>
                  <div className="bg-slate-800/30 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-semibold text-slate-200">Full Stack Developer Co-op</h3>
                      <span className="text-cyan-400 text-sm font-medium">Jan 2026 - Present</span>
                    </div>
                    <p className="text-slate-400 font-medium mb-3">FuzionX Corporation</p>
                    <p className="text-slate-300 leading-relaxed">
                      Incoming Spring 2026
                    </p>
                  </div>
                </div>

                {/* Experience Item 2 */}
                <div className="relative pl-8 border-l-2 border-purple-500/30 hover:border-purple-400/60 transition-colors duration-300">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 border-4 border-slate-900"></div>
                  <div className="bg-slate-800/30 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-semibold text-slate-200">Acturial/AI Intern</h3>
                      <span className="text-purple-400 text-sm font-medium">Jun 2026 - Aug 2026</span>
                    </div>
                    <p className="text-slate-400 font-medium mb-3">Berkley Small Business Solutions</p>
                    <p className="text-slate-300 leading-relaxed">
                      Incoming Summer 2026
                    </p>
                  </div>
                </div>

                {/* Experience Item 3 */}
                <div className="relative pl-8 border-l-2 border-cyan-500/30 hover:border-cyan-400/60 transition-colors duration-300">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-cyan-500 border-4 border-slate-900"></div>
                  <div className="bg-slate-800/30 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-semibold text-slate-200">Generative AI Developer Intern</h3>
                      <span className="text-cyan-400 text-sm font-medium">Feb 2025 - Dec 2025</span>
                    </div>
                    <p className="text-slate-400 font-medium mb-3">Bizdeglo</p>
                    <p className="text-slate-300 leading-relaxed">
                      <ul className="list-disc list-inside text-slate-300 space-y-2">
                        <li>Automated discovery and normalization of 500+ venture capital fund profiles, reducing manual research by 20+ hours weekly through a Selenium-based pipeline.</li>
                        <li>Designed and fine-tuned an investor prediction system using Python, generative models, and structured VC datasets, improving client targeting and qualification accuracy.</li>
                        <li>Partnered directly with multiple early-stage startups to scope technical requirements, build prototypes, and deploy production-ready AI tools used in fundraising workflows.</li>
                      </ul>
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="bg-slate-700/50 border border-slate-600 text-slate-300 px-3 py-1 rounded-full text-xs">JavaScript</span>
                      <span className="bg-slate-700/50 border border-slate-600 text-slate-300 px-3 py-1 rounded-full text-xs">Tailwind</span>
                      <span className="bg-slate-700/50 border border-slate-600 text-slate-300 px-3 py-1 rounded-full text-xs">MongoDB</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="featured-work" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Featured Work
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                A selection of projects that showcase my approach to solving complex 
                design and development challenges.
              </p>
            </div>
            <ProjectGrid />
          </section>
        </div>
      </TracingBeam>
    </main>
  )
}

export default HomePage
