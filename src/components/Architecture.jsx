import { motion } from 'framer-motion';

const Node = ({ label, x, y, delay, type = "PROCESS" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      zIndex: 2
    }}
  >
    <div style={{
      padding: '12px 24px',
      border: '1px solid rgba(255,255,255,0.1)',
      background: 'rgba(5,5,5,0.9)',
      backdropFilter: 'blur(10px)',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.65rem',
      color: '#fff',
      letterSpacing: '1px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
    }}>
      <span style={{ color: 'var(--primary)', marginRight: '8px' }}>[{type}]</span>
      {label}
    </div>
    <div style={{ height: '1px', width: '100%', background: 'linear-gradient(90deg, var(--primary), transparent)', opacity: 0.3 }} />
  </motion.div>
);

const Connection = ({ x1, y1, x2, y2, delay }) => (
  <motion.svg
    style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}
  >
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 0.2 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 1.5, ease: "easeInOut" }}
      d={`M ${x1 + 5} ${y1 + 5} L ${x2 + 5} ${y2 + 5}`}
      stroke="var(--primary)"
      strokeWidth="1"
      fill="none"
    />
  </motion.svg>
);

export default function Architecture() {
  return (
    <section id="architecture" style={{ padding: '100px 5%', background: 'transparent' }}>
      <div style={{ width: '100%', position: 'relative' }}>
        <div style={{ marginBottom: '100px' }}>
          <div className="hud-text" style={{ marginBottom: '1rem', color: 'var(--secondary)' }}>[SYSTEM_SCHEMATICS] // CLUSTER_V4_LAYOUT</div>
          <h2 style={{ 
            fontFamily: 'Inter, sans-serif', 
            fontSize: 'clamp(2.5rem, 8vw, 6rem)', 
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.03em'
          }}>SYSTEM ARCHITECTURE</h2>
        </div>

        <div style={{ 
          position: 'relative', 
          height: '500px', 
          width: '100%',
          background: 'rgba(255,255,255,0.01)',
          border: '1px solid rgba(255,255,255,0.05)',
          padding: '40px'
        }}>
          {/* Layer 1: Ingress */}
          <Node label="NGINX_INGRESS_PROXY" x={5} y={45} delay={0.2} type="GATEWAY" />
          
          {/* Layer 2: Auth & Logic */}
          <Node label="HMAC_AUTH_VALIDATOR" x={30} y={25} delay={0.4} type="SECURITY" />
          <Node label="CORE_LOGIC_ORCHESTRATOR" x={30} y={65} delay={0.5} type="SERVICE" />
          
          {/* Layer 3: Caching & Events */}
          <Node label="REDIS_L1_STATE_CACHE" x={60} y={25} delay={0.7} type="VOLATILE" />
          <Node label="KAFKA_MESSAGE_BUS" x={60} y={65} delay={0.8} type="STREAM" />
          
          {/* Layer 4: Persistence */}
          <Node label="POSTGRES_DB_PRIMARY" x={85} y={45} delay={1.0} type="PERSISTENT" />

          {/* Connections */}
          <Connection x1={18} y1={45} x2={30} y2={30} delay={0.6} />
          <Connection x1={18} y1={45} x2={30} y2={70} delay={0.6} />
          
          <Connection x1={45} y1={30} x2={60} y2={30} delay={0.9} />
          <Connection x1={45} y1={70} x2={60} y2={70} delay={0.9} />
          
          <Connection x1={75} y1={30} x2={85} y2={45} delay={1.2} />
          <Connection x1={75} y1={70} x2={85} y2={55} delay={1.2} />

          {/* Background Grid for detail */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 0)',
            backgroundSize: '30px 30px',
            zIndex: 0,
            opacity: 0.5
          }} />
        </div>
      </div>
    </section>
  );
}

