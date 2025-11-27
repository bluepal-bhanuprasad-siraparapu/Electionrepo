# Docker Compose Setup for Election App

This repository contains a frontend React app (`election-frontend`) and a backend Spring Boot app (`Online_Voting_App`), plus a MySQL database.

## What I added
- `docker-compose.yml` at the repo root that defines `db`, `backend`, and `frontend` services.
- `Dockerfile` for the backend (`Online_Voting_App/Dockerfile`) and for the frontend (`election-frontend/Dockerfile`).
- `election-frontend/nginx/default.conf` to serve the React app and optionally proxy `/api` to the backend service.
- `.dockerignore` files for both backend and frontend.
- Created `.env.example` and `.env` for environment configuration.
- Updated `Online_Voting_App/src/main/resources/application.properties` to use environment variables for DB configuration.
- Updated `election-frontend/src/api/axiosConfig.js` to use `REACT_APP_API_URL` environment variable.

## Running using Docker Compose

Start the app with:

```powershell
# from project root (e:\p45\Task 5)
docker compose up --build
```

This will:
- Start the MySQL database (host port configurable via `MYSQL_PORT` in `.env`, default 3306)
- Build and start the backend (host port configurable via `BACKEND_PORT` in `.env`, default 8080)
- Build and start the frontend (host port configurable via `FRONTEND_PORT` in `.env`, default 3000 mapped to container port 80)

Open the React app at: http://localhost:${FRONTEND_PORT} (default port 3000)

> The frontend is configured at build time using `REACT_APP_API_URL` (default value `http://backend:8080/api` found in `.env`), so the app will call the backend by service name when built inside Docker; nginx will also proxy `/api` requests to the backend if you navigate directly.

## Notes and Troubleshooting
- If you want to change the DB credentials, edit `.env` (recommended) or override env vars with your shell or CI provider to keep secrets out of source control.
- The backend's `application.properties` now reads database host, port, username, password from environment variables: `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`.

## Helpful commands

```powershell
# Build and start (detached)
docker compose up --build -d

# Show logs
docker compose logs -f

# Stop and remove containers
docker compose down -v
```

