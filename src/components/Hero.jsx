import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 10%',
      position: 'relative'
    }}>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h2 style={{
          fontSize: '1.2rem',
          color: 'var(--primary)',
          textTransform: 'uppercase',
          letterSpacing: '4px',
          marginBottom: '1rem'
        }}>Creative Developer</h2>
        
        <h1 className="glitch" data-text="SIMO" style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(4rem, 10vw, 8rem)',
          fontWeight: 900,
          lineHeight: 1,
          marginBottom: '2rem'
        }}>
          SIMO
        </h1>
        
        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
          maxWidth: '600px',
          marginBottom: '3rem'
        }}>
          Ingegnere del software specializzato in esperienze interattive "overkill" e architetture scalabili.
        </p>

        <div style={{ display: 'flex', gap: '20px' }}>
          <motion.a 
            href="#projects" 
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0,242,255,0.5)' }}
            style={{
              padding: '15px 40px',
              background: 'var(--primary)',
              color: '#000',
              textDecoration: 'none',
              fontWeight: 700,
              borderRadius: '4px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            Esplora Progetti
          </motion.a>
          
          <motion.a 
            href="#about" 
            whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
            style={{
              padding: '15px 40px',
              background: 'var(--glass)',
              border: '1px solid var(--glass-border)',
              backdropFilter: 'blur(5px)',
              color: 'var(--text)',
              textDecoration: 'none',
              fontWeight: 700,
              borderRadius: '4px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            Chi Sono
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
