# Student Admin Portal

A full-stack, responsive web application designed for administrators to securely manage student records. Built on the MERN stack with a focus on modern aesthetic design, strict data validation, and robust backend architecture.

## 🚀 Key Features

- **JWT Authentication:** Secure admin login using `jsonwebtoken` and `bcrypt`.
- **Auto-Incrementing IDs:** The backend automatically generates and assigns unique `STU-xxxx` identifiers to every new student.
- **RESTful API:** Complete CRUD endpoints for managing student data.
- **Dynamic Search:** Text-indexed MongoDB fields allow for instant searching by Student ID or Name.
- **Premium UI:** Built with Vite and TailwindCSS v4, featuring a minimalist light-mode design, glassmorphism elements, and `sonner` toast notifications.

---

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express**
- **MongoDB** (Atlas) & **Mongoose**
- **JWT** (Authentication)
- **Bcrypt** (Password Hashing)

### Frontend
- **React** (via Vite)
- **TailwindCSS v4**
- **Axios** (HTTP Client with Interceptors)
- **Lucide-React** (Icons)
- **Sonner** (Premium Toast Notifications)
- **React Router v6**

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- Node.js (v18+)
- A MongoDB Atlas account (or local MongoDB server)

### 2. Clone and Install
This project is configured as an NPM Workspace Monorepo. You can install all dependencies for both the backend and frontend simultaneously from the root directory:

```bash
# Clone the repository
git clone <your-repo-url>
cd student_admin

# Install all workspace dependencies
npm install
```

### 3. Environment Variables
Create a `.env` file inside the `backend` directory with the following variables:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=<appName>
JWT_SECRET=your_super_secret_jwt_key
```

### 4. Seed the Database
To create the initial Admin user required to log in, run the seed script:
```bash
npm run seed -w backend
```
*(This will generate an admin with email: `admin@example.com` and password: `password123`)*

### 5. Run the Application
Start both the backend server and frontend Vite development server concurrently using Turborepo:

```bash
# Run from the root directory
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api

---

## 🧪 Testing the API

A `postman_collection.json` file is included in the root directory. 
1. Import it into Postman.
2. Run the **Login Admin** request to retrieve a JWT token.
3. Edit the Postman collection variables to set `{{token}}` to your JWT.
4. You can now test all protected Student CRUD endpoints!
