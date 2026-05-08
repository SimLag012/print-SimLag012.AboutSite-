import { motion } from 'framer-motion';
import { Terminal, Database, ShieldCheck, Activity, Cpu, Link, Gamepad2, Heart } from 'lucide-react';

const projects = [
  {
    title: "MetaShape Core",
    description: "A high-performance SaaS licensing engine featuring encrypted HWID validation, multi-node scaling, and Redis-backed rate limiting. Designed for secure software distribution with integrated Stripe payment orchestration and automated license lifecycle management.",
    tags: ["Python", "Redis", "Nginx", "PostgreSQL", "Encryption"],
    icon: <ShieldCheck size={40} />,
    color: "#00f2ff"
  },
  {
    title: "Hearth-Beat Infrastructure",
    description: "A robust microservices ecosystem orchestrating data processing across multiple specialized nodes. Features a comprehensive backend architecture using Docker for isolation, including importers, structurers, and tests, all integrated with a PostgreSQL core and a modern React frontend.",
    tags: ["Docker", "Python", "React", "PostgreSQL", "Microservices"],
    icon: <Heart size={40} />,
    color: "#ff2d55"
  },
  {
    title: "Stoneks (Roblox Indie Game)",
    description: "An immersive indie mining simulator built on the Roblox engine. Orchestrates complex in-game economies, procedural environmental generation, and real-time multiplayer synchronization. Features a full toolchain for importing assets and managing massive RBXLX place files.",
    tags: ["Luau", "Roblox Engine", "Economy Systems", "Indie Game"],
    icon: <Gamepad2 size={40} />,
    color: "#ffc400"
  },
  {
    title: "GitMedic API",
    description: "Advanced Git repository diagnostics tool. Implements recursive scanning algorithms to detect and repair corrupted blobs and filesystem inconsistencies. Provides a CLI and API for automated repository health restoration.",
    tags: ["Python", "Git API", "File Systems", "Algorithms"],
    icon: <Database size={40} />,
    color: "#bc00ff"
  },
  {
    title: "SpotFetch Engine",
    description: "Intelligent audio library manager and metadata crawler. Handles concurrent download queues, automated proxy rotation for rate-limit bypassing, and high-fidelity metadata synchronization with the Spotify Web API.",
    tags: ["Node.js", "Spotify API", "Queue Management"],
    icon: <Terminal size={40} />,
    color: "#1db954"
  },
  {
    title: "App Riciclo API",
    description: "A sophisticated waste classification backend developed for a specialized Hackathon. Integrates AI-driven recognition logic with a scalable user management system and persistent data storage for ecological impact tracking.",
    tags: ["Node.js", "MongoDB", "AI Integration"],
    icon: <Cpu size={40} />,
    color: "#00ff88"
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
          Infrastructure & Engineering
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            marginBottom: '10px',
            fontWeight: 900
          }}
        >
          CORE PROJECTS
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
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '40px'
      }}>
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -15, borderColor: project.color, background: 'rgba(255,255,255,0.04)' }}
            style={{
              padding: '40px',
              borderRadius: '5px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
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
              fontSize: '1.4rem',
              marginBottom: '20px',
              color: '#fff'
            }}>
              {project.title}
            </h3>
            
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.95rem',
              lineHeight: '1.7',
              marginBottom: '30px',
              minHeight: '100px'
            }}>
              {project.description}
            </p>

            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              marginTop: 'auto'
            }}>
              {project.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: '0.6rem',
                  background: 'rgba(255,255,255,0.03)',
                  padding: '4px 10px',
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
