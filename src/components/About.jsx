import { motion } from 'framer-motion';
import { playSound } from '../utils/audio';
import { Cpu, Server, Database, Shield } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import './About.css';

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
    <section id="about" className="about-section">
      <div className="about-grid-responsive">
        
        {/* Left Side: Bold Statement and Experience Details */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="about-subtitle">
            MY PHILOSOPHY
          </div>
          
          <h2 className="about-title">
            Building Smart,<br/>
            Full-Stack<br/>
            Ecosystems.
          </h2>
          
          <div className="about-desc-container">
            <p className="about-desc-para">
              I focus on developing AI-driven projects and robust backend logic. From creating intelligent task tracking systems to coding complex Roblox games in Lua, I specialize in translating complex problems into efficient code.
            </p>
            <p className="about-desc-highlight">
              I am an active competitor in <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>National Olympiads and Hackathons</span>, where I consistently build scalable architectures and push my <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>problem-solving limits</span> to deliver award-winning solutions.
            </p>
          </div>

          <div className="about-social-container">
            <a 
              href="https://github.com/SimLag012"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playSound('hover')}
              onClick={() => playSound('click')}
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
              className="about-social-link"
            >
              <Linkedin size={15} /> LinkedIn Profile
            </a>
          </div>
        </motion.div>
        
        {/* Right Side: Clean Visual Specs Grid */}
        <div className="about-specs-grid">
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 6, backgroundColor: 'rgba(0, 255, 102, 0.04)', borderColor: 'rgba(0, 255, 102, 0.25)' }}
              viewport={{ once: true }}
              className="about-spec-card"
            >
              <div>{spec.icon}</div>
              <div style={{ flexGrow: 1 }}>
                <div className="about-spec-label">
                  {spec.label}
                </div>
                <div className="about-spec-value">
                  {spec.value}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
