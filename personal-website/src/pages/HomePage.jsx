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
                    <span className="bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm">AWS</span>
                    <span className="bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm">Github Actions</span>
                    <span className="bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm">CI/CD</span>
                    <span className="bg-slate-800/50 border border-slate-600 text-slate-300 px-4 py-2 rounded-full text-sm">Git</span>
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
