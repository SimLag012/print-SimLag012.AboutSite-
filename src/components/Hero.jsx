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
    <section id="home">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ width: '100%' }}
      >
        <div style={{ marginBottom: '2rem' }} className="hud-text">
          [System_Init] // Core_Systems_Online
        </div>
        
        <h1 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(3rem, 15vw, 12rem)',
          fontWeight: 900,
          lineHeight: 0.8,
          marginBottom: '2rem',
          color: '#fff',
          textTransform: 'uppercase',
          letterSpacing: '-0.05em'
        }}>
          SimLag<br/>012
        </h1>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderTop: '1px solid var(--hud-border)',
          paddingTop: '2rem',
          marginTop: '4rem'
        }}>
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-muted)',
            lineHeight: 1.5,
            maxWidth: '400px',
            fontFamily: 'JetBrains Mono, monospace',
            textTransform: 'uppercase'
          }}>
            Architecting <span style={{ color: '#fff' }}>high-performance</span> backends, 
            low-level protocols, and <span style={{ color: '#fff' }}>scalable</span> infrastructure.
          </p>
          
          <div style={{ display: 'flex', gap: '40px' }} className="hud-text">
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#fff' }}>Location</div>
              <div>Global_Node_IAD1</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#fff' }}>Focus</div>
              <div>Backend_Logic</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
