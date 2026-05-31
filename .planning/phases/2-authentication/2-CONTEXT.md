# Phase 2 Context: Backend Authentication & Security

## Locked Decisions
These architectural decisions are final for this phase and should be used by the planner and executor without asking the user.

- **Admin Storage Strategy:** Database-Backed (Option B). We will create an `Admin` Mongoose schema with `email` and `password` fields.
- **Password Security:** We will use `bcryptjs` to hash the passwords before saving them to MongoDB.
- **Authentication Token:** `jsonwebtoken` (JWT) will be used. The secret will be stored in `JWT_SECRET` in `.env` with a 30-day expiration (`30d`).
- **Initial Setup:** We will create a one-time seeder script (`backend/seeder.js`) to insert the master admin into the database so we have an account to log in with.

## Open Scope (To be handled by Planning)
- The exact JWT payload structure (usually just `id`).
- The specific HTTP status codes for auth failure (standard 401 Unauthorized is expected).

## Out of Scope
- Registration endpoints for Admins (this is a closed system, admins are seeded manually by the DBA).
- Frontend login UI (reserved for Phase 4).
