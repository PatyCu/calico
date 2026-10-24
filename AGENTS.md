# Repository instructions

Module instructions: [frontend](frontend/AGENTS.md), [backend](backend/AGENTS.md).

## Workflow

- State the scope and expected behavior; implement only one tiny approved slice. Do not change unrelated files or advance to the next slice without explicit approval.
- Provide focused manual verification steps and pause for human validation and code review. Address feedback and rerun affected checks before marking the slice complete.
- After explicit human approval and successful validation, update [PROGRESS](PROGRESS.md) to reflect the completed slice or task, commit, and push directly to main. Create a branch only for an explicitly requested experiment.
- Never stage, commit, or discard unrelated changes. Check worktree status before wrapping up; leave it clean after approval and report any blockers to committing or pushing.

## Architectural principles

- Changes to system boundaries must respect [architecture](docs/architecture.md).
- Give each file and module one cohesive responsibility and a clear reason to change. Prefer explicit boundaries and simple solutions over speculative abstractions or empty scaffolding.
- Keep provider-specific types behind thin adapters and internal contracts. Design tool boundaries to accommodate inbound and outbound MCP.
- Keep domain logic independent of presentation and transport, and independently testable. Explain material architectural decisions and trade-offs.

## Project constraints

- For changes involving data, secrets, network access, or tool execution, consult [security requirements](docs/security.md).
- Justify dependencies and obtain approval before adding a production dependency.

## Documentation and reporting

- Keep each doc concise and single-purpose. State each rule once at the broadest useful level; omit examples or special cases that add no distinct requirement. Link instead of duplicating content.
- Keep agent instructions project-specific and actionable. Add a rule only when it changes a decision or behavior; state when it applies and omit guidance the agent can infer reliably.
- When feedback reveals a reusable working preference, propose an update to the relevant agent instruction. Prefer revising an existing rule over adding one.
- Keep docs aligned with behavior and record significant architecture decisions in `docs/decisions/`.
- Report changes, validation results and limitations, local run steps, and material architectural trade-offs. Never claim unrun checks passed.
