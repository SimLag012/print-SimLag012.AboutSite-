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
      // Lenis initialization
      const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.2,
        lerp: 0.1,
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

      // Sync GSAP ticker
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })

      return () => {
        lenis.destroy()
        gsap.ticker.remove(lenis.raf)
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
              RESTORING_VISUAL_CORE
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
      
      {/* Background with explicit transparency and Z-index */}
      <Background3D scrollProgress={scrollProgress} />
      
      <Navbar />
      
      <main style={{ 
        position: 'relative', 
        zIndex: 1, 
        pointerEvents: 'none',
        background: 'transparent' // Assicuriamoci che sia trasparente
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
            [SIMONE] // VISUAL_FIX_DEPLOYED<br/>
            [MODULE] // REBORN
          </div>
          <div>
            &copy; SIMLAG012_SYSTEMS<br/>
            ALL_SYSTEMS_GO
          </div>
        </footer>
      </main>
    </>
  )
}

export default App
