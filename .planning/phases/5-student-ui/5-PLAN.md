---
name: Student Management UI (CRUD)
description: Build the core Dashboard, Sidebar layout, Student Table, and Add/Edit Modal.
dependencies: [4-frontend-auth]
wave: 1
autonomous: true
files_modified:
  - frontend/src/components/Sidebar.jsx
  - frontend/src/components/StudentTable.jsx
  - frontend/src/components/StudentFormModal.jsx
  - frontend/src/pages/Dashboard.jsx
  - frontend/src/components/ProtectedRoute.jsx
---

## Objective
Replace the Dashboard placeholder with a fully functional UI to interact with the backend Student APIs. Implement a Layout shell (Sidebar), a Search bar, a Data Table, and a Slide-over/Modal for creating and updating student records.

## Context
- **Aesthetic:** Minimalist Light Mode (TailwindCSS v4), matching the Login screen.
- **HTTP Client:** Axios instance from Phase 4.

## Tasks

<task>
<action>
Create `frontend/src/components/Sidebar.jsx`. Build a responsive sidebar or top-nav containing branding, a "Dashboard" link, and a "Log Out" button that triggers `logout()` from `AuthContext`.
Modify `frontend/src/components/ProtectedRoute.jsx` to wrap the `<Outlet />` inside a flex container next to the Sidebar, creating the global application shell for authenticated users.
</action>
<read_first>
- frontend/src/components/ProtectedRoute.jsx
</read_first>
<acceptance_criteria>
- Authenticated pages inherit the Sidebar automatically.
- Logout functionality works and redirects to `/login`.
</acceptance_criteria>
</task>

<task>
<action>
Create `frontend/src/components/StudentFormModal.jsx`. This component receives `isOpen`, `onClose`, `initialData` (for edits), and `onSubmit`.
It should contain inputs for `fullName`, `emailId`, `phoneNumber`, `courseName`, `department`, and `address`. Use Tailwind to style the form luxuriously (focus rings, clean labels).
</action>
<read_first>
- frontend/src/pages/Login.jsx
</read_first>
<acceptance_criteria>
- Modal is fully responsive.
- Form fields reset when modal closes.
</acceptance_criteria>
</task>

<task>
<action>
Create `frontend/src/components/StudentTable.jsx`. This component receives an array of `students`, an `onEdit` callback, and an `onDelete` callback.
Render a modern HTML table with sticky headers, subtle row hover states (`hover:bg-slate-50`), and Action icons (Lucide-react Edit and Trash icons).
</action>
<read_first>
- frontend/src/components/StudentFormModal.jsx
</read_first>
<acceptance_criteria>
- Table looks premium and handles empty states gracefully.
</acceptance_criteria>
</task>

<task>
<action>
Create `frontend/src/pages/Dashboard.jsx`.
1. Use `useState` for `students`, `searchKeyword`, `isModalOpen`, `editingStudent`, and `loading`.
2. Use `useEffect` and `api.get('/students?keyword=...')` to fetch data from the backend.
3. Build a top bar containing the Search Input and an "Add Student" button.
4. Integrate `StudentTable` and pass data down.
5. Integrate `StudentFormModal`. On submit, call `api.post` or `api.put` based on whether it's an edit, then close the modal and refresh the list.
6. Implement delete logic connecting to `api.delete`.
Modify `frontend/src/App.jsx` to render `<Dashboard />` instead of the placeholder text inside the ProtectedRoute.
</action>
<read_first>
- frontend/src/App.jsx
</read_first>
<acceptance_criteria>
- End-to-end CRUD functionality works perfectly from the UI.
- Search queries update the table live.
</acceptance_criteria>
</task>

## Verification
1. Open the UI, log in, and ensure the Sidebar appears.
2. Click "Add Student", fill out the form, and verify the student appears in the table with an auto-generated `STU-xxxx` ID.
3. Test searching by name or ID.
4. Test editing and deleting a row.
