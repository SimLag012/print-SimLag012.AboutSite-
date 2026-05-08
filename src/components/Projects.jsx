import { motion } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';

const projects = [
  {
    id: "01",
    title: "MetaShape Core",
    description: "SaaS licensing engine with multi-node scaling and Redis rate limiting.",
    tags: ["Security", "Scaling"],
  },
  {
    id: "02",
    title: "Hearth-Beat",
    description: "Microservices ecosystem for high-volume data orchestration.",
    tags: ["Docker", "Microservices"],
  },
  {
    id: "03",
    title: "Stoneks Engine",
    description: "Indie Roblox mining game simulator with complex economic logic.",
    tags: ["Roblox", "Luau"],
  },
  {
    id: "04",
    title: "GitMedic",
    description: "Low-level diagnostic tool for corrupted Git blob restoration.",
    tags: ["Python", "Algorithms"],
  },
  {
    id: "05",
    title: "SpotFetch",
    description: "Concurrent download manager and metadata crawler.",
    tags: ["Node.js", "Concurrency"],
  },
  {
    id: "06",
    title: "ShapeX Engine",
    description: "Vector-based geometry engine for procedural generation.",
    tags: ["Math", "C++"],
  }
];

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '100px 5%' }}>
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px' }}>
          <div>
            <div className="hud-text" style={{ marginBottom: '1rem' }}>[Registry] // Case_Studies</div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(2rem, 8vw, 6rem)', fontWeight: 900, lineHeight: 1 }}>PROJECTS</h2>
          </div>
          <div className="hud-text" style={{ paddingBottom: '10px' }}>Total_Entries: 06</div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: '1px',
          background: 'var(--hud-border)'
        }}>
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
              style={{
                background: '#050505',
                padding: '60px 40px',
                position: 'relative',
                cursor: 'pointer',
                transition: '0.3s'
              }}
            >
              <div className="hud-text" style={{ color: 'var(--primary)', marginBottom: '30px' }}>ID_{project.id}</div>
              <h3 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '2rem',
                fontWeight: 900,
                marginBottom: '20px',
                color: '#fff'
              }}>
                {project.title}
              </h3>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                lineHeight: '1.6',
                marginBottom: '40px',
                fontFamily: 'JetBrains Mono, monospace'
              }}>
                {project.description}
              </p>

              <div style={{ display: 'flex', gap: '15px' }}>
                {project.tags.map(tag => (
                  <span key={tag} className="hud-text" style={{ fontSize: '0.55rem', border: '1px solid #222', padding: '4px 8px' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
