# CentofAi

Die zentrale Plattform für Künstliche Intelligenz. News, Tools, Kurse und Workshops – alles an einem Ort, um KI besser zu verstehen und produktiv einzusetzen.

🔗 **Live**: [https://www.centofai.com](https://www.centofai.com)

---

## Features

- **KI-News** – Täglich kuratierte Nachrichten aus der KI-Welt (12+ Artikel, 7 Kategorien)
- **KI-Tools-Verzeichnis** – Übersicht von 100+ Tools in 17 Kategorien, mit Suchfunktion
- **Kurse & Workshops** – 15+ Kurse zu KI, Automatisierung und Digitalisierung
- **Projekt-Vorschläge** – Besucher können Ideen einreichen (gespeichert in DB + E-Mail-Benachrichtigung)
- **Newsletter** – E-Mail-Anmeldung
- **Light/Dark Mode** – Umschaltbarer Theme-Toggle
- **Responsive Design** – Optimiert für Desktop, Tablet und Mobile

---

## Tech Stack

| Layer | Technologie |
|-------|-------------|
| Frontend | React 19, TypeScript, Tailwind CSS, Framer Motion |
| Backend | Express 5, TypeScript, Drizzle ORM |
| Datenbank | PostgreSQL |
| E-Mail | Nodemailer (SMTP via Infomaniak) |
| Build | Vite (Frontend), esbuild (Backend) |
| Monorepo | pnpm workspaces |

---

## Projektstruktur

```
├── artifacts/
│   ├── centofai/          # React + Vite Frontend
│   └── api-server/        # Express API Server
├── lib/
│   ├── api-spec/          # OpenAPI Spec + Codegen
│   └── db/                # Drizzle ORM + PostgreSQL Schema
└── pnpm-workspace.yaml
```

---

## Setup

### Voraussetzungen
- Node.js 24+
- pnpm
- PostgreSQL (Replit liefert eine integrierte DB)

### Installation

```bash
# Abhängigkeiten installieren
pnpm install

# Datenbank-Schema pushen
pnpm --filter @workspace/db run push

# API-Schemas neu generieren (OpenAPI -> Zod)
pnpm --filter @workspace/api-spec run codegen
```

### Development

```bash
# API-Server starten (Port 8080)
pnpm --filter @workspace/api-server run dev

# Frontend starten (Port 23941)
pnpm --filter @workspace/centofai run dev
```

### Build

```bash
# Typecheck über alle Pakete
pnpm run typecheck

# Production Build
pnpm --filter @workspace/centofai run build
pnpm --filter @workspace/api-server run build
```

---

## Umgebungsvariablen

Das Backend benötigt folgende Umgebungsvariablen:

| Variable | Beschreibung | Beispiel |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL Connection String | `postgres://user:pass@host:5432/db` |
| `SMTP_HOST` | SMTP-Server | `mail.infomaniak.com` |
| `SMTP_PORT` | SMTP-Port | `587` |
| `SMTP_USER` | E-Mail-Adresse | `info@centofai.com` |
| `SMTP_PASS` | E-Mail-Passwort | `dein-passwort` |
| `SESSION_SECRET` | Session-Verschlüsselung | (automatisch in Replit) |

---

## API-Endpunkte

| Methode | Endpunkt | Beschreibung |
|---------|----------|--------------|
| GET | `/api/healthz` | Health Check |
| POST | `/api/proposals` | Projekt-Vorschlag einreichen |

---

## Deployment

### Infomaniak Webhosting

1. **DNS-Einträge** setzen:
   - A-Record `@` → `128.65.195.180`
   - A-Record `www` → `128.65.195.180`

2. **Frontend** bauen (`pnpm --filter @workspace/centofai run build`) und den `dist/public/`-Ordner auf den Webspace hochladen.

3. **Backend** (optional): Auf einem separaten Server mit Node.js betreiben oder einen Serverless-Ansatz wählen.

---

## Lizenz

© 2025 CentofAi. Alle Rechte vorbehalten.
