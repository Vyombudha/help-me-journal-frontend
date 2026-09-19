# Help Me Journal Frontend

A React + TypeScript frontend for managing personal projects and journal-style workspaces. The app uses Clerk for authentication, React Query for data fetching, and a backend API for project CRUD operations.

## Overview

This application lets users:

- sign in with Clerk
- view a dashboard of projects
- create new projects
- edit project details
- delete projects
- manage project actions through contextual UI controls

The UI is built with Vite, React, Tailwind CSS, and reusable shadcn-style components.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- TanStack React Query
- Axios
- Clerk
- Lucide React

## Prerequisites

Before running the app, make sure you have:

- Node.js 18+ recommended
- npm or pnpm
- a running backend API
- a Clerk account and publishable key

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a local environment file:

```env
VITE_API_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

> The frontend expects a backend API at `VITE_API_URL` and uses the Clerk publishable key from the environment.

## Development

Start the app in development mode:

```bash
npm run dev
```

Then open the local Vite URL in your browser, usually:

```text
http://localhost:5173
```

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Scripts

```bash
npm run dev       # start the Vite development server
npm run build     # compile TypeScript and build the production app
npm run lint      # run ESLint checks
npm run format    # format TypeScript and TSX files with Prettier
npm run typecheck # run TypeScript validation without emitting files
npm run preview   # preview the built app locally
```

## Project Structure

```text
src/
  App.tsx
  main.tsx
  components/
  hooks/
  lib/
  pages/
  types/
```

Key areas:

- `src/App.tsx` — app root with Clerk auth gates
- `src/pages/HomePage.tsx` — main dashboard screen
- `src/hooks/` — data fetching and mutation hooks
- `src/lib/api.ts` — Axios API client setup
- `src/components/` — UI components and dialogs

## Notes

- The app currently uses a backend API for project data and expects authentication tokens to be attached via Clerk.
- The project is structured for a dashboard-style journaling workflow, with room to expand into containers, entries, and deeper project management features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
