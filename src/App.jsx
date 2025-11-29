import React, { useState, useEffect, useRef } from 'react';

// --- НАСТРОЙКА: K.I.S.S. ENDPOINT ДЛЯ GOOGLE APPS SCRIPT ---
// !!! ВАШ РЕАЛЬНЫЙ URL Apps Script !!!
const APPS_SCRIPT_ENDPOINT = "https://script.google.com/macros/s/AKfycbwZvagkbUoJ9El2PRA5rO-FRj9IgCvdymWR_Nn4RWVWB8Tl78S0bLWon9ucviGxmVVcEg/exec";


// --- DATA (existing code) ---
const profileData = {
    name: "J.V.",
    title: "Principal Architect & Technologist",
    summary: "A multifaceted principal architect with extensive expertise across Cloud, Cybersecurity, Open Source, and Networking. Proven track record of delivering high-impact, multi-million dollar projects for global leaders like Telefónica. Adept at full-stack development and designing secure, scalable, and innovative enterprise solutions.",
    imageUrl: "https://cybergod.ai/photo_2025-10-01_11-50-05.jpg",
};
const contactInfo = {
    email: "feranicus@s4biz.io",
    telegram: "https://t.me/feranicus",
    whatsapp: "https://wa.me/4915785541545",
    linkedin: "https://www.linkedin.com/in/feranicus/",
    github: "https://github.com/cybergodai/cybergodai",
};
const initialDocuments = [
    { name: "My Resume", url: "https://docsend.com/view/8u87pkebcxht3pv2" },
    { name: "Project Portfolio", url: "https://docsend.com/view/fishpm7ft5un6js9" },
    { name: "Endorsement Letters", url: "https://docsend.com/view/uuyvqeteg3i9f2px" },
    { name: "Cebit Keynote", url: "https://youtu.be/PWo0W9vdc-U" },
];
const experiences = [
    {
        title: "Principal Cloud & DC Architect",
        description: "Extensive knowledge of AWS, Azure, and OpenStack, delivering cloud projects for clients like Telefonica, LuxAir, Tosca/Aldi, V-Bank, and AON. Also served as a Principal SE in Cogent Communications (2nd largest Fiber ISP with 101 own Datacenters)."
    },
    {
        title: "Principal Cybersecurity Architect",
        description: "Expertise in GDPR, DORA, NIS2, CRA, and ISO 27001 compliance. Designs resilient cybersecurity frameworks with experience from top Israeli vendors and global law enforcement."
    },
    {
        title: "Principal Open Source Architect",
        description: "Specializes in building company-wide open source ecosystems, cutting CAPEX by up to 80%. Expertise from Red Hat and Canonical in containers, middleware, and virtualization."
    },
    {
        title: "Principal Networking Architect",
        description: "Built ISPs from the ground up, partnering with leaders like Huawei and Juniper. Experience includes managing AS numbers across Europe and delivering tailored network architectures."
    },
    {
        title: "Principal Developer",
        description: "Full-stack developer proficient in C#, Python, Scala, Rust, and more. Adept at creating robust software and overseeing modern SDLC and DevSecOps processes."
    },
    {
        title: "Blockchain & Crypto Specialist",
        description: "Led innovative blockchain projects including V-Bank's digital asset platform and the award-winning Enecuum decentralized platform. Co-founded Eticket4, a blockchain-based ticketing system for secure transactions."
    }
];

// --- NEW/UPDATED DATA STRUCTURES ---

const securityLayers = [
    {
        layer: "Layer 1: Identity & Access Control (IAM)",
        focus: "The foundation of Zero Trust architecture.",
        skills: [
            "Zero Trust Architecture & SASE Design",
            "IAM Policy Development (AWS, Azure Entra ID)",
            "PAM/IAM for Enterprise Environments",
            "RBAC & Least Privilege Service Accounts"
        ]
    },
    {
        layer: "Layer 2: Network & Edge Security",
        focus: "Your perimeter defense and distributed system security.",
        skills: [
            "Edge Computing Architecture (10,000+ nodes)",
            "Firewall Management (Fortinet, Palo Alto, CheckPoint)",
            "Complex Networking (DWDM, IP Transit, MPLS, SD-WAN)",
            "DDoS Protection for Tier-1 ISP"
        ]
    },
    {
        layer: "Layer 3: Application Security & DevSecOps",
        focus: "Embedding security into the SDLC.",
        skills: [
            "Full DevSecOps Implementation (GitHub, Azure DevOps)",
            "SAST/DAST & Secrets Management (CI/CD)",
            "Polyglot Development (C#, Python, Go, Scala, Rust, Java)",
            "Microservices & Event-Driven Architecture"
        ]
    },
    {
        layer: "Layer 4: AI/ML Architecture & Data Protection",
        focus: "Securing intelligent and data-heavy platforms.",
        skills: [
            "Full-Lifecycle LLM Solutions (POC to Production)",
            "Agentic AI Frameworks (Langsmith, LangGraph, AutoGen Equivalents)",
            "Classical NLP (NER, tf-idf) for Data Prep",
            "Data Encryption & Key Management (Banking & Telco)"
        ]
    },
    {
        layer: "Layer 5: Threat Detection & Offensive/Defensive Cyber",
        focus: "Active defense and attacker-mindset-driven testing.",
        skills: [
            "Offensive Cyber Solutions (1-click/zero-click)",
            "AI Adversarial Testing & Red Teaming (280k+ users)",
            "SIEM/XDR & AI Observability (ELK, Prometheus, Opik Equivalents)",
            "Cyber SIGINT & Lawful Interception",
        ]
    },
    {
        layer: "Layer 6: Cloud Architecture & Governance",
        focus: "The engine room for modern applications.",
        skills: [
            "Multi-Cloud Migration Leadership (AWS, Azure, GCP)",
            "Cloud Orchestration (Kubernetes, EKS, OpenShift, K3s)",
            "Compliance (DORA, NIS2, GDPR, ISO 27001)",
            "Open Source Strategy & Implementation (Canonical, Red Hat)"
        ]
    },
    {
        layer: "Layer 7: Automation, GRC & Program Management",
        focus: "Scaling technical excellence and strategy.",
        skills: [
            "SAFe/Agile Program Leadership (Global, Multi-Million €)",
            "IaaS/PaaS Automation (Terraform, OpenStack)",
            "Presale to Delivery Full Lifecycle Management",
            "Post-M&A IT Transition and Transformation"
        ]
    }
];

const projectsData = [
    {
        title: "Digital Transformation & Cloud Exit (Telefonica Germany)",
        description: "Led the strategic program to migrate                      400+ applications                      and exit three physical data centers, moving the entire stack to                      AWS Public Cloud                     . Included re-platforming from Oracle to Postgress and implementing a modern CI/CD pipeline. This was a €200M, 2.5-year initiative.",
        tags: ["Cloud Migration", "AWS", "Large-Scale Program", "DevOps"],
    },
    {
        title: "AI Adversarial Testing & Defensive Architecture (Cybergod/AIHAWK)",
        description: "Spearheaded the technical Red Team for the                      AIHAWK                      GenAI project, analyzing real-world jailbreaking and prompt injection attempts from                      280k+ users                     . Architected the                      'Cybergod'                      security product, designing defensive solutions for AI components and integrating LLM/RAG solutions.",
        tags: ["Offensive AI", "Red Teaming", "GenAI", "LLM Security"],
    },
    {
        title: "Global Edge Computing & Kubernetes Security (Volkswagen Group)",
        description: "Designed and led the secure Edge Computing architecture for a massive distributed system spanning over                      10,000 global branches                     . The solution centralized the management of light-weight                      K3s Kubernetes                      clusters using Rancher and secured the perimeter with enterprise-grade Fortinet firewalls.",
        tags: ["Edge Computing", "Kubernetes (K3s)", "DevSecOps", "Automotive"],
    },
    {
        title: "Post-Acquisition IT Transformation (Tosca Services/Aldi)",
        description: "Managed the technical integration and transformation following a major merger, tripling the IT landscape. Key deliverables included full migration to                      Microsoft Azure                     , ERP migration to MS Dynamics, and implementation of                      Azure DevOps                      for continuous integration.",
        tags: ["M&A Integration", "Azure Cloud", "ERP", "Global Program"],
    },
    {
        title: "Fintech Digital Asset Platform (Vbank, Fortune 100 Bank)",
        description: "Architected and delivered full-lifecycle LLM solutions from POC to production for a major Fortune 100 Bank. Developed a                      blockchain-based digital asset investment platform                      for Vbank in Germany, utilizing Fireblocks and Avaloq technologies.",
        tags: ["Fintech", "Blockchain", "LLM Solutions", "Banking"],
    }
];

// --- ICONS AND HOOKS (existing code, unchanged) ---

const ICONS = {
    Email: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
    Telegram: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13H2l2.45-5.34L15 4l-3.36 7.12L22 2z"></path></svg>,
    WhatsApp: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.9 16.3c-1.3-1.4-2.8-2.6-4.4-3.7-1.4-.9-3.2-1.2-4.8-.8-2.1.5-3.9 1.8-5.2 3.5C6 17.7 4.7 19 3.1 20.1c-1.8 1.2-3.4-.4-2.8-2.3.8-2.4 1.3-5 .9-7.5-.4-2.7.4-5.5 2.1-7.6C5.2 0 8.3-1 11.2.3c3.1 1.4 5.2 4.2 6.1 7.4.8 2.9.4 6-1.1 8.6"></path></svg>,
    LinkedIn: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
    Resume: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    Portfolio: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>,
    Endorsements: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>,
    Keynote: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>,
    GitHub: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>,
};

// --- HOOKS AND COMPONENTS (Hooks and other components remain the same) ---
const useIntersectionObserver = (options) => {
    const [elements, setElements] = useState([]);
    const [entries, setEntries] = useState([]);
    const observer = useRef(null);
    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(observedEntries => {
            setEntries(observedEntries);
        }, options);
        const { current: currentObserver } = observer;
        elements.forEach(element => {
            if (element) {
                currentObserver.observe(element);
            }
        });
        return () => {
            if (currentObserver) {
                currentObserver.disconnect();
            }
        };
    }, [elements, options]);
    return [setElements, entries];
};
const AnimatedCard = ({ children, className, animationDelay = '0s' }) => {
    const cardRef = useRef(null);
    const [setElements, entries] = useIntersectionObserver({ threshold: 0.1 });
    useEffect(() => {
        if (cardRef.current) {
            setElements([cardRef.current]);
        }
    }, [setElements]);
    const isVisible = entries.some(entry => entry.target === cardRef.current && entry.isIntersecting);
    return (
        <div
            ref={cardRef}
            className={`card ${className} ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: animationDelay }}
        >
            {children}
        </div>
    );
};
const Header = ({ documents }) => (
    <header>
        <AnimatedCard className="hero" animationDelay="0.2s">
            <img src={profileData.imageUrl} alt="J.V. Profile Picture" className="profile-pic" /> 
            <div>
                <h1 className="name">{profileData.name}</h1>
                <div className="title">{profileData.title}</div>
                <p className="summary">{profileData.summary}</p>
            </div>
        </AnimatedCard>
        <ContactInfo documents={documents} />
    </header>
);
const ContactInfo = ({ documents }) => (
    <AnimatedCard className="contact" animationDelay="0.4s">
        <h3>Contact Me</h3>
        <a href={`mailto:${contactInfo.email}`} className="row">
            <ICONS.Email />
            <div>Email</div>
        </a>
        <a href={contactInfo.telegram} className="row" target="_blank" rel="noopener noreferrer">
            <ICONS.Telegram />
            <div>Telegram</div>
        </a>
        <a href={contactInfo.whatsapp} className="row" target="_blank" rel="noopener noreferrer">
            <ICONS.WhatsApp />
            <div>WhatsApp</div>
        </a>
        <a href={contactInfo.linkedin} className="row" target="_blank" rel="noopener noreferrer">
            <ICONS.LinkedIn />
            <div>LinkedIn</div>
        </a>
        <h3 style={{ marginTop: '16px' }}>Key Documents</h3>
        {documents.map(doc => (
            <a href={doc.url} className="row" target="_blank" rel="noopener noreferrer" key={doc.name}>
                {doc.name === "My Resume" && <ICONS.Resume />}
                {doc.name === "Project Portfolio" && <ICONS.Portfolio />}
                {doc.name === "Endorsement Letters" && <ICONS.Endorsements />}
                {doc.name === "Cebit Keynote" && <ICONS.Keynote />}
                <div>{doc.name}</div>
            </a>
        ))}
        <a href={contactInfo.github} className="row" target="_blank" rel="noopener noreferrer">
            <ICONS.GitHub />
            <div>GitHub Cyber Project</div>
        </a>
    </AnimatedCard>
);

const Experience = () => (
    <AnimatedCard className="section" animationDelay="0.6s">
        <h2><span className="dot"></span> Core Expertise</h2>
        <div className="xp">
            {experiences.map((job, index) => (
                <article className="job" key={index}>
                    <h3>{job.title}</h3>
                    <p>{job.description}</p>
                </article>
            ))}
        </div>
    </AnimatedCard>
);

const Skills = () => (
    <AnimatedCard className="section" animationDelay="0.7s">
        <h2><span className="dot"></span> 7-Layer Security & Core Skills</h2>
        <div className="xp">
            {securityLayers.map((layer, index) => (
                <article className="job" key={index}>
                    <h3 className="text-accent-2">{layer.layer}</h3>
                    <p className="text-muted font-bold italic mb-2">{layer.focus}</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        {layer.skills.map((skill, skillIndex) => (
                            <li key={skillIndex} className="text-sm text-ink">{skill}</li>
                        ))}
                    </ul>
                </article>
            ))}
        </div>
    </AnimatedCard>
);


const Projects = () => (
    <AnimatedCard className="section" animationDelay="0.8s">
        <h2><span className="dot"></span> Featured Projects</h2>
        <div className="xp">
            {projectsData.map((project, index) => (
                <article className="job" key={index}>
                    <h3 className="text-accent">{project.title}</h3>
                    <p className="text-muted text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="tag-pill">
                                {tag}
                            </span>
                        ))}
                    </div>
                </article>
            ))}
        </div>
    </AnimatedCard>
);


// --- MAIN APP COMPONENT ---

function App() {
    const haloRef = useRef(null);
    const [documents, setDocuments] = useState(initialDocuments);

    // 1. Эффект для следования "гало" за курсором (без изменений)
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (haloRef.current) {
                const { clientX, clientY } = e;
                haloRef.current.style.transform = `translate(${clientX - 200}px, ${clientY - 200}px)`;
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // 2. Эффект для автоматического логирования посетителей в Google Sheets
    useEffect(() => {
        // 1. Using sessionStorage to track only once per session
        if (sessionStorage.getItem('visitorLogged')) {
            console.log("LOG: Visitor already tracked this session (skipping)."); 
            return;
        }

        const logVisitor = async () => {
            let ipData = {};
            
            console.log("LOG: 1. logVisitor function STARTED."); // Debug log
            
            // 2.1 Get IP and Geolocation
            try {
                const ipResponse = await fetch('https://ipapi.co/json/');
                if (!ipResponse.ok) throw new Error("IP API failed"); 
                ipData = await ipResponse.json();
                console.log("LOG: 2. IP API fetch successful."); // Debug log
            } catch (error) {
                console.warn('LOG: IP API fetch failed, using placeholder data.');
                ipData = { ip: 'API_Failed', country_code: 'XX' }; 
            }

            // 2.2 Collect data to send
            const dataToLog = {
                ip: ipData.ip || 'Unknown',
                country: ipData.country_code || 'Unknown',
                resolution: `${window.screen.width}x${window.screen.height}`,
                vendor: navigator.vendor || 'Unknown',
                platform: navigator.platform || 'Unknown',
                language: navigator.language || 'Unknown',
            };

            // 2.3 Formulate URL for sending data
            const params = new URLSearchParams(dataToLog);
            const urlWithParams = `${APPS_SCRIPT_ENDPOINT}?${params.toString()}`;
            console.log("LOG: 3. FINAL URL SENDING:", urlWithParams); // Debug log
            
            try {
                // SEND REQUEST
                await fetch(urlWithParams, {
                    method: 'GET',
                    mode: 'no-cors' 
                });

                sessionStorage.setItem('visitorLogged', 'true');
                console.log('LOG: 4. Apps Script FETCH SUCCESSFUL. Check Google Sheet!'); // Final success log

            } catch (error) {
                console.error('LOG: CRITICAL ERROR sending data to Apps Script:', error);
            }
        };
        
        // !!! RUN IMMEDIATELY !!!
        logVisitor(); 
        
    }, [documents]); 

    // 3. Effect to check location (Israel) for resume URL 
    useEffect(() => {
        const checkVisitorLocation = async () => {
            let isFromIsrael = false;
            const israeliResumeUrl = "https://www.itzen.ai/jevpresaleil2025.html";
            try {
                const response = await fetch('https://ipapi.co/json/');
                if (!response.ok) throw new Error('IP API response not OK');
                const data = await response.json();
                if (data && data.country_code === 'IL') {
                    isFromIsrael = true;
                }
            } catch (error) {
                console.warn('IP-based geolocation failed:', error.message);
                try {
                    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                    if (timeZone === 'Asia/Jerusalem') {
                        isFromIsrael = true;
                    }
                } catch (tzError) {
                    console.warn('Could not determine timezone:', tzError);
                }
            }
            if (isFromIsrael) {
                setDocuments(currentDocs =>
                    currentDocs.map(doc =>
                        doc.name === "My Resume"
                            ? { ...doc, url: israeliResumeUrl }
                            : doc
                    )
                );
            }
        };
        checkVisitorLocation();
    }, [setDocuments]);

    const GlobalStyles = () => (
        <style>{`
            :root {
                --bg: #0d0f14;
                --card: rgba(255, 255, 255, .06);
                --ink: #e9edf3;
                --muted: #a7b1c2;
                --accent: #00aaff;
                --accent-2: #00e0ff;
                --ring: rgba(0, 170, 255, .25);
                --shadow: 0 10px 30px rgba(0, 0, 0, .35);
                --glass: blur(12px) saturate(130%);
                --grad: conic-gradient(from 180deg at 50% 50%, #00aaff, #00e0ff, #73ffa8, #00aaff);
            }

            * { box-sizing: border-box; }

            html, body, #root { height: 100%; }

            body {
                margin: 0;
                font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                background:
                    radial-gradient(1200px 1200px at 10% -30%, rgba(0, 170, 255, .15), transparent 60%),
                    radial-gradient(1200px 1200px at 90% 110%, rgba(0, 224, 255, .18), transparent 60%),
                    linear-gradient(180deg, #0b0d12, #0d0f14 30%, #0d0f14 70%, #0b0d12);
                color: var(--ink);
                line-height: 1.6;
                overflow-y: scroll;
            }

            a {
                color: var(--accent-2);
                text-decoration: none;
                transition: color 0.2s ease;
            }

            a:hover {
                color: #fff;
                text-decoration: none;
            }

            .page {
                max-width: 1100px;
                margin: 40px auto 96px;
                padding: clamp(18px, 2.5vw, 32px);
                position: relative;
            }

            .halo {
                position: fixed;
                top: 0;
                left: 0;
                width: 400px;
                height: 400px;
                background: var(--grad);
                filter: blur(80px) saturate(140%) opacity(.25);
                border-radius: 50%;
                pointer-events: none;
                z-index: 0;
                transition: transform 0.2s ease-out;
            }

            header {
                position: relative;
                z-index: 1;
                display: grid;
                grid-template-columns: 1.3fr .7fr;
                gap: clamp(16px, 2.2vw, 28px);
                align-items: stretch;
            }
            
            .card {
                background: var(--card);
                -webkit-backdrop-filter: var(--glass);
                backdrop-filter: var(--glass);
                border: 1px solid rgba(255, 255, 255, .08);
                border-radius: 18px;
                box-shadow: var(--shadow);
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            .card.is-visible {
                opacity: 1;
                transform: translateY(0);
            }


            .hero {
                padding: clamp(50px, 6vw, 60px) clamp(20px, 2.8vw, 32px) clamp(30px, 4vw, 40px);
                position: relative;
                overflow: hidden;
                isolation: isolate;
                display: flex;
                align-items: center;
                gap: clamp(20px, 2.8vw, 32px);
            }

            .hero:before {
                content: "";
                position: absolute;
                inset: 10px auto auto -50px;
                width: 240px;
                height: 240px;
                background: radial-gradient(closest-side, rgba(0, 170, 255, .25), transparent);
                filter: blur(30px);
                border-radius: 50%;
                z-index: -1;
            }
            
            .profile-pic {
                flex-shrink: 0;
                width: clamp(180px, 20vw, 240px);
                height: clamp(180px, 20vw, 240px);
                border-radius: 18px;
                object-fit: cover;
                border: 4px solid rgba(255, 255, 255, .1);
                box-shadow: 0 0 20px rgba(0, 170, 255, .5);
            }

            .name {
                font-family: "Playfair Display", serif;
                font-weight: 700;
                letter-spacing: .2px;
                line-height: 1;
                font-size: clamp(34px, 5.6vw, 56px);
                margin: 0 0 6px 0;
                background: linear-gradient(92deg, #fff, #cfe7ff 45%, #c8f8ff 75%);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                text-shadow: 0 1px 0 rgba(255, 255, 255, .15);
            }

            .title {
                font-weight: 600;
                color: var(--muted);
                margin: 2px 0 14px;
                font-size: clamp(14px, 1.6vw, 18px);
            }

            .summary {
                margin-top: 14px;
                color: #d6dbe6;
                font-size: clamp(14px, 1.4vw, 16px);
            }

            .contact {
                padding: clamp(16px, 2.2vw, 22px);
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            
            .contact h3 {
                margin: 0 0 8px;
                font-size: clamp(16px, 1.8vw, 18px);
                font-weight: 700;
                color: var(--ink);
            }

            .row {
                display: flex;
                gap: 12px;
                align-items: center;
                transition: background 0.2s ease;
                padding: 8px;
                border-radius: 8px;
            }
            .row:hover {
                background: rgba(255,255,255,0.05);
            }

            .row svg {
                flex: 0 0 20px;
                opacity: .9;
            }
            
            .row div {
                font-weight: 600;
                font-size: 14px;
            }

            .grid {
                margin-top: 26px;
                display: grid;
                grid-template-columns: 1fr;
                gap: clamp(16px, 2.4vw, 26px);
            }

            .section {
                padding: clamp(18px, 2.4vw, 26px);
            }

            .section h2 {
                margin: 0 0 16px;
                font-size: clamp(20px, 2.2vw, 24px);
                letter-spacing: .2px;
                font-weight: 800;
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .section h2 .dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: radial-gradient(circle at 30% 30%, #fff, var(--accent-2) 60%, var(--accent));
                box-shadow: 0 0 0 6px rgba(0, 170, 255, .12), 0 0 28px var(--ring);
            }

            .xp {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 16px;
            }

            .job {
                border: 1px solid rgba(255, 255, 255, .08);
                border-radius: 14px;
                padding: 20px;
                background: linear-gradient(180deg, rgba(255, 255, 255, .04), rgba(255, 255, 255, .02));
                position: relative;
                overflow: hidden;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .job:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.3);
            }

            .job:after {
                content: "";
                position: absolute;
                inset: auto auto -80% -20%;
                width: 80%;
                height: 180%;
                background: radial-gradient(60% 60% at 80% 60%, rgba(0, 224, 255, .1), transparent 70%);
                transform: rotate(8deg);
                transition: transform 0.4s ease;
            }
            .job:hover:after {
                transform: rotate(0deg) scale(1.1);
            }

            .job h3 {
                margin: 0 0 8px;
                font-size: 18px;
            }
            
            .job p {
                margin: 0;
                color: var(--muted);
                font-size: 15px;
            }
            
            /* NEW STYLES FOR TAGS */
            .tag-pill {
                font-size: 12px;
                font-weight: 500;
                padding: 4px 8px;
                border-radius: 12px;
                background-color: rgba(0, 170, 255, 0.1); 
                color: var(--accent-2);
                border: 1px solid rgba(0, 170, 255, 0.3);
                white-space: nowrap;
            }
            
            footer {
                margin-top: 40px;
                padding: 14px 0;
                color: var(--muted);
                font-size: 13px;
                text-align: center;
            }

            @media (max-width: 920px) {
                header {
                    grid-template-columns: 1fr;
                }
                .xp {
                    grid-template-columns: 1fr;
                }
                .hero {
                    flex-direction: column;
                    text-align: center;
                    align-items: center;
                }
            }
        `}</style>
    );

    return (
        <>
            <GlobalStyles />
            <div className="page">
                <div ref={haloRef} className="halo" aria-hidden="true"></div>
                <Header documents={documents} />
                <main className="grid">
                    <Experience />
                    <Skills />
                    <Projects />
                </main>
                <footer>
                    <p>&copy; 2025 J.V. | All Rights Reserved</p>
                </footer>
            </div>
        </>
    );
}

export default App;