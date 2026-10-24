# Backend instructions

## Structure

- Use Kotlin and Spring Boot, organized by domain with explicit APIs between domains.
- Separate API handlers, business logic, and persistence or external-service access into distinct files or modules within each domain.

## Validation

Run `./gradlew build` from `backend/` for backend changes.

For connectivity changes, verify HTTP status and response body through both backend `/health` and frontend `/api/health`, including backend unavailability and recovery.
