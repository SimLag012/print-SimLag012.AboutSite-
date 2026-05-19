import { motion } from 'framer-motion';

const Node = ({ label, x, y, delay, type = "PROCESS" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    whileHover={{ scale: 1.03, borderColor: 'var(--primary)', boxShadow: '0 0 15px rgba(0, 255, 102, 0.15)' }}
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      zIndex: 2,
      cursor: 'default',
      transition: 'border-color 0.3s, box-shadow 0.3s'
    }}
  >
    <div style={{
      padding: '12px 20px',
      border: '1px solid rgba(0, 255, 102, 0.2)',
      background: 'rgba(3, 3, 3, 0.95)',
      backdropFilter: 'blur(8px)',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.65rem',
      color: '#fff',
      letterSpacing: '1px',
      borderRadius: '0px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.6)'
    }}>
      <span style={{ color: 'var(--primary)', marginRight: '8px', fontWeight: 'bold' }}>[{type}]</span>
      {label}
    </div>
    <div style={{ height: '1px', width: '100%', background: 'linear-gradient(90deg, var(--primary), transparent)', opacity: 0.4 }} />
  </motion.div>
);

const Connection = ({ x1, y1, x2, y2, delay }) => (
  <motion.svg
    style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}
  >
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 0.25 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 1.2, ease: "easeInOut" }}
      d={`M ${x1 + 5} ${y1 + 5} L ${x2 + 5} ${y2 + 5}`}
      stroke="var(--primary)"
      strokeWidth="1.2"
      strokeDasharray="4 4"
      fill="none"
    />
  </motion.svg>
);

export default function Architecture() {
  return (
    <section id="architecture" style={{ padding: '80px 5%', background: 'transparent' }}>
      <div style={{ width: '100%', position: 'relative' }}>
        <div style={{ marginBottom: '60px' }}>
          <div className="hud-text" style={{ marginBottom: '0.8rem', color: 'var(--primary)' }}>[SYSTEM_SCHEMATICS] // PRODUCTION_CLUSTER</div>
          <h2 style={{ 
            fontFamily: 'Inter, sans-serif', 
            fontSize: 'clamp(2rem, 6vw, 4.5rem)', 
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.03em'
          }}>SYSTEM SCHEMATICS</h2>
        </div>

        <div style={{ 
          position: 'relative', 
          height: '460px', 
          width: '100%',
          background: 'rgba(3, 3, 3, 0.4)',
          border: '1px solid var(--hud-border)',
          borderRadius: '0px',
          padding: '40px',
          overflow: 'hidden'
        }}>
          {/* Layer 1: Ingress */}
          <Node label="NGINX_INGRESS_PROXY" x={5} y={45} delay={0.1} type="GATEWAY" />
          
          {/* Layer 2: Auth & Logic */}
          <Node label="HMAC_AUTH_VALIDATOR" x={30} y={22} delay={0.2} type="SECURITY" />
          <Node label="CORE_LOGIC_ORCHESTRATOR" x={30} y={68} delay={0.3} type="SERVICE" />
          
          {/* Layer 3: Caching & Events */}
          <Node label="REDIS_L1_STATE_CACHE" x={60} y={22} delay={0.4} type="VOLATILE" />
          <Node label="KAFKA_MESSAGE_BUS" x={60} y={68} delay={0.5} type="STREAM" />
          
          {/* Layer 4: Persistence */}
          <Node label="POSTGRES_DB_PRIMARY" x={85} y={45} delay={0.6} type="PERSISTENT" />

          {/* Connections */}
          <Connection x1={18} y1={45} x2={30} y2={28} delay={0.4} />
          <Connection x1={18} y1={45} x2={30} y2={74} delay={0.4} />
          
          <Connection x1={46} y1={28} x2={60} y2={28} delay={0.6} />
          <Connection x1={46} y1={74} x2={60} y2={74} delay={0.6} />
          
          <Connection x1={76} y1={28} x2={85} y2={45} delay={0.8} />
          <Connection x1={76} y1={74} x2={85} y2={56} delay={0.8} />

          {/* Background Grid for detail */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(0, 255, 102, 0.03) 1.2px, transparent 0)',
            backgroundSize: '24px 24px',
            zIndex: 0,
            opacity: 0.7,
            pointerEvents: 'none'
          }} />
        </div>
      </div>
    </section>
  );
}
