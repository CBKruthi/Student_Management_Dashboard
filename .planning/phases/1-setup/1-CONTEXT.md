# Phase 1: Project Setup & Database Configuration

## Domain
Foundational setup (Scaffolding, Build tooling, DB connection strategy).

## Decisions Captured

### Codebase Structure
- **Unified Monorepo:** We will use one root `package.json` utilizing `concurrently` to run both the Node/Express backend and React/Vite frontend easily with a single command.

### Styling Architecture
- **TailwindCSS:** We will override the default vanilla CSS guidelines and introduce TailwindCSS. This allows for faster development while still achieving the rich, premium, and dynamic UI requirements.

### Database Connection
- **Environment Driven:** We will use standard `.env` configuration, allowing for either a local MongoDB URI or a cloud MongoDB Atlas connection string depending on your environment.

## Canonical Refs
- `.planning/ROADMAP.md`
- `.planning/PROJECT.md`
