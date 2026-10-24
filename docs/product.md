# Product

Build an AI-native workspace incrementally, beginning with conversations. This slice proves a laptop can run the frontend and backend and establish connectivity.

Acceptance: New Conversation view, disabled message composer with clear coming-soon copy, checking/connected/error status, and manual retry after backend recovery.

There is no conversation creation, message sending, model integration, storage, authentication, MCP, agent runtime, DB, or object storage in this slice. Multiple providers and inbound/outbound MCP are planned. Artifact versioning is explicitly outside the MVP; future MVP artifacts contain current content only.

Delivery loop: implement one tiny agreed slice → automated checks → human laptop validation → explicit approval for the next slice. Do not advance automatically.
