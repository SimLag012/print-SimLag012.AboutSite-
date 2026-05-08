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
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!loading) {
      // Initialize Lenis with more "Rebounce"
      const lenis = new Lenis({
        duration: 2, // Lungo per sentire il bounce
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.1,
        lerp: 0.05, // Fattore di inerzia
      })

      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      lenis.on('scroll', (e) => {
        setScrollProgress(e.progress)
        ScrollTrigger.update()
      })

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })

      return () => {
        lenis.destroy()
      }
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
              INITIALIZING_SYSTEM_CORE
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
      
      {/* Background sempre cliccabile */}
      <Background3D scrollProgress={scrollProgress} />
      
      <Navbar />
      
      <main style={{ 
        position: 'relative', 
        zIndex: 1, 
        pointerEvents: 'none' // Lascia passare il mouse allo sfondo
      }}>
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
          letterSpacing: '2px',
          pointerEvents: 'all'
        }}>
          <div>
            [SIMONE] // CORE_ARCHITECT<br/>
            [STABILITY] // OPTIMAL
          </div>
          <div>
            &copy; SIMLAG012_SYSTEMS<br/>
            REBOUNCE_ENABLED
          </div>
        </footer>
      </main>

      {/* Status HUD */}
      <div style={{
        position: 'fixed',
        bottom: '40px',
        left: '5%',
        zIndex: 100,
        pointerEvents: 'none'
      }} className="hud-text">
        <div style={{ color: '#fff', marginBottom: '5px' }}>Status: Live</div>
        <div style={{ opacity: 0.5 }}>Inertia_Level: 0.05 (Smoothed)</div>
      </div>
    </>
  )
}

export default App
