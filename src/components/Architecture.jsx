import { motion } from 'framer-motion';
import { Server, Database, Lock, Zap, Share2 } from 'lucide-react';

const Node = ({ icon: Icon, label, x, y, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, type: 'spring' }}
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px'
    }}
  >
    <div style={{
      width: '60px',
      height: '60px',
      background: 'rgba(0,242,255,0.1)',
      border: '1px solid var(--primary)',
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'var(--primary)',
      boxShadow: 'var(--accent-glow)'
    }}>
      <Icon size={30} />
    </div>
    <span style={{ fontSize: '0.7rem', color: '#fff', fontWeight: 700, textTransform: 'uppercase' }}>{label}</span>
  </motion.div>
);

const Connection = ({ x1, y1, x2, y2, delay }) => (
  <motion.svg
    style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: -1 }}
  >
    <motion.line
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 0.2 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 1.5 }}
      x1={`${x1 + 3}%`} y1={`${y1 + 5}%`}
      x2={`${x2 + 3}%`} y2={`${y2 + 5}%`}
      stroke="var(--primary)"
      strokeWidth="1"
    />
  </motion.svg>
);

export default function Architecture() {
  return (
    <section id="architecture" style={{ height: '600px', padding: '100px 10%', position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '100px' }}>
        <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '2rem', fontWeight: 900 }}>SYSTEM ARCHITECTURE</h2>
        <p style={{ color: 'var(--text-muted)' }}>Visualizzazione del flusso logico dei miei sistemi</p>
      </div>

      <div style={{ position: 'relative', height: '300px', width: '100%' }}>
        <Node icon={Server} label="Nginx Reverse Proxy" x={10} y={40} delay={0.2} />
        <Node icon={Lock} label="Auth Guard (HWID)" x={30} y={40} delay={0.4} />
        <Node icon={Zap} label="Core API (FastAPI)" x={50} y={40} delay={0.6} />
        <Node icon={Share2} label="Redis Cache" x={70} y={20} delay={0.8} />
        <Node icon={Database} label="PostgreSQL Core" x={70} y={60} delay={1.0} />

        <Connection x1={13} y1={45} x2={30} y2={45} delay={0.5} />
        <Connection x1={33} y1={45} x2={50} y2={45} delay={0.7} />
        <Connection x1={53} y1={45} x2={70} y2={25} delay={0.9} />
        <Connection x1={53} y1={45} x2={70} y2={65} delay={1.1} />
      </div>
    </section>
  );
}
