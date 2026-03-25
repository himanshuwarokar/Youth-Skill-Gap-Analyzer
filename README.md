# Youth Skill Gap Analyzer

Full-stack starter project for a Youth Skill Gap Analyzer platform.

## Tech Stack
- Frontend: React + HTML + CSS + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Authentication: JWT

## Features Included
- Home page with full website details
- Light/Dark mode toggle on home page
- Login/Register page
- Forgot password page flow (reset by email + new password)
- Protected user dashboard page (after login)
- User profile save (education, skills, target career, learning mode)
- Roadmap template generation endpoint

## Not Included (By Design)
- ML-based skill-gap scoring/output

You can manually integrate your ML model in backend route:
- `backend/src/routes/roadmapRoutes.js`

## Project Structure
- `frontend/` React app
- `backend/` Express API

## Setup

### 1. Backend
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

### 2. Frontend
Open another terminal:
```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

## API Endpoints
- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `GET /api/profile/me` (auth)
- `POST /api/profile/me` (auth)
- `POST /api/roadmap/generate` (auth, template only)

## Default URLs
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
