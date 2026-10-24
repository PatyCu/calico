# Development

Start with README.md for prerequisites, commands, and acceptance checks. Use JDK 21 and Node.js 22+; the Gradle wrapper and npm lockfile pin builds. Backend uses Spring Boot 4.1.2 and Kotlin 2.3.21; frontend uses Next.js 16.4.3 and React 19.3.1. Dependencies were selected from stable registry/starter releases.

Run frontend lint, typecheck, and production build; run backend ./gradlew build. The HTTP integration test starts Spring Boot on a random port and asserts health status, JSON content type, and body.

For local verification: start both servers, open the page, confirm connected, stop the backend and check again, then restart and retry. Use the keyboard and a narrow viewport as well. Connectivity checks run on mount/manual retry only.

Troubleshooting: confirm ports 3000/8080 are available and curl the backend health URL directly. If changing backend port, also set frontend BACKEND_URL in .env.local and restart Next.js. Dependencies require internet for the initial install; use npm ci on subsequent clean setups. Stop servers with Ctrl-C.

Keep docs alongside changes. Record significant architecture decisions in docs/decisions with context, decision, and consequences. Keep AGENTS.md concise and link shared documentation instead of duplicating architecture.

For design changes, check Light / Dark / System, reload persistence, keyboard focus, and a narrow viewport. Semantic tokens live in frontend/app/globals.css; components should use these tokens instead of literal colors. Check text contrast in both themes. Local Geist font assets and their license live in frontend/public/fonts. Theme storage contains only `calico-theme` (light, dark, or system); blocked storage must not prevent changing appearance.
