import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Copy, Check, Gamepad2 } from 'lucide-react';
import { Github, getTechLogo } from './Icons';
import { projects } from '../data/projects';
import { playSound } from '../utils/audio';
import './Projects.css';

// Dynamic Visual Simulation component for each project to remove all placeholders
function ProjectGraphic({ slug }) {
  if (slug === 'metashape-core') {
    const metrics = [
      { label: 'BMR', value: 1842, max: 2400, unit: 'kcal' },
      { label: 'TDEE', value: 2540, max: 3500, unit: 'kcal' },
      { label: 'BF%', value: 18, max: 40, unit: '%' },
      { label: 'LBM', value: 72, max: 100, unit: 'kg' },
    ];
    return (
      <div className="project-sim-graphic metashape-sim">
        <div className="sim-title">METABOLIC_MONITOR // DAY_87</div>
        <div className="sim-metabolic-bars">
          {metrics.map((m, i) => (
            <div key={i} className="sim-metric-row">
              <span className="sim-metric-label">{m.label}</span>
              <div className="sim-metric-bar-track">
                <div
                  className="sim-metric-bar-fill"
                  style={{ width: `${(m.value / m.max) * 100}%`, animationDelay: `${i * 0.15}s` }}
                />
              </div>
              <span className="sim-metric-value">{m.value}<span className="sim-metric-unit">{m.unit}</span></span>
            </div>
          ))}
        </div>
        <div className="sim-footer">ENGINE: MSJ_KMC | AI: GEMINI_2.0 | 3D_GL: ACTIVE</div>
      </div>
    );
  }
  if (slug === 'urban-analyzer') {
    return (
      <div className="project-sim-graphic urban-sim">
        <div className="sim-title">GIS_SPATIAL_LAYER_ENGINE</div>
        <div className="sim-map-grid">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className={`sim-map-tile ${i === 6 ? 'highlight' : ''}`}
            />
          ))}
        </div>
        <div className="sim-footer">MAP_LAYERS: 4 SCHEMAS | PostGIS: LOCAL_DISC</div>
      </div>
    );
  }
  if (slug === 'stoneks-engine') {
    return (
      <div className="project-sim-graphic stoneks-sim">
        <div className="sim-title">STONEKS_MINE_CONSOLE // DEPT_342M</div>
        <div className="stoneks-sim-console">
          <div className="stoneks-grid-data">
            <div className="stoneks-stat-box">
              <span className="stoneks-stat-label">LOBBY SIZE</span>
              <span className="stoneks-stat-val">14/14 PLRS</span>
            </div>
            <div className="stoneks-stat-box">
              <span className="stoneks-stat-label">SERVER LUCK</span>
              <span className="stoneks-stat-val">8.0X MULTI</span>
            </div>
            <div className="stoneks-stat-box">
              <span className="stoneks-stat-label">ACTIVE RUNES</span>
              <span className="stoneks-stat-val">6/6 ENGAGED</span>
            </div>
          </div>

          <div className="stoneks-track-animation">
            <div className="stoneks-track-rail" />
            <div className="stoneks-cart">
              🛒 <span style={{ fontSize: '0.55rem', color: '#fff', fontFamily: 'monospace' }}>M_CART (SPEEDSTER)</span>
            </div>
          </div>

          <div className="stoneks-crystals-glowing">
            <span style={{ fontSize: '0.6rem', color: '#666' }}>VONKET:</span>
            <div className="stoneks-crystal-sparkle" style={{ color: '#00ff66', backgroundColor: '#00ff66' }} />
            <span style={{ fontSize: '0.6rem', color: '#666' }}>AQUA:</span>
            <div className="stoneks-crystal-sparkle" style={{ color: '#00ffff', backgroundColor: '#00ffff' }} />
            <span style={{ fontSize: '0.6rem', color: '#666' }}>SHADOW:</span>
            <div className="stoneks-crystal-sparkle" style={{ color: '#8b5cf6', backgroundColor: '#8b5cf6' }} />
            <span style={{ fontSize: '0.6rem', color: '#666' }}>MYTHIC:</span>
            <div className="stoneks-crystal-sparkle" style={{ color: '#ec4899', backgroundColor: '#ec4899' }} />
          </div>
        </div>
        <div className="sim-footer">ENGINE: LUAU VM | ACTIVE EVENT: MANA AWAKEN | VER: 6.0</div>
      </div>
    );
  }
  if (slug === 'gitmedic') {
    return (
      <div className="project-sim-graphic gitmedic-sim">
        <div className="sim-title">GITMEDIC_RECOVERY_CLI</div>
        <div className="sim-terminal">
          <div className="sim-term-line">&gt; gitmedic --config</div>
          <div className="sim-term-line output">LLM_PROVIDER: gemini-3.5-flash</div>
          <div className="sim-term-line output">BLOCKCHAIN_IDENTITY: ACTIVE (ERC-8004)</div>
          <div className="sim-term-line">&gt; gitmedic -r</div>
          <div className="sim-term-line output active-text">DISCOVERING ISSUES... MATCH FOUND!</div>
          <div className="sim-term-line output active-text">INITIATING MULTI-AGENT SWARM...</div>
        </div>
      </div>
    );
  }
  if (slug === 'spotfetch') {
    return (
      <div className="project-sim-graphic spotfetch-sim">
        <div className="sim-title">PARALLEL_THREAD_POOL</div>
        <div className="sim-threads">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="sim-thread-row">
              <span className="thread-label">T_{i}</span>
              <div className="thread-bar-container">
                <div className="thread-bar-fill" style={{ width: `${30 + ((i * 17) % 61)}%`, animationDelay: `${i * 0.2}s` }} />
              </div>
              <span className="thread-status">ACTIVE</span>
            </div>
          ))}
        </div>
        <div className="sim-footer">RATE_LIMITER: BUCKET_OK | 500 A/S</div>
      </div>
    );
  }
  if (slug === 'shapex') {
    const steps = [
      { label: 'JSON', sub: 'object desc' },
      { label: 'OLLAMA', sub: 'LLM inference' },
      { label: 'PY_SCRIPT', sub: 'blender API' },
      { label: '.BLEND', sub: 'output file' },
    ];
    return (
      <div className="project-sim-graphic shapex-sim">
        <div className="sim-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}>
          <span>PIPELINE // JSON_TO_3D</span>
          <span className="sim-wip-badge">WORK IN PROGRESS</span>
        </div>
        <div style={{ height: '1px', background: 'rgba(0,255,102,0.1)', margin: '6px 0 8px' }} />
        <div className="sim-pipeline">
          {steps.map((s, i) => (
            <div key={i} className="sim-pipeline-step">
              <div className="sim-pipeline-block">
                <div className="sim-pipeline-node">{s.label}</div>
                <div className="sim-pipeline-sub">{s.sub}</div>
              </div>
              {i < steps.length - 1 && <div className="sim-pipeline-arrow">→</div>}
            </div>
          ))}
        </div>
        <div className="sim-footer">MODEL: gpt-oss:120b | OUTPUT: output.blend | LOCAL_OLLAMA</div>
      </div>
    );
  }

  return (
    <div className="project-sim-graphic generic-sim">
      <div className="sim-title">SYSTEM_CORE_ENGAGED</div>
      <div className="sim-footer">NO_SIMULATION_AVAIL</div>
    </div>
  );
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedText, setCopiedText] = useState('');
  const [activeLoreTab, setActiveLoreTab] = useState('mono');

  const openProject = (project) => {
    playSound('click');
    setActiveProject(project);
    setActiveTab('overview');
    setActiveLoreTab('mono');
  };

  const closeProject = () => {
    playSound('click');
    setActiveProject(null);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => {
      setCopiedText('');
    }, 2000);
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
              My portfolio
            </h2>
          </div>
          <div className="projects-counter">
            Total Projects: 0{projects.length}
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
                className={`modal-box ${activeProject.details ? 'detailed' : ''}`}
                data-lenis-prevent
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
                    {activeProject.slug === 'stoneks-engine' ? 'Multiplayer game & Lore database' : activeProject.details ? 'Autonomous swarm project' : 'Featured Project'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="modal-title">
                  {activeProject.title.replace(' // ', ' — ')}
                </h3>

                {/* If it's a detailed project, render the tabs header */}
                {activeProject.details ? (
                  <>
                    <div className="modal-tabs">
                      <button
                        className={`modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => { playSound('click'); setActiveTab('overview'); }}
                      >
                        [01 // OVERVIEW]
                      </button>
                      {activeProject.slug === 'stoneks-engine' ? (
                        <>
                          <button
                            className={`modal-tab-btn ${activeTab === 'lore' ? 'active' : ''}`}
                            onClick={() => { playSound('click'); setActiveTab('lore'); }}
                          >
                            [02 // LORE]
                          </button>
                          <button
                            className={`modal-tab-btn ${activeTab === 'updates' ? 'active' : ''}`}
                            onClick={() => { playSound('click'); setActiveTab('updates'); }}
                          >
                            [03 // UPDATE LOGS]
                          </button>
                          <button
                            className={`modal-tab-btn ${activeTab === 'systems' ? 'active' : ''}`}
                            onClick={() => { playSound('click'); setActiveTab('systems'); }}
                          >
                            [04 // GAME SYSTEMS]
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className={`modal-tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
                            onClick={() => { playSound('click'); setActiveTab('architecture'); }}
                          >
                            [02 // ARCHITECTURE]
                          </button>
                          <button
                            className={`modal-tab-btn ${activeTab === 'setup' ? 'active' : ''}`}
                            onClick={() => { playSound('click'); setActiveTab('setup'); }}
                          >
                            [03 // SETUP & CLI]
                          </button>
                          <button
                            className={`modal-tab-btn ${activeTab === 'advanced' ? 'active' : ''}`}
                            onClick={() => { playSound('click'); setActiveTab('advanced'); }}
                          >
                            [04 // ADVANCED SYSTEMS]
                          </button>
                        </>
                      )}
                    </div>

                    {/* Tab 1: Overview & Capabilities */}
                    {activeTab === 'overview' && (
                      <div className="overview-grid">
                        {activeProject.slug !== 'stoneks-engine' && <ProjectGraphic slug={activeProject.slug} />}
                        <p className="modal-desc" style={{ marginBottom: '10px' }}>
                          {activeProject.details.overview}
                        </p>

                        {activeProject.details.capabilities && (
                          <div>
                            <div className="modal-tech-label">CORE CAPABILITIES</div>
                            <div className="capabilities-grid">
                              {activeProject.details.capabilities.map((cap, i) => (
                                <div key={i} className="capability-card">
                                  <div className="capability-card-title">{cap.title}</div>
                                  <div className="capability-card-desc">{cap.desc}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {activeProject.slug === 'stoneks-engine' && (
                          <div>
                            <div className="modal-tech-label">MINING EXPLORATION & STATISTICS</div>
                            <div className="capabilities-grid">
                              <div className="capability-card">
                                <div className="capability-card-title">Rank Progression</div>
                                <div className="capability-card-desc">Advance to Scientific Research Rank 20 (SXP) to unlock special pickaxes, minecarts, or mutation bonuses.</div>
                              </div>
                              <div className="capability-card">
                                <div className="capability-card-title">Miners Guild & Tavern</div>
                                <div className="capability-card-desc">Accept quests of varying rarities (up to Mythic) to earn equipable accessories with passive stats.</div>
                              </div>
                              <div className="capability-card">
                                <div className="capability-card-title">Mutations and Economy</div>
                                <div className="capability-card-desc">Ores feature dynamic rarities, weights, and mutations (e.g., Mana Infused, Golden) sellable to Simlag012.</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tab 2: Architecture Component Guide (standard) */}
                    {activeProject.slug !== 'stoneks-engine' && activeTab === 'architecture' && (
                      <div>
                        <div className="modal-tech-label" style={{ marginBottom: '15px' }}>SYSTEM ARCHITECTURE COMPONENT GUIDE</div>
                        <div className="capabilities-grid">
                          {activeProject.details.architecture.map((arch, i) => (
                            <div key={i} className="capability-card">
                              <div className="capability-card-title">{arch.name}</div>
                              <div className="capability-card-desc">{arch.role}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tab 2 (Stoneks): Lore */}
                    {activeProject.slug === 'stoneks-engine' && activeTab === 'lore' && (
                      <div>
                        <div className="modal-tech-label" style={{ marginBottom: '15px' }}>LORE // SCIENTIFIC LOG RECORD</div>
                        <div className="mono-scientific-report">
                          <div className="mono-header">
                            <span>LOG_ID: PRIMX-ENGTONV-20XX</span>
                            <span className="mono-sec-badge">CLASSIFIED // SCIENTIST LOG</span>
                          </div>
                          <div className="mono-text">
                            {activeProject.details.lore.text}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tab 3: Setup & CLI (standard) */}
                    {activeProject.slug !== 'stoneks-engine' && activeTab === 'setup' && (
                      <div>
                        <div className="modal-tech-label" style={{ marginBottom: '15px' }}>PREREQUISITES & DEPLOYMENT</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '25px' }}>
                          {activeProject.details.setup.prerequisites.map((prereq, i) => (
                            <span key={i} className="projects-tech-badge" style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#aaa', background: 'rgba(255,255,255,0.01)' }}>
                              {prereq}
                            </span>
                          ))}
                        </div>

                        <div className="modal-tech-label" style={{ marginBottom: '15px' }}>INSTALLATION COMMANDS</div>
                        {activeProject.details.setup.commands.map((cmd, i) => (
                          <div key={i} className="terminal-block">
                            <div className="terminal-header">
                              <span className="terminal-title">{cmd.label}</span>
                              <button
                                onClick={() => copyToClipboard(cmd.code)}
                                className="terminal-copy-btn"
                              >
                                {copiedText === cmd.code ? (
                                  <>
                                    <Check size={11} style={{ color: 'var(--primary)' }} /> Copied!
                                  </>
                                ) : (
                                  <>
                                    <Copy size={11} /> Copy Code
                                  </>
                                )}
                              </button>
                            </div>
                            <div className="terminal-content">
                              {cmd.code.split('\n').map((line, idx) => (
                                <span key={idx} className="terminal-line">{line}</span>
                              ))}
                            </div>
                          </div>
                        ))}

                        <div className="modal-tech-label" style={{ marginBottom: '15px', marginTop: '25px' }}>CLI USAGE DEMONSTRATION</div>
                        {activeProject.details.usage.map((cmd, i) => (
                          <div key={i} className="terminal-block">
                            <div className="terminal-header">
                              <span className="terminal-title">{cmd.label}</span>
                              <button
                                onClick={() => copyToClipboard(cmd.code)}
                                className="terminal-copy-btn"
                              >
                                {copiedText === cmd.code ? (
                                  <>
                                    <Check size={11} style={{ color: 'var(--primary)' }} /> Copied!
                                  </>
                                ) : (
                                  <>
                                    <Copy size={11} /> Copy Code
                                  </>
                                )}
                              </button>
                            </div>
                            <div className="terminal-content">
                              <span className="terminal-line">{cmd.code}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tab 3 (Stoneks): Update Logs */}
                    {activeProject.slug === 'stoneks-engine' && activeTab === 'updates' && (
                      <div>
                        <div className="modal-tech-label" style={{ marginBottom: '15px' }}>DEVELOPMENT CHRONOLOGY // UPDATE LOGS</div>
                        <div className="update-timeline-container">
                          {activeProject.details.updates.map((upd, i) => {
                            const isFirst = i === 0;
                            return (
                              <div key={i} className="update-timeline-node">
                                <div className="update-timeline-bullet" />
                                <div className="update-timeline-card">
                                  <div className="update-timeline-version">
                                    <span>{isFirst ? upd.version : "Update ? (Locked)"}</span>
                                    <span style={{ fontSize: '0.62rem', color: '#666' }}>
                                      {isFirst ? "RELEASE READY" : "CLASSIFIED"}
                                    </span>
                                  </div>
                                  <div className="update-timeline-highlights">
                                    {isFirst ? (
                                      upd.highlights.map((hl, idx) => (
                                        <span key={idx} className="update-highlight-tag">{hl}</span>
                                      ))
                                    ) : (
                                      <span className="update-highlight-tag">?</span>
                                    )}
                                  </div>
                                  <p className={`update-timeline-details${isFirst ? '' : ' redacted'}`}>
                                    {isFirst ? upd.details : "???????????????????????????????????????????????????????????????????????????????????????????????????????????"}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Tab 4: Advanced Systems (standard) */}
                    {activeProject.slug !== 'stoneks-engine' && activeTab === 'advanced' && (
                      <div className="advanced-grid">
                        <div className="modal-tech-label">UNDER THE HOOD // SELF-HEALING ARCHITECTURE</div>
                        {activeProject.details.advanced.map((adv, i) => (
                          <div key={i} className="advanced-card">
                            <div className="advanced-title">
                              {adv.name}
                              <span className="advanced-badge">ACTIVE</span>
                            </div>
                            <p className="advanced-desc">{adv.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tab 4 (Stoneks): Game Systems */}
                    {activeProject.slug === 'stoneks-engine' && activeTab === 'systems' && (
                      <div>
                        <div className="modal-tech-label" style={{ marginBottom: '15px' }}>IN-GAME SYSTEMS & MECHANICS</div>
                        <div className="capabilities-grid">
                          {activeProject.details.systems.map((sys, i) => (
                            <div key={i} className="capability-card">
                              <div className="capability-card-title">{sys.name}</div>
                              <div className="capability-card-desc">{sys.role}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Footer tech list (glowing Compass stack) */}
                    <div style={{ marginTop: '35px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', marginBottom: '35px' }}>
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
                  </>
                ) : (
                  /* Standard fallback layout for projects without detailed specs, but using the beautiful simulation graph instead of text placeholder */
                  <>
                    <ProjectGraphic slug={activeProject.slug} />

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
                  </>
                )}

                {/* GitHub or Roblox CTA Button */}
                <a
                  href={activeProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-btn neon-btn-primary modal-git-btn"
                  onMouseEnter={() => playSound('hover')}
                >
                  {activeProject.slug === 'stoneks-engine' ? (
                    <>
                      <Gamepad2 size={16} /> Explore on Roblox
                    </>
                  ) : (
                    <>
                      <Github size={16} /> Explore on GitHub
                    </>
                  )}
                </a>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
