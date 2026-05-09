import { motion } from 'framer-motion';

export default function About() {
  const specs = [
    { label: "IDENTITY", value: "SIMONE // SIMLAG012" },
    { label: "CORE_SPECIALIZATION", value: "DISTRIBUTED SYSTEMS & BACKEND ARCH" },
    { label: "PROTOCOLS", value: "gRPC / Protobuf / MQTT / WS / REST" },
    { label: "PRIMARY_STACK", value: "Rust / Golang / C++ / Node.js" },
    { label: "STORAGE_ENGINES", value: "Redis Cluster / PostgreSQL / Kafka" },
    { label: "INFRASTRUCTURE", value: "K8s / Docker / Terraform / AWS" },
  ];

  return (
    <section id="about" style={{ padding: '100px 5%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '100px', width: '100%' }}>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hud-text" style={{ marginBottom: '2rem', color: 'var(--primary)' }}>[DATA_RETRIEVAL] // ARCHITECT_LOGS</div>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 5rem)',
            marginBottom: '40px',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.02em'
          }}>THE BRAIN<br/>BEHIND THE<br/>INFRASTRUCTURE</h2>
          
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1.1rem',
            lineHeight: '1.8',
            marginBottom: '40px',
            fontFamily: 'JetBrains Mono, monospace'
          }}>
            I operate in the abstract layer of the stack—where latency is measured in microseconds and reliability is quantified by nine-fives. My focus is exclusively on the unseen mechanics: the efficiency of data pipelines, the robustness of authentication protocols, and the scalability of distributed cores.
          </p>
          <p style={{
            color: '#fff',
            fontSize: '0.9rem',
            lineHeight: '1.8',
            marginBottom: '40px',
            fontFamily: 'JetBrains Mono, monospace',
            paddingLeft: '20px',
            borderLeft: '2px solid var(--primary)'
          }}>
            I believe that a UI is only as good as the system that powers it. I build the intelligence, the persistence, and the orchestration layers that transform raw code into resilient digital ecosystems.
          </p>
        </motion.div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.2)' }}
              viewport={{ once: true }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '20px',
                border: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(255,255,255,0.01)',
                cursor: 'default',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <span className="hud-text" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem' }}>{spec.label}</span>
              <span className="hud-text" style={{ fontSize: '0.7rem' }}>{spec.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

