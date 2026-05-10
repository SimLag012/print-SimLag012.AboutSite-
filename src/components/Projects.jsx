import { motion } from 'framer-motion';
import { ExternalLink, Code, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { playSound } from '../utils/audio';

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '100px 5%', background: 'transparent' }}>
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
          background: 'rgba(255,255,255,0.05)'
        }}>
          {projects.map((project) => (
            <Link 
              key={project.id} 
              to={`/project/${project.slug}`}
              onClick={() => playSound('click')}
              onMouseEnter={() => playSound('hover')}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <motion.div
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                style={{
                  background: 'rgba(5,5,5,0.8)',
                  padding: '60px 40px',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: '0.3s',
                  pointerEvents: 'all',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
                  <div className="hud-text" style={{ color: 'var(--primary)' }}>ID_{project.id}</div>
                  <ArrowRight size={16} className="hud-text" style={{ opacity: 0.3 }} />
                </div>
                
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
                  fontFamily: 'JetBrains Mono, monospace',
                  flexGrow: 1
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

