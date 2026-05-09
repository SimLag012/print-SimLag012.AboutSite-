import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth) - 0.5;
    const y = (e.clientY / innerHeight) - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" style={{ perspective: '1000px', height: '100vh', display: 'flex', alignItems: 'center', padding: '0 5%' }}>
      <motion.div
        style={{ 
          width: '100%',
          rotateX,
          rotateY
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ marginBottom: '2rem' }} className="hud-text">
          <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 2 }}>
            [SYSTEM_INITIALIZATION] // CORE_KERNEL_STABLE
          </motion.span>
        </div>
        
        <h1 style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(3rem, 12vw, 10rem)',
          fontWeight: 900,
          lineHeight: 0.8,
          marginBottom: '2rem',
          color: '#fff',
          textTransform: 'uppercase',
          letterSpacing: '-0.05em'
        }}>
          <ScrambleText text="BACKEND" /><br/>
          <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>ARCHITECT</span>
        </h1>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderTop: '1px solid var(--hud-border)',
          paddingTop: '2rem',
          marginTop: '4rem'
        }}>
          <div style={{ maxWidth: '500px' }}>
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-muted)',
              lineHeight: 1.5,
              marginBottom: '30px',
              fontFamily: 'JetBrains Mono, monospace',
              textTransform: 'uppercase'
            }}>
              Engineering <span style={{ color: '#fff' }}>distributed systems</span>, 
              high-throughput <span style={{ color: '#fff' }}>microservices</span>, and 
              low-level <span style={{ color: '#fff' }}>system optimizations</span>. 
              Bridging complex logic with deterministic infrastructure.
            </p>
            
            <div style={{ display: 'flex', gap: '20px' }}>
              <button className="hud-text" style={{
                padding: '12px 25px',
                background: 'var(--primary)',
                color: '#000',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                pointerEvents: 'all'
              }}>
                [EXEC_RECON]
              </button>
              <button className="hud-text" style={{
                padding: '12px 25px',
                background: 'transparent',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer',
                pointerEvents: 'all'
              }}>
                [FETCH_LOGS]
              </button>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '40px' }} className="hud-text">
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#fff', fontSize: '0.6rem' }}>LOCATION_NODE</div>
              <div>GLOBAL_DIST // IAD1</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#fff', fontSize: '0.6rem' }}>PRIMARY_FOCUS</div>
              <div>SYSTEM_ENGINEERING</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

