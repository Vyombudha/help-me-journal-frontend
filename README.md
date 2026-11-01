# Help Me Journal

A journaling app for organizing projects and keeping rich-text notes and moods with your work.

[Open the live app](https://vyombudha.github.io/help-me-journal-frontend/)

## Run locally

You need Node.js 20.19+ or 22.12+, npm, a running Help Me Journal API, and a Clerk application.

```bash
git clone https://github.com/Vyombudha/help-me-journal-frontend.git
cd help-me-journal-frontend
npm install
cp .env.example .env.local
npm run dev
```

Set these values in `.env.local`:

| Variable | Value |
| --- | --- |
| `VITE_API_URL` | API URL ending in `/api/v1` (for example, `http://localhost:3000/api/v1`) |
| `VITE_CLERK_PUBLISHABLE_KEY` | Your Clerk publishable key |

`VITE_` values are included in the browser bundle. Never put secrets in them.

## Features

- Sign in with Clerk.
- Create and manage workspaces and journal pages.
- Write rich-text entries that save automatically.
- Add moods to pages.

## API

The frontend uses a separate API. Requests include a Clerk session token and expect responses in the form `{"success":true,"data":...}`.

| Method | Route | Action |
| --- | --- | --- |
| `GET` | `/workspaces` | List workspaces |
| `POST` | `/workspaces` | Create a workspace |
| `PATCH` | `/workspaces/:workspaceId` | Update a workspace |
| `DELETE` | `/workspaces/:workspaceId` | Delete a workspace |
| `GET` | `/workspaces/:workspaceId/pages` | List pages |
| `POST` | `/workspaces/:workspaceId/pages` | Create a page |
| `PATCH` | `/pages/:pageId/title` | Update a page title |
| `PATCH` | `/pages/:pageId/content` | Update page content |
| `DELETE` | `/pages/:pageId` | Delete a page |

Set `VITE_API_URL` to include `/api/v1`. Shared API types are in [src/types/dtos.ts](./src/types/dtos.ts).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check TypeScript |

## License

[MIT](./LICENSE)
