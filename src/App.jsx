import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Background3D from './components/Background3D'
import SoundManager from './components/SoundManager'
import { AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger);

function AppContent({ scrollRef }) {
  const location = useLocation()

  return (
    <>
      <Background3D scrollRef={scrollRef} />
      <SoundManager />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          {/* Fallback to home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

function App() {
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef(0)
  const lenisRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1800) // Slightly faster load for minimal, immediate feel
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!loading) {
      const lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.1,
        lerp: 0.12,
      })

      lenisRef.current = lenis

      lenis.on('scroll', (e) => {
        scrollRef.current = Math.max(0, Math.min(1, e.progress))
        ScrollTrigger.update()
      })

      const updateLoop = (time) => {
        lenis.raf(time * 1000)
      }

      gsap.ticker.add(updateLoop)
      gsap.ticker.lagSmoothing(0)

      return () => {
        lenis.destroy()
        gsap.ticker.remove(updateLoop)
      }
    }
  }, [loading])

  if (loading) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: '#030303',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'JetBrains Mono, monospace'
      }}>
        <div style={{ 
          fontSize: '0.75rem', 
          color: '#00ff66', 
          marginBottom: '15px', 
          letterSpacing: '5px',
          textShadow: '0 0 8px rgba(0, 255, 102, 0.4)' 
        }}>
          DECRYPTING_BACKEND_INFRA
        </div>
        <div style={{ width: '180px', height: '2px', background: '#111', overflow: 'hidden' }}>
          <div style={{ 
            height: '100%', 
            background: '#00ff66', 
            width: '100%',
            animation: 'load 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            boxShadow: '0 0 10px #00ff66'
          }} />
        </div>
        <style>{`
          @keyframes load {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(0); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <Router>
      <AppContent scrollRef={scrollRef} />
    </Router>
  )
}

export default App
