import React, { useState } from "react"
import { motion } from "motion/react"

function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-br from-slate-300 to-cyan-400 bg-clip-text text-transparent">
            Hello There!
          </h1>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-16">
          
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 md:p-10">
              
              {/* Profile Image */}
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-slate-700 flex items-center justify-center">
                    <img src="/public/profile-pic.jpeg" alt="Benjamin Niu" className="w-full h-full object-cover rounded-2xl" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-slate-300 to-cyan-400 bg-clip-text text-transparent">
                    Benjamin Niu
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    I enjoy the pursuit of design and development as well as helping others.
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-6 text-slate-300 leading-relaxed">
                
                <p className="text-lg">
                  Outside of coding I enjoy travel, tennis, golf, and discovering new restaurants 
                  around Boston while studying at Northeastern University.
                </p>
                
                <p className="text-lg">
                  Currently diving deep into the intersection of design and development, with a growing 
                  passion for fintech and how beautiful interfaces can make complex financial systems 
                  more accessible.
                </p>
              </div>
            </div>

            {/* My Setup Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <MySetup />
            </motion.div>
          </motion.div>

          {/* Right Column - Quick Facts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            
            {/* Locations */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-3">
                Locations
              </h3>
              <div className="space-y-2">
                <p className="text-slate-300">Boston, MA</p>
                <p className="text-slate-300">Originally from Connecticut</p>
              </div>
            </div>

            {/* Education */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-3">
                Education
              </h3>
              <p className="text-slate-300">
                Computer Science & Finance<br />
                Northeastern University
              </p>
            </div>

            {/* Experience */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-3">
                Focus Areas
              </h3>
              <p className="text-slate-300">
                Full-stack Development<br />
                Machine Learning<br />
                Fintech Solutions
              </p>
            </div>

            {/* Currently Reading */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-3">
                Currently Reading
              </h3>
              <p className="text-slate-300">
                "Atomic Habits"<br />
                <span className="text-slate-400 text-sm">by James Clear</span>
              </p>
            </div>

            {/* Interests */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-3">
                Interests
              </h3>
              <p className="text-slate-300">
                Piano,<br />
                Tennis, Golf, and Traveling
              </p>
            </div>

          </motion.div>
        </div>

      </div>
    </main>
  )
}

// My Setup Component
function MySetup() {
  const [activeSetup, setActiveSetup] = useState('pc')

  const pcSpecs = [
    { component: 'CPU', name: 'AMD Ryzen 5 5600X', icon: '🔧' },
    { component: 'GPU', name: 'AMD Radeon RX 6700 XT', icon: '🎮' },
    { component: 'RAM', name: '16GB Corsair Vengeance DDR4 3200MHz', icon: '💾' },
    { component: 'Storage', name: '1TB NVMe SSD', icon: '💿' },
    { component: 'Motherboard', name: 'MSI MAG B550 Tomahawk', icon: '🔌' },
    { component: 'Case', name: 'Maingear Vybe', icon: '📦' },
  ]

  const macbookSpecs = [
    { component: 'Model', name: 'MacBook Pro 14"', icon: '💻' },
    { component: 'Chip', name: 'Apple M1 Pro', icon: '⚡' },
    { component: 'RAM', name: '16GB Unified Memory', icon: '💾' },
    { component: 'Storage', name: '512GB SSD', icon: '💿' },
    { component: 'Display', name: '14.2" Liquid Retina XDR', icon: '🖥️' },
    { component: 'Battery', name: 'Up to 18 hours', icon: '🔋' },
  ]

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-slate-300 to-cyan-400 bg-clip-text text-transparent">
        My Setup
      </h3>
      
      {/* Setup Toggle */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveSetup('pc')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            activeSetup === 'pc'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          🖥️ Gaming PC
        </button>
        <button
          onClick={() => setActiveSetup('macbook')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            activeSetup === 'macbook'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          💻 MacBook Pro
        </button>
      </div>

      {/* Setup Description */}
      <div className="mb-6">
        {activeSetup === 'pc' ? (
          <p className="text-slate-300 leading-relaxed">
            My custom-built gaming and development rig. Perfect for coding, gaming, and running multiple VMs. 
          </p>
        ) : (
          <p className="text-slate-300 leading-relaxed">
            My portable powerhouse for coding on the go. The M1 Pro chip handles everything from React development 
            to running Docker containers while maintaining incredible battery life.
          </p>
        )}
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(activeSetup === 'pc' ? pcSpecs : macbookSpecs).map((spec, index) => (
          <motion.div
            key={spec.component}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="group bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:bg-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                {spec.icon}
              </span>
              <div className="flex-1">
                <div className="text-cyan-400 text-sm font-medium uppercase tracking-wider">
                  {spec.component}
                </div>
                <div className="text-slate-200 font-semibold">
                  {spec.name}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default AboutPage
