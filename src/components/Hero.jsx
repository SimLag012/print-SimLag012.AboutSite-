import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text.split("")
          .map((char, index) => {
            if(index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      if(iteration >= text.length) clearInterval(interval);
      iteration += 1/3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
          <div style={{ width: '40px', height: '2px', background: 'var(--primary)' }}></div>
          <h2 style={{
            fontSize: '1rem',
            color: 'var(--primary)',
            textTransform: 'uppercase',
            letterSpacing: '6px',
            fontWeight: 700
          }}>Systems & Backend Engineer</h2>
        </div>
        
        <h1 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(3rem, 12vw, 9rem)',
          fontWeight: 900,
          lineHeight: 0.9,
          marginBottom: '2rem',
          color: '#fff',
          textTransform: 'uppercase'
        }}>
          <ScrambleText text="SimLag012" />
        </h1>
        
        <p style={{
          fontSize: '1.4rem',
          color: 'var(--text-muted)',
          lineHeight: 1.5,
          maxWidth: '700px',
          marginBottom: '4rem',
          fontWeight: 300,
          fontFamily: 'Inter, sans-serif'
        }}>
          I architect <span style={{ color: '#fff', fontWeight: 600 }}>scalable backends</span>, 
          low-level security protocols, and <span style={{ color: 'var(--secondary)', fontWeight: 600 }}>core systems</span>. 
          Focusing strictly on performance and logic.
        </p>

        <div style={{ display: 'flex', gap: '30px' }}>
          <motion.a 
            href="#projects" 
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,242,255,0.4)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '20px 50px',
              background: 'var(--primary)',
              color: '#000',
              textDecoration: 'none',
              fontWeight: 900,
              borderRadius: '2px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontSize: '0.8rem'
            }}
          >
            Access Core
          </motion.a>
          
          <motion.a 
            href="#about" 
            whileHover={{ scale: 1.05, borderColor: 'var(--primary)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '20px 50px',
              background: 'transparent',
              border: '1px solid var(--glass-border)',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 900,
              borderRadius: '2px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontSize: '0.8rem'
            }}
          >
            Diagnostics
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
