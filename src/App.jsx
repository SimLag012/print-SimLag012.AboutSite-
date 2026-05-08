import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Architecture from './components/Architecture'
import Background3D from './components/Background3D'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!loading) {
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setScrollProgress(self.progress)
        }
      });
    }
  }, [loading])

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#050505',
              zIndex: 10000,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'JetBrains Mono, monospace'
            }}
          >
            <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '20px', letterSpacing: '4px' }}>
              BOOTING_CORE_V3.0
            </div>
            <div style={{ width: '200px', height: '1px', background: '#222', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2 }}
                style={{ height: '100%', background: '#fff' }} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Background3D scrollProgress={scrollProgress} />
      <Navbar />
      
      <main ref={containerRef} style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Architecture />
        <Projects />
        
        <footer style={{
          padding: '100px 5%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          color: '#444',
          fontSize: '0.6rem',
          fontFamily: 'JetBrains Mono, monospace',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          <div>
            [SIMONE] // BACKEND_ENGINEER<br/>
            [REVISION] // 2026.05.08
          </div>
          <div>
            &copy; SIMLAG012_SYSTEMS<br/>
            ALL_LOGIC_RESERVED
          </div>
        </footer>
      </main>

      {/* Persistent HUD elements */}
      <div style={{
        position: 'fixed',
        bottom: '40px',
        left: '5%',
        zIndex: 100,
        pointerEvents: 'none'
      }} className="hud-text">
        <div style={{ color: '#fff', marginBottom: '5px' }}>Status: Optimal</div>
        <div style={{ opacity: 0.5 }}>Core_Load: {(scrollProgress * 100).toFixed(2)}%</div>
      </div>
      
      <div style={{
        position: 'fixed',
        top: '50%',
        right: '40px',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'flex-end'
      }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{
            width: '2px',
            height: '40px',
            background: scrollProgress > i * 0.25 ? '#fff' : '#222',
            transition: '0.3s'
          }} />
        ))}
      </div>
    </>
  )
}

export default App
