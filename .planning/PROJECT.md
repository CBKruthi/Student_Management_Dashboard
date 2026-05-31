# Student Management Portal

## What This Is

A responsive, full-stack web application built on the MERN stack (MongoDB, Express, React, Node.js) that allows administrators to efficiently and securely manage student records. It provides a centralized dashboard to add, view, update, delete, and search for students.

## Core Value

Secure, reliable, and intuitive management of student data with zero data loss and strict validation.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->
(None yet — ship to validate)

### Active

<!-- Current scope. Building toward these. -->
- [ ] Implement Admin Authentication (Login with username/password, invalid credentials error)
- [ ] Build Student Management API (CRUD operations for Student records)
- [ ] Develop Frontend Dashboard (Responsive UI for Admin Dashboard and Student List)
- [ ] Implement Add/Update Student Form (With validation for mandatory fields, email, phone)
- [ ] Add Search Functionality (Search by Student ID or Name)
- [ ] Connect and structure MongoDB database with appropriate schema constraints

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->
- [Student Self-Service Portal] — The requirements specify an Admin-only portal; student logins are unnecessary for this initial release.
- [Complex Role-Based Access Control] — A single Admin role is sufficient based on the current requirements.
- [Email/SMS Notifications] — Not requested in the evaluation criteria.

## Context

- **Tech Stack Pivot**: Originally scoped for Java Full Stack (Spring Boot/Hibernate), pivoted to MERN stack (MongoDB, Express, React, Node.js).
- **Aesthetics**: Needs to maintain a rich, modern, and premium design language with smooth gradients, glassmorphism, and responsive behavior (using Vanilla CSS).
- **Evaluation Criteria**: Evaluated on Code Quality, UI Design, API Functionality, Database Design, Error Handling, and Validation. Timeline is 2 days.

## Constraints

- **Tech Stack**: Must use MongoDB, Express, React, and Node.js. — Explicitly requested pivot by the user.
- **Database**: Must use proper primary keys, constraints, and data types (via Mongoose schemas). — To ensure data integrity.
- **UI Design**: Must look premium, dynamic, and rich. — Required by web application development guidelines.
- **Timeline**: Must be complete within 2 days. — Explicit user deadline.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use JWT for Authentication | Standard stateless authentication mechanism in MERN apps, perfect for single-admin setups. | — Pending |
| Vite for React frontend | Faster dev server and build times compared to Create React App. | — Pending |
| Vanilla CSS Modules | Enforces component-level scoping while meeting the "Vanilla CSS unless explicitly requested otherwise" rule. | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-01 after initialization*
