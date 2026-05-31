---
name: Advanced Database Architecture & Analytics API
description: Normalize database with Course/Department models and create Analytics API.
dependencies: [7-final-deliverables]
wave: 1
autonomous: true
files_modified:
  - backend/models/Department.js
  - backend/models/Course.js
  - backend/models/Student.js
  - backend/controllers/analyticsController.js
  - backend/routes/analyticsRoutes.js
  - backend/server.js
  - backend/seeder.js
---

## Objective
Normalize the MongoDB architecture by separating strings into `Department` and `Course` collections. Build a powerful Aggregation Pipeline API that powers the future Vercel-style Overview dashboard.

## Context
- **Aesthetic Direction:** Vercel-like Light Mode (flat, crisp 1px borders, structural, stark contrast).
- **Database Rules:** Strict relational modeling using Mongoose `ObjectId` references.

## Tasks

<task>
<action>
Create `backend/models/Department.js` (fields: `name`).
Create `backend/models/Course.js` (fields: `name`, `department` -> ref: 'Department').
Modify `backend/models/Student.js` to change `courseName` and `department` from `String` to `ObjectId` ref targeting the new models.
</action>
<read_first>
- backend/models/Student.js
</read_first>
<acceptance_criteria>
- Strict database normalization applied.
</acceptance_criteria>
</task>

<task>
<action>
Modify `backend/seeder.js` to clear the new collections and seed basic departments (e.g., 'Engineering', 'Science') and courses (e.g., 'B.Tech CSE', 'B.Sc Physics') so the UI dropdowns have data to fetch.
</action>
<read_first>
- backend/seeder.js
</read_first>
<acceptance_criteria>
- Seed script successfully populates reference tables.
</acceptance_criteria>
</task>

<task>
<action>
Create `backend/controllers/analyticsController.js`.
Implement `getDashboardSummary` which uses MongoDB aggregations to return:
- `totalStudents`
- `departmentDistribution` (e.g., [{ _id: 'Engineering', count: 15 }])
- `recentStudents` (last 5 added)
Create `backend/routes/analyticsRoutes.js` and mount it to `/api/analytics` in `server.js` (protected by JWT).
</action>
<read_first>
- backend/server.js
</read_first>
<acceptance_criteria>
- Analytics API returns the exact structure needed for charting.
</acceptance_criteria>
</task>

## Verification
1. Run `npm run seed` and ensure it doesn't fail.
2. Hit `/api/analytics/summary` using Postman and verify the JSON output.
