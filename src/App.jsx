import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import Background3D from './components/Background3D'
import { AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger);

function AppContent({ scrollProgress }) {
  const location = useLocation()

  return (
    <>
      <Background3D scrollProgress={scrollProgress} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

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
      // Initialize Lenis once
      const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.2,
        lerp: 0.1,
      })

      lenisRef.current = lenis

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
        gsap.ticker.remove(lenis.raf)
      }
    }
  }, [loading])

  if (loading) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: '#050505',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'JetBrains Mono, monospace'
      }}>
        <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '20px', letterSpacing: '4px' }}>
          RESTORING_VISUAL_CORE
        </div>
        <div style={{ width: '200px', height: '1px', background: '#222', overflow: 'hidden' }}>
          <div style={{ 
            height: '100%', 
            background: '#fff', 
            width: '100%',
            animation: 'load 2s ease-in-out'
          }} />
        </div>
        <style>{`
          @keyframes load {
            0% { width: 0; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    )
  }

  return (
    <Router>
      <AppContent scrollProgress={scrollProgress} />
    </Router>
  )
}

export default App
