import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Cpu } from 'lucide-react';
import { Github, getTechLogo } from './Icons';
import { projects } from '../data/projects';
import { playSound } from '../utils/audio';

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  const openProject = (project) => {
    playSound('click');
    setActiveProject(project);
  };

  const closeProject = () => {
    playSound('click');
    setActiveProject(null);
  };

  return (
    <section id="projects" style={{ padding: '100px 5%', background: 'transparent' }}>
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
          <div>
            <div style={{ 
              color: 'var(--primary)', 
              fontWeight: 700, 
              fontFamily: 'Inter', 
              letterSpacing: '2px', 
              fontSize: '0.75rem',
              marginBottom: '1rem',
              textTransform: 'uppercase'
            }}>
              Featured Work
            </div>
            <h2 style={{ 
              fontFamily: 'Inter, sans-serif', 
              fontSize: 'clamp(2.2rem, 6vw, 4rem)', 
              fontWeight: 900, 
              lineHeight: 1,
              color: '#fff',
              letterSpacing: '-0.03em'
            }}>
              Engineered Projects
            </h2>
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: '0.9rem', color: '#888', fontWeight: 600 }}>
            Total Projects: 06
          </div>
        </div>

        {/* Project Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '24px'
        }}>
          {projects.map((project, idx) => (
            <div 
              key={project.id} 
              onClick={() => openProject(project)}
              onMouseEnter={() => playSound('hover')}
              style={{ textDecoration: 'none', color: 'inherit', pointerEvents: 'all' }}
            >
              <motion.div
                whileHover={{ 
                  y: -8,
                  borderColor: 'rgba(0, 255, 102, 0.4)',
                  boxShadow: '0 20px 40px rgba(0, 255, 102, 0.05)'
                }}
                style={{
                  background: 'rgba(15, 23, 42, 0.3)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '35px 30px',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '0px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ 
                    fontFamily: 'Inter', 
                    fontSize: '0.8rem', 
                    fontWeight: 700, 
                    color: 'var(--primary)',
                    background: 'rgba(0, 255, 102, 0.06)',
                    padding: '4px 10px',
                    borderRadius: '0px'
                  }}>
                    Project {idx + 1}
                  </span>
                  <ArrowRight size={16} style={{ color: 'var(--primary)', opacity: 0.7 }} />
                </div>
                
                <h3 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  marginBottom: '12px',
                  color: '#fff',
                  letterSpacing: '-0.02em'
                }}>
                  {project.title.replace(' // ', ' — ')}
                </h3>
                
                <p style={{
                  color: '#aaa',
                  fontSize: '0.88rem',
                  lineHeight: '1.6',
                  marginBottom: '25px',
                  fontFamily: 'Inter, sans-serif',
                  flexGrow: 1
                }}>
                  {project.description}
                </p>

                {/* Tech Badge Grid */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px' }}>
                  {project.tech.map(tech => (
                    <span 
                      key={tech} 
                      style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '6px', 
                        fontSize: '0.72rem', 
                        border: '1px solid rgba(0, 255, 102, 0.12)', 
                        background: 'rgba(0, 255, 102, 0.02)',
                        padding: '5px 10px',
                        color: 'var(--primary)',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        borderRadius: '0px',
                      }}
                    >
                      {getTechLogo(tech, 12)}
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Overlay Modal */}
      <AnimatePresence>
        {activeProject && (
          <div style={{ pointerEvents: 'all' }}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeProject}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(5, 8, 16, 0.85)',
                backdropFilter: 'blur(16px)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: '#0d1321',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 25px 50px rgba(0, 255, 102, 0.04)',
                  width: '100%',
                  maxWidth: '650px',
                  borderRadius: '0px',
                  padding: '40px',
                  position: 'relative',
                  maxHeight: '90vh',
                  overflowY: 'auto'
                }}
              >
                {/* Close Button */}
                <button 
                  onClick={closeProject}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '32px',
                    height: '32px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={() => playSound('hover')}
                >
                  <X size={18} />
                </button>

                {/* Info Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', marginTop: '10px' }}>
                  <span style={{ 
                    fontFamily: 'Inter', 
                    fontSize: '0.75rem', 
                    fontWeight: 700, 
                    color: 'var(--primary)',
                    background: 'rgba(0, 255, 102, 0.06)',
                    padding: '3px 8px',
                    borderRadius: '0px'
                  }}>
                    Featured Project
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '2rem',
                  fontWeight: 900,
                  color: '#fff',
                  marginBottom: '20px',
                  letterSpacing: '-0.02em'
                }}>
                  {activeProject.title.replace(' // ', ' — ')}
                </h3>

                {/* Project Image Placeholder */}
                <div style={{ 
                  width: '100%', 
                  height: '250px', 
                  backgroundColor: '#0a0f1a', 
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  marginBottom: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#444',
                  fontFamily: 'Inter',
                  fontSize: '0.8rem'
                }}>
                  {/* TODO: Add real image src here */}
                  [PROJECT IMAGE PLACEHOLDER]
                </div>

                {/* Description */}
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.95rem',
                  lineHeight: '1.65',
                  color: '#aaa',
                  marginBottom: '30px'
                }}>
                  {activeProject.description}
                </p>



                {/* Tech Stack Badges */}
                <div style={{ marginBottom: '35px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#666', fontWeight: 600, fontFamily: 'Inter', marginBottom: '12px' }}>
                    TECHNOLOGY COMPASS
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {activeProject.tech.map((tech) => (
                      <span 
                        key={tech} 
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px 14px',
                          background: 'rgba(0, 255, 102, 0.02)',
                          border: '1px solid rgba(0, 255, 102, 0.15)',
                          fontSize: '0.78rem',
                          fontFamily: 'Inter',
                          fontWeight: 600,
                          color: 'var(--primary)',
                          borderRadius: '0px'
                        }}
                      >
                        {getTechLogo(tech, 12)}
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* GitHub CTA Button */}
                <a 
                  href={activeProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-btn neon-btn-primary"
                  style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', width: '100%', padding: '14px', borderRadius: '0px', fontWeight: 700 }}
                  onMouseEnter={() => playSound('hover')}
                >
                  <Github size={16} /> Explore on GitHub
                </a>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
