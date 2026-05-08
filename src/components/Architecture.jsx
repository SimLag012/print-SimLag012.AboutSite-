import { motion } from 'framer-motion';

const Node = ({ label, x, y, delay }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay }}
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}
  >
    <div style={{
      padding: '15px 30px',
      border: '1px solid #333',
      background: 'rgba(255,255,255,0.01)',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.7rem',
      color: '#fff',
      letterSpacing: '2px'
    }}>
      {label}
    </div>
  </motion.div>
);

const Connection = ({ x1, y1, x2, y2, delay }) => (
  <motion.svg
    style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: -1 }}
  >
    <motion.line
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 1 }}
      x1={`${x1 + 5}%`} y1={`${y1 + 5}%`}
      x2={`${x2 + 5}%`} y2={`${y2 + 5}%`}
      stroke="#222"
      strokeWidth="1"
    />
  </motion.svg>
);

export default function Architecture() {
  return (
    <section id="architecture" style={{ height: '800px' }}>
      <div style={{ width: '100%', position: 'relative' }}>
        <div style={{ marginBottom: '100px' }}>
          <div className="hud-text" style={{ marginBottom: '1rem' }}>[Schema] // Logic_Flow</div>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '3rem', fontWeight: 900 }}>SYSTEM FLOW</h2>
        </div>

        <div style={{ position: 'relative', height: '400px', width: '100%' }}>
          <Node label="NGINX_PROXY" x={0} y={40} delay={0.2} />
          <Node label="AUTH_MODULE" x={25} y={40} delay={0.4} />
          <Node label="CORE_API_V3" x={50} y={40} delay={0.6} />
          <Node label="REDIS_L1_CACHE" x={75} y={20} delay={0.8} />
          <Node label="POSTGRES_DB" x={75} y={60} delay={1.0} />

          <Connection x1={5} y1={45} x2={25} y2={45} delay={0.5} />
          <Connection x1={30} y1={45} x2={50} y2={45} delay={0.7} />
          <Connection x1={55} y1={45} x2={75} y2={25} delay={0.9} />
          <Connection x1={55} y1={45} x2={75} y2={65} delay={1.1} />
        </div>
      </div>
    </section>
  );
}
