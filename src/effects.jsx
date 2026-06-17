import React, { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Matrix digital rain (canvas)                                       */
/* ------------------------------------------------------------------ */
export function MatrixRain() {
  const ref = useRef(null);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf, cols, drops, fontSize = 14;
    const glyphs = "アァカサタナハマヤラワ0123456789ABCDEFｦｧｨｩｪｫ<>/\\[]{}=+*".split("");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / fontSize);
      drops = Array(cols).fill(0).map(() => Math.random() * -canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let last = 0;
    const draw = (t) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 55) return; // ~18fps, easy on CPU
      last = t;
      ctx.fillStyle = "rgba(5,7,10,0.10)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + "px 'Share Tech Mono', monospace";
      for (let i = 0; i < cols; i++) {
        const ch = glyphs[(Math.random() * glyphs.length) | 0];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillStyle = Math.random() > 0.975 ? "#ffffff" : "#00f0ff";
        ctx.fillText(ch, x, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas id="matrix" className="fx-canvas" ref={ref} aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/*  Cursor halo                                                        */
/* ------------------------------------------------------------------ */
export function CursorHalo() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip on touch
    const move = (e) => {
      if (ref.current) ref.current.style.transform = `translate(${e.clientX - 180}px, ${e.clientY - 180}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div className="halo" ref={ref} aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/*  Boot sequence                                                      */
/* ------------------------------------------------------------------ */
const BOOT_LINES = [
  "[ SYS ] initializing itzen.ai secure shell ...",
  "[ OK  ] kernel modules loaded — zero-trust mesh online",
  "[ OK  ] crypto subsystem: AES-256 / TLS 1.3 negotiated",
  "[ SCAN] enumerating perimeter ... 10,000 edge nodes nominal",
  "[ AI  ] adversarial sentinel active — 280k+ vectors indexed",
  "[ OK  ] identity matrix verified — access granted",
];

export function BootSequence({ onDone }) {
  const [lines, setLines] = useState([]);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { onDone?.(); setDone(true); return; }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setLines(BOOT_LINES.slice(0, i));
      if (i >= BOOT_LINES.length) {
        clearInterval(id);
        setTimeout(() => { setDone(true); onDone?.(); }, 650);
      }
    }, 300);
    return () => clearInterval(id);
  }, [onDone]);

  const colorize = (l) => {
    if (l.includes("[ OK")) return <span><span className="ok">{l.slice(0, 6)}</span>{l.slice(6)}</span>;
    if (l.includes("SCAN") || l.includes("[ AI")) return <span><span className="warn">{l.slice(0, 6)}</span>{l.slice(6)}</span>;
    return <span><span className="ok">{l.slice(0, 6)}</span>{l.slice(6)}</span>;
  };

  return (
    <div className={"boot" + (done ? " done" : "")} aria-hidden="true">
      <div className="boot-inner">
        <div className="boot-title">ITZEN.AI // ARCHITECT TERMINAL</div>
        {lines.map((l, idx) => (
          <div className="boot-line" key={idx}>{colorize(l)}</div>
        ))}
        <div className="boot-bar"><i /></div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Typewriter title                                                   */
/* ------------------------------------------------------------------ */
export function Typewriter({ text, speed = 38, start = true }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setOut(text); return; }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start]);
  return <>{out}<span className="caret">▋</span></>;
}

/* ------------------------------------------------------------------ */
/*  Reveal-on-scroll wrapper (HUD panel)                               */
/* ------------------------------------------------------------------ */
export function Panel({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`panel ${className} ${vis ? "in" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      <span className="corner tl" /><span className="corner tr" />
      <span className="corner bl" /><span className="corner br" />
      {children}
    </div>
  );
}
