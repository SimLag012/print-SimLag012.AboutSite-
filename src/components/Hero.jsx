import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { playSound } from '../utils/audio';
import { Cpu, Zap, Server, ChevronRight, MapPin } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import profileAvatar from '../assets/profile_avatar.png';

const ScrambleText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text.split("")
          .map((char, index) => {
            if(index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      if(iteration >= text.length) clearInterval(interval);
      iteration += 1/3;
    }, 25);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

export default function Hero() {
  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px 5% 60px 5%', background: 'transparent' }}>
      <motion.div
        style={{ width: '100%' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '40px',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
        className="hero-grid-responsive"
        >
          <style>{`
            @media (min-width: 992px) {
              .hero-grid-responsive {
                grid-template-columns: 1.2fr 0.8fr !important;
                gap: 70px !important;
              }
            }
            .social-btn-minimal:hover {
              color: #fff !important;
              transform: translateY(-2px);
            }
          `}</style>

          {/* Left Column: Clean, Elegant Info */}
          <div>
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }} className="hud-text">
              <span style={{ width: '8px', height: '8px', borderRadius: '0px', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></span>
              <span style={{ color: 'var(--primary)', fontWeight: 600, fontFamily: 'Inter', letterSpacing: '2px', fontSize: '0.75rem' }}>
                AVAILABLE FOR PRODUCTION ROLES
              </span>
            </div>
            
            <h1 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '0.5rem',
              color: '#fff',
              letterSpacing: '2px'
            }}>
              Hi, I'm <span style={{ color: 'var(--primary)', textShadow: '0 0 15px rgba(0, 255, 102, 0.2)' }}><ScrambleText text="Simone" /></span>
            </h1>
            
            <h2 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(2rem, 6vw, 3.8rem)',
              fontWeight: 900,
              lineHeight: 1.4,
              marginBottom: '2rem',
              color: 'transparent',
              WebkitTextStroke: '1.2px rgba(255,255,255,0.3)',
              letterSpacing: '3px',
              display: 'block'
            }}>
              AI & Full-Stack Developer
            </h2>
            
            <p style={{
              fontSize: '1.05rem',
              color: '#aaa',
              lineHeight: 1.6,
              fontFamily: 'Inter, sans-serif',
              marginBottom: '2rem',
              maxWidth: '680px'
            }}>
              I am a software developer and student at I.I.S. Marconi - Mangano. 
              With solid expertise in <strong style={{ color: 'var(--primary)' }}>Python and Lua</strong>, I build AI-based systems, mobile apps, and robust backend logic for complex environments.
            </p>

            {/* Core Qualities & Strengths */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              marginBottom: '2.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: 'rgba(0, 255, 102, 0.08)', padding: '10px', borderRadius: '0px', color: 'var(--primary)' }}>
                  <Zap size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', fontFamily: 'Inter' }}>AI & Application Development</h3>
                  <p style={{ fontSize: '0.82rem', color: '#888', fontFamily: 'Inter' }}>Building AI task managers and Kivy mobile apps with DB integrations.</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: 'rgba(0, 255, 102, 0.08)', padding: '10px', borderRadius: '0px', color: 'var(--primary)' }}>
                  <Server size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', fontFamily: 'Inter' }}>Game Backend Logic</h3>
                  <p style={{ fontSize: '0.82rem', color: '#888', fontFamily: 'Inter' }}>Owner and backend developer of Stoneks on Roblox, fully written in Lua.</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: 'rgba(0, 255, 102, 0.08)', padding: '10px', borderRadius: '0px', color: 'var(--primary)' }}>
                  <Cpu size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', fontFamily: 'Inter' }}>Hackathons & Problem Solving</h3>
                  <p style={{ fontSize: '0.82rem', color: '#888', fontFamily: 'Inter' }}>1st place Cesena Problem Solving Olympics, 2nd place GreenMindAI Hackathon.</p>
                </div>
              </div>
            </div>

            {/* Premium CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              <a 
                href="#projects"
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
                className="neon-btn neon-btn-primary"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', borderRadius: '0px', fontWeight: 600 }}
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
            style={{
              width: '100%',
              maxWidth: '350px',
              margin: '0 auto',
              background: 'rgba(15, 23, 42, 0.4)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '0px',
              padding: '30px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            {/* Profile Avatar Image with Sharp Frame */}
            <div style={{
              width: '180px',
              height: '180px',
              margin: '0 auto 24px auto',
              borderRadius: '0px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '6px',
              background: 'rgba(10, 15, 25, 0.6)',
              position: 'relative',
              zIndex: 1,
              overflow: 'hidden'
            }}>
              <img 
                src={profileAvatar} 
                alt="Simone - Backend Engineer" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '0px',
                  filter: 'contrast(105%) brightness(95%)'
                }}
              />
            </div>

            <h2 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#fff',
              marginBottom: '6px',
              letterSpacing: '-0.02em',
              position: 'relative',
              zIndex: 1
            }}>
              Simone
            </h2>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '0px',
              fontSize: '0.78rem',
              color: '#aaa',
              position: 'relative',
              zIndex: 1
            }}>
              <MapPin size={14} style={{ color: 'var(--primary)' }} />
              Italy, Sicily, Catania
            </div>

            {/* Social Links under the face */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              marginTop: '25px',
              position: 'relative',
              zIndex: 1
            }}>
              <a 
                href="https://github.com/SimLag012"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
                style={{ 
                  color: '#aaa', 
                  textDecoration: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  fontSize: '0.85rem',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  transition: 'all 0.3s ease'
                }}
                className="social-btn-minimal"
              >
                <Github size={18} /> GitHub
              </a>
              <a 
                href="https://linkedin.com/in/simlag012"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
                style={{ 
                  color: '#aaa', 
                  textDecoration: 'none', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  fontSize: '0.85rem',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  transition: 'all 0.3s ease'
                }}
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
