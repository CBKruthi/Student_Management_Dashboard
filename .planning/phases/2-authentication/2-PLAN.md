---
name: Backend Authentication & Security
description: Implement the Admin authentication system using JWT and a database-backed Admin schema.
dependencies: []
wave: 1
autonomous: true
files_modified:
  - backend/package.json
  - backend/server.js
  - backend/models/Admin.js
  - backend/controllers/authController.js
  - backend/routes/authRoutes.js
  - backend/middleware/authMiddleware.js
  - backend/seeder.js
  - .env
---

## Objective
Implement secure login for administrators using JWT. Only admins can modify or view student records, so the authentication layer must be robust.

## Context
- **Admin Storage Strategy:** Database-Backed (Admin schema with email/password).
- **Password Security:** `bcryptjs` hashing.
- **Token:** `jsonwebtoken` (JWT).

## Tasks

<task>
<action>
Install backend dependencies `jsonwebtoken` and `bcryptjs`. Also add `JWT_SECRET=supersecret123` to the root `.env` and `.env.example`.
</action>
<read_first>
- .planning/phases/2-authentication/2-CONTEXT.md
</read_first>
<acceptance_criteria>
- package.json in backend contains jsonwebtoken and bcryptjs.
- .env has JWT_SECRET.
</acceptance_criteria>
</task>

<task>
<action>
Create `backend/models/Admin.js`. Define a Mongoose schema with `email` (String, required, unique) and `password` (String, required). Add a `pre('save')` hook to hash the password using `bcryptjs` if modified. Add a `matchPassword` method to compare entered passwords with the hash.
</action>
<read_first>
- backend/models/Admin.js
</read_first>
<acceptance_criteria>
- Admin model is exported.
- Passwords are automatically hashed before saving.
</acceptance_criteria>
</task>

<task>
<action>
Create `backend/seeder.js` that connects to MongoDB, deletes any existing admins, and creates a default admin (`admin@example.com`, `password123`). Exit the process after running. Add a `"seed": "node seeder.js"` script to `backend/package.json`.
</action>
<read_first>
- backend/config/db.js
</read_first>
<acceptance_criteria>
- Running `npm run seed --workspace=backend` populates the database with the master admin.
</acceptance_criteria>
</task>

<task>
<action>
Create `backend/utils/generateToken.js` to encapsulate JWT generation (`jwt.sign` with user id, secret, and 30d expiry).
Create `backend/controllers/authController.js` with a `loginAdmin` function. It should accept `email` and `password`, find the admin, check the password, and respond with `{ _id, email, token }` or 401 Unauthorized.
</action>
<read_first>
- backend/models/Admin.js
</read_first>
<acceptance_criteria>
- `loginAdmin` handles valid and invalid credentials correctly.
- A signed JWT is returned on success.
</acceptance_criteria>
</task>

<task>
<action>
Create `backend/routes/authRoutes.js` and map `POST /login` to the `loginAdmin` controller.
Modify `backend/server.js` to import these routes and mount them at `app.use('/api/auth', authRoutes)`.
</action>
<read_first>
- backend/server.js
</read_first>
<acceptance_criteria>
- `/api/auth/login` endpoint is active and testable.
</acceptance_criteria>
</task>

<task>
<action>
Create `backend/middleware/authMiddleware.js`. Export a `protect` function that reads the `Authorization: Bearer <token>` header, verifies the JWT using `JWT_SECRET`, decodes the `id`, and attaches the `Admin` object (excluding password) to `req.admin`. If missing or invalid, return 401.
</action>
<read_first>
- backend/models/Admin.js
</read_first>
<acceptance_criteria>
- Middleware can successfully decode tokens and reject invalid requests.
</acceptance_criteria>
</task>

## Verification
1. Run `npm run seed --workspace=backend` to initialize the database.
2. Send a `POST` request to `http://localhost:5000/api/auth/login` with `admin@example.com` and `password123`.
3. Verify the server returns a JWT.
4. Verify sending a bad password returns a 401 error.
