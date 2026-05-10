import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Reliable royalty-free UI sound URLs (Mixkit)
const SOUNDS = {
  ambient: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', // Futuristic drone
  hover: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',   // Subtle tech click
  click: 'https://assets.mixkit.co/active_storage/sfx/2558/2558-preview.mp3',   // Data entry sound
  glitch: 'https://assets.mixkit.co/active_storage/sfx/2564/2564-preview.mp3',  // Sci-fi glitch
};

export default function SoundManager() {
  const [isMuted, setIsMuted] = useState(true);
  
  // Audio instances
  const sfxRefs = useRef({
    hover: new Audio(SOUNDS.hover),
    click: new Audio(SOUNDS.click),
    glitch: new Audio(SOUNDS.glitch),
  });

  useEffect(() => {
    // Set SFX volumes to be EXTREMELY subtle (0.1)
    Object.values(sfxRefs.current).forEach(audio => {
      audio.volume = 0.1;
    });

    const handlePlaySFX = (e) => {
      if (isMuted) return;
      const sound = sfxRefs.current[e.detail];
      if (sound) {
        sound.currentTime = 0;
        sound.play().catch(() => {});
      }
    };

    window.addEventListener('play-sfx', handlePlaySFX);
    return () => window.removeEventListener('play-sfx', handlePlaySFX);
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '40px',
      left: '40px',
      zIndex: 10001,
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    }}>
      <motion.button
        onClick={toggleMute}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: isMuted ? '#444' : 'var(--primary)',
          padding: '10px',
          width: '45px',
          height: '45px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          borderRadius: '50%',
          backdropFilter: 'blur(10px)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.6rem'
        }}
      >
        {isMuted ? 'MUTED' : 'AUDIO'}
      </motion.button>
    </div>
  );
}
