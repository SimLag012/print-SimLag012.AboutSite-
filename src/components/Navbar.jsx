import { motion } from 'framer-motion';
import { playSound } from '../utils/audio';

export default function Navbar() {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Systems', href: '#projects' },
    { name: 'Core', href: '#about' },
    { name: 'Architecture', href: '#architecture' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: '1.5rem 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(15px)',
        background: 'rgba(0,0,0,0.4)',
        borderBottom: '1px solid rgba(0,242,255,0.1)'
      }}
    >
      <div style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '1.5rem',
        fontWeight: 900,
        letterSpacing: '2px',
        color: '#fff'
      }}>
        SimLag012<span style={{ color: 'var(--primary)' }}>_</span>
      </div>
      
      <ul style={{
        display: 'flex',
        listStyle: 'none',
        gap: '40px'
      }}>
        {navLinks.map((link) => (
          <li key={link.name}>
            <motion.a 
              href={link.href}
              onMouseEnter={() => playSound('hover')}
              onClick={() => playSound('click')}
              whileHover={{ color: 'var(--primary)', scale: 1.1, textShadow: '0 0 8px var(--primary)' }}
              style={{
                textDecoration: 'none',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '2px',
                transition: '0.3s',
                fontWeight: 700
              }}
            >
              {link.name}
            </motion.a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
