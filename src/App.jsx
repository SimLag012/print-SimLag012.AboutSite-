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
  const lenisRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!loading) {
      // Initialize Lenis Smooth Scroll
      const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      })

      lenisRef.current = lenis

      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      lenis.on('scroll', (e) => {
        setScrollProgress(e.progress)
      })

      // Sync with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)

      return () => {
        lenis.destroy()
        gsap.ticker.remove(raf)
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
              REBOOTING_SYSTEM_V3
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
      
      <main style={{ position: 'relative', zIndex: 1 }}>
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
            [SIMONE] // BACKEND_ARCHITECT<br/>
            [BUILD] // 2026_FINAL
          </div>
          <div>
            &copy; SIMLAG012_SYSTEMS<br/>
            HYPER_SMOOTH_ENGAGED
          </div>
        </footer>
      </main>

      <div style={{
        position: 'fixed',
        bottom: '40px',
        left: '5%',
        zIndex: 100,
        pointerEvents: 'none'
      }} className="hud-text">
        <div style={{ color: '#fff', marginBottom: '5px' }}>Status: Optimal</div>
        <div style={{ opacity: 0.5 }}>Buffer_Health: {(scrollProgress * 100).toFixed(1)}%</div>
      </div>
    </>
  )
}

export default App
