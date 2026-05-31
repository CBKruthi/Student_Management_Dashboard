---
name: Verification & Final Deliverables
description: Generate API documentation (Postman collection) and prepare final project instructions.
dependencies: [6-student-forms]
wave: 1
autonomous: true
files_modified:
  - postman_collection.json
  - README.md
---

## Objective
Finalize the Student Management Portal by creating standard deliverables for API testing and updating the root repository documentation to provide clear startup instructions.

## Context
- **Deliverables Required:** A Postman collection for the REST APIs.
- **Documentation:** The root `README.md` should explain the tech stack, how to run the project, and how the automatic `studentId` generation works.

## Tasks

<task>
<action>
Create `postman_collection.json` in the root directory.
Define the following REST endpoints assuming `http://localhost:5000/api`:
1. `POST /auth/login` (Body: email, password)
2. `GET /students` (Headers: Authorization Bearer)
3. `POST /students` (Body: fullName, emailId, phoneNumber, courseName, department, address)
4. `PUT /students/:id`
5. `DELETE /students/:id`
Include a collection variable for `{{token}}` to make it easy to test protected routes.
</action>
<read_first>
- backend/routes/studentRoutes.js
</read_first>
<acceptance_criteria>
- Postman collection is valid JSON and imports cleanly into Postman.
</acceptance_criteria>
</task>

<task>
<action>
Update the root `README.md`.
Include:
- Project title and description.
- Tech Stack (MERN, TailwindCSS, Vite).
- Setup Instructions (npm install, environment variables, seeding the admin, npm run dev).
- Key features (JWT Auth, auto-incrementing IDs, search, toaster notifications).
</action>
<read_first>
- .planning/PROJECT.md
</read_first>
<acceptance_criteria>
- README is comprehensive, clean, and uses standard markdown formatting.
</acceptance_criteria>
</task>

## Verification
1. Open `postman_collection.json` to ensure syntax is correct.
2. Read `README.md` to ensure it serves as a robust hand-off document.
