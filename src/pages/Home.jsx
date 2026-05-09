import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import About from '../components/About'
import Architecture from '../components/Architecture'
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
          [SIMONE] // VISUAL_FIX_DEPLOYED<br/>
          [MODULE] // REBORN
        </div>
        <div>
          &copy; SIMLAG012_SYSTEMS<br/>
          ALL_SYSTEMS_GO
        </div>
      </footer>
    </motion.main>
  )
}

