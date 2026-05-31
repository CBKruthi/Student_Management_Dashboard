# Phase 4 Context: Frontend Setup & Authentication UI

## Locked Decisions
These architectural decisions are final for this phase and should be used by the planner and executor without asking the user.

- **UI Aesthetic:** Clean Minimalist Light Mode (Option B). The UI will feature crisp white/gray palettes, soft subtle shadows, and vibrant accent colors to create an Apple-esque premium feel.
- **State Management:** React Context API (Option A). We will use a native lightweight AuthContext to store the admin JWT globally.
- **HTTP Client:** Axios (Option A). We will build an Axios interceptor to seamlessly append the Bearer token to all backend requests.

## Open Scope (To be handled by Planning)
- The exact layout of the Dashboard wrapper shell (Sidebar vs Top Navbar).

## Out of Scope
- Actual Student Management screens (reserved for Phase 5). This phase only covers the Login screen and the foundational shell.
