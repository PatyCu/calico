# Security

## Current boundaries

- Development servers bind to loopback; the app has no authentication. Deployment or network exposure requires an approved security design.
- Health returns process availability only. It does not establish readiness.
- Browser requests use the Next.js origin. `BACKEND_URL` is server-only configuration, never request input.
- Upstream health requests reject redirects. Health requests have timeouts, bypass caches, and return generic errors without backend details.

## Local message boundary

- Messaging uses the same unauthenticated loopback-only development boundary; there is no user identity, shared storage, or tenant data. Network exposure requires the approved security design above.
- Both message endpoints accept only nonblank strings up to 2,000 characters. The UI allows one pending request at a time.
- Messages and replies remain transient, with no persistence or content logging. Replies render as text. No content audit is recorded for this local echo.
- The only outbound message destination is the server-configured backend. Requests reject redirects and use timeouts; failures return generic errors. No external provider or tool executes.

## Requirements for changes

- Never commit secrets or log credentials or content. Keep secrets server-side.
- Keep local environment files and build outputs ignored; commit lockfiles and the Gradle wrapper. Review dependencies for known vulnerabilities.
- Before adding capabilities, define identity, authorization, input validation, request limits, tenant isolation, retention, and audit rules.
- Treat model output, retrieved content, and MCP data as untrusted. Enforce explicit tool permissions; never allow unrestricted tool execution.
- Define allowed outbound destinations and trusted inbound callers. Threat-model each provider, storage, and MCP boundary before implementation.
