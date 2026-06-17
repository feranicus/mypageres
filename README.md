# itzen.ai — Jev Vainsteins · Principal Architect Portfolio

A responsive, installable **PWA** portfolio with a maximal **Ghost-in-the-Shell / cyberpunk** aesthetic.
Built with **React 18 + Vite**, deployed to **GitHub Pages** at **https://itzen.ai**.

## Features
- Maximal cyberpunk UI: boot sequence, Matrix digital rain, scanlines/CRT flicker, glitch text, HUD panels, neon glass cards, live status bar, tech ticker.
- Fully responsive — works on Android, iPhone and desktop browsers.
- Installable PWA (`manifest.webmanifest` + `sw.js`) — "Add to Home Screen" with offline shell.
- Visitor telemetry via Google Apps Script (IP + geo + device + referrer/timezone), once per session.
- Geo-aware resume swap for Israeli visitors.
- No Firebase / GCP dependencies (removed).

## Project structure
```
src/
  data.js        # all content (profile, experience, 7-layer skills, projects)
  styles.css     # cyberpunk theme
  effects.jsx    # MatrixRain, BootSequence, CursorHalo, Typewriter, Panel
  App.jsx        # composition + visitor analytics
  main.jsx       # entry + service-worker registration
public/
  CNAME, manifest.webmanifest, sw.js, icon-192/512.png, apple-touch-icon.png, favicon.svg
.github/workflows/deploy.yml  # GitHub Actions -> GitHub Pages
```

## Develop
```bash
npm install
npm run dev      # local dev
npm run build    # production build -> dist/
```

## Deploy
Pushing to `main` triggers the GitHub Actions workflow which builds and publishes to GitHub Pages.
**One-time setup:** repo **Settings → Pages → Build and deployment → Source = "GitHub Actions"**,
and **Custom domain = itzen.ai** (DNS: apex A records to GitHub Pages IPs + a `www` CNAME to `feranicus.github.io`).

## Edit content
Everything user-facing lives in `src/data.js`. The visitor-logging endpoint is `APPS_SCRIPT_ENDPOINT` in that file.
