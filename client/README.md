# JixxCafe — Developer README

A fullstack personality quiz app built with React + Vite on the frontend and Express + MongoDB on the backend. The app collects quiz responses, determines a coffee-inspired personality type, saves results to MongoDB, and exposes analytics.

## Project Structure

- `client/`
  - `package.json` — frontend dependencies and scripts.
  - `src/`
    - `App.jsx` — app routing.
    - `main.jsx` — React entry point.
    - `pages/` — page components: `Home`, `Quiz`, `Result`, `Dashboard`.
    - `data/questions.js` — quiz question definitions.
    - `data/results.js` — result mapping for personality types.
    - `services/api.js` — backend API client.
- `server/`
  - `index.js` — Express server and API routes.
  - `models/Result.js` — Mongoose schema for saved quiz results.
  - `.env` — environment variables (not committed).

## Tech Stack

- Frontend
  - React 19
  - Vite
  - React Router DOM 7
  - ESLint
- Backend
  - Node.js
  - Express 5
  - Mongoose
  - MongoDB
  - CORS
  - dotenv
  - nodemon

## Features

- Multi-step quiz with personality scoring
- Persistent result storage in MongoDB
- Result mapping to themed coffee personalities
- Analytics endpoint for total submissions and counts by personality
- Client-side navigation between Home, Quiz, Result, and Dashboard pages

## Getting Started

### 1. Install dependencies

From the project root:

```bash
cd client
npm install

cd ../server
npm install
```

### 2. Configure backend environment

In `server/.env`, set your MongoDB connection string:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

### 3. Run the backend server

From `server/`:

```bash
npm start
```

The server listens on `http://localhost:5000`.

### 4. Run the frontend app

From `client/`:

```bash
npm run dev
```

The frontend runs on the Vite dev server (typically `http://localhost:5173`).

## API Endpoints

- `POST /save-result`
  - Request body: `{ name, personality }`
  - Saves a new quiz result document
- `GET /analytics`
  - Returns aggregated analytics:
    - `totalUsers`
    - `personalityCount`

## Important Files

- `client/src/services/api.js`
  - Base API URL is configured here: `http://localhost:5000`
- `client/src/data/questions.js`
  - Contains the quiz question and option definitions.
- `client/src/data/results.js`
  - Maps personality keys to titles, descriptions, and colors.
- `server/index.js`
  - Express configuration, routes, and MongoDB connection.
- `server/models/Result.js`
  - Mongoose schema for saved quiz results.

## Development Notes

- Ensure the backend is running before starting the frontend, because the quiz result save flow depends on `POST /save-result`.
- The dashboard page likely consumes `/analytics` to display aggregated results.
- `saveResult` and `getAnalytics` are the two backend contracts used by the client.

## Deployment Notes

- For production, update the frontend API base URL in `client/src/services/api.js` to point to the deployed backend.
- Use a secure environment variable store for `MONGO_URI`.
- Replace `nodemon` with a production process manager such as PM2 or use a build pipeline for the server.

## Troubleshooting

- If `MongoDB connected` does not appear, verify `server/.env` and network access to your MongoDB instance.
- If requests fail from the frontend, confirm the backend origin and CORS are configured correctly and both apps are running on the expected ports.
