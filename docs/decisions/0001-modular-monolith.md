# 0001 — Modular monolith

Status: accepted.

## Context

The product needs clear boundaries while evolving incrementally.

## Decision

Use one backend application with domain packages and explicit APIs between domains. Keep the Next.js frontend separate. Add domains only as features require them; start with health.

## Consequences

Local operation uses one backend process. Providers, runtime, tools, and MCP adapters must respect domain boundaries. Splitting services requires evidence and a new decision.
