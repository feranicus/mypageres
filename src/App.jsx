import React, { useEffect, useState } from "react";
import {
  profileData, contactInfo, initialDocuments, ISRAELI_RESUME_URL,
  metrics, experiences, securityLayers, projectsData, techStack,
  APPS_SCRIPT_ENDPOINT,
} from "./data.js";
import { MatrixRain, CursorHalo, BootSequence, Typewriter, Panel } from "./effects.jsx";

/* ----------------------------- ICONS --------------------------------------- */
const ICONS = {
  Email: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  Telegram: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13H2l2.45-5.34L15 4l-3.36 7.12L22 2z" /></svg>,
  WhatsApp: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.9 16.3c-1.3-1.4-2.8-2.6-4.4-3.7-1.4-.9-3.2-1.2-4.8-.8-2.1.5-3.9 1.8-5.2 3.5C6 17.7 4.7 19 3.1 20.1c-1.8 1.2-3.4-.4-2.8-2.3.8-2.4 1.3-5 .9-7.5-.4-2.7.4-5.5 2.1-7.6C5.2 0 8.3-1 11.2.3c3.1 1.4 5.2 4.2 6.1 7.4.8 2.9.4 6-1.1 8.6" /></svg>,
  LinkedIn: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>,
  Resume: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
  Portfolio: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>,
  Endorsements: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>,
  Keynote: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>,
  GitHub: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>,
};

/* ----------------------------- ANALYTICS ----------------------------------- */
/* Preserves the original Google Apps Script visitor logger (IP + geo + device),
   improved with referrer, timezone, path and connection telemetry.            */
function useVisitorTelemetry() {
  useEffect(() => {
    if (sessionStorage.getItem("visitorLogged")) return;

    const logVisitor = async () => {
      let ipData = {};
      try {
        const r = await fetch("https://ipapi.co/json/");
        if (!r.ok) throw new Error("IP API failed");
        ipData = await r.json();
      } catch {
        ipData = { ip: "API_Failed", country_code: "XX" };
      }

      const conn = navigator.connection || {};
      const dataToLog = {
        ip: ipData.ip || "Unknown",
        country: ipData.country_code || "Unknown",
        city: ipData.city || "Unknown",
        org: ipData.org || "Unknown",
        resolution: `${window.screen.width}x${window.screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        vendor: navigator.vendor || "Unknown",
        platform: navigator.platform || "Unknown",
        language: navigator.language || "Unknown",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
        referrer: document.referrer || "direct",
        path: location.pathname + location.search,
        connection: conn.effectiveType || "Unknown",
        userAgent: navigator.userAgent || "Unknown",
        ts: new Date().toISOString(),
      };

      const params = new URLSearchParams(dataToLog);
      try {
        await fetch(`${APPS_SCRIPT_ENDPOINT}?${params.toString()}`, {
          method: "GET",
          mode: "no-cors",
        });
        sessionStorage.setItem("visitorLogged", "true");
      } catch (e) {
        console.error("Telemetry send failed:", e);
      }
    };
    logVisitor();
  }, []);
}

/* Geo-aware resume swap for Israeli visitors (preserved). */
function useGeoResume(setDocuments) {
  useEffect(() => {
    const check = async () => {
      let il = false;
      try {
        const r = await fetch("https://ipapi.co/json/");
        if (r.ok) { const d = await r.json(); if (d?.country_code === "IL") il = true; }
      } catch {
        try { if (Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Jerusalem") il = true; } catch {}
      }
      if (il) {
        setDocuments((docs) =>
          docs.map((d) => (d.name === "My Resume" ? { ...d, url: ISRAELI_RESUME_URL } : d))
        );
      }
    };
    check();
  }, [setDocuments]);
}

/* ----------------------------- STATUS BAR ---------------------------------- */
function StatusBar() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const t = now.toISOString().slice(11, 19);
  return (
    <div className="statusbar">
      <span className="brand">ITZEN.AI</span>
      <span className="sep">//</span>
      <span><span className="dot-live" /><span className="live">SECURE LINK</span></span>
      <span className="sep">//</span>
      <span>NODE: J.V.</span>
      <span className="right">UTC {t} · v1.0 · ZERO-TRUST</span>
    </div>
  );
}

/* ----------------------------- SECTIONS ------------------------------------ */
function Hero({ documents }) {
  return (
    <section style={{ marginTop: 28 }}>
      <Panel className="hero">
        <div className="hero-photo">
          <img src={profileData.imageUrl} alt="Jev Vainsteins" loading="eager" />
          <span className="id-chip">ID://{profileData.handle} · CLEARANCE: PRINCIPAL</span>
        </div>
        <div>
          <div className="status-pill"><span className="dot-live" />{profileData.status}</div>
          <h1 className="name">
            <span className="glitch" data-text={profileData.name}>{profileData.name}</span>
          </h1>
          <div className="title"><Typewriter text={profileData.title} /></div>
          <p className="summary">{profileData.summary}</p>
        </div>
      </Panel>

      <div className="metrics">
        {metrics.map((m, i) => (
          <Panel key={m.label} className="metric" delay={i * 80}>
            <div className="v">{m.value}</div>
            <div className="l">{m.label}</div>
          </Panel>
        ))}
      </div>

      <div className="ticker">
        <div className="ticker-track">
          {[...techStack, ...techStack].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section>
      <h2 className="eyebrow">Core Expertise</h2>
      <div className="cards two">
        {experiences.map((job, i) => (
          <Panel key={i} delay={(i % 2) * 80}>
            <h3 className="item-title">{job.title}</h3>
            <p className="item-desc">{job.description}</p>
          </Panel>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section>
      <h2 className="eyebrow">7-Layer Security Stack</h2>
      <div className="cards two">
        {securityLayers.map((l, i) => (
          <Panel key={l.id} delay={(i % 2) * 80}>
            <h3 className="item-title"><span className="layer-id">{l.id}</span>{l.layer}</h3>
            <div className="layer-focus">{l.focus}</div>
            <ul className="skill-list">
              {l.skills.map((s, j) => <li key={j}>{s}</li>)}
            </ul>
          </Panel>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section>
      <h2 className="eyebrow">Featured Operations</h2>
      <div className="cards">
        {projectsData.map((p, i) => (
          <Panel key={i} delay={(i % 2) * 60}>
            <div className="item-sub">{p.client}</div>
            <h3 className="item-title">{p.title}</h3>
            <p className="item-desc">{p.description}</p>
            <div className="tags">{p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
          </Panel>
        ))}
      </div>
    </section>
  );
}

function Contact({ documents }) {
  return (
    <section>
      <h2 className="eyebrow">Establish Contact</h2>
      <div className="grid-2">
        <Panel>
          <div className="contact-h">Direct Channels</div>
          {[
            { href: `mailto:${contactInfo.email}`, Icon: ICONS.Email, label: "Email", ext: false },
            { href: contactInfo.telegram, Icon: ICONS.Telegram, label: "Telegram", ext: true },
            { href: contactInfo.whatsapp, Icon: ICONS.WhatsApp, label: "WhatsApp", ext: true },
            { href: contactInfo.linkedin, Icon: ICONS.LinkedIn, label: "LinkedIn", ext: true },
            { href: contactInfo.github, Icon: ICONS.GitHub, label: "GitHub — Cyber Project", ext: true },
          ].map(({ href, Icon, label, ext }) => (
            <a key={label} href={href} className="row" {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              <Icon /><div>{label}</div><span className="arrow">↗</span>
            </a>
          ))}
        </Panel>
        <Panel delay={80}>
          <div className="contact-h">Key Documents</div>
          {documents.map((doc) => {
            const Icon = ICONS[doc.icon] || ICONS.Portfolio;
            return (
              <a key={doc.name} href={doc.url} className="row" target="_blank" rel="noopener noreferrer">
                <Icon /><div>{doc.name}</div><span className="arrow">↗</span>
              </a>
            );
          })}
        </Panel>
      </div>
    </section>
  );
}

/* ----------------------------- APP ----------------------------------------- */
export default function App() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [, setBooted] = useState(false);

  useVisitorTelemetry();
  useGeoResume(setDocuments);

  return (
    <>
      <div className="bg-glow" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <MatrixRain />
      <CursorHalo />
      <div className="scanlines flicker" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <BootSequence onDone={() => setBooted(true)} />

      <div className="app">
        <StatusBar />
        <main className="wrap">
          <Hero documents={documents} />
          <Experience />
          <Skills />
          <Projects />
          <Contact documents={documents} />
          <footer className="foot">
            <span className="line">© {new Date().getFullYear()} JEV VAINSTEINS</span>
            <span className="line">//</span>
            <span className="line">itzen.ai</span>
            <span className="line">//</span>
            <span className="line">built secure · zero-trust · open source</span>
          </footer>
        </main>
      </div>
    </>
  );
}
