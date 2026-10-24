# Repository instructions

- Read README.md, PROGRESS.md, and relevant docs before changes. Keep architecture decisions and docs aligned with behavior.
- Implement only tiny approved slices; stop before the next slice until explicitly approved.
- Done = automated validation + explicit human validation. Then check off the item in PROGRESS.md, commit, and push upstream.
- Commit and push directly to main by default. Create a branch only when explicitly requested for an experiment; commit and push there instead.
- ALWAYS check worktree status before wrapping up; leave it clean. Never discard unrelated changes to achieve this. Report any blocker to committing or pushing.
- frontend/: strict TypeScript / Next.js. backend/: Kotlin / Spring Boot, organized by domain with explicit boundaries. Justify dependencies; avoid speculative modules.
- Keep provider types behind thin extensible adapters; accommodate inbound/outbound MCP. Add capabilities only within approved scope. Artifact versioning is outside MVP.
- Follow docs/security.md: no committed secrets, sensitive logs, or unrestricted tool execution.
- Validate frontend: npm ci, npm run lint, npm run typecheck, npm run build. Backend: ./gradlew build. Check HTTP and connected/error UI behavior when changing connectivity.
- Report changes, validation results/limitations, and local run steps. Never claim unrun checks passed.
