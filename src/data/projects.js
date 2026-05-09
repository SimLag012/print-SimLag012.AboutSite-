export const projects = [
  {
    id: "01",
    slug: "metashape-core",
    title: "METASHAPE_OS // CORE",
    description: "A distributed SaaS licensing engine engineered for horizontal scalability and high-security environments. It features a robust hardware-bound authentication layer and real-time state synchronization across multi-node clusters.",
    details: {
      challenge: "The primary architectural hurdle was ensuring consistent license validation across geographically distributed nodes while preventing bypass attempts via HWID spoofing or replay attacks. The system needed to maintain sub-50ms latency under a sustained load of 15,000+ requests per second without compromising data integrity.",
      solution: "Implemented a multi-tier security architecture utilizing HMAC-SHA256 for non-reversible hardware fingerprinting. Leveraging Redis as a distributed state store with a custom Sliding Window algorithm for granular rate-limiting. The backend uses an event-driven model with PostgreSQL notifications to ensure near-instantaneous synchronization of license status changes across all active worker nodes.",
      stack: ["PostgreSQL", "Redis", "Node.js Cluster", "Docker Swarm", "Python / Cryptography"],
      metrics: ["99.99% Availability", "<42ms P99 Latency", "15k+ Concurrent Validations"]
    },
    tags: ["Distributed_Systems", "Infra_Security", "High_Concurrency"],
  },
  {
    id: "02",
    slug: "hearth-beat",
    title: "HEARTH-BEAT // ORCHESTRATOR",
    description: "A high-throughput microservices gateway and data orchestration layer designed for real-time telemetry processing and seamless inter-service communication.",
    details: {
      challenge: "Coordinating data flow between 20+ isolated microservices while maintaining zero-packet loss and strict ordering of time-critical events during massive traffic spikes.",
      solution: "Developed a custom API Gateway leveraging gRPC for low-latency, binary-serialized communication. Integrated Apache Kafka as a persistent message backbone for event-driven workflows, ensuring that critical data is buffered and replayed in case of service failures. Implemented a dynamic load balancer that adjusts routing based on real-time health checks and resource availability (CPU/Memory) of the target containers.",
      stack: ["gRPC / Protobuf", "Apache Kafka", "Kubernetes", "Golang", "Prometheus / Grafana"],
      metrics: ["1.2M Events/min", "Zero Data Corruption", "Auto-scaling <15s Convergence"]
    },
    tags: ["Microservices", "Event_Driven", "Cloud_Native"],
  },
  {
    id: "03",
    slug: "stoneks-engine",
    title: "STONEKS_ENGINE // SIM",
    description: "A specialized virtual economy simulation engine optimized for large-scale multiplayer environments, focusing on transactional atomicity and anti-fraud logic.",
    details: {
      challenge: "Maintaining a stable and balanced virtual economy where thousands of atomic transactions occur per frame, while preventing sophisticated exploits like 'double-spending' or race conditions in a distributed game state.",
      solution: "Engineered a deterministic transaction processor within the Luau VM, utilizing circular buffers for high-speed data synchronization. Implemented an anti-tamper server-side validation layer that uses asymmetric encryption for transaction logs. The state persistence is handled by a high-performance NoSQL layer designed for minimal I/O blocking during peak simulation hours.",
      stack: ["Luau VM", "Redis", "C++ Core Bindings", "NoSQL / DynamoDB"],
      metrics: ["Atomic Transaction Sync", "Anti-Exploit Core", "High-Precision Economic Math"]
    },
    tags: ["Game_Backend", "Sim_Engines", "Transaction_Logic"],
  },
  {
    id: "04",
    slug: "gitmedic",
    title: "GITMEDIC // LOW-LEVEL",
    description: "A low-level diagnostic and recovery suite designed to reconstruct corrupted Git repositories by analyzing internal object structures and binary blobs.",
    details: {
      challenge: "Restoring data from a filesystem where Git's internal pointers have been fragmented or the header structures of compressed zlib blobs have been partially overwritten.",
      solution: "Developed a heuristic scanning algorithm that bypasses high-level Git commands to interact directly with the binary object store. The tool manually verifies SHA-1 checksums, decompresses zlib streams, and reconstructs the directed acyclic graph (DAG) of the commit history by identifying orphan objects and re-linking them based on structural patterns found in the packfiles.",
      stack: ["Python 3.11", "Git Internals (DAG)", "Binary Stream Parsing", "Zlib / Deflate"],
      metrics: ["Deep DAG Repair", "92% Recovery in Corrupt Stores", "Byte-Level Forensics"]
    },
    tags: ["DevOps_Internal", "Low_Level_IO", "Data_Forensics"],
  },
  {
    id: "05",
    slug: "spotfetch",
    title: "SPOTFETCH // CONCURRENCY",
    description: "A massively parallel asset crawler and metadata indexing engine optimized for NVMe throughput and high-bandwidth network environments.",
    details: {
      challenge: "Maximizing network and disk I/O utilization without overwhelming system resources or triggering OS-level rate limits during the concurrent download of thousands of small assets.",
      solution: "Utilized Node.js Worker Threads to offload intensive I/O tasks from the main event loop. Implemented a custom connection pooling strategy that dynamically adjusts the number of concurrent requests based on TCP congestion windows and system memory pressure. Integrated an asynchronous metadata processing pipeline that performs real-time ID3 tagging and SQLite indexing.",
      stack: ["Node.js / Worker Threads", "SQLite", "Async Networking", "FFmpeg Bindings"],
      metrics: ["NVMe Throughput Optimized", "Multi-Threaded Indexing", "Low Memory Footprint"]
    },
    tags: ["Performance", "Parallel_Computing", "Data_Mining"],
  },
  {
    id: "06",
    slug: "shapex",
    title: "SHAPEX // GEOMETRY",
    description: "A high-performance vector geometry engine for procedural mesh generation, leveraging hardware-accelerated parallel computation.",
    details: {
      challenge: "Generating complex 3D manifolds and Voronoi-based spatial partitions in real-time while maintaining a deterministic state for multiplayer synchronization.",
      solution: "Built a core geometry library in C++ utilizing SIMD (Single Instruction, Multiple Data) instructions for parallel vertex transformations. Implemented Delaunay Triangulation and Voronoi partitioning algorithms optimized with Quad-tree spatial indexing. The engine provides a bridge to modern rendering APIs while ensuring that all heavy geometric calculations are offloaded to high-performance compute shaders.",
      stack: ["C++ 20", "SIMD / AVX-512", "OpenGL / Vulkan", "Computational Math"],
      metrics: ["Parallel Vertex Compute", "60 FPS Real-time Proc-Gen", "O(log n) Spatial Queries"]
    },
    tags: ["Graphics_Backend", "Geometry_Engines", "Math_Heavy"],
  }
];

