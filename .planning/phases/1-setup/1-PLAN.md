---
name: Project Setup & Database Configuration
description: Initialize the monorepo structure with backend (Node/Express), frontend (React/Vite with TailwindCSS), and establish MongoDB connection.
dependencies: []
wave: 1
autonomous: true
files_modified:
  - package.json
  - backend/package.json
  - backend/server.js
  - backend/config/db.js
  - frontend/package.json
  - frontend/tailwind.config.js
  - frontend/src/index.css
  - .env
---

## Objective
Initialize the MERN stack monorepo, set up TailwindCSS for the frontend, and configure the MongoDB connection using environment variables.

## Context
- **Codebase Structure:** Unified Monorepo (Root package.json runs both apps concurrently)
- **Styling Architecture:** TailwindCSS (Premium UI, utility classes)
- **Database Connection:** Environment Driven (.env config)

## Tasks

<task>
<action>
Initialize the root monorepo directory. Create a root `package.json` with `concurrently` installed as a dev dependency. Add scripts `start`, `dev`, `install:all` that execute commands in both `frontend` and `backend` directories.
</action>
<read_first>
- .planning/phases/1-setup/1-CONTEXT.md
</read_first>
<acceptance_criteria>
- root package.json exists
- root package.json has 'concurrently' in devDependencies
- root package.json has a 'dev' script combining frontend and backend execution
</acceptance_criteria>
</task>

<task>
<action>
Scaffold the Node.js Express backend. Create the `backend/` directory, initialize `package.json`, and install `express`, `mongoose`, `dotenv`, and `cors`. Create `backend/server.js` with basic Express setup listening on port 5000. Create `backend/config/db.js` with a connection function using Mongoose and `process.env.MONGO_URI`.
</action>
<read_first>
- backend/package.json (if exists)
</read_first>
<acceptance_criteria>
- backend/package.json exists with express and mongoose dependencies
- backend/server.js starts an Express server
- backend/config/db.js exports a function that connects to MongoDB using MONGO_URI
</acceptance_criteria>
</task>

<task>
<action>
Scaffold the React frontend. Run `npx -y create-vite@latest frontend --template react` (or equivalent structure). Install TailwindCSS (`tailwindcss postcss autoprefixer`) and initialize `tailwind.config.js`. Configure `frontend/src/index.css` with the 3 Tailwind directives.
</action>
<read_first>
- frontend/package.json (if exists)
</read_first>
<acceptance_criteria>
- frontend/package.json exists with react and tailwindcss dependencies
- frontend/tailwind.config.js is properly configured to scan src/**/*.{js,jsx}
- frontend/src/index.css contains @tailwind base; @tailwind components; @tailwind utilities;
</acceptance_criteria>
</task>

<task>
<action>
Create `.env` and `.env.example` in the root (or backend). Add `MONGO_URI`, `PORT=5000`. Add `/node_modules`, `/.env` to `.gitignore`.
</action>
<read_first>
- .gitignore (if exists)
</read_first>
<acceptance_criteria>
- .env.example contains MONGO_URI placeholder
- .gitignore includes node_modules and .env
</acceptance_criteria>
</task>

## Verification
1. Run `npm install` in root, backend, and frontend.
2. Ensure `.env` is populated with a valid MongoDB URI.
3. Run `npm run dev` in the root.
4. Verify Express server runs on port 5000 and connects to MongoDB.
5. Verify Vite server runs on port 5173.
6. Verify Tailwind classes (e.g., `bg-blue-500`) apply correctly in `frontend/src/App.jsx`.
