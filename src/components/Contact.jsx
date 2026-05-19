import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" style={{ padding: '120px 5% 100px 5%', background: 'transparent' }}>
      <div style={{
        width: '100%',
        maxWidth: '680px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        {/* Local retro styles for inputs */}
        <style dangerouslySetInnerHTML={{__html: `
          .pixel-input {
            width: 100%;
            background: #050505;
            border: 3px solid rgba(255, 255, 255, 0.15);
            border-radius: 0px !important;
            padding: 16px;
            font-family: 'Pixelify Sans', sans-serif;
            font-size: 1rem;
            color: #fff;
            margin-bottom: 24px;
            transition: all 0.2s steps(2);
            outline: none;
          }

          .pixel-input:focus {
            border-color: #00FF66;
            box-shadow: 4px 4px 0px rgba(0, 255, 102, 0.15);
          }

          .pixel-label {
            display: block;
            text-align: left;
            font-family: 'Press Start 2P', monospace;
            font-size: 0.6rem;
            color: #fff;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .pixel-submit-btn {
            font-family: 'Press Start 2P', monospace;
            font-size: 0.8rem;
            color: #000;
            background: #FFF500;
            border: 3px solid #000;
            padding: 18px 36px;
            cursor: pointer;
            transition: all 0.2s steps(2);
            box-shadow: 6px 6px 0px #00FF66;
            text-transform: uppercase;
            font-weight: 700;
            width: 100%;
            margin-top: 15px;
          }

          .pixel-submit-btn:hover {
            transform: translate(-2px, -2px);
            box-shadow: 8px 8px 0px #fff;
            background: #ffe500;
          }

          .pixel-submit-btn:active {
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0px #000;
          }
        `}} />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <h2 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '1.25rem',
            color: '#fff',
            marginBottom: '40px',
            textTransform: 'uppercase'
          }}>
            CONTACT
          </h2>

          {/* Description */}
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.95rem',
            lineHeight: '1.7',
            fontFamily: "'Pixelify Sans', sans-serif",
            textAlign: 'left',
            marginBottom: '50px'
          }}>
            ARE YOU INTERESTED IN MY PORTFOLIO AND WANT TO TALK WITH ME? 
            <br/><br/>
            WRITE YOUR EMAIL AND YOUR MESSAGE BELOW. I WILL ANSWER YOUR EMAIL AS SOON AS I CAN.
          </p>

          {/* Form */}
          <form 
            onSubmit={(e) => e.preventDefault()} 
            style={{ textAlign: 'left', pointerEvents: 'all' }}
          >
            {/* Email Field */}
            <div>
              <label className="pixel-label">Email</label>
              <input 
                type="email" 
                className="pixel-input" 
                placeholder="YOUR.EMAIL@MAIL.COM"
                required
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="pixel-label">Your Message</label>
              <textarea 
                rows="5"
                className="pixel-input" 
                placeholder="WRITE YOUR MESSAGE HERE..."
                required
              />
            </div>

            {/* Let's Talk button */}
            <button type="submit" className="pixel-submit-btn">
              LET'S TALK
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
