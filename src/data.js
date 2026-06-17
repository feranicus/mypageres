// ============================================================================
//  CONTENT DATA  —  single source of truth for the portfolio
//  Edit text here; components in App.jsx render it.
// ============================================================================

export const APPS_SCRIPT_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwZvagkbUoJ9El2PRA5rO-FRj9IgCvdymWR_Nn4RWVWB8Tl78S0bLWon9ucviGxmVVcEg/exec";

export const profileData = {
  name: "JEV VAINSTEINS",
  handle: "J.V.",
  title: "Principal Architect — Cloud · Cybersecurity · Open Source · AI",
  status: "OPEN TO PRINCIPAL / STAFF ARCHITECT ENGAGEMENTS",
  summary:
    "A multifaceted principal architect with extensive expertise across Cloud, Cybersecurity, Open Source, and Networking. Proven track record of delivering high-impact, multi-million dollar projects for global leaders like Telefónica. Adept at full-stack development and designing secure, scalable, and innovative enterprise solutions.",
  imageUrl: "https://cybergod.ai/photo_2025-10-01_11-50-05.jpg",
};

export const contactInfo = {
  email: "feranicus@s4biz.io",
  telegram: "https://t.me/feranicus",
  whatsapp: "https://wa.me/4915785541545",
  linkedin: "https://www.linkedin.com/in/feranicus/",
  github: "https://github.com/cybergodai/cybergodai",
};

export const initialDocuments = [
  { name: "My Resume", url: "https://docsend.com/view/8u87pkebcxht3pv2", icon: "Resume" },
  { name: "Project Portfolio", url: "https://docsend.com/view/fishpm7ft5un6js9", icon: "Portfolio" },
  { name: "Endorsement Letters", url: "https://docsend.com/view/uuyvqeteg3i9f2px", icon: "Endorsements" },
  { name: "Cebit Keynote", url: "https://youtu.be/PWo0W9vdc-U", icon: "Keynote" },
];

// Geo-aware resume override (Israel)
export const ISRAELI_RESUME_URL = "https://www.itzen.ai/jevpresaleil2025.html";

export const metrics = [
  { value: "€200M+", label: "Programs Led" },
  { value: "400+", label: "Apps Migrated" },
  { value: "10,000+", label: "Edge Nodes Secured" },
  { value: "280k+", label: "AI Red-Team Users" },
];

export const experiences = [
  {
    title: "Principal Cloud & DC Architect",
    description:
      "Extensive knowledge of AWS, Azure, and OpenStack, delivering cloud projects for clients like Telefónica, LuxAir, Tosca/Aldi, V-Bank, and AON. Also served as a Principal SE at Cogent Communications (2nd largest Fiber ISP with 101 owned datacenters).",
  },
  {
    title: "Principal Cybersecurity Architect",
    description:
      "Expertise in GDPR, DORA, NIS2, CRA, and ISO 27001 compliance. Designs resilient cybersecurity frameworks with experience from top Israeli vendors and global law enforcement.",
  },
  {
    title: "Principal Open Source Architect",
    description:
      "Specializes in building company-wide open source ecosystems, cutting CAPEX by up to 80%. Expertise from Red Hat and Canonical in containers, middleware, and virtualization.",
  },
  {
    title: "Principal Networking Architect",
    description:
      "Built ISPs from the ground up, partnering with leaders like Huawei and Juniper. Experience includes managing AS numbers across Europe and delivering tailored network architectures.",
  },
  {
    title: "Principal Developer",
    description:
      "Full-stack developer proficient in C#, Python, Scala, Rust, and more. Adept at creating robust software and overseeing modern SDLC and DevSecOps processes.",
  },
  {
    title: "Blockchain & Crypto Specialist",
    description:
      "Led innovative blockchain projects including V-Bank's digital asset platform and the award-winning Enecuum decentralized platform. Co-founded Eticket4, a blockchain-based ticketing system for secure transactions.",
  },
];

export const securityLayers = [
  {
    id: "L1",
    layer: "Identity & Access Control (IAM)",
    focus: "The foundation of Zero Trust architecture.",
    skills: [
      "Zero Trust Architecture & SASE Design",
      "IAM Policy Development (AWS, Azure Entra ID)",
      "PAM/IAM for Enterprise Environments",
      "RBAC & Least-Privilege Service Accounts",
    ],
  },
  {
    id: "L2",
    layer: "Network & Edge Security",
    focus: "Perimeter defense and distributed-system security.",
    skills: [
      "Edge Computing Architecture (10,000+ nodes)",
      "Firewall Management (Fortinet, Palo Alto, CheckPoint)",
      "Complex Networking (DWDM, IP Transit, MPLS, SD-WAN)",
      "DDoS Protection for Tier-1 ISP",
    ],
  },
  {
    id: "L3",
    layer: "Application Security & DevSecOps",
    focus: "Embedding security into the SDLC.",
    skills: [
      "Full DevSecOps Implementation (GitHub, Azure DevOps)",
      "SAST/DAST & Secrets Management (CI/CD)",
      "Polyglot Development (C#, Python, Go, Scala, Rust, Java)",
      "Microservices & Event-Driven Architecture",
    ],
  },
  {
    id: "L4",
    layer: "AI/ML Architecture & Data Protection",
    focus: "Securing intelligent and data-heavy platforms.",
    skills: [
      "Full-Lifecycle LLM Solutions (POC to Production)",
      "Agentic AI Frameworks (LangSmith, LangGraph, AutoGen Equivalents)",
      "Classical NLP (NER, tf-idf) for Data Prep",
      "Data Encryption & Key Management (Banking & Telco)",
    ],
  },
  {
    id: "L5",
    layer: "Threat Detection & Offensive/Defensive Cyber",
    focus: "Active defense and attacker-mindset-driven testing.",
    skills: [
      "Offensive Cyber Solutions (1-click / zero-click)",
      "AI Adversarial Testing & Red Teaming (280k+ users)",
      "SIEM/XDR & AI Observability (ELK, Prometheus, Opik Equivalents)",
      "Cyber SIGINT & Lawful Interception",
    ],
  },
  {
    id: "L6",
    layer: "Cloud Architecture & Governance",
    focus: "The engine room for modern applications.",
    skills: [
      "Multi-Cloud Migration Leadership (AWS, Azure, GCP)",
      "Cloud Orchestration (Kubernetes, EKS, OpenShift, K3s)",
      "Compliance (DORA, NIS2, GDPR, ISO 27001)",
      "Open Source Strategy & Implementation (Canonical, Red Hat)",
    ],
  },
  {
    id: "L7",
    layer: "Automation, GRC & Program Management",
    focus: "Scaling technical excellence and strategy.",
    skills: [
      "SAFe/Agile Program Leadership (Global, Multi-Million €)",
      "IaaS/PaaS Automation (Terraform, OpenStack)",
      "Presale to Delivery Full-Lifecycle Management",
      "Post-M&A IT Transition and Transformation",
    ],
  },
];

export const projectsData = [
  {
    title: "Digital Transformation & Cloud Exit",
    client: "Telefónica Germany",
    description:
      "Led the strategic program to migrate 400+ applications and exit three physical datacenters, moving the entire stack to AWS Public Cloud. Included re-platforming from Oracle to PostgreSQL and implementing a modern CI/CD pipeline. A €200M, 2.5-year initiative.",
    tags: ["Cloud Migration", "AWS", "Large-Scale Program", "DevOps"],
  },
  {
    title: "AI Adversarial Testing & Defensive Architecture",
    client: "Cybergod / AIHAWK",
    description:
      "Spearheaded the technical Red Team for the AIHAWK GenAI project, analyzing real-world jailbreaking and prompt-injection attempts from 280k+ users. Architected the 'Cybergod' security product, designing defensive solutions for AI components and integrating LLM/RAG solutions.",
    tags: ["Offensive AI", "Red Teaming", "GenAI", "LLM Security"],
  },
  {
    title: "Global Edge Computing & Kubernetes Security",
    client: "Volkswagen Group",
    description:
      "Designed and led the secure Edge Computing architecture for a massive distributed system spanning 10,000+ global branches. Centralized management of lightweight K3s Kubernetes clusters using Rancher, securing the perimeter with enterprise-grade Fortinet firewalls.",
    tags: ["Edge Computing", "Kubernetes (K3s)", "DevSecOps", "Automotive"],
  },
  {
    title: "Post-Acquisition IT Transformation",
    client: "Tosca Services / Aldi",
    description:
      "Managed the technical integration and transformation following a major merger, tripling the IT landscape. Key deliverables: full migration to Microsoft Azure, ERP migration to MS Dynamics, and implementation of Azure DevOps for continuous integration.",
    tags: ["M&A Integration", "Azure Cloud", "ERP", "Global Program"],
  },
  {
    title: "Fintech Digital Asset Platform",
    client: "V-Bank · Fortune 100",
    description:
      "Architected and delivered full-lifecycle LLM solutions from POC to production for a major Fortune 100 bank. Developed a blockchain-based digital-asset investment platform for V-Bank in Germany, utilizing Fireblocks and Avaloq technologies.",
    tags: ["Fintech", "Blockchain", "LLM Solutions", "Banking"],
  },
];

// Marquee / ticker tech keywords
export const techStack = [
  "AWS", "AZURE", "GCP", "OPENSTACK", "KUBERNETES", "K3S", "OPENSHIFT", "TERRAFORM",
  "ZERO TRUST", "SASE", "FORTINET", "PALO ALTO", "CHECKPOINT", "DORA", "NIS2", "ISO 27001",
  "GDPR", "DEVSECOPS", "RUST", "GO", "PYTHON", "C#", "SCALA", "LLM", "RAG", "LANGGRAPH",
  "RED TEAM", "SIEM", "XDR", "ELK", "BLOCKCHAIN", "FIREBLOCKS", "MPLS", "SD-WAN", "DWDM",
];
