Incident Tracker – Full Stack MERN Application
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

The application is designed with a focus on scalability, clean architecture, and proper API design.

🏗 Tech Stack

Frontend

React

Axios

React Router

Backend

Node.js

Express.js

MongoDB

Mongoose

🚀 Setup Instructions
1️⃣ Clone the Repository
git clone <your-github-link>
cd incident-tracker

2️⃣ Backend Setup
cd backend
npm install


Create a .env file:

MONGO_URI=your_mongodb_connection_string
PORT=5000


Run backend:

npm run dev

3️⃣ Seed Database
node seed.js


This will generate 200 sample incidents.

4️⃣ Frontend Setup
cd ../frontend
npm install
npm start


App runs at:

http://localhost:3000

📡 API Endpoints
POST /api/incidents

Create a new incident.

GET /api/incidents

Fetch paginated incidents.

Query parameters:

page

limit

severity

status

search

sortBy

order

GET /api/incidents/:id

Fetch incident details by ID.

PATCH /api/incidents/:id

Update incident details.

🧠 Design Decisions
1. Server-Side Pagination

Pagination logic is handled on the backend to support scalability for large datasets.

2. Server-Side Filtering and Sorting

Filtering and sorting are implemented at database query level using MongoDB queries for performance efficiency.

3. Indexing

Indexes were added on:

severity

status

text search (title and summary)

This improves query performance for filtering and search operations.

4. Separation of Concerns

The backend follows a layered structure:

Models

Controllers

Routes

Database configuration

This ensures maintainability and scalability.

⚖ Trade-offs

Authentication was not implemented to keep focus on core functionality.

UI is minimalistic to prioritize backend correctness and performance.

No unit testing added due to time constraints.

🚀 Improvements With More Time

Add authentication and role-based access

Add proper error handling middleware

Add request validation using Joi or Zod

Add unit and integration tests

Add Docker support

Improve UI styling with Tailwind or Material UI

Add caching layer (Redis)