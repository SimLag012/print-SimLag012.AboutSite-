import { motion } from 'framer-motion';

export default function Navbar() {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Progetti', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contatti', href: '#contact' },
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
        padding: '2rem 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        background: 'rgba(0,0,0,0.2)',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}
    >
      <div style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '1.5rem',
        fontWeight: 900,
        letterSpacing: '2px'
      }}>
        SIMO<span style={{ color: 'var(--primary)' }}>.</span>
      </div>
      
      <ul style={{
        display: 'flex',
        listStyle: 'none',
        gap: '30px'
      }}>
        {navLinks.map((link) => (
          <li key={link.name}>
            <motion.a 
              href={link.href}
              whileHover={{ color: 'var(--primary)', scale: 1.1 }}
              style={{
                textDecoration: 'none',
                color: 'var(--text)',
                textTransform: 'uppercase',
                fontSize: '0.8rem',
                letterSpacing: '1px',
                transition: '0.3s',
                fontWeight: 600
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
