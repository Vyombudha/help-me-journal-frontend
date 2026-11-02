# Help Me Journal

**Keep the thinking behind the work.** Help Me Journal brings projects,
rich-text notes, and mood tracking together, so decisions and reflections stay
connected to what you're working on.

[Open Help Me Journal](https://vyombudha.github.io/help-me-journal-frontend/)

## What you can do

- Organize work with workspaces and journal pages.
- Write and edit rich-text notes, saved automatically as you type.
- Track how a project feels by adding moods to pages.
- Sign in securely with Clerk.

## Get started locally

### Requirements

- Node.js 20.19+ or 22.12+
- npm
- A running [Help Me Journal API](#api)
- A [Clerk](https://clerk.com/) application and publishable key

### Setup

```bash
git clone https://github.com/Vyombudha/help-me-journal-frontend.git
cd help-me-journal-frontend
npm ci
cp .env.example .env.local
```

Add your local API URL and Clerk publishable key to `.env.local`:

```dotenv
VITE_API_URL=http://localhost:3000/api/v1
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
```

Start the development server:

```bash
npm run dev
```

The `VITE_` prefix makes these values available in the browser bundle. Use only
public configuration values here; never put secrets in `.env.local`.

## API

The frontend connects to a separate Help Me Journal API. Set `VITE_API_URL` to
the API base URL, including `/api/v1`. Authenticated requests include a Clerk
session token. Successful responses use the shape
`{"success":true,"data":...}`.

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/workspaces` | List workspaces |
| `POST` | `/workspaces` | Create a workspace |
| `PATCH` | `/workspaces/:workspaceId` | Update a workspace |
| `DELETE` | `/workspaces/:workspaceId` | Delete a workspace |
| `GET` | `/workspaces/:workspaceId/pages` | List workspace pages |
| `POST` | `/workspaces/:workspaceId/pages` | Create a page |
| `GET` | `/pages/:pageId` | Get a page |
| `PATCH` | `/pages/:pageId/title` | Update a page title |
| `PATCH` | `/pages/:pageId/content` | Update page content |
| `DELETE` | `/pages/:pageId` | Delete a page |

Shared request and response types are defined in
[src/types/dtos.ts](./src/types/dtos.ts).

## Development

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run typecheck` | Check TypeScript |
| `npm run lint` | Run ESLint |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |

The frontend is built with React, TypeScript, and Vite. It uses Clerk for
authentication, BlockNote for the editor, and Tailwind CSS for styling.

## License

[MIT](./LICENSE)
