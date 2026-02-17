🚨 Incident Tracker – MERN Stack Application
📌 Overview

This is a full-stack Incident Tracker application built using the MERN stack (MongoDB, Express.js, React, Node.js).

The application allows engineers to:

Create production incidents

View incidents in a paginated table

Search incidents (server-side)

Filter by severity and status (server-side)

Sort incidents by different fields

View incident details

Update incident status and metadata

The system is designed with scalability, clean architecture, and proper REST API design principles in mind.

🏗 Tech Stack
Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

Frontend

React

Axios

React Router

Custom CSS

🚀 Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/MuthuKiran28/incident-tracker-mern.git
cd incident-tracker-mern

2️⃣ Backend Setup
cd backend
npm install


Create a .env file inside backend:

MONGO_URI=your_mongodb_connection_string
PORT=5000


Run backend:

npm run dev

3️⃣ Seed Database
node seed.js


This will generate 200 realistic incidents with mixed severity and status values.

4️⃣ Frontend Setup
cd ../frontend
npm install
npm start


Application runs at:

http://localhost:3000

📡 API Endpoints
POST /api/incidents

Create a new incident.

GET /api/incidents

Supports:

page

limit

search

severity

status

sortBy

order

GET /api/incidents/:id

Fetch incident details by ID.

PATCH /api/incidents/:id

Update incident details.

🧠 Design Decisions

Server-side pagination implemented for scalability and performance.

Filtering and sorting handled at database level to reduce client load.

MongoDB indexes added for severity, status, and text search.

Backend follows layered architecture:

Models

Controllers

Routes

Database configuration

Clear separation between frontend and backend.

⚖ Trade-offs

Authentication not implemented to focus on core requirements.

UI kept minimal to prioritize backend correctness.

Automated tests not included due to time constraints.

🚀 Improvements With More Time

Add authentication and role-based access control

Add validation middleware (Joi/Zod)

Add unit and integration testing

Add Docker configuration

Improve UI using a component library

Add dashboard metrics (incident counts by status/severity)

📦 Repository Structure
incident-tracker-mern/
 ├── backend/
 ├── frontend/
 ├── README.md