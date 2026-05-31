<div align="center">
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue" alt="Framer Motion" />
</div>

<h1 align="center">Student Management Dashboard</h1>

<p align="center">
  A high-performance, full-stack academic management portal built on the MERN stack. Designed with a brutalist, Apple-esque aesthetic to securely manage complex academic taxonomies and thousands of student records at scale.
</p>

---

## ✨ Features

- **🛡️ Secure Authentication:** Bulletproof JWT implementation with strict global Axios interceptors and bcrypt password hashing. Session state is seamlessly preserved.
- **🏛️ 3-Tier Academic Taxonomy:** A dynamic `Category ➝ Program ➝ Course` cascading hierarchy managed through a beautiful macOS Finder-style Miller Columns layout.
- **📊 Real-time Analytics:** Interactive pie and bar charts powered by `Recharts` providing instant insights into student distributions across your programs.
- **🎬 Fluid Animations:** `Framer Motion` powered page transitions, sliding layouts, and ambient breathing orbs on authentication screens.
- **🪪 Automated ID Generation:** The backend seamlessly generates and validates unique `STU-xxxx` identifiers for all new students.
- **⚡ Lightning Fast Search:** MongoDB `$regex` optimized querying allows for instant, case-insensitive partial matching across Names, Emails, and IDs.

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 19 + Vite
- **Styling:** TailwindCSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Data Vis:** Recharts
- **Notifications:** Sonner
- **Routing:** React Router v7

### Backend
- **Core:** Node.js + Express
- **Database:** MongoDB Atlas + Mongoose
- **Auth:** JSON Web Tokens (JWT) + Bcryptjs
- **Architecture:** Modular MVC routing

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas cluster URL (or local MongoDB daemon)

### 2. Installation
This repository is configured as an NPM Workspace Monorepo. You can install all dependencies for both the frontend and backend with a single command from the root directory.

```bash
# Clone the repository
git clone https://github.com/CBKruthi/Student_Management_Dashboard.git
cd Student_Management_Dashboard

# Install all workspace dependencies
npm install
```

### 3. Environment Configuration
Create a `.env` file inside the `backend/` directory with the following variables:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=<appName>
JWT_SECRET=your_super_secret_jwt_key
```

### 4. Database Seeding (Crucial)
Before logging in, you must initialize the 3-tier academic taxonomy (Categories, Programs, Courses) and generate an admin user. Run the integrated seeder:

```bash
npm run seed -w backend
```
> **Note:** The seeder automatically creates an Admin account with:
> - **Email:** `admin@example.com`
> - **Password:** `password123`

### 5. Start the Application
Boot up both the backend API and the Vite frontend simultaneously:

```bash
# Run from the root directory
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api

---

## 📂 Project Architecture

```text
Student_Management_Dashboard/
├── backend/
│   ├── config/       # Database & Environment Configuration
│   ├── controllers/  # Route logic (Auth, Students, Academic, Analytics)
│   ├── models/       # Mongoose Schemas (Student, Category, Program, Course)
│   ├── routes/       # Express Router definitions
│   └── seeder.js     # DB wipe & initialization script
├── frontend/
│   ├── src/
│   │   ├── api/      # Axios instance with Auth interceptors
│   │   ├── components/ # Reusable UI (Sidebar, Modals, Tables)
│   │   ├── context/  # React Context (AuthContext)
│   │   └── pages/    # Major views (Auth, Overview, Dashboard, AcademicStructure)
└── package.json      # Monorepo Workspace Configuration
```

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).
