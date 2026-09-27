# Smart Job Application Tracker

A full-stack job application tracker built with React, Node.js, Express and MongoDB.

## Features
- Add, edit and delete applications
- Track Saved, Applied, Assessment, Interview, Offer and Rejected stages
- Dashboard statistics and success rate
- Search by company, role or location
- Filter by application status
- Track salary, dates, job URL and notes
- Responsive UI

## Stack
React + Vite · Node.js · Express · MongoDB · Mongoose · Lucide React

## Run
Requirements: Node.js 18+ and MongoDB.

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
Backend: http://localhost:5000

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend: http://localhost:5173

## API
GET `/api/applications`
GET `/api/applications/stats`
POST `/api/applications`
PUT `/api/applications/:id`
DELETE `/api/applications/:id`

## Roadmap
JWT authentication · Resume parsing · Job-description skill matching · Email reminders · Interview calendar · AI recommendations · Docker · AWS deployment

## Resume bullet
**Smart Job Application Tracker** — Developed a full-stack application using React, Node.js, Express, and MongoDB to manage job applications, track recruitment stages, and visualize application metrics through a responsive dashboard. Implemented RESTful APIs, MongoDB data modeling, search/filter functionality, and application lifecycle management.
