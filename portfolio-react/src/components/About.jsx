import { motion } from 'framer-motion';

export default function About() {
  const skills = ["JavaScript", "React", "Three.js", "Python", "C++", "Arduino", "UI/UX", "Node.js", "Redis"];

  return (
    <section id="about" style={{ padding: '100px 10%' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          padding: '80px',
          borderRadius: '20px',
          background: 'var(--glass)',
          border: '1px solid var(--glass-border)',
          backdropFilter: 'blur(20px)',
          gap: '50px',
          alignItems: 'center'
        }}
      >
        <div>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '3rem',
            marginBottom: '30px'
          }}>Chi Sono</h2>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1.1rem',
            lineHeight: '1.8',
            marginBottom: '40px'
          }}>
            Sono uno sviluppatore full-stack con una forte propensione per la grafica computazionale e l'ingegneria dei sistemi. 
            Il mio approccio unisce design visivo premium e performance tecniche senza compromessi. 
            Ogni progetto è una sfida per superare i limiti del possibile nel web moderno.
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            {skills.map((skill) => (
              <motion.div
                key={skill}
                whileHover={{ scale: 1.1, borderColor: 'var(--primary)', color: 'var(--primary)' }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '10px 25px',
                  borderRadius: '5px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'default',
                  transition: '0.2s'
                }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
        
        <div style={{
          position: 'relative',
          height: '400px',
          background: 'linear-gradient(45deg, var(--primary), var(--secondary))',
          borderRadius: '15px',
          opacity: 0.2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '5rem',
          color: '#fff',
          fontWeight: 900
        }}>
          SIMO
        </div>
      </motion.div>
    </section>
  );
}
