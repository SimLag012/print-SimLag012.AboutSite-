import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import About from '../components/About'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ 
        position: 'relative', 
        zIndex: 1, 
        background: 'transparent'
      }}
    >
      <Navbar />
      <Hero />
      <About />
      <Projects />
      
      <footer style={{
        padding: '40px 5%',
        textAlign: 'left',
        color: '#666',
        fontSize: '0.75rem',
        fontFamily: 'JetBrains Mono, monospace',
        letterSpacing: '1px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ width: '8px', height: '8px', background: 'var(--primary)', marginRight: '15px' }}></div>
        &copy; {new Date().getFullYear()} Simone Laganà. All rights reserved.
      </footer>
    </motion.main>
  )
}

