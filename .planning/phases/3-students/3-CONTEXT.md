# Phase 3 Context: Backend Student APIs

## Locked Decisions
These architectural decisions are final for this phase and should be used by the planner and executor without asking the user.

- **Student ID Strategy:** Auto-generated Sequential IDs (Option B). The backend will generate unique IDs like 'STU-1001' when a new student is added. This requires a separate Counter collection or a reliable pre-save hook to increment the IDs.
- **Search Strategy:** Advanced MongoDB Text Search Indexing (Option B). We will create a text index on the `studentId` and `fullName` fields in the Student schema, allowing for powerful `$text` search queries.

## Open Scope (To be handled by Planning)
- The exact fields to be returned in the student lists vs the detailed student view.
- Paginating the GET endpoint (default 10 or 20 per page) to support large student databases efficiently.

## Out of Scope
- Frontend UI components for displaying students (reserved for Phase 5).
