# 0001 — Modular monolith

Status: accepted.

Context: the product will evolve iteratively and needs understandable boundaries without distributed infrastructure.

Decision: one backend application, organized by domain as features emerge, with explicit APIs between domains. Keep the Next.js frontend separate. Start only with a health package; do not build empty future modules.

Consequences: simple local operation and refactoring. Future providers, runtime, tools, and MCP adapters must respect boundaries. Splitting services requires new evidence and a new decision.
