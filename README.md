# SportSee

This repository contains the front-end dashboard for SportSee (activity, sessions, performance radar, score, and nutrition). It is built with React, Vite, and Recharts.

## 1. General information

The UI can run with mocked local data (`data.js`) or by consuming the SportSee API on `http://localhost:3000`.

## 2. Project (**without Docker**)

### 2.1 Prerequisites

- [NodeJS (version 16+ recommended)](https://nodejs.org/en/)
- npm

### 2.2 Launching the project

- Clone the repository
- Install dependencies with `npm install`
- Start the dev server with `npm run dev`

## 3. Project (**with Docker**)

Docker is not provided for this front-end project. If you want to run it in a container, you can add your own Dockerfile.

## 4. Data source & endpoints

### 4.1 Switch between local data and API

Update `.env` to choose the data source:

```env
VITE_USE_API=false
VITE_API_BASE_URL=http://localhost:3000
```

- `VITE_USE_API=false` → use local data (`data.js`)
- `VITE_USE_API=true` → use the API

Restart Vite after changing `.env`.

### 4.2 Available endpoints

When using the API, the UI consumes:

- `http://localhost:3000/user/${userId}`
- `http://localhost:3000/user/${userId}/activity`
- `http://localhost:3000/user/${userId}/average-sessions`
- `http://localhost:3000/user/${userId}/performance`

**Warning: only users 12 and 18 are mocked in the API.**

### 4.3 User routing

The dashboard reads the user id from the URL:

- `/user/12`
- `/user/18`

If the ID is missing or invalid, the UI falls back to a fake user with empty data.

## 5. Project structure

- `src/components/` : React components (charts, header, sidebar, etc.)
- `src/services/dashboardData.js` : data composition for the dashboard
- `src/services/userService.js` : API calls & formatting
- `data.js` : local mock data

