import { motion } from 'framer-motion';

export default function About() {
  const specs = [
    { label: "Identity", value: "Simone // SimLag012" },
    { label: "Core", value: "Systems & Backend" },
    { label: "Protocols", value: "REST / RPC / WS" },
    { label: "Stack", value: "Python / Node / C++" },
    { label: "Engines", value: "Redis / Postgres" },
  ];

  return (
    <section id="about">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', width: '100%' }}>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hud-text" style={{ marginBottom: '2rem' }}>[Bio] // Diagnostic_Report</div>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            marginBottom: '40px',
            fontWeight: 900,
            lineHeight: 1
          }}>THE BRAIN<br/>BEHIND THE<br/>SYSTEM</h2>
          
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1rem',
            lineHeight: '1.8',
            marginBottom: '30px',
            fontFamily: 'JetBrains Mono, monospace'
          }}>
            I specialize in the unseen. My focus is purely on the efficiency, security, and scalability of the backend core. 
            Frontend is just the interface; I build the intelligence.
          </p>
        </motion.div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 20, backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.2)' }}
              viewport={{ once: true }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '25px',
                borderBottom: '1px solid var(--hud-border)',
                background: 'rgba(255,255,255,0.01)',
                cursor: 'default',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <span className="hud-text" style={{ color: '#fff' }}>{spec.label}</span>
              <span className="hud-text">{spec.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
