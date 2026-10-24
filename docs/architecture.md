# Architecture

Decision: a modular monolith backend with a separate Next.js frontend. Start with one backend application; introduce domain packages and explicit APIs as actual features arrive. No distributed services or speculative infrastructure.

## Implemented slice

Browser → Next.js `/api/health` → Spring Boot `GET /health` → `{"status":"UP"}`.

The browser shows checking, connected, or error and supports manual retry. Next.js owns a server-only BACKEND_URL (default loopback), checks response status/body, disables caching, and bounds upstream calls to three seconds. The browser bounds calls to five seconds. An unsuccessful or malformed upstream response becomes a generic HTTP 503. No CORS configuration is needed for the same-origin browser request.

## Planned boundaries, not implemented

- Providers: start with OpenAI later; keep a thin internal request/event contract plus capability discovery. Translate provider-specific types at adapters so another provider does not require restructuring consumers. Avoid a universal LLM framework.
- Tools: explicit tool contracts should accommodate inbound and outbound MCP adapters later. Authorization and trust boundaries apply regardless of transport.
- Agent runtime, conversations, artifacts, and connectors gain domain boundaries when their slices are approved.
- MVP artifacts will hold current content only. Artifact versioning is explicitly outside the MVP.

Security applies to every boundary from the outset; see security.md. Each slice requires automated and human validation before proceeding.

## Presentation

The frontend uses shared semantic CSS tokens for Calico's cool neutral palette, restrained copper accents, and separate status colors. Both light and dark themes are supported. System appearance is the default; a Light / Dark / System control persists only the appearance preference in localStorage, with an in-memory fallback if storage is blocked. A small static script applies saved appearance before paint; CSS follows system changes automatically. No theme library or backend storage is needed. Geist is served locally with its font license; outline icons are inline SVG so no icon package is required.
