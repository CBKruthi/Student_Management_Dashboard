---
name: Premium UI Overhaul & Analytics Dashboard
description: Upgrade the entire application aesthetic to Vercel Light Mode and build the analytics dashboard.
dependencies: [8-advanced-db, 9-admin-registration]
wave: 1
autonomous: true
files_modified:
  - frontend/package.json
  - frontend/index.html
  - frontend/src/index.css
  - frontend/src/components/Sidebar.jsx
  - frontend/src/pages/Overview.jsx
  - frontend/src/pages/Dashboard.jsx
  - frontend/src/App.jsx
---

## Objective
Revamp the application's visual identity to reflect a highly structured, flat "Vercel-like" Light Mode. Add expanded Sidebar menus and a dedicated `Overview.jsx` Analytics Dashboard using `recharts`.

## Context
- **Aesthetic Direction:** Vercel Light Mode. Sharp corners or highly precise rounded corners (e.g. `rounded-md`), stark `#000` text on `#fff` backgrounds, crisp `1px border-slate-200`, flat design with no glassmorphism or deep shadows. Tiny, geometric typography (Inter/Geist).

## Tasks

<task>
<action>
Install `recharts` in the frontend (`npm install recharts -w frontend`).
Update `frontend/index.html` and `frontend/src/index.css` to import the `Inter` font from Google Fonts and apply it globally.
</action>
<read_first>
- frontend/index.html
</read_first>
<acceptance_criteria>
- Typography is upgraded.
</acceptance_criteria>
</task>

<task>
<action>
Create `frontend/src/pages/Overview.jsx`. Fetch data from `/api/analytics/summary`.
Render a clean grid of KPI cards (Total Students, Total Departments).
Render a `PieChart` or `BarChart` from `recharts` showing student distribution by department.
</action>
<read_first>
- frontend/src/pages/Dashboard.jsx
</read_first>
<acceptance_criteria>
- Dashboard visually represents the API data perfectly.
</acceptance_criteria>
</task>

<task>
<action>
Refactor `Sidebar.jsx`, `StudentTable.jsx`, `StudentFormModal.jsx`, `Login.jsx` and `Signup.jsx` to remove all heavy shadows (`shadow-xl`) and glassmorphism. Replace with Vercel's flat UI: `border border-slate-200 bg-white`, stark contrasts, and minimal padding.
Expand `Sidebar.jsx` to include links to `/` (Overview) and `/students` (the CRUD table).
</action>
<read_first>
- frontend/src/components/Sidebar.jsx
</read_first>
<acceptance_criteria>
- The entire app feels cohesive and identical to a high-end Silicon Valley dashboard.
</acceptance_criteria>
</task>
