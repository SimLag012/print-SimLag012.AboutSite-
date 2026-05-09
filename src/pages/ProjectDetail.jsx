import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { ArrowLeft, ChevronRight, Activity, Shield, Cpu, Zap } from 'lucide-react';
import { useEffect } from 'react';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) return <div style={{ color: '#fff', padding: '100px' }}>Project Not Found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ 
        minHeight: '100vh', 
        color: '#fff', 
        padding: '120px 5%',
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
        position: 'relative'
      }}
    >
      {/* Navigation */}
      <Link to="/" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px', 
        color: '#666', 
        textDecoration: 'none',
        marginBottom: '60px',
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        fontFamily: 'JetBrains Mono, monospace'
      }}>
        <ArrowLeft size={16} /> [BACK_TO_CORE]
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '80px' }}>
        {/* Left Side: Info */}
        <div>
          <div className="hud-text" style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
            ID_{project.id} // {project.tags.join('_')}
          </div>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 5rem)', 
            fontWeight: 900, 
            marginBottom: '40px',
            lineHeight: 1,
            letterSpacing: '-0.02em'
          }}>
            {project.title}
          </h1>

          <p style={{ 
            fontSize: '1.2rem', 
            color: '#aaa', 
            lineHeight: 1.6, 
            marginBottom: '60px',
            fontFamily: 'JetBrains Mono, monospace'
          }}>
            {project.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <div>
              <div className="hud-text" style={{ marginBottom: '1rem', color: '#fff' }}>[CHALLENGE]</div>
              <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.6 }}>{project.details.challenge}</p>
            </div>
            <div>
              <div className="hud-text" style={{ marginBottom: '1rem', color: '#fff' }}>[SOLUTION]</div>
              <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.6 }}>{project.details.solution}</p>
            </div>
          </div>
        </div>

        {/* Right Side: Specs & Metrics */}
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ marginBottom: '60px' }}>
            <div className="hud-text" style={{ marginBottom: '2rem' }}>[SYSTEM_METRICS]</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {project.details.metrics.map((metric, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
                  <span className="hud-text" style={{ fontSize: '0.6rem' }}>METRIC_{i+1}</span>
                  <span style={{ fontFamily: 'Orbitron', color: 'var(--secondary)', fontSize: '0.9rem' }}>{metric}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '60px' }}>
            <div className="hud-text" style={{ marginBottom: '2rem' }}>[TECH_STACK]</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {project.details.stack.map(tech => (
                <span key={tech} style={{ 
                  padding: '8px 15px', 
                  background: 'rgba(255,255,255,0.03)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: '0.7rem',
                  fontFamily: 'JetBrains Mono',
                  color: '#fff'
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive "Core Status" widget */}
          <div style={{ padding: '20px', border: '1px solid var(--secondary)', background: 'rgba(0,242,255,0.05)' }}>
            <div className="hud-text" style={{ color: 'var(--secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Activity size={12} /> CORE_STATUS: ACTIVE
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
              {[...Array(20)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: [10, Math.random() * 30 + 10, 10] }}
                  transition={{ repeat: Infinity, duration: 0.5 + Math.random(), ease: "easeInOut" }}
                  style={{ width: '4px', background: 'var(--secondary)', opacity: 0.5 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Shards */}
      <div style={{ 
        position: 'absolute', 
        top: '20%', 
        right: '5%', 
        fontSize: '15rem', 
        fontWeight: 900, 
        color: 'rgba(255,255,255,0.02)', 
        zIndex: -1,
        pointerEvents: 'none',
        userSelect: 'none'
      }}>
        {project.id}
      </div>
    </motion.div>
  );
}
