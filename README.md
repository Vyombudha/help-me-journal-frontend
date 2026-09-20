# Help Me Journal Frontend

A React + TypeScript frontend for managing personal projects and project-based journal containers. The app uses Clerk for authentication, React Query for async data fetching, and a backend API for project, container, and entry data.

## Overview

This frontend supports a lightweight planning and reflection workflow:

- sign in with Clerk
- browse and create projects from a dashboard
- open a project detail view for a specific project
- create and manage containers within a project
- assign mood tags to containers
- navigate between conainers through a sidebar/project tree
- keep the experience focused on journaling and planning work

The UI is built with Vite, React 19, Tailwind CSS, and reusable shadcn-style components.

## Features

- Clerk-based authentication gate with a sign-in flow
- Project dashboard with project cards and creation modal
- Per-project view at `/projects/:projectId`
- Project sidebar with navigation between projects
- Container creation with supported container types and moods
- React Query-powered data fetching and mutation state
- Axios client configured with a shared API base URL
- Clerk JWT injection for authenticated backend requests
- Responsive dashboard and project layout

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- TanStack React Query
- Axios
- Clerk
- React Router
- Lucide React

## Prerequisites

Before running the app, make sure you have:

- Node.js 18 or newer
- npm
- a running backend API that exposes the project and container endpoints
- a Clerk application with a publishable key

## Environment Variables

Create a `.env` file in the project root with the following values:

```env
VITE_API_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Notes:

- `VITE_API_URL` is the base URL for the backend API.
- `VITE_CLERK_PUBLISHABLE_KEY` is required by the Clerk React provider.
- API requests are authenticated with a bearer token attached through the client interceptor.

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

## Development

Start the Vite development server:

```bash
npm run dev
```

Then open the app in the browser, typically at:

```text
http://localhost:5173
```

## Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Available Scripts

```bash
npm run dev       # start the Vite development server
npm run build     # type-check and create the production build
npm run lint      # run ESLint checks
npm run format    # format TypeScript and TSX files with Prettier
npm run typecheck # validate TypeScript without emitting files
npm run preview   # preview the built app locally
```

## Application Flow

The app follows this basic flow:

1. A user signs in with Clerk.
2. The frontend loads the project list from the backend.
3. The user creates new projects or opens a project detail page.
4. Inside a project, the user creates journal or technical-note-style containers.
5. Containers can include mood metadata and are shown in project-specific views.
6. The app keeps the project and container data synced via React Query.

## Route Structure

The app currently supports these key routes:

- `/` — signed-in dashboard for viewing and creating projects
- `/projects/:projectId` — project detail page with container list and sidebar navigation
- `/projects/:projectId/containers/:containerId` — container detail route placeholder used by the current UI structure

The app displays a sign-in prompt for signed-out users and routes only become available when the user is authenticated.

## Project Structure

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

- `src/App.tsx` — root app, auth gate, and route setup
- `src/pages/HomePage.tsx` — dashboard for creating and viewing projects
- `src/pages/ProjectPage.tsx` — project detail page with container creation and sidebar navigation
- `src/hooks/` — React Query hooks for projects, containers, and mutations
- `src/lib/api.ts` — shared Axios instance
- `src/lib/useApiAuth.ts` — Clerk token interceptor for authenticated requests
- `src/components/` — cards, dialogs, sidebar, project tree, and reusable UI pieces
- `src/types/` — DTOs and TypeScript contract definitions

## API Expectations

This frontend expects a backend service that provides endpoints compatible with the current client contracts. The current implementation calls the following routes:

- `GET /projects`
- `POST /projects`
- `PATCH /projects/:id`
- `DELETE /projects/:id`
- `GET /projects/:projectId/containers`
- `POST /projects/:projectId/containers`
- `PATCH /containers/:containerId`
- `DELETE /containers/:containerId`

The app expects a success response shape like:

```ts
{
  success: true,
  data: ...
}
```

The backend should also support the DTO shapes defined in `src/types/dtos.ts`, including project status values like `IN_PROGRESS`, `COMPLETED`, and `ABANDONED`, plus container mood values such as `HAPPY`, `CALM`, `SAD`, `ANGRY`, `ANXIOUS`, `EXCITED`, `TIRED`, and `NEUTRAL`.

## Notes

- This project is focused on project and container management for a journaling and planning workflow.
- The current implementation is structured to grow into a richer personal reflection system.
- The frontend assumes the backend API is already running and reachable through `VITE_API_URL`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
