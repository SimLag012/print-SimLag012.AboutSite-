import { motion } from 'framer-motion';
import { Terminal, Database, ShieldCheck, Activity, Cpu, Link } from 'lucide-react';

const projects = [
  {
    title: "MetaShape Core",
    description: "SaaS Licensing Engine con architettura a microservizi, validazione HWID cryptata e caching via Redis. Gestione pagamenti Stripe integrata lato server.",
    tags: ["Python", "Redis", "Nginx", "PostgreSQL"],
    icon: <ShieldCheck size={40} />,
    color: "#00f2ff"
  },
  {
    title: "GitMedic API",
    description: "Servizio di diagnostica e riparazione automatizzata per filesystem Git corrotti. Algoritmi di scansione ricorsiva e ripristino integrità blob.",
    tags: ["Python", "Git API", "Low-level I/O"],
    icon: <Database size={40} />,
    color: "#bc00ff"
  },
  {
    title: "Stoneks Backend",
    description: "Engine di elaborazione dati finanziari in real-time. Streaming di ordini via WebSockets con latenza sub-millisecondo.",
    tags: ["Node.js", "WebSockets", "FastAPI"],
    icon: <Activity size={40} />,
    color: "#ffc400"
  },
  {
    title: "SpotFetch Engine",
    description: "Sistema automatizzato di recupero metadati e stream audio. Gestione code di download concorrenti e proxy rotation.",
    tags: ["Node.js", "Spotify API", "Redis"],
    icon: <Terminal size={40} />,
    color: "#1db954"
  },
  {
    title: "App Riciclo API",
    description: "Backend sviluppato per Hackathon: sistema di classificazione rifiuti tramite AI e gestione database utenti scalabile.",
    tags: ["Node.js", "MongoDB", "Tensorflow"],
    icon: <Cpu size={40} />,
    color: "#00ff88"
  },
  {
    title: "ShapeX Math Engine",
    description: "Motore logico per la generazione di geometrie complesse tramite calcoli vettoriali e matriciali puri.",
    tags: ["Math", "Algorithms", "C++"],
    icon: <Activity size={40} />,
    color: "#ff0055"
  }
];

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '100px 10%', background: 'rgba(0,0,0,0.2)' }}>
      <div style={{ marginBottom: '80px', textAlign: 'center' }}>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ color: 'var(--primary)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '1rem' }}
        >
          Infrastructure & Systems
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '3.5rem',
            marginBottom: '10px',
            fontWeight: 900
          }}
        >
          CORE SYSTEMS
        </motion.h2>
        <div style={{
          width: '100px',
          height: '4px',
          background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
          margin: '0 auto'
        }} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '40px'
      }}>
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -15, borderColor: project.color }}
            style={{
              padding: '50px',
              borderRadius: '5px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              transition: '0.4s cubic-bezier(0.17, 0.67, 0.83, 0.67)'
            }}
          >
            {/* Background Glow */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '150px',
              height: '150px',
              background: project.color,
              filter: 'blur(100px)',
              opacity: 0.1
            }} />

            <div style={{ color: project.color, marginBottom: '20px' }}>
              {project.icon}
            </div>

            <h3 style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '1.6rem',
              marginBottom: '20px',
              color: '#fff'
            }}>
              {project.title}
            </h3>
            
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '1rem',
              lineHeight: '1.7',
              marginBottom: '30px',
              minHeight: '80px'
            }}>
              {project.description}
            </p>

            <div style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              marginTop: 'auto'
            }}>
              {project.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: '0.65rem',
                  background: 'rgba(255,255,255,0.03)',
                  padding: '6px 14px',
                  borderRadius: '2px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: project.color,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontWeight: 700
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
