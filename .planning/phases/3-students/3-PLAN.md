---
name: Backend Student APIs
description: Build the core protected REST APIs for managing students with auto-incrementing IDs and text search.
dependencies: [2-authentication]
wave: 1
autonomous: true
files_modified:
  - backend/models/Counter.js
  - backend/models/Student.js
  - backend/controllers/studentController.js
  - backend/routes/studentRoutes.js
  - backend/server.js
---

## Objective
Implement full CRUD operations for the `Student` entity. Ensure all routes are protected by the JWT middleware, auto-generate sequential `STU-xxxx` IDs, and support advanced text-based searching.

## Context
- **Student ID Strategy:** Auto-generated Sequential IDs via a Counter collection.
- **Search Strategy:** MongoDB `$text` search indexing on `studentId` and `fullName`.

## Tasks

<task>
<action>
Create `backend/models/Counter.js`. Define a schema with `_id` (String) and `seq` (Number). This will track the sequence number for auto-generating Student IDs.
</action>
<read_first>
- .planning/phases/3-students/3-CONTEXT.md
</read_first>
<acceptance_criteria>
- Counter model is exported and ready to use in pre-save hooks.
</acceptance_criteria>
</task>

<task>
<action>
Create `backend/models/Student.js`. Define the schema with `studentId` (String, unique), `fullName` (String, required), `emailId` (String, required, match email regex), `phoneNumber` (String, required), `courseName` (String, required), `department` (String, required), and `address` (String, required).
Add a text index: `studentSchema.index({ studentId: 'text', fullName: 'text' })`.
Add a `pre('save')` hook that checks if `isNew`. If so, it finds/updates the 'studentId' document in the `Counter` collection, increments the sequence, and assigns `STU-${seq}` to `this.studentId`.
</action>
<read_first>
- backend/models/Counter.js
</read_first>
<acceptance_criteria>
- Text indexes are applied.
- `STU-XXXX` is correctly generated on save.
</acceptance_criteria>
</task>

<task>
<action>
Create `backend/controllers/studentController.js`.
Implement `getStudents`: Check for `req.query.keyword`. If present, use `$text: { $search: keyword }`. Return results.
Implement `getStudentById`: `findById(req.params.id)`.
Implement `addStudent`: Create a new student from `req.body`.
Implement `updateStudent`: Find by ID and update fields from `req.body`.
Implement `deleteStudent`: Find by ID and delete.
All responses should handle 404s (not found) and 500s (server error).
</action>
<read_first>
- backend/models/Student.js
</read_first>
<acceptance_criteria>
- All 5 CRUD operations export successfully.
- Search queries execute correctly against the text index.
</acceptance_criteria>
</task>

<task>
<action>
Create `backend/routes/studentRoutes.js`. Import `protect` middleware from `authMiddleware.js`.
Map:
`router.route('/').get(protect, getStudents).post(protect, addStudent)`
`router.route('/:id').get(protect, getStudentById).put(protect, updateStudent).delete(protect, deleteStudent)`
Modify `backend/server.js` to mount `app.use('/api/students', studentRoutes)`.
</action>
<read_first>
- backend/server.js
</read_first>
<acceptance_criteria>
- Routes are protected and mounted at `/api/students`.
</acceptance_criteria>
</task>

## Verification
1. I will inspect the code for correctness.
2. The user can verify the protected nature of the endpoints by hitting them via Postman with and without the Bearer token acquired in Phase 2.
