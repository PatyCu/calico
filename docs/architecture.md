# Architecture

A separate Next.js frontend connects to one Kotlin/Spring Boot backend. Backend domains gain explicit APIs as features are added; do not create empty modules. See [backend structure](decisions/0001-modular-monolith.md) and [technology choice](decisions/0002-kotlin-backend.md).

## Connectivity

Browser → Next.js `/api/health` → Spring Boot `GET /health` → `{"status":"UP"}`.

Checks run on page load and manual retry. The browser timeout is five seconds; the upstream timeout is three seconds. Next.js validates the upstream status and body and returns HTTP 503 on failure. See [security](security.md) for trust boundaries.

## Message round trip

Browser → Next.js `POST /api/messages` → Spring Boot `POST /messages`. The request is `{ "message": "..." }`; the response is `{ "reply": "the backend received ..." }`. The backend conversation service constructs the reply. The UI displays the latest reply only. Messages are not persisted. Browser and upstream timeouts are five and three seconds respectively.

## Appearance

Semantic CSS tokens define light and dark themes. System is the default. A static script applies the saved theme before paint; CSS follows system changes. The `calico-theme` localStorage entry stores the preference, with an in-memory fallback when storage is blocked. Fonts are served locally; icons use inline SVG.

## Future boundaries

- Providers: begin with OpenAI behind a thin adapter. Keep provider types behind internal request/event contracts and capability discovery.
- Tools: explicit contracts must support inbound and outbound MCP adapters.
- Conversations, agent runtime, artifacts, and connectors gain domain boundaries when implemented.
