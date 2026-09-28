# Smart Job Application Tracker

A full-stack web application for managing job applications, tracking application progress, analyzing job descriptions against resume skills, and securely managing user accounts.

## Live Demo

Frontend:
https://smart-job-tracker-steel.vercel.app

Backend API:
https://smart-job-tracker-api-h89q.onrender.com

GitHub:
https://github.com/akashkonduru2-cell/smart-job-tracker

## Features

### Authentication
- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Protected API routes
- Forgot password functionality
- Secure password reset using time-limited tokens
- Password reset emails using Resend

### Job Application Management
- Add job applications
- Edit applications
- Delete applications
- Track application status
- Store company, role, location and salary
- Store job posting URLs
- Add notes
- Track application and interview dates

### Application Tracking
Supported statuses:

- Saved
- Applied
- Assessment
- Interview
- Offer
- Rejected

### Dashboard & Analytics
- Total applications
- Saved applications
- Applied applications
- Assessments
- Interviews
- Offers
- Rejections
- Success rate
- Application status visualization
- Upcoming interviews

### Resume Management
- Upload PDF resume
- Resume text extraction
- Store extracted resume information
- View uploaded resume information
- Delete resume

### Job Description Matching
Paste a job description and compare it against skills extracted from your resume.

The matcher provides:

- Match percentage
- Matched skills
- Missing skills
- Required skills

### Search & Filtering
- Search applications by company
- Search by role
- Search by location
- Filter by application status

### UI
- Responsive React interface
- Dark mode
- Dashboard-based layout
- Interactive charts

## Tech Stack

### Frontend

- React.js
- Vite
- Recharts
- Lucide React
- JavaScript
- CSS

### Backend

- Node.js
- Express.js
- JWT
- bcryptjs
- Multer
- pdf-parse
- Resend

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Deployment

- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database
- Resend — Password reset emails

## Architecture

```text
                         Smart Job Tracker
                                |
                +---------------+---------------+
                |                               |
             Frontend                        Backend
             React/Vite                    Node/Express
                |                               |
                |                         JWT Authentication
                |                               |
                |                    +----------+----------+
                |                    |                     |
                |               Applications          Resume
                |                    |                     |
                |                    |               PDF Parsing
                |                    |                     |
                |                    +----------+----------+
                |                               |
                |                         Job Matching
                |                               |
                +---------------+---------------+
                                |
                         MongoDB Atlas





## Project Structure

```text
smart-job-tracker/
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vercel.json
│
├── .gitignore
└── README.md









## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/akashkonduru2-cell/smart-job-tracker.git
cd smart-job-tracker








## API Endpoints

### Authentication

POST `/api/auth/register`

POST `/api/auth/login`

POST `/api/auth/forgot-password`

POST `/api/auth/reset-password`

### Job Applications

GET `/api/applications`

GET `/api/applications/stats`

POST `/api/applications`

PUT `/api/applications/:id`

DELETE `/api/applications/:id`

### Resume

GET `/api/resume`

POST `/api/resume/upload`

DELETE `/api/resume`

### Job Matching

POST `/api/matching/analyze`

### Health Check

GET `/api/health`


## Security

- Passwords are hashed using bcrypt
- JWT authentication protects private API routes
- Users can access only their own job applications
- Resume endpoints require authentication
- Password reset tokens are securely hashed before storage
- Password reset tokens expire after 15 minutes
- Sensitive configuration is stored using environment variables
- `.env` files are excluded from Git








## Future Improvements

- Cloud storage for uploaded resumes
- Resume download and preview
- Email notifications for upcoming interviews
- Job application reminders
- Advanced resume-to-job matching
- AI-powered job recommendations
- Application activity history
- Job board integration