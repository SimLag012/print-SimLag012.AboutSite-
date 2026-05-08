import { motion } from 'framer-motion';

export default function About() {
  const serverSpecs = [
    { label: "Core Logic", value: "Python / Node.js" },
    { label: "Infrastructure", value: "Nginx / Redis" },
    { label: "Architecture", value: "Microservices" },
    { label: "Security", value: "HWID / Encryption" },
    { label: "Database", value: "PostgreSQL / MongoDB" },
  ];

  return (
    <section id="about" style={{ padding: '100px 10%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px' }}>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '3.5rem',
            marginBottom: '40px',
            fontWeight: 900
          }}>MY CORE</h2>
          
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1.2rem',
            lineHeight: '1.9',
            marginBottom: '30px'
          }}>
            I am <span style={{ color: '#fff', fontWeight: 600 }}>Simone</span>. 
            My work begins where the user interface ends. 
            While others focus on the skin, I build the nervous system and organs: 
            <span style={{ color: 'var(--primary)' }}> pure backend logic</span>.
          </p>

          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1.2rem',
            lineHeight: '1.9',
            marginBottom: '50px'
          }}>
            I have zero interest in colorful buttons or responsive layouts for their own sake. 
            My goals are absolute efficiency, horizontal scalability, and data integrity. 
            If a system isn't optimized at the microsecond level, it isn't finished.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px'
          }}>
            {serverSpecs.map((spec) => (
              <div key={spec.label} style={{
                background: 'rgba(255,255,255,0.02)',
                padding: '20px',
                borderLeft: '2px solid var(--primary)'
              }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px' }}>{spec.label}</div>
                <div style={{ fontSize: '1rem', color: '#fff', fontWeight: 700, marginTop: '5px' }}>{spec.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            background: 'var(--glass)',
            border: '1px solid var(--glass-border)',
            padding: '40px',
            borderRadius: '10px',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            color: 'var(--primary)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ marginBottom: '20px', color: '#fff', fontWeight: 700 }}>SYSTEM_DIAGNOSTICS v2.0.4</div>
          <div style={{ color: '#00ff88' }}>[OK] Server initialized</div>
          <div style={{ color: '#00ff88' }}>[OK] Database handshake stable</div>
          <div style={{ color: '#00ff88' }}>[OK] HWID Authentication active</div>
          <div style={{ color: '#ffc400' }}>[WARN] Sub-optimal latency in node_7</div>
          <div style={{ color: '#00ff88' }}>[OK] Caching via Redis (hit rate 98%)</div>
          <br />
          <div style={{ color: 'var(--text-muted)' }}>$ simone --status --full</div>
          <div style={{ paddingLeft: '15px' }}>
            User: SimLag012<br />
            Role: Backend Architect<br />
            Preference: Pure Logic / CLI<br />
            Hobby: Low-level optimization
          </div>
          <br />
          <motion.div 
            animate={{ opacity: [1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            style={{ width: '100%', height: '2px', background: 'var(--primary)', marginTop: '20px' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
