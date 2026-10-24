# Security

Security is a first-class design constraint, revisited in every slice.

Current surface: a read-only public health response containing only status. Both development servers bind to loopback. Browser requests use the Next.js origin; the backend URL is server-only configuration, never request input. Fetches have timeouts, reject redirects upstream, avoid caches, and return generic failures without exposing backend details. There is no user input processing or model/tool execution.

No authentication is implemented. This skeleton is for local validation; deployment and exposure require a separately approved security design. Health indicates process availability, not comprehensive readiness.

Never commit secrets or log credentials/content. Local env files and build outputs are ignored; dependency lockfiles/wrapper belong in source control. Review dependency updates and known vulnerabilities.

Before future capabilities: define identity and authorization, validate inputs, limit request sizes/rates, isolate tenant data, and define retention and audit rules. Treat model output, retrieved content, and MCP data as untrusted. Tool permissions must be explicit and enforceable; outbound destinations and inbound callers need trust policies. Secrets stay server-side. Threat model each provider, storage, and MCP boundary before implementing it.
