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
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '25px',
                borderBottom: '1px solid var(--hud-border)',
                background: 'rgba(255,255,255,0.01)'
              }}
            >
              <span className="hud-text" style={{ color: '#fff' }}>{spec.label}</span>
              <span className="hud-text">{spec.value}</span>
            </motion.div>
          ))}
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="hud-text"
            style={{ marginTop: '20px', textAlign: 'right', fontSize: '0.5rem' }}
          >
            [CheckSum] // 0x5F3759DF
          </motion.div>
        </div>
      </div>
    </section>
  );
}
