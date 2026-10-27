# Help Me Journal Frontend

A React + TypeScript frontend for a project-first journaling workflow. Users can sign in, create projects, organize journal-like or technical-note containers, and edit rich-text content that is tied directly to a project.

Live app: https://vyombudha.github.io/help-me-journal-frontend/

## Current project status

This frontend is in MVP / active development. It currently supports:

- Clerk authentication flow with signed-out landing page
- project dashboard for creating and browsing projects
- project workspace with sidebar navigation and search
- journal / technical-note container management
- rich text editing for container content with autosave
- update flows for container title and content
- React Query synchronization for project and container state
- authenticated API requests using a Clerk bearer token

Recent updates focus on simplifying and strengthening the container/content experience. Instead of treating each container as a list of entries, the app now treats a container as a journal-style document with a title and rich-text body.

## Core workflow

1. A user signs in with Clerk.
2. The dashboard loads the current project list from the backend.
3. The user creates a project or opens an existing one.
4. The user creates a journal or technical-note container inside that project.
5. The selected container displays an editable title and a rich-text content editor.
6. Content is saved automatically after a brief debounce, keeping the UI aligned with the backend.
7. The project page supports search and container navigation for a lightweight journaling flow.

## Recent refactor highlights

The latest refactor improves the container management flow and aligns the client with the backend contract:

- split container mutations into dedicated create, title update, content update, and delete hooks
- moved rich-text content editing to a BlockNote-based editor with debounced autosave
- simplified the project page to focus on containers rather than separate entry records
- added reusable UI primitives for popovers, selects, tooltips, and tabs
- updated DTO contracts to match `ContainerDTO` fields like `title`, `content`, `type`, `moods`, and `templateConfig`

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- TanStack React Query
- React Router
- Axios
- Clerk
- BlockNote rich-text editing
- shadcn-style UI primitives
- Lucide icons

## Prerequisites

Before starting the frontend, make sure you have:

- Node.js 18 or newer
- npm
- a running backend API that exposes the project and container routes used by the client
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
- The Axios client attaches a bearer token from Clerk on each authenticated request.

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
- `/projects/:projectId/containers/:containerId` — selected container with editable title and rich-text content

Signed-out users are routed to the landing page and sign-in flow.

## Backend contract expected by the frontend

The client currently expects a backend with endpoints matching these patterns:

- `GET /projects`
- `POST /projects`
- `PATCH /projects/:id`
- `DELETE /projects/:id`
- `GET /projects/:projectId/containers`
- `POST /projects/:projectId/containers`
- `PATCH /containers/:containerId/title`
- `PATCH /containers/:containerId/content`
- `DELETE /containers/:containerId`

The frontend expects responses shaped like:

```ts
{
  success: true,
  data: ...
}
```

The DTOs used by the client include project statuses such as `IN_PROGRESS`, `COMPLETED`, and `ABANDONED`; container types like `JOURNAL` and `TECHNICAL_NOTE`; mood values such as `HAPPY`, `CALM`, `SAD`, `ANGRY`, `ANXIOUS`, `EXCITED`, `TIRED`, and `NEUTRAL`; and fields such as `title`, `content`, `type`, `moods`, and `templateConfig`.

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
- `src/pages/ProjectPage.tsx` — project workspace and container view routes
- `src/hooks/` — TanStack Query hooks for project and container mutations
- `src/lib/api.ts` — Axios client setup
- `src/lib/useApiAuth.ts` — Clerk token interceptor
- `src/components/` — project cards, sidebar, rich text editor UI, and reusable primitives
- `src/types/dtos.ts` — shared TypeScript contracts for backend payloads

## Notes

- The app is built around a project-first journaling model rather than a generic note-taking app.
- Each container acts as a document that can be structured as a journal entry or technical note.
- The frontend assumes the backend API is already running and reachable through `VITE_API_URL`.
- There are currently no automated tests in the repository, so functionality is validated by the local app and build/type checks.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
