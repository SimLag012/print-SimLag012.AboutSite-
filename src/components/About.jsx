import { motion } from 'framer-motion';
import { playSound } from '../utils/audio';
import { Cpu, Server, Database, Shield } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export default function About() {
  const specs = [
    { 
      icon: <Server size={20} style={{ color: 'var(--primary)' }} />,
      label: "CORE LANGUAGES", 
      value: "Python // Lua // HTML // CSS" 
    },
    { 
      icon: <Database size={20} style={{ color: 'var(--primary)' }} />,
      label: "WEB & UI DEVELOPMENT", 
      value: "HTML5 // CSS3 // Responsive Design" 
    },
    { 
      icon: <Cpu size={20} style={{ color: 'var(--primary)' }} />,
      label: "AI & SOFTWARE", 
      value: "Kivy // Machine Learning Integrations // Task Managers" 
    },
    { 
      icon: <Shield size={20} style={{ color: 'var(--primary)' }} />,
      label: "COMPETITIVE ACHIEVEMENTS", 
      value: "1st Cesena Problem Solving // 2nd GreenMindAI Hackathon" 
    },
  ];

  return (
    <section id="about" style={{ padding: '100px 5%', background: 'transparent' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '60px',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        alignItems: 'center'
      }}
      className="about-grid-responsive"
      >
        <style>{`
          @media (min-width: 992px) {
            .about-grid-responsive {
              grid-template-columns: 1.1fr 1fr !important;
              gap: 80px !important;
            }
          }
        `}</style>
        
        {/* Left Side: Bold Statement and Experience Details */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ 
            color: 'var(--primary)', 
            fontWeight: 700, 
            fontFamily: 'Inter', 
            letterSpacing: '2px', 
            fontSize: '0.75rem',
            marginBottom: '1rem',
            textTransform: 'uppercase'
          }}>
            MY PHILOSOPHY
          </div>
          
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            marginBottom: '24px',
            fontWeight: 900,
            lineHeight: 0.95,
            color: '#fff',
            letterSpacing: '-0.03em'
          }}>
            Building Smart,<br/>
            Full-Stack<br/>
            Ecosystems.
          </h2>
          
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.98rem',
            lineHeight: '1.65',
            color: '#aaa',
            marginBottom: '30px'
          }}>
            <p style={{ marginBottom: '16px' }}>
              I focus on developing AI-driven projects and robust backend logic. From creating intelligent task tracking systems to coding complex Roblox games in Lua, I specialize in translating complex problems into efficient code.
            </p>
            <p style={{ color: '#fff', borderLeft: '2px solid var(--primary)', paddingLeft: '20px', fontWeight: 500 }}>
              I am an active competitor in <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>National Olympiads and Hackathons</span>, where I consistently build scalable architectures and push my <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>problem-solving limits</span> to deliver award-winning solutions.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '25px', marginTop: '10px' }}>
            <a 
              href="https://github.com/SimLag012"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playSound('hover')}
              onClick={() => playSound('click')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#fff',
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: '0.85rem',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.2)',
                paddingBottom: '4px',
                transition: 'all 0.3s'
              }}
              className="about-social-link"
            >
              <Github size={15} /> GitHub Profile
            </a>
            <a 
              href="https://linkedin.com/in/simlag012"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playSound('hover')}
              onClick={() => playSound('click')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#fff',
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: '0.85rem',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.2)',
                paddingBottom: '4px',
                transition: 'all 0.3s'
              }}
              className="about-social-link"
            >
              <Linkedin size={15} /> LinkedIn Profile
            </a>
          </div>
        </motion.div>
        
        {/* Right Side: Clean Visual Specs Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 6, backgroundColor: 'rgba(0, 255, 102, 0.04)', borderColor: 'rgba(0, 255, 102, 0.25)' }}
              viewport={{ once: true }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '24px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                background: 'rgba(15, 23, 42, 0.2)',
                backdropFilter: 'blur(8px)',
                borderRadius: '0px',
                cursor: 'default',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div>{spec.icon}</div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ color: '#888', fontWeight: 600, fontFamily: 'Inter', fontSize: '0.72rem', marginBottom: '4px', letterSpacing: '0.5px' }}>
                  {spec.label}
                </div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', color: '#fff', fontWeight: 500 }}>
                  {spec.value}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <style>{`
        .about-social-link:hover {
          color: var(--primary) !important;
          border-color: var(--primary) !important;
        }
      `}</style>
    </section>
  );
}
