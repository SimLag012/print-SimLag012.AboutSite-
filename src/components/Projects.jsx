import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Cpu } from 'lucide-react';
import { Github, getTechLogo } from './Icons';
import { projects } from '../data/projects';
import { playSound } from '../utils/audio';
import './Projects.css';

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
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <div>
            <div className="projects-tagline">
              Featured Work
            </div>
            <h2 className="projects-title">
              Engineered Projects
            </h2>
          </div>
          <div className="projects-counter">
            Total Projects: 06
          </div>
        </div>

        {/* Project Grid */}
        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div 
              key={project.id} 
              onClick={() => openProject(project)}
              onMouseEnter={() => playSound('hover')}
              className="projects-card-link"
            >
              <motion.div
                whileHover={{ 
                  y: -8,
                  borderColor: 'rgba(0, 255, 102, 0.4)',
                  boxShadow: '0 20px 40px rgba(0, 255, 102, 0.05)'
                }}
                className="projects-card"
              >
                <div className="projects-card-header">
                  <span className="projects-card-badge">
                    Project {idx + 1}
                  </span>
                  <ArrowRight size={16} style={{ color: 'var(--primary)', opacity: 0.7 }} />
                </div>
                
                <h3 className="projects-card-title">
                  {project.title.replace(' // ', ' — ')}
                </h3>
                
                <p className="projects-card-desc">
                  {project.description}
                </p>

                {/* Tech Badge Grid */}
                <div className="projects-card-tech-row">
                  {project.tech.map(tech => (
                    <span key={tech} className="projects-tech-badge">
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
              className="modal-overlay"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                className="modal-box"
              >
                {/* Close Button */}
                <button 
                  onClick={closeProject}
                  className="modal-close-btn"
                  onMouseEnter={() => playSound('hover')}
                >
                  <X size={18} />
                </button>

                {/* Info Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', marginTop: '10px' }}>
                  <span className="modal-badge">
                    Featured Project
                  </span>
                </div>

                {/* Title */}
                <h3 className="modal-title">
                  {activeProject.title.replace(' // ', ' — ')}
                </h3>

                {/* Project Image Placeholder */}
                <div className="modal-image-placeholder">
                  {/* TODO: Add real image src here */}
                  [PROJECT IMAGE PLACEHOLDER]
                </div>

                {/* Description */}
                <p className="modal-desc">
                  {activeProject.description}
                </p>

                {/* Tech Stack Badges */}
                <div style={{ marginBottom: '35px' }}>
                  <div className="modal-tech-label">
                    TECHNOLOGY COMPASS
                  </div>
                  <div className="modal-tech-list">
                    {activeProject.tech.map((tech) => (
                      <span key={tech} className="modal-tech-badge">
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
                  className="neon-btn neon-btn-primary modal-git-btn"
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
