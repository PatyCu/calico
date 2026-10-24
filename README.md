# Calico

## Local setup

Prerequisites: Node.js 22+, npm, and JDK 21. The Gradle wrapper is included. No database, API keys, or Docker are required. The first install and build need internet access.

From the repository root, start the backend:

```sh
cd backend
./gradlew bootRun
```

In a second terminal, install dependencies and start the frontend:

```sh
cd frontend
npm ci
npm run dev
```

Open http://127.0.0.1:3000. The page should show **Backend connected**. The backend runs at http://127.0.0.1:8080.

Both servers bind to loopback by default. To change the backend URL, copy `frontend/.env.example` to `frontend/.env.local`, edit `BACKEND_URL`, and restart the frontend. Stop either server with Ctrl-C.

## Project structure

- `frontend/`: Next.js App Router, React, and TypeScript. Browser requests reach the backend through Next.js API routes.
- `backend/`: Kotlin and Spring Boot. Currently contains the application and health endpoint.
- `docs/`: [architecture](docs/architecture.md), [product](docs/product.md), [security](docs/security.md), and [architecture decisions](docs/decisions/).
- [PROGRESS.md](PROGRESS.md): project milestones.
- [AGENTS.md](AGENTS.md): repository instructions for coding agents.
