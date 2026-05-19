import { motion } from 'framer-motion';
import { playSound } from '../utils/audio';
import { Github, Linkedin } from './Icons';

export default function Navbar() {
  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
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
        padding: '1.2rem 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(16px)',
        background: 'rgba(10, 15, 25, 0.7)',
        borderBottom: '1px solid rgba(0, 255, 102, 0.08)'
      }}
    >
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '1.3rem',
        fontWeight: 900,
        letterSpacing: '-0.02em',
        color: '#fff'
      }}>
        Simone<span style={{ color: 'var(--primary)' }}>.</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <ul style={{
          display: 'flex',
          listStyle: 'none',
          gap: '30px'
        }}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <motion.a 
                href={link.href}
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
                whileHover={{ color: 'var(--primary)', scale: 1.05 }}
                style={{
                  textDecoration: 'none',
                  color: '#aaa',
                  fontSize: '0.82rem',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.01em',
                  transition: '0.3s',
                  fontWeight: 500
                }}
              >
                {link.name}
              </motion.a>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div style={{ width: '1px', height: '16px', background: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Elegant Social Connections */}
        <div style={{ display: 'flex', gap: '15px' }}>
          <motion.a
            href="https://github.com/SimLag012"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => playSound('hover')}
            onClick={() => playSound('click')}
            whileHover={{ color: 'var(--primary)', scale: 1.1 }}
            style={{ 
              color: '#aaa', 
              transition: '0.3s', 
              display: 'inline-flex', 
              alignItems: 'center', 
              textDecoration: 'none'
            }}
            title="Open GitHub Profile"
          >
            <Github size={18} />
          </motion.a>
          
          <motion.a
            href="https://linkedin.com/in/simlag012"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => playSound('hover')}
            onClick={() => playSound('click')}
            whileHover={{ color: 'var(--primary)', scale: 1.1 }}
            style={{ 
              color: '#aaa', 
              transition: '0.3s', 
              display: 'inline-flex', 
              alignItems: 'center', 
              textDecoration: 'none'
            }}
            title="Open LinkedIn Profile"
          >
            <Linkedin size={18} />
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}
