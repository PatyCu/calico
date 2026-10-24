# Security

## Current boundaries

- Development servers bind to loopback; the app has no authentication. Deployment or network exposure requires an approved security design.
- Health returns process availability only. It does not establish readiness.
- Browser requests use the Next.js origin. `BACKEND_URL` is server-only configuration, never request input.
- Upstream health requests reject redirects. Health requests have timeouts, bypass caches, and return generic errors without backend details.

## Requirements for changes

- Never commit secrets or log credentials or content. Keep secrets server-side.
- Keep local environment files and build outputs ignored; commit lockfiles and the Gradle wrapper. Review dependencies for known vulnerabilities.
- Before adding capabilities, define identity, authorization, input validation, request limits, tenant isolation, retention, and audit rules.
- Treat model output, retrieved content, and MCP data as untrusted. Enforce explicit tool permissions; never allow unrestricted tool execution.
- Define allowed outbound destinations and trusted inbound callers. Threat-model each provider, storage, and MCP boundary before implementation.
