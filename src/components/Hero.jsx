import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { playSound } from '../utils/audio';
import { Cpu, Zap, Server, ChevronRight, MapPin } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import profileAvatar from '../assets/profile_avatar.png';
import './Hero.css';

const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(() =>
        text.split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 25);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <motion.div
        className="hero-wrapper"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero-container hero-grid-responsive">
          {/* Left Column: Clean, Elegant Info */}
          <div>
            <div className="hero-available-badge hud-text">
              <span className="hero-available-dot"></span>
              <span className="hero-available-text">
                AVAILABLE FOR PRODUCTION ROLES
              </span>
            </div>

            <h1 className="hero-title">
              Hi, I'm <span className="hero-name-highlight"><ScrambleText text="Simone" /></span>
            </h1>

            <h2 className="hero-subtitle">
              AI & Backend Developer
            </h2>

            <p className="hero-desc">
              I am a <strong style={{ color: 'var(--primary)' }}>Software Developer</strong> and student at I.I.S. Marconi - Mangano.
              With solid expertise in <strong style={{ color: 'var(--primary)' }}>Python and Lua</strong>, I build AI-based systems, mobile apps, and robust backend logic for complex environments.
            </p>

            {/* Core Qualities & Strengths */}
            <div className="hero-qualities">
              <div className="hero-quality-item">
                <div className="hero-quality-icon">
                  <Zap size={18} />
                </div>
                <div>
                  <h3 className="hero-quality-title">AI & Application Development</h3>
                  <p className="hero-quality-desc">Building softwares involving AI reasoning and complex calulations.</p>
                </div>
              </div>

              <div className="hero-quality-item">
                <div className="hero-quality-icon">
                  <Server size={18} />
                </div>
                <div>
                  <h3 className="hero-quality-title">Game Backend Logic</h3>
                  <p className="hero-quality-desc">Owner and backend developer of Stoneks on Roblox, fully written in Lua.</p>
                </div>
              </div>

              <div className="hero-quality-item">
                <div className="hero-quality-icon">
                  <Cpu size={18} />
                </div>
                <div>
                  <h3 className="hero-quality-title">Hackathons & Problem Solving</h3>
                  <p className="hero-quality-desc">1st place Cesena Informatic Problem Solving Olympics, 2nd place GreenMindAI Hackathon.</p>
                </div>
              </div>
            </div>

            {/* Premium CTA Buttons */}
            <div className="hero-cta">
              <a
                href="#projects"
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
                className="neon-btn neon-btn-primary hero-cta-btn"
              >
                Explore Projects <ChevronRight size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: Clean, Elegant Rounded Portrait Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="hero-card"
          >
            {/* Profile Avatar Image with Sharp Frame */}
            <div className="hero-avatar-frame">
              <img
                src={profileAvatar}
                alt="Simone - Backend Engineer"
                className="hero-avatar-img"
              />
            </div>

            <h2 className="hero-card-name">
              Simone
            </h2>

            <div className="hero-location-badge">
              <MapPin size={14} style={{ color: 'var(--primary)' }} />
              Italy, Sicily, Catania
            </div>

            {/* Social Links under the face */}
            <div className="hero-social-links">
              <a
                href="https://github.com/SimLag012"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
                className="social-btn-minimal"
              >
                <Github size={18} /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/simone-lagana"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
                className="social-btn-minimal"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
