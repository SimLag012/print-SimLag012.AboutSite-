import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Architecture from './components/Architecture'
import Background3D from './components/Background3D'
import { motion, AnimatePresence } from 'framer-motion'

function Loader() {
  return (
    <motion.div
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: 'expoInOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#010101',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}
    >
      <motion.h1 
        className="glitch" 
        data-text="SYSTEM_BOOT" 
        style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '1.5rem',
          marginBottom: '20px',
          color: '#fff'
        }}
      >
        SYSTEM_BOOT
      </motion.h1>
      <div style={{
        width: '200px',
        height: '2px',
        background: 'rgba(255,255,255,0.05)',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{
            height: '100%',
            background: 'var(--primary)',
            boxShadow: '0 0 15px var(--primary)'
          }}
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '20px', fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}
      >
        Synchronizing core logic...
      </motion.p>
    </motion.div>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>
      
      <Background3D />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Architecture />
        <Projects />
        
        <footer style={{
          padding: '100px 50px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
          letterSpacing: '2px',
          borderTop: '1px solid var(--glass-border)',
          background: 'rgba(0,0,0,0.8)',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{ marginBottom: '20px', color: 'var(--primary)', fontWeight: 900, fontSize: '1.2rem' }}>SimLag012</div>
          <p>&copy; 2026 Simone. Built for performance, architected for the future.</p>
        </footer>
      </main>
    </>
  )
}

export default App
