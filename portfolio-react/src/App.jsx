import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
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
        background: '#030303',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}
    >
      <h1 className="glitch" data-text="INITIALIZING" style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '1.5rem',
        marginBottom: '20px'
      }}>
        INITIALIZING
      </h1>
      <div style={{
        width: '200px',
        height: '2px',
        background: 'rgba(255,255,255,0.1)',
        overflow: 'hidden'
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
        <Projects />
        <About />
        
        <footer style={{
          padding: '50px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
          letterSpacing: '1px',
          borderTop: '1px solid var(--glass-border)',
          background: 'rgba(0,0,0,0.5)'
        }}>
          <p>&copy; 2026 SIMO. Creato con passone, codice e React Three Fiber.</p>
        </footer>
      </main>
    </>
  )
}

export default App
