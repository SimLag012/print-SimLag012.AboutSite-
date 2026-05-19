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

  // Returning null to remove the UI completely, while preserving the background logic just in case.
  return null;
}
