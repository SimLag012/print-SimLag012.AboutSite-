import { motion } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';

const projects = [
  {
    title: "MetaShape",
    description: "Sistema di licensing SaaS avanzato con protezione HWID e integrazione Stripe.",
    tags: ["Python", "Redis", "Nginx", "Stripe"],
    link: "#"
  },
  {
    title: "Solar Explorer",
    description: "Viaggio interattivo nel sistema solare con rendering real-time.",
    tags: ["Three.js", "React", "WebGL"],
    link: "#"
  },
  {
    title: "Stoneks",
    description: "Dashboard crypto e finanza con aggiornamenti WebSocket ultra-rapidi.",
    tags: ["React", "WebSockets", "D3.js"],
    link: "#"
  },
  {
    title: "GitMedic",
    description: "Tool CLI per il recupero e la riparazione di repository Git corrotti.",
    tags: ["Python", "Git API", "CLI"],
    link: "#"
  },
  {
    title: "SpotFetch",
    description: "Downloader intelligente e manager di playlist per Spotify.",
    tags: ["Node.js", "Spotify API"],
    link: "#"
  },
  {
    title: "ShapeX",
    description: "Motore grafico 2D per la generazione di pattern procedurali.",
    tags: ["Canvas", "Math", "Generative"],
    link: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '100px 10%' }}>
      <div style={{ marginBottom: '60px' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '2.5rem',
            marginBottom: '10px'
          }}
        >
          Progetti Selezionati
        </motion.h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: '60px' }}
          viewport={{ once: true }}
          style={{
            height: '4px',
            background: 'var(--primary)',
            boxShadow: 'var(--accent-glow)'
          }}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '30px'
      }}>
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            style={{
              padding: '40px',
              borderRadius: '15px',
              background: 'var(--glass)',
              border: '1px solid var(--glass-border)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              minHeight: '400px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ marginBottom: 'auto' }}>
              <h3 style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '1.8rem',
                marginBottom: '15px'
              }}>
                {project.title}
              </h3>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                {project.description}
              </p>
            </div>

            <div>
              <div style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                marginBottom: '25px'
              }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: '0.7rem',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    border: '1px solid var(--glass-border)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                <motion.a 
                  href={project.link}
                  whileHover={{ color: 'var(--primary)' }}
                  style={{ color: 'var(--text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', fontWeight: 700 }}
                >
                  <ExternalLink size={18} /> LIVE DEMO
                </motion.a>
                <motion.a 
                  href="#"
                  whileHover={{ color: 'var(--primary)' }}
                  style={{ color: 'var(--text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', fontWeight: 700 }}
                >
                  <Code size={18} /> CODE
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
