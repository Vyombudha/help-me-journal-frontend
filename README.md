# Help Me Journal Frontend

A React + TypeScript frontend for managing projects, journal-like containers, and personal reflection entries. The app is currently structured as a working MVP: signed-in users can create projects, open a project workspace, create containers, and manage entries with Clerk-authenticated requests to a backend API.

[Live app]: https://help-me-journal.onrender.com

## Current project status

This frontend is in active MVP/development stage. The current implementation includes:

- Clerk sign-in flow with signed-out landing page
- project dashboard for browsing and creating projects
- project-level workspace with sidebar navigation
- container management inside a project
- entry creation and editing within a selected container
- React Query data synchronization for project/container/entry operations
- authenticated API requests using a Clerk bearer token

It is functional for the core journaling workflow, but it is not a finished product and still depends on a compatible backend API and alot of UX and functional refinements.

## Core workflow

1. A user signs in with Clerk.
2. The dashboard loads the current project list from the backend.
3. The user creates a project or opens an existing one.
4. Inside the project, they create containers such as journal entries or technical notes.
5. A selected container shows its entries and allows creation or editing.
6. Data is fetched and invalidated through TanStack Query so UI state stays aligned with the backend.

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- TanStack React Query
- React Router
- Axios
- Clerk
- shadcn-style UI primitives
- Lucide icons
- Tiptap support in the app ecosystem

## Prerequisites

Before starting the frontend, make sure you have:

- Node.js 18 or newer
- npm
- a running backend API that exposes the project/container/entry routes used by the client
- a Clerk app with a publishable key

## Environment variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Notes:

- `VITE_API_URL` is the base URL for the backend API.
- `VITE_CLERK_PUBLISHABLE_KEY` is required by the Clerk provider.
- The Axios client attaches a bearer token from Clerk on each authenticated request via `useApiAuth()`.

## Installation

```bash
npm install
```

Then add the environment variables above and start the app.

## Development

```bash
npm run dev
```

Open the app in the browser at:

```text
http://localhost:5173
```

## Production build

```bash
npm run build
```

Preview the built app locally:

```bash
npm run preview
```

## Available scripts

```bash
npm run dev       # start Vite dev server
npm run build     # run type-check and create production build
npm run lint      # run ESLint
npm run format    # format TypeScript/TSX files with Prettier
npm run typecheck # run TypeScript validation without emitting files
npm run preview   # preview the production build
```

## Application routes

The current app structure is:

- `/` — signed-in dashboard for viewing and creating projects
- `/projects/:projectId` — project workspace landing page with containers
- `/projects/:projectId/containers/:containerId` — selected container with its entries

Signed-out users are routed to the landing page and sign-in flow.

## Backend contract expected by the frontend

The client currently expects a backend with endpoints matching these patterns:

- `GET /projects`
- `POST /projects`
- `PATCH /projects/:id`
- `DELETE /projects/:id`
- `GET /projects/:projectId/containers`
- `POST /projects/:projectId/containers`
- `PATCH /containers/:containerId`
- `DELETE /containers/:containerId`
- `GET /containers/:containerId/entries`
- `POST /containers/:containerId/entries`
- `PATCH /entries/:entryId`
- `DELETE /entries/:entryId`

The frontend expects responses shaped like:

```ts
{
  success: true,
  data: ...
}
```

The DTOs used by the client include project statuses such as `IN_PROGRESS`, `COMPLETED`, and `ABANDONED`; container types like `JOURNAL` and `TECHNICAL_NOTE`; mood values such as `HAPPY`, `CALM`, `SAD`, `ANGRY`, `ANXIOUS`, `EXCITED`, `TIRED`, and `NEUTRAL`; and entry title/content fields.

## Project structure

```text
src/
  App.tsx
  main.tsx
  assets/
  components/
  hooks/
  lib/
  pages/
  types/
```

Key areas:

- `src/App.tsx` — main auth gate and route setup
- `src/pages/LandingPage.tsx` — signed-out landing page and sign-in CTA
- `src/pages/HomePage.tsx` — project dashboard
- `src/pages/ProjectPage.tsx` — project workspace and nested container entry routes
- `src/hooks/` — TanStack Query hooks for projects, containers, and entry mutations
- `src/lib/api.ts` — Axios client setup
- `src/lib/useApiAuth.ts` — Clerk token interceptor
- `src/components/` — project cards, sidebar, dialogs, entry UI, and reusable UI elements
- `src/types/dtos.ts` — shared TypeScript contracts for backend payloads

## Notes

- The app is built around a project-first journaling model rather than a generic notes app.
- The UI is intentionally simple and focused on the core workflow: plan the work, journal the context, and keep project memories close to the project itself.
- The frontend assumes the backend API is already running and reachable through `VITE_API_URL`.
- There are currently no automated tests in the repository, so functionality is validated by the local app and type/build checks.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
