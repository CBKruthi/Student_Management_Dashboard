---
name: Admin Registration Flow
description: Build the backend API and frontend UI for new administrator signup.
dependencies: [8-advanced-db]
wave: 1
autonomous: true
files_modified:
  - backend/controllers/authController.js
  - backend/routes/authRoutes.js
  - frontend/src/pages/Signup.jsx
  - frontend/src/context/AuthContext.jsx
  - frontend/src/App.jsx
---

## Objective
Implement a secure Admin Registration flow so new administrators can be created without running the CLI seeder.

## Context
- **Aesthetic Direction:** Vercel Light Mode.

## Tasks

<task>
<action>
Modify `backend/controllers/authController.js` to add `registerAdmin`. It should hash the password, save the new `Admin`, and return a JWT token.
Update `backend/routes/authRoutes.js` to mount `POST /register`.
</action>
<read_first>
- backend/routes/authRoutes.js
</read_first>
<acceptance_criteria>
- Backend accepts new registrations.
</acceptance_criteria>
</task>

<task>
<action>
Update `frontend/src/context/AuthContext.jsx` to include a `signup(name, email, password)` method that calls `POST /api/auth/register`.
</action>
<read_first>
- frontend/src/context/AuthContext.jsx
</read_first>
<acceptance_criteria>
- Frontend logic handles signup successfully.
</acceptance_criteria>
</task>

<task>
<action>
Create `frontend/src/pages/Signup.jsx`. Use Vercel's stark, clean layout style. Link it back to the Login page.
Update `Login.jsx` to include a "Don't have an account? Sign up" link.
Add the `/signup` route to `App.jsx`.
</action>
<read_first>
- frontend/src/pages/Login.jsx
</read_first>
<acceptance_criteria>
- UI works seamlessly for registration.
</acceptance_criteria>
</task>
