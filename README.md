# AI-native app — slice 1

A New Conversation screen and a real backend connection check. Messaging is intentionally disabled.

## Run locally

Prerequisites: Node.js 22+, npm, JDK 21. No database, API keys, Docker, or global Gradle installation required. First install/build needs internet access.

From this repository folder, open two terminals:

```sh
# Terminal 1
cd backend
./gradlew bootRun
```

```sh
# Terminal 2
cd frontend
npm ci
npm run dev
```

Open http://127.0.0.1:3000. Expect **New Conversation** and **Backend connected**. The backend listens on http://127.0.0.1:8080; `GET /health` returns `{"status":"UP"}`.

Stop the backend and select **Check again**: expect **Backend unavailable**. Restart it and check again: expect connected. The check runs on page load and on demand; it does not poll. Messaging stays disabled in this slice.

Both servers bind to loopback by default. To change the backend URL, copy `frontend/.env.example` to `frontend/.env.local`, edit `BACKEND_URL`, and restart Next.js.

## Validate

```sh
cd frontend
npm run lint
npm run typecheck
npm run build
```

```sh
cd backend
./gradlew build
curl --fail http://127.0.0.1:8080/health # with bootRun running
```

The backend build includes an HTTP integration test on a random port. Human validation on your laptop is required before approving another slice.

## Layout and docs

- [Progress and slice checklist](PROGRESS.md): current status, validation, and next steps between sessions.
- `frontend/`: Next.js App Router, React, TypeScript; browser → `/api/health` → backend `/health`.
- `backend/`: Kotlin + Spring Boot, one application with a health package.
- [Architecture](docs/architecture.md), [product](docs/product.md), [development](docs/development.md), [security](docs/security.md).
- Decisions: [modular monolith](docs/decisions/0001-modular-monolith.md), [Kotlin backend](docs/decisions/0002-kotlin-backend.md).
- [Agent instructions](AGENTS.md).

No model integration, persistence, authentication, MCP, agent runtime, database, or object storage is implemented. Artifact versioning is outside the MVP.

## Appearance

Calico uses a cool neutral design with light and dark themes. Choose Light, Dark, or System in the header; System is the default and your selection is remembered on this browser. If browser storage is blocked, appearance can still be changed for the current page.
