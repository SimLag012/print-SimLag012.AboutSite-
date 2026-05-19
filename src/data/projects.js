export const projects = [
  {
    id: "01",
    slug: "metashape-core",
    title: "METASHAPE_OS // CORE",
    description: "A distributed SaaS licensing engine engineered in Rust for horizontal scalability. Features a secure hardware-bound (HWID) authentication layer, sub-50ms licensing validation under high-frequency RPC, and real-time state synchronization using PostgreSQL pub/sub across multi-node clusters.",
    tech: ["Rust", "PostgreSQL", "Redis Cluster", "gRPC", "Docker Swarm"],
    repoUrl: "https://github.com/SimLag012/metashape-core",
    metrics: {
      latency: "P99 < 35ms",
      throughput: "20,000 rps",
      uptime: "99.99%"
    }
  },
  {
    id: "02",
    slug: "hearth-beat",
    title: "HEARTH-BEAT // TELEMETRY",
    description: "A high-performance Go-based microservices gateway designed for real-time telemetry processing. Integrates Apache Kafka as an event backbone to ingest and process massive system health data feeds, ensuring zero data loss and dynamic routing via gRPC.",
    tech: ["Go", "gRPC / Protobuf", "Apache Kafka", "Kubernetes", "Prometheus"],
    repoUrl: "https://github.com/SimLag012/hearth-beat",
    metrics: {
      latency: "P99 < 15ms",
      throughput: "1.2M events/min",
      uptime: "99.95%"
    }
  },
  {
    id: "03",
    slug: "stoneks-engine",
    title: "STONEKS_ENGINE // SIM",
    description: "A deterministic virtual economy simulation engine built in C++ and Lua. Optimizes transactional atomicity and anti-fraud server-side validation. Minimizes atomic lock contention during high-frequency write bursts using circular ring buffers.",
    tech: ["C++ 20", "Luau VM", "Redis", "DynamoDB"],
    repoUrl: "https://github.com/SimLag012/stoneks-engine",
    metrics: {
      latency: "Sub-millisecond core sync",
      throughput: "10,000 trades/sec",
      uptime: "100% transactional safety"
    }
  },
  {
    id: "04",
    slug: "gitmedic",
    title: "GITMEDIC // FORENSICS",
    description: "A low-level diagnostic and recovery CLI utility written in Python. Bypasses standard git client abstractions to parse compressed zlib packfiles directly, recovering corrupted Git repositories, repairing broken DAG structures, and identifying orphan blobs.",
    tech: ["Python", "Zlib / Deflate", "Binary Stream Parsing", "DAG Trees"],
    repoUrl: "https://github.com/SimLag012/gitmedic",
    metrics: {
      latency: "CLI execution",
      throughput: "N/A",
      uptime: "92% recovery success"
    }
  },
  {
    id: "05",
    slug: "spotfetch",
    title: "SPOTFETCH // CRAWLER",
    description: "A massively parallel asset scraper and metadata indexing pipeline built on Node.js Worker Threads and SQLite. Highly optimized for high-bandwidth network adapters and NVMe I/O saturation, using custom token-bucket rate limiters.",
    tech: ["Node.js Cluster", "Worker Threads", "SQLite", "FFmpeg", "TCP Tuning"],
    repoUrl: "https://github.com/SimLag012/spotfetch",
    metrics: {
      latency: "Concurrent network-bound",
      throughput: "500 assets/sec",
      uptime: "Automatic retries"
    }
  },
  {
    id: "06",
    slug: "shapex",
    title: "SHAPEX // GEOMETRY",
    description: "A highly parallel vectorized computational geometry engine in C++. Uses SIMD (AVX-512) and custom spatial quad-trees to compute procedural meshes, Delaunay triangulations, and Voronoi partitioning in real-time.",
    tech: ["C++ 20", "SIMD / AVX-512", "OpenGL / Vulkan", "Computational Math"],
    repoUrl: "https://github.com/SimLag012/shapex",
    metrics: {
      latency: "60 FPS real-time",
      throughput: "O(log N) partitioning",
      uptime: "Deterministic math"
    }
  }
];
