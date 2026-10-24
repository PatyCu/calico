# Frontend instructions

## Structure

- Use Next.js and strict TypeScript; do not bypass type modeling with `any`.
- Give each UI component its own file. Keep pages focused on composition; separate presentation, state management, and API access.
- Use semantic tokens from `app/globals.css` in components.
- Treat semantic HTML, keyboard access, visible focus, responsive layouts, and reduced motion as UI requirements.

## Validation

Commands from `frontend/`: `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`. Select checks relevant to the change.

- For connectivity changes, verify checking, connected, and unavailable states, then stop and restart the backend to verify manual retry and recovery.
- For appearance changes, verify Light, Dark, and System, contrast, persistence after reload, and switching with browser storage blocked.
