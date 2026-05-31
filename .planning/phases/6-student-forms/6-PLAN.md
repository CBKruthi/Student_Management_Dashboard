---
name: Frontend Student Management Forms
description: Enhance the forms with rich client-side validation and add premium toast notifications.
dependencies: [5-student-ui]
wave: 1
autonomous: true
files_modified:
  - frontend/package.json
  - frontend/src/components/StudentFormModal.jsx
  - frontend/src/pages/Dashboard.jsx
  - frontend/src/App.jsx
---

## Objective
Elevate the Add/Edit student forms by implementing rich client-side validation logic and integrating premium toast notifications (`sonner`) to replace native browser alerts.

## Context
- **Validation:** Enforce strict checks on email patterns and phone number lengths before allowing API submission.
- **Notifications:** Use `sonner` for sleek, modern, non-blocking success/error toasts.

## Tasks

<task>
<action>
Install `sonner` in the frontend workspace (`npm install sonner -w frontend`).
</action>
<read_first>
- frontend/package.json
</read_first>
<acceptance_criteria>
- `sonner` is listed in `package.json`.
</acceptance_criteria>
</task>

<task>
<action>
Modify `frontend/src/App.jsx` to import `{ Toaster }` from `'sonner'` and place `<Toaster position="top-right" richColors />` inside the component tree.
</action>
<read_first>
- frontend/src/App.jsx
</read_first>
<acceptance_criteria>
- Toaster is globally available across the application.
</acceptance_criteria>
</task>

<task>
<action>
Refactor `frontend/src/components/StudentFormModal.jsx` to include an `errors` state object.
On `handleSubmit`, validate:
- `emailId` matches a valid email regex.
- `phoneNumber` is at least 10 digits.
- All fields are non-empty.
If validation fails, display inline red error messages below the respective inputs and prevent submission.
</action>
<read_first>
- frontend/src/components/StudentFormModal.jsx
</read_first>
<acceptance_criteria>
- Form strictly prevents invalid data from reaching the backend.
- UI displays clear validation feedback.
</acceptance_criteria>
</task>

<task>
<action>
Refactor `frontend/src/pages/Dashboard.jsx` to import `toast` from `'sonner'`.
Replace all `console.error` and native `alert()` calls with `toast.error()`.
Add `toast.success()` calls when a student is successfully created, updated, or deleted.
</action>
<read_first>
- frontend/src/pages/Dashboard.jsx
</read_first>
<acceptance_criteria>
- Premium toast notifications appear upon CRUD operations.
</acceptance_criteria>
</task>

## Verification
1. Click "Add Student" and try submitting empty or invalid data to verify inline errors.
2. Submit a valid student and verify the green success toast pops up.
3. Delete a student and verify the deletion toast pops up.
