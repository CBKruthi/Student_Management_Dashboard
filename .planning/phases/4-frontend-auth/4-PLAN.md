---
name: Frontend Setup & Authentication UI
description: Establish React Router, Context API, Axios, and build the premium Login interface.
dependencies: [3-students]
wave: 1
autonomous: true
files_modified:
  - frontend/package.json
  - frontend/src/context/AuthContext.jsx
  - frontend/src/api/axios.js
  - frontend/src/pages/Login.jsx
  - frontend/src/components/ProtectedRoute.jsx
  - frontend/src/App.jsx
  - frontend/src/main.jsx
---

## Objective
Scaffold the frontend architecture using React Router v6/7, Context API, and Axios. Build a beautiful, responsive, and minimalist light-mode Login screen that interacts with the backend auth API.

## Context
- **UI Theme:** Minimalist Light Mode (TailwindCSS v4)
- **State Management:** React Context API
- **HTTP Client:** Axios with Interceptors

## Tasks

<task>
<action>
Install frontend dependencies: `react-router-dom`, `axios`, and `lucide-react`.
</action>
<read_first>
- .planning/phases/4-frontend-auth/4-CONTEXT.md
</read_first>
<acceptance_criteria>
- Dependencies are added to `frontend/package.json`.
</acceptance_criteria>
</task>

<task>
<action>
Create `frontend/src/api/axios.js`. Configure an Axios instance with `baseURL: '/api'`. Add a request interceptor that reads `adminInfo` from `localStorage` and appends it to `req.headers.Authorization` as a Bearer token.
</action>
<read_first>
- frontend/src/api/axios.js
</read_first>
<acceptance_criteria>
- Axios instance is exported.
- Interceptor safely adds token if it exists.
</acceptance_criteria>
</task>

<task>
<action>
Create `frontend/src/context/AuthContext.jsx`. Initialize context to read `adminInfo` from `localStorage`. Provide a `login` function (calls `axios.post('/auth/login')`, updates state, sets `localStorage`) and a `logout` function (clears state and storage). Export the provider and a custom `useAuth` hook.
Wrap the `<App />` in `AuthContext.Provider` inside `main.jsx`.
</action>
<read_first>
- frontend/src/api/axios.js
</read_first>
<acceptance_criteria>
- Global auth state is accessible via `useAuth()`.
</acceptance_criteria>
</task>

<task>
<action>
Create `frontend/src/pages/Login.jsx`. Implement a "Premium Minimalist Light Mode" design using Tailwind. It should have a centered card, subtle shadows, rounded inputs with focus rings, and an accent-colored submit button. Use `useAuth().login`. Handle loading states and display error messages natively in the UI.
</action>
<read_first>
- frontend/src/context/AuthContext.jsx
</read_first>
<acceptance_criteria>
- Login page is visually stunning.
- Successfully logs in the user and redirects them.
</acceptance_criteria>
</task>

<task>
<action>
Create `frontend/src/components/ProtectedRoute.jsx`. It should check `adminInfo` from `useAuth`. If not present, redirect to `/login` using `<Navigate to="/login" replace />`. If present, render `<Outlet />`.
</action>
<read_first>
- frontend/src/context/AuthContext.jsx
</read_first>
<acceptance_criteria>
- Protected routes enforce authentication.
</acceptance_criteria>
</task>

<task>
<action>
Modify `frontend/src/App.jsx`. Setup `BrowserRouter` and `Routes`. Create a public route `/login` serving `Login.jsx`. Create a route `/` wrapped in `ProtectedRoute`, rendering a temporary placeholder `<div>Dashboard</div>`.
</action>
<read_first>
- frontend/src/components/ProtectedRoute.jsx
</read_first>
<acceptance_criteria>
- Routing correctly handles public vs protected access.
</acceptance_criteria>
</task>

## Verification
1. I will ensure no syntax errors exist in the React code.
2. The user will open `http://localhost:5173` and see the Login page.
3. The user will log in with `admin@example.com` / `password123` and be redirected to the Dashboard placeholder.
