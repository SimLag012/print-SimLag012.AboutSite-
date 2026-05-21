export const projects = [
  {
    id: "01",
    slug: "metashape-core",
    title: "METASHAPE // AI METABOLIC SUITE",
    description: "A professional-grade metabolic simulation and clinical analysis desktop application. Bridges static nutritional tracking with intelligent physiological forecasting using advanced metabolic algorithms (Mifflin-St Jeor, Katch-McArdle), AI-assisted diet parsing, real-time OpenGL 3D body modeling, and clinical safety constraint enforcement.",
    tech: ["Python", "PySide6 (Qt6)", "OpenGL", "Google Gemini", "Ollama", "PyMuPDF", "pandas"],
    repoUrl: "https://github.com/SimLag012/Metashape",
    metrics: {
      latency: "Real-time 3D simulation",
      throughput: "Dual AI providers (Local/Cloud)",
      uptime: "Full clinical safety layer"
    },
    details: {
      overview: "MetaShape is a comprehensive metabolic simulation and clinical analysis desktop application. It bridges the gap between static nutritional tracking and intelligent physiological forecasting, leveraging gold-standard metabolic algorithms, dual-mode AI inference (local Ollama or cloud Gemini), and an interactive real-time 3D humanoid model dynamically synchronized to the current simulation day. Designed for clinical practitioners and health professionals.",
      capabilities: [
        { title: "Deterministic Metabolic Engine", desc: "Accurately projects weight, body fat, and lean mass trajectories across customizable timelines using Mifflin-St Jeor, Katch-McArdle, and Deurenberg models." },
        { title: "Clinical Safety Constraints", desc: "Automatically flags severe clinical scenarios with non-blocking UI alerts — severe energy deficiency (RED-S), dangerous macronutrient splits in diabetic cases, and estimated renal strain via eGFR." },
        { title: "AI-Assisted Diet Parsing", desc: "Native inference abstraction structures chaotic patient diet and sport reports into mathematically actionable config injections via Ollama (local) or Gemini 2.0 (cloud)." },
        { title: "Dynamic 3D Visualization", desc: "Renders a visually interactive OpenGL humanoid in real-time, automatically scaling skeletal height, body fat, and mass matrices to the current simulation day." },
        { title: "Project State Serialization", desc: "Saves the complete multi-vector simulation environment to JSON, allowing comprehensive iterative client reviews and longitudinal tracking." }
      ],
      architecture: [
        { name: "metabolic_engine.py", role: "Core physiology algorithms computing BMR (MSJ/KMA), TDEE with metabolic adaptation, body composition trajectories, and pediatric growth factor allocations." },
        { name: "ai_service.py", role: "Unified AI abstraction layer for Ollama (local privacy mode) and Gemini 2.0 (cloud). Handles exponential HTTP 429 backoff and strict input adherence validation." },
        { name: "main_window.py", role: "Primary PySide6 application state handler managing widget orchestration, multithreaded AI calls, and simulation UI lifecycle." },
        { name: "export_service.py", role: "Generates professional white-label clinical reports in PDF, DOCX, and Excel formats using PyMuPDF, python-docx, and openpyxl." },
        { name: "OpenGL Viewport", role: "Hardware-accelerated QWidget-embedded OpenGL renderer for the real-time 3D humanoid body visualization synchronized to simulation state." }
      ],
      setup: {
        prerequisites: ["Python 3.10+", "pip", "Optional: Ollama (local LLM server)", "Optional: Google Gemini API Key"],
        commands: [
          { label: "Clone & Install Dependencies", code: "git clone https://github.com/SimLag012/Metashape.git\ncd Metashape\npip install -r docs/requirements.txt" },
          { label: "Core pip dependencies", code: "pip install PySide6 PyOpenGL PyOpenGL-accelerate requests pymupdf python-docx pandas openpyxl" }
        ]
      },
      usage: [
        { label: "Launch Application", code: "python src/main.py" },
        { label: "Run with Ollama (Local AI)", code: "# Start Ollama server first\nollama serve\n# Then launch MetaShape — select 'Ollama' in settings" },
        { label: "Configure API Keys", code: "# Open Settings dropdown inside the app\n# Insert your Gemini API key or toggle to Local (Ollama) mode" }
      ],
      advanced: [
        { name: "Metabolic Adaptation Modeling", desc: "TDEE calculations incorporate adaptive thermogenesis — progressive metabolic slowdown as caloric deficit accumulates over time, preventing overestimation of weight loss." },
        { name: "Privacy-First Local AI (Ollama)", desc: "Asynchronous local LLM serving ensures deep patient data never leaves the machine. Network calls are completely isolated from the main UI thread for fluid UX." },
        { name: "Pediatric Growth Factor Engine", desc: "Triggers specific caloric allocations for adolescent height trajectories, distinguishing pediatric cases from adult metabolic models autonomously." }
      ]
    }
  },
  {
    id: "02",
    slug: "urban-analyzer",
    title: "URBAN ANALYZER // CATANIA",
    description: "An integrated GIS ecosystem engineered during GreenMindAI 2025 Catania Hackathon. Collects, structures, and visualizes urban geospatial datasets. Combines automated PostGIS data imports, an interactive SvelteKit dashboard with Leaflet.js, a FastAPI proximity query engine, and an automated Gemini-powered unstructured report processor.",
    tech: ["FastAPI", "SvelteKit", "Leaflet", "PostGIS", "Docker Compose", "Google Gemini", "Python", "Node.js"],
    repoUrl: "https://github.com/obiwan87/hearth-beat",
    metrics: {
      latency: "FastAPI queries < 20ms",
      throughput: "Concurrent AI processing",
      uptime: "Multi-service Docker Mesh"
    },
    details: {
      overview: "Urban Analyzer is an integrated ecosystem designed during the GreenMindAI Catania Hackathon 2025. Its goal is to provide local administrations and citizens with tools to manage, analyze, and visualize geospatial urban data (like waste bins, traffic, green areas). It leverages automatic PostGIS imports, SvelteKit web maps, FastAPI proximity queries, and Gemini AI processing to parse unstructured complaints from emails or chats into structured database records.",
      capabilities: [
        { title: "Geospatial Ingestion (ETL)", desc: "Automatically downloads and imports .gpkg vector layers into PostgreSQL/PostGIS databases with standardized MultiGeometry formats." },
        { title: "Proximity & Query API", desc: "Provides FastAPI backend endpoints for spatial operations such as finding nearest waste bins or resolving local area stats." },
        { title: "Interactive GIS Webapp", desc: "Interactive SvelteKit interface powered by Leaflet to explore layers, visualize city KPIs, and submit citizen reports." },
        { title: "AI Complaint Structurer", desc: "Listens to Gmail, Telegram bots, and forms, using Gemini LLM to extract locations, incident categories, and descriptions." },
        { title: "Civic Protection & Care", desc: "Integrates modular solutions like CleanRoute for waste path optimizations and TreeAid for crowdsourced tree irrigation." }
      ],
      architecture: [
        { name: "ua-importer", role: "Bash shell script wrapper using GDAL/ogr2ogr to batch import geospatial vector layers into PostGIS." },
        { name: "ua-backend", role: "FastAPI application managing spatial queries, user report databases, and database connectivity." },
        { name: "ua-frontend", role: "SvelteKit client app using Leaflet maps to provide real-time dashboards and responsive submission forms." },
        { name: "ua-structurer", role: "Python service daemon monitoring mailboxes, bots, and forms to extract structured data via Gemini API." }
      ],
      setup: {
        prerequisites: ["Docker & Docker Compose", "Python 3.10+", "Node.js 18+"],
        commands: [
          { label: "Spin up Docker Compose (Recommended)", code: "git clone https://github.com/SimLag012/urban-analyzer.git\ncd urban-analyzer\ndocker-compose up --build" },
          { label: "Service Ingestion Setup", code: "cd ua-importer\n# Configure environment variables in local.env\n./init-postgis.sh" }
        ]
      },
      usage: [
        { label: "Start FastAPI Backend", code: "cd ua-backend && pip install -r requirements.txt && uvicorn main:app --reload" },
        { label: "Start SvelteKit Frontend", code: "cd ua-frontend && npm install && npm run dev" },
        { label: "Start AI Structurer Worker", code: "cd ua-structurer && pip install -r requirements.txt && python main.py" },
        { label: "Run Importer Script Manually", code: "./gpkg2postgres.sh mydata.gpkg \"host=localhost dbname=mydb user=postgres\"" }
      ],
      advanced: [
        { name: "Catania Livable (PWA)", desc: "Mobile-first PWA concepts utilizing geolocated citizen feedback for immediate report submissions." },
        { name: "CleanRoute Waste Optimisation", desc: "Employs spatial network routing APIs to optimize vehicle paths based on trash level sensor telemetry." },
        { name: "AgataGuard & TreeAid Modules", desc: "Collaborative systems dedicated to community-based watering updates and notification of civic decay spots." }
      ]
    }
  },
  {
    id: "03",
    slug: "stoneks-engine",
    title: "STONEKS // ROBLOX GAME",
    description: "A multiplayer Roblox game set in a mysterious underground mine. Developed entirely in Luau and Lua, it features a virtual economy system, ore mutations, quest boards, and a complex lore divided into various scientific theories and incidents.",
    tech: ["Roblox", "Luau", "Lua"],
    repoUrl: "https://www.roblox.com/games/108940635585375/tacchi-di-pietra",
    metrics: {
      latency: "14 players per lobby",
      throughput: "20+ Scientific Ranks",
      uptime: "Rune Arena Event Active"
    },
    details: {
      overview: "STONEKS is an immersive multiplayer experience created on Roblox and engineered entirely in Luau. Players explore the complex cavern of Mount Engtonv in search of unique ores with dynamic mutations, rarities, and fluctuating values. Gameplay evolves through pickaxe and backpack upgrades (featuring dynamic lanterns and exploration ropes), riding minecarts, completing quests in the Miners Guild, and performing rune enchantments.",
      lore: {
        title: "LORE // THE PRIMX INCIDENT",
        text: "During a scientific study led by PRIMX on Mount Engtonv in 20XX, a mysterious field incident, classified as 'natural', envelops the peak in a barrier of light. In reality, it is the result of a conspiracy by B Inc. (The Foundation), experimenting with 'Vonket' Crystals and their 'Elixir' of youth. By causing an abnormal surge on a crystal, they open a portal to a parallel 'Retro' dimension. The researchers are sucked into the artificial cavern with no memories, convinced they have lived there forever. The company's ultimate goal is to secretly seize the Mythical Crystals through the 'Miners Guild'. However, during the latest Update, the miners will discover their shady plans, preparing for rebellion."
      },
      updates: [
        {
          version: "Update 0 (Alpha Version)",
          highlights: ["Site 05 Prologue", "Main Cave (VonketCave)", "Mineralium Periodic System", "Hellstone Event"],
          details: "Introduced the prologue showing the research team waking up after the Site 05 accident. Added the main Vonket Cave, Player's Caves, AFK rewards zone, minecarts, 6 tiers of pickaxes (Rusty to Hellish), and 10 base ores (Stone to Mythical). Created the initial shop NPCs: Golden_Alex052 (Guide), Aletik09 (Pickaxe Dealer), Simlag012 (Pawn Shop), and Flaviiisans (Scientist)."
        },
        {
          version: "Update 1 (Beta Version)",
          highlights: ["Underwater Zone", "Aquamarine Biome Event", "Visible Streaks", "The Pet Rock"],
          details: "Expanded the cave with an underwater zone and Aquamarine lake event. Introduced the Aquamarine Pickaxe (Unique 'Marine' mutation), 7 new minerals (Luminite, Nickel, etc.), and visible player streaks (5 to 200+). Added Titles and the legendary 'Pet Rock' (0.00002% drop rate)."
        },
        {
          version: "Update 2 (Full Release)",
          highlights: ["Main/Player Cave Revamp", "Scientific Research Quests", "Underground Cave Expansion", "3 New Pickaxes"],
          details: "Revamped the main caves and integrated a 20-Rank Scientific Research system by Flaviiisans, rewarding players with mutation luck boosts, skins, and trophies. Added backpack customizations (lantern, rope, colors) and level-based animations. Introduced the Underground Biome event featuring Darkness, Crystal, and Runes Pickaxes, along with 12 new minerals like Shadow Ore and Uranium."
        },
        {
          version: "Update 3 (Miner's Guild)",
          highlights: ["Tavern Quest System", "Worthy Token Forging", "6 Quest Rarities", "Accessory Items"],
          details: "Added the Tavern location and a quest board featuring 6 rarities (Common to Mythic) with accessory drop chances. Introduced NPCs VegitoBlue (Guild Padrino) and Sicio21 (Worthy Token Forger). Created accessories like the Copper Ring, Silver Bracelet, Miner's Cloak, Golden Gloves, Gem's Rings, and Ancient Cloak offering permanent boosts. Added 15 Miner Ranks unlocking the Miner's Pickaxe."
        },
        {
          version: "Update 6 (Mana Awaken)",
          highlights: ["Rune Enchantment System", "Mana Realm Portal Event", "4 Unique Enchants"],
          details: "Unlocked the Enchantment System using Runes. Added 4 enchants: Efficiency I-IV (+5% damage), Time Consumer I-III (slows speed by 5% but boosts precision), Midas Touch I-II (+5% value), Runebound (boosts rune drops), and Restless Gambling (increases mutations at the cost of mineral size). The event channels 6 runes through a 4-pillar arena to open the portal to the Enchantment Temple."
        }
      ],
      systems: [
        { name: "Scientific Research Ranks", role: "Rank up to Rank 20 using SXP from discovery quests. Rewards include the 'Pro Scientist' title, 'Realistic Minecart' skin, and a permanent +2% mutation chance boost." },
        { name: "Tavern Guild & Quests", role: "Complete quests of varying rarities (Common to Mythic) to increase Tavern Ranks (1 to 15) and earn accessory drops like Golden Gloves (+15% Tavern EXP, golden mutation chance) or the Ancient Cloak." },
        { name: "Rune Enchantment Temple", role: "Channel rune energy in the 4-pillar Arena to open a temporary portal. Inside the Enchantment Temple, players can apply Runebound, Midas Touch, or Restless Gambling modifiers to their tools." },
        { name: "Worthy Token Forging", role: "Collect 3 Mystery Shards during deep cave exploration and bring them to Sicio21 to forge a Worthy Token. Consume it at VegitoBlue to unlock high-tier rewards and exclusive accessories." }
      ]
    }
  },
  {
    id: "04",
    slug: "gitmedic",
    title: "GITMEDIC // MULTI-AGENT",
    description: "Autonomous multi-agent bug fixing CLI that monitors, analyzes, and resolves software bugs within GitHub repositories. Coordinates specialized agents through a central Orchestrator, running isolated validation and an infinite resilience healing loop.",
    tech: ["Python", "Git", "LLM Agents", "Gemini / Ollama", "ERC-8004", "Isolated Venvs"],
    repoUrl: "https://github.com/SimLag012/GitMedic",
    metrics: {
      latency: "Up to 15 retries",
      throughput: "Parallel planning",
      uptime: "92% recovery rate"
    },
    details: {
      overview: "GitMedic is a professional-grade autonomous agent system designed to monitor, analyze, and resolve software bugs within GitHub repositories. Unlike linear automation scripts, GitMedic utilizes a sophisticated multi-agent architecture coordinated by a central Orchestrator to ensure high resiliency, precision, and operational safety.",
      capabilities: [
        { title: "Autonomous Discovery", desc: "Automatically scans GitHub for viable bug-fixing opportunities based on complexity." },
        { title: "Swarm Planning", desc: "Generates and evaluates multiple resolution strategies in parallel to select the most efficient path." },
        { title: "Infinite Resilience Loop", desc: "Continues to refine and correct patches until they pass all validation checks, learning from failures." },
        { title: "Surgical Patching", desc: "Uses an Aider-style Search/Replace mechanism for high-precision code modifications." },
        { title: "Isolated Validation", desc: "Executes all tests in dedicated virtual environments to prevent local system interference." }
      ],
      architecture: [
        { name: "Discovery Agent", role: "Identifies intervention targets via GitHub API and filters by size/stars." },
        { name: "Planner Agent", role: "Parses issues and designs technical solutions as structured JSON plans." },
        { name: "Developer Agent", role: "Implements patches using surgical search/replace and manages git history." },
        { name: "Verifier Agent", role: "Runs syntax checks and targeted pytest suites in isolated venvs." },
        { name: "Critic Agent", role: "Diagnoses failures, provides technical review, and breaks stagnation loops." }
      ],
      setup: {
        prerequisites: ["Python 3.9+", "Git", "GitHub Personal Access Token (PAT)"],
        commands: [
          { label: "Clone & Install", code: "git clone https://github.com/SimLag012/GitMedic.git\ncd GitMedic\npip install ." },
          { label: "Editable Mode", code: "pip install -e ." },
          { label: "Configuration Wizard", code: "gitmedic --config" }
        ]
      },
      usage: [
        { label: "Discovery Mode", code: "gitmedic -r" },
        { label: "Targeted Resolution", code: "gitmedic https://github.com/owner/repository/issues/123" },
        { label: "Provider Override", code: "gitmedic -r --provider ollama" },
        { label: "Test Mode (No PR)", code: "gitmedic -r --no-pull" },
        { label: "Clean Local Data", code: "gitmedic --clean" }
      ],
      advanced: [
        { name: "Weighted Fuzzy Matching", desc: "Prevents block-matching failures from minor spacing mismatches in LLM outputs." },
        { name: "ERC-8004 Blockchain Identity", desc: "Registers cryptographic developer identities on-chain for secure verification." },
        { name: "Stagnation Break Directives", desc: "Orchestrator forces a pivot when the Critic detects repeated identical suggestions." }
      ]
    }
  },
  {
    id: "05",
    slug: "macro-av",
    title: "AV_MACROS // DISCORD BOT",
    description: "A Python desktop macro application paired with a Discord bot. The bot dynamically generates licenses and compiles macros on-the-fly using PyInstaller inside a Docker container with Wine, providing a ready-to-use Windows executable.",
    tech: ["Python", "Discord.py", "PyInstaller", "Docker", "Wine"],
    repoUrl: "https://github.com/SimLag012/macro_av",
    metrics: {
      latency: "On-the-fly compilation",
      throughput: "Automated license generation",
      uptime: "Isolated Docker environment"
    }
  },
  {
    id: "06",
    slug: "shapex",
    title: "SHAPEX // AI 3D GENERATOR",
    description: "An AI-driven 3D model generation pipeline. Feeds structured JSON object descriptions to a local Ollama LLM, which writes Python Blender scripts on demand. The orchestrator injects the generated code into Blender's scripting environment and outputs a production-ready .blend file — no manual modeling required.",
    tech: ["Python", "Blender", "Ollama", "LLM Scripting", "JSON"],
    repoUrl: "https://github.com/SimLag012/ShapeX",
    metrics: {
      latency: "LLM-to-.blend pipeline",
      throughput: "JSON → Script → 3D",
      uptime: "Fully local (no cloud)"
    }
  }
];
